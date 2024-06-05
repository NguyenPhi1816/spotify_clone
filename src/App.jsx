import './App.scss';

import { Fragment, useEffect, useState } from 'react';
import { getAuthCookie, getStatesCookie } from './cookies/getCookie';
import DialogManager from './components/DialogManager';
import PropTypes from 'prop-types';
import { getFollowingPlaylist } from './services/userServices';
import axios from 'axios';
import { MessageType } from './dialog/MessageDialog/MessageDialog';
import { authContextTypes, useAuthContext } from './context/AuthContext';
import {
    useUserDataContext,
    userDataContextTypes,
} from './context/UserDataContext';
import { dialogContextTypes, useDialogContext } from './context/DialogContext';
import { songContextTypes, useSongContext } from './context/SongContext';
import { setStatesCookie } from './cookies/setCookie';
import { getPlaylistById } from './services/playlistServices';
import {
    interactionContextTypes,
    useInteractionContext,
} from './context/InteractionContext';

const PreloadData = ({ children }) => {
    const LIKED_SONGS_PLAYLIST_NAME = 'Liked Songs';

    const { state: authState, dispatch: authDispatch } = useAuthContext();
    const { dispatch: userDataDispatch } = useUserDataContext();
    const { dispatch: dialogDispatch } = useDialogContext();
    const { state: songState, dispatch: songDispatch } = useSongContext();
    const { state: interactionState, dispatch: interactionDispatch } =
        useInteractionContext();

    // handle event user first interact with document (for prevent auto play after load song from cookie)
    useEffect(() => {
        const handleUserInteract = () => {
            if (!interactionState.isUserFirstInteracted) {
                interactionDispatch({
                    type: interactionContextTypes.SET_USER_FIRST_INTERACT,
                });
            }
        };

        document.addEventListener('click', handleUserInteract);
        document.addEventListener('keydown', handleUserInteract);

        return () => {
            document.removeEventListener('click', handleUserInteract);
            document.removeEventListener('keydown', handleUserInteract);
        };
    }, []);

    console.log(interactionState.isUserFirstInteracted);

    // handle load user authentication from cookie and user data
    useEffect(() => {
        authDispatch({ type: authContextTypes.SET_LOADING, isLoading: true });
        const authData = getAuthCookie();
        if (authData) {
            authDispatch({ type: authContextTypes.LOGIN, payload: authData });
            authDispatch({
                type: authContextTypes.SET_LOADING,
                isLoading: false,
            });

            userDataDispatch({
                type: userDataContextTypes.SET_LOADING,
                isLoading: true,
            });
            const followingPlaylistReq = getFollowingPlaylist(authData.user.id);

            axios
                .all([followingPlaylistReq])
                .then(
                    axios.spread((...responses) => {
                        const followingPlaylistRes = responses[0].data;
                        userDataDispatch({
                            type: userDataContextTypes.SET_FAV_PLAYLISTS,
                            playlists: followingPlaylistRes.playlists,
                        });
                        userDataDispatch({
                            type: userDataContextTypes.SET_FAV_ARTISTS,
                            artists: followingPlaylistRes.followings,
                        });

                        const [_likedSongPlaylist] =
                            followingPlaylistRes.playlists.filter(
                                (item) =>
                                    item.name === LIKED_SONGS_PLAYLIST_NAME,
                            );

                        if (_likedSongPlaylist)
                            userDataDispatch({
                                type: userDataContextTypes.SET_LIKED_SONGS_PLAYLIST,
                                playlists: _likedSongPlaylist,
                            });
                    }),
                )
                .catch((error) =>
                    dialogDispatch({
                        type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                        message: {
                            title: 'Có lỗi xảy ra',
                            message: error.message,
                            type: MessageType.ERROR,
                        },
                    }),
                )
                .finally(() => {
                    userDataDispatch({
                        type: userDataContextTypes.SET_LOADING,
                        isLoading: false,
                    });
                });
        } else {
            authDispatch({
                type: authContextTypes.SET_LOADING,
                isLoading: false,
            });
        }
    }, []);

    // handle load playbar states from cookie
    useState(() => {
        const states = getStatesCookie();
        const playlistId = states.currentPlayingListId;
        if (playlistId) {
            getPlaylistById(playlistId).then((res) => {
                const songs = res.data.songs;
                const path = `/playlist/${playlistId}`;
                const songIndex = states.currentPlayingSongIndex;
                const currentSong = new Audio(songs[songIndex].audioPath);
                const currentSongId = currentSong.id;
                const volume = states.volume;
                const isRandom = states.isRandom;
                const isLoop = states.isLoop;
                if (currentSong) {
                    currentSong.addEventListener('canplaythrough', () => {
                        songDispatch({
                            type: songContextTypes.PRELOAD_DATA,
                            data: {
                                currentPlayingPath: path,
                                currentPlayingList: songs,
                                currentPlayingSongIndex: songIndex,
                                currentPlayingSong: currentSong,
                                currentPlayingSongId: currentSongId,
                                volume: volume,
                                isRandom: isRandom,
                                isLoop: isLoop,
                            },
                        });
                    });
                }
            });
        }
    }, []);

    // handle set playbar states to cookie
    useEffect(() => {
        if (authState.authData && songState.currentPlayingPath) {
            const data = {
                // get playing list id from path
                currentPlayingListId: songState.currentPlayingPath.replace(
                    '/playlist/',
                    '',
                ),
                currentPlayingSongIndex: songState.currentPlayingSongIndex,
                volume: songState.volume,
                isRandom: songState.isRandom,
                isLoop: songState.isLoop,
            };
            setStatesCookie(data);
        }
    }, [authState, songState]);

    return !authState.isLoading && <Fragment>{children}</Fragment>;
};

PreloadData.propTypes = {
    children: PropTypes.element,
};

function App({ Component }) {
    return (
        <DialogManager>
            <PreloadData>{<Component />}</PreloadData>
        </DialogManager>
    );
}

export const authenticatedUser = false;

export default App;
