const ACCESS_TOKEN_KEY = 'timebank.access_token';
const SESSION_TIMEOUT = 85800000; //24hs - 10min

class Auth {
    get isAuthenticated () {
        if (!this.user)
            return false;

        const loggedTime = new Date() - (this.user.iat * 1000);
        return loggedTime < SESSION_TIMEOUT;
    }

    get token() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    set token(value) {
        if (value)
            localStorage.setItem(ACCESS_TOKEN_KEY, value);
        else
            localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    get user() {
        return this.token && JSON.parse(atob(this.token.split('.')[1]));
    }
}

export default new Auth();
