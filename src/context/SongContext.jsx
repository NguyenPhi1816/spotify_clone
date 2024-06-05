import { createContext, useContext, useMemo, useReducer } from 'react';

const SongContext = createContext();

const initialStates = {
    isLoading: false,
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

export const songContextTypes = {
    SET_LOADING: 'SET_LOADING',
    PRELOAD_DATA: 'PRELOAD_DATA',
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
    CLEAR_SONG: 'CLEAR_SONG',
};

const reducer = (state, action) => {
    switch (action.type) {
        case songContextTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case songContextTypes.PRELOAD_DATA:
            return {
                ...state,
                currentPlayingPath: action.data.currentPlayingPath,
                currentPlayingList: action.data.currentPlayingList,
                currentPlayingSongIndex: action.data.currentPlayingSongIndex,
                currentPlayingSong: action.data.currentPlayingSong,
                currentPlayingSongId: action.data.currentPlayingSongId,
                volume: action.data.volume,
                isRandom: action.data.isRandom,
                isLoop: action.data.isLoop,
            };
        case songContextTypes.LOAD_SONG:
            return {
                ...state,
                currentPlayingPath: action.currentPlayingPath,
                currentPlayingList: action.currentPlayingList,
                currentPlayingSongIndex: action.currentPlayingSongIndex,
            };
        case songContextTypes.SET_SONG:
            return {
                ...state,
                currentPlayingSongId: action.songId,
                currentPlayingSong: action.currentPlayingSong,
            };
        case songContextTypes.PLAY_SONG:
            return {
                ...state,
                isPlaying: true,
            };
        case songContextTypes.PAUSE_SONG:
            return {
                ...state,
                isPlaying: false,
            };
        case songContextTypes.SET_VOLUME:
            return {
                ...state,
                volume: action.volume,
            };
        case songContextTypes.NEXT_SONG:
            return {
                ...state,
                currentPlayingSongIndex: state.currentPlayingSongIndex + 1,
            };
        case songContextTypes.PREV_SONG:
            return {
                ...state,
                currentPlayingSongIndex: state.currentPlayingSongIndex - 1,
            };
        case songContextTypes.SET_RANDOM: {
            return {
                ...state,
                isRandom: !state.isRandom,
            };
        }
        case songContextTypes.SET_CURRENT_SONG_INDEX:
            return {
                ...state,
                currentPlayingSongIndex: action.index,
            };
        case songContextTypes.SET_LOOP:
            return {
                ...state,
                isLoop: !state.isLoop,
            };
        case songContextTypes.CLEAR_SONG: {
            return initialStates;
        }
        default:
            return state;
    }
};

export const useSongContext = () => {
    return useContext(SongContext);
};

export const SongProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStates);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <SongContext.Provider value={contextValue}>
            {children}
        </SongContext.Provider>
    );
};
