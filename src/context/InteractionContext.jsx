import { createContext, useContext, useMemo, useReducer } from 'react';

const InteractionContext = createContext();

const initialStates = {
    isUserFirstInteracted: false,
};

export const interactionContextTypes = {
    SET_USER_FIRST_INTERACT: 'SET_USER_FIRST_INTERACT',
};

const reducer = (state, action) => {
    switch (action.type) {
        case interactionContextTypes.SET_USER_FIRST_INTERACT:
            return {
                isUserFirstInteracted: true,
            };
        default:
            return state;
    }
};

export const useInteractionContext = () => {
    return useContext(InteractionContext);
};

export const InteractionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStates);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <InteractionContext.Provider value={contextValue}>
            {children}
        </InteractionContext.Provider>
    );
};
