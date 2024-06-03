import './App.scss';

import { Fragment, useEffect, useState } from 'react';
import { getAuthCookie } from './cookies/getCookie';
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

const PreloadData = ({ children }) => {
    const LIKED_SONGS_PLAYLIST_NAME = 'Liked Songs';

    const { state: authState, dispatch: authDispatch } = useAuthContext();
    const { dispatch: userDataDispatch } = useUserDataContext();
    const { dispatch: dialogDispatch } = useDialogContext();

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
