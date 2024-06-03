import { createContext, useContext, useMemo, useReducer } from 'react';

const UserDataContext = createContext();

const initialStates = {
    favPlaylists: [],
    favArtists: [],
    likedSongsPlaylist: {},
    isLoading: false,
};

export const userDataContextTypes = {
    SET_FAV_PLAYLISTS: 'SET_FAV_PLAYLISTS',
    SET_FAV_ARTISTS: 'SET_FAV_ARTISTS',
    SET_LIKED_SONGS_PLAYLIST: 'SET_LIKED_SONGS_PLAYLIST',
    CLEAR_USER_DATA: 'CLEAR_USER_DATA',
    SET_LOADING: 'SET_LOADING',
};

const reducer = (state, action) => {
    switch (action.type) {
        case userDataContextTypes.SET_FAV_PLAYLISTS:
            return {
                ...state,
                favPlaylists: action.playlists,
            };
        case userDataContextTypes.SET_FAV_ARTISTS:
            return {
                ...state,
                favArtists: action.artists,
            };
        case userDataContextTypes.SET_LIKED_SONGS_PLAYLIST:
            return {
                ...state,
                likedSongsPlaylist: action.playlist,
            };
        case userDataContextTypes.CLEAR_USER_DATA:
            return {
                favPlaylists: [],
                favArtists: [],
                likedSongsPlaylist: {},
            };
        case userDataContextTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

export const useUserDataContext = () => {
    return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStates);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <UserDataContext.Provider value={contextValue}>
            {children}
        </UserDataContext.Provider>
    );
};
