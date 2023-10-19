import Cookies from 'js-cookie';
import { COOKIE_AUTH_NAME } from './cookie';

export const getAuthCookie = () => {
    return Cookies.get(COOKIE_AUTH_NAME) || null;
};
