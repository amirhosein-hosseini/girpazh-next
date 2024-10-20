import Cookies from 'js-cookie';

const isBrowser = typeof window !== 'undefined';

const setCookie = (name, value, days) => {
  if (isBrowser) {
    Cookies.set(name, value, { expires: days, path: '/' });
  }
};

const getCookie = (name) => {
  if (isBrowser) {
    return Cookies.get(name) || null;
  }
  return null;
};

const deleteCookie = (name) => {
  if (isBrowser) {
    Cookies.remove(name, { path: '/' });
  }
};

export { setCookie, getCookie, deleteCookie };