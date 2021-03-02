import Cookies from 'js-cookie';

export function getCookies(key) {
    return Cookies.get(key);
}

export function setCookies(key, name) {
    return Cookies.set(key, name);
}

export function removeCookies(key) {
    return Cookies.remove(key);
}
