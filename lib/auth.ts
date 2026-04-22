import Cookies from 'js-cookie';

const TOKEN_KEY = 'admin_token';

export const authStore = {
  getToken: () => Cookies.get(TOKEN_KEY) ?? null,

  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: 1/96, sameSite: 'strict' }); // 15 min
  },

  clearToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  isLoggedIn: () => !!Cookies.get(TOKEN_KEY),
};