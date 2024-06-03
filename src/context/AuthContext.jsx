import { createContext, useContext, useMemo, useReducer } from 'react';

const AuthContext = createContext();

const initialUserStates = {
    isLoading: true,
    isAuthenticated: false,
    authData: null,
};

export const authContextTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SET_LOADING: 'SET_LOADING',
};

const reducer = (state, action) => {
    switch (action.type) {
        case authContextTypes.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                authData: action.payload,
            };
        case authContextTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authData: null,
            };
        case authContextTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialUserStates);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
