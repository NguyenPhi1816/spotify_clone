import Cookies from 'js-cookie';
import { COOKIE_AUTH_NAME } from './cookie';

export const getAuthCookie = () => {
    const auth = Cookies.get(COOKIE_AUTH_NAME);
    if (auth) {
        return JSON.parse(auth);
    }
    return null;
};
