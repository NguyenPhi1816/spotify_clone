import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
    isAuthenticated: false,
    authData: null,
    isPlaying: false,
    currentPlayingPath: null,
    currentPlayingList: null,
    currentPlayingSongIndex: null,
    currentPlayingSong: null,
    currentPlayingSongId: null,
    volume: 1,
    isRandom: false,
    isLoop: false,
};

export const type = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOAD_SONG: 'LOAD_SONG',
    PLAY_SONG: 'PLAY_SONG',
    PAUSE_SONG: 'PAUSE_SONG',
    SET_SONG: 'SET_SONG',
    SET_VOLUME: 'SET_VOLUME',
    NEXT_SONG: 'NEXT_SONG',
    PREV_SONG: 'PREV_SONG',
    SET_RANDOM: 'SET_RANDOM',
    SET_CURRENT_SONG_INDEX: 'SET_CURRENT_SONG_INDEX',
    SET_LOOP: 'SET_LOOP',
};

const reducer = (state, action) => {
    switch (action.type) {
        case type.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                authData: action.payload,
            };
        case type.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authData: {},
            };
        case type.LOAD_SONG:
            return {
                ...state,
                currentPlayingPath: action.currentPlayingPath,
                currentPlayingList: action.currentPlayingList,
                currentPlayingSongIndex: action.currentPlayingSongIndex,
            };
        case type.SET_SONG:
            return {
                ...state,
                currentPlayingSongId: action.songId,
                currentPlayingSong: action.currentPlayingSong,
            };
        case type.PLAY_SONG:
            return {
                ...state,
                isPlaying: true,
            };
        case type.PAUSE_SONG:
            return {
                ...state,
                isPlaying: false,
            };
        case type.SET_VOLUME:
            return {
                ...state,
                volume: action.volume,
            };
        case type.NEXT_SONG:
            return {
                ...state,
                currentPlayingSongIndex: state.currentPlayingSongIndex + 1,
            };
        case type.PREV_SONG:
            return {
                ...state,
                currentPlayingSongIndex: state.currentPlayingSongIndex - 1,
            };
        case type.SET_RANDOM: {
            return {
                ...state,
                isRandom: !state.isRandom,
            };
        }
        case type.SET_CURRENT_SONG_INDEX:
            return {
                ...state,
                currentPlayingSongIndex: action.index,
            };
        case type.SET_LOOP:
            return {
                ...state,
                isLoop: !state.isLoop,
            };
        default:
            return state;
    }
};

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
