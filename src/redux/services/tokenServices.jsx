import Cookies from 'js-cookie';

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    return localStorage.getItem('access_token');
  }

  updateLocalAccessToken(token) {
    Cookies.set("access_token", token);
    localStorage.setItem('access_token', token);
  }
  removeLocalAccessTokenAndLogout(token) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isLogin');
    localStorage.clear();
    window.location.replace("/");
  }
}

export default new TokenService();