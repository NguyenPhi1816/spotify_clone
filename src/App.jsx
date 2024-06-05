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

const PreloadData = ({ children }) => {
    const LIKED_SONGS_PLAYLIST_NAME = 'Liked Songs';

    const { state: authState, dispatch: authDispatch } = useAuthContext();
    const { dispatch: userDataDispatch } = useUserDataContext();
    const { dispatch: dialogDispatch } = useDialogContext();
    const { state: songState, dispatch: songDispatch } = useSongContext();

    useEffect(() => {
        // handle load user authentication from cookie
        authDispatch({ type: authContextTypes.SET_LOADING, isLoading: true });
        const authData = getAuthCookie();
        if (authData) {
            authDispatch({ type: authContextTypes.LOGIN, payload: authData });
            authDispatch({
                type: authContextTypes.SET_LOADING,
                isLoading: false,
            });
        } else {
            authDispatch({
                type: authContextTypes.SET_LOADING,
                isLoading: false,
            });
        }

        // handle load playbar states from cookie
        songDispatch({ type: songContextTypes.SET_LOADING, isLoading: true });
        const states = getStatesCookie();
        if (states) {
            const playlistId = states.currentPlayingListId;
            if (playlistId) {
                getPlaylistById(playlistId).then((res) => {
                    const songs = res.data.songs;
                    const songIndex = states.currentPlayingSongIndex;
                    const path = `/playlist/${playlistId}`;
                    const currentSongId = songs[songIndex].id;

                    let currentSong = new Audio(songs[songIndex].audioPath);
                    if (currentSong) {
                        currentSong.addEventListener('canplaythrough', () => {
                            return songDispatch({
                                type: songContextTypes.PRELOAD_DATA,
                                data: {
                                    currentPlayingPath: path,
                                    currentPlayingList: songs,
                                    currentPlayingSongIndex: songIndex,
                                    currentPlayingSong: currentSong,
                                    currentPlayingSongId: currentSongId,
                                    volume: states.volume,
                                    isRandom: states.isRandom,
                                    isLoop: states.isLoop,
                                },
                            });
                        });
                    }
                });
            }

            return songDispatch({
                type: songContextTypes.PRELOAD_DATA,
                data: {
                    currentPlayingPath: null,
                    currentPlayingList: null,
                    currentPlayingSongIndex: null,
                    currentPlayingSong: null,
                    currentPlayingSongId: null,
                    volume: states.volume,
                    isRandom: states.isRandom,
                    isLoop: states.isLoop,
                },
            });
        }
        songDispatch({ type: songContextTypes.SET_LOADING, isLoading: false });
    }, []);

    // handle load user data if authData existed in context
    useEffect(() => {
        const authData = authState.authData;
        if (authData) {
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
        }
    }, [authState.authData]);

    // handle set playbar states to cookie
    useEffect(() => {
        if (authState.authData && navigator.userActivation.isActive) {
            let playlistId = null;
            if (songState.currentPlayingPath) {
                playlistId = songState.currentPlayingPath.replace(
                    '/playlist/',
                    '',
                );
            }

            const data = {
                // get playing list id from path
                currentPlayingListId: playlistId,
                currentPlayingSongIndex: songState.currentPlayingSongIndex,
                volume: songState.volume,
                isRandom: songState.isRandom,
                isLoop: songState.isLoop,
            };
            setStatesCookie(data);
        }
    }, [authState, songState]);

    return (
        !songState.isLoading &&
        !authState.isLoading && <Fragment>{children}</Fragment>
    );
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
