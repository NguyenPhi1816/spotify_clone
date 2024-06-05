import Cookies from 'js-cookie';
import { COOKIE_AUTH_NAME, COOKIE_STATES_NAME } from './cookie';

export const getAuthCookie = () => {
    const auth = Cookies.get(COOKIE_AUTH_NAME);
    if (auth) {
        return JSON.parse(auth);
    }
    return null;
};

export const getStatesCookie = () => {
    const states = Cookies.get(COOKIE_STATES_NAME);
    if (states) {
        return JSON.parse(states);
    }
    return null;
};
