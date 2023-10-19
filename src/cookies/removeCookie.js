import Cookies from 'js-cookie';
import { COOKIE_AUTH_NAME, COOKIE_PATH } from './cookie';

export const removeAuthCookie = () => {
    Cookies.remove(COOKIE_AUTH_NAME, { path: COOKIE_PATH });
};
