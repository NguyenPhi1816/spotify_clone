import Cookies from 'js-cookie';
import {
    COOKIE_AUTH_NAME,
    COOKIE_EXPIRE_DATE,
    COOKIE_PATH,
    COOKIE_STATES_NAME,
} from './cookie';

export const setAuthCookie = (data) => {
    Cookies.set(COOKIE_AUTH_NAME, JSON.stringify(data), {
        expires: COOKIE_EXPIRE_DATE,
        path: COOKIE_PATH,
    });
};

export const setStatesCookie = (data) => {
    Cookies.set(COOKIE_STATES_NAME, JSON.stringify(data), {
        expires: COOKIE_EXPIRE_DATE,
        path: COOKIE_PATH,
    });
};
