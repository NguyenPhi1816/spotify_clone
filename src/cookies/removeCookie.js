import Cookies from 'js-cookie';
import { COOKIE_AUTH_NAME, COOKIE_PATH, COOKIE_STATES_NAME } from './cookie';

export const removeAuthCookie = () => {
    Cookies.remove(COOKIE_AUTH_NAME, { path: COOKIE_PATH });
};

export const removeStatesCookie = () => {
    Cookies.remove(COOKIE_STATES_NAME, { path: COOKIE_PATH });
};
