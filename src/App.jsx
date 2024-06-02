import './App.scss';

import { type, useAppContext } from './context/Context';
import { useEffect } from 'react';
import { getAuthCookie } from './cookies/getCookie';
import DialogManager from './components/DialogManager';

function App({ Component }) {
    const { dispatch } = useAppContext();

    useEffect(() => {
        const authData = getAuthCookie();
        if (authData) {
            dispatch({ type: type.LOGIN, payload: authData });
        }
    }, []);

    return (
        <DialogManager>
            <Component />
        </DialogManager>
    );
}

export const authenticatedUser = false;

export default App;
