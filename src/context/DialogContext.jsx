import { createContext, useContext, useMemo, useReducer } from 'react';

const DialogContext = createContext();

const initialStates = {
    isShowMessageDialog: false,
    isShowAuthDialog: false,
    message: {
        title: '',
        message: '',
        type: '',
    },
};

export const dialogContextTypes = {
    SHOW_MESSAGE_DIALOG: 'SHOW_MESSAGE_DIALOG',
    HIDE_MESSAGE_DIALOG: 'HIDE_MESSAGE_DIALOG',
    SHOW_AUTH_DIALOG: 'SHOW_AUTH_DIALOG',
    HIDE_AUTH_DIALOG: 'HIDE_AUTH_DIALOG',
};

const reducer = (state, action) => {
    switch (action.type) {
        case dialogContextTypes.SHOW_MESSAGE_DIALOG:
            return {
                ...state,
                isShowMessageDialog: true,
                message: action.message,
            };
        case dialogContextTypes.HIDE_MESSAGE_DIALOG:
            return {
                ...state,
                isShowMessageDialog: false,
                message: {
                    title: '',
                    message: '',
                    type: '',
                },
            };
        case dialogContextTypes.SHOW_AUTH_DIALOG:
            return {
                ...state,
                isShowAuthDialog: true,
                message: action.message,
            };
        case dialogContextTypes.HIDE_AUTH_DIALOG:
            return {
                ...state,
                isShowAuthDialog: false,
                message: {
                    title: '',
                    message: '',
                    type: '',
                },
            };
        default:
            return state;
    }
};

export const useDialogContext = () => {
    return useContext(DialogContext);
};

export const DialogProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStates);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
};
