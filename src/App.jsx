import './App.scss';
import { type, useAppContext } from './Context/Context';
import { useEffect } from 'react';
import { isArtist } from './services/authorizationServices';
import { getAuthCookie } from './cookies/getCookie';

function App({ Component }) {
    const { dispatch } = useAppContext();

    useEffect(() => {
        const authData = getAuthCookie();
        if (authData) {
            dispatch({ type: type.LOGIN, payload: JSON.parse(authData) });
        }
    }, []);

    return (
        <>
            <Component />
        </>
    );
}

export const authenticatedUser = false;

export default App;
