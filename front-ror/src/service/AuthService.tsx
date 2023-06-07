import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3009";
axios.defaults.withCredentials = true;
class AuthService {
  login(login, password) {
    return axios
      .post(`${API_URL}/users/sign_in.json`, {
        user: {
          login,
          password,
        },
      })
      .then((response) => {
        if (response.headers["access-token"]) {
          const authHeaders = {
            "access-token": response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid,
          };
          Cookies.set("authHeaders", authHeaders, { expires: 7 });
        }
        return response.data;
      });
  }
  register(username, email, password, passwordConfirmation) {
    return axios
      .post(`${API_URL}/users.json`, {
        user: {
          username,
          email,
          password,
          password_confirm: passwordConfirmation,
        },
      })
      .then((response) => {
        if (response.headers["access-token"]) {
          const authHeaders = {
            "access-token": response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid,
          };
          Cookies.set("authHeaders", authHeaders, { expires: 7 });
        }
        return response.data;
      });
  }

  logout() {
    const authHeaders = Cookies.getJSON("authHeaders");
    if (authHeaders) {
      return axios
        .delete(`${API_URL}/users/sign_out`, { headers: authHeaders })
        .then(() => {
          Cookies.remove("authHeaders");
        });
    }
  }
  isAuthenticated() {
    return !!Cookies.getJSON("authHeaders");
  }
  getCurrentUser() {
    return axios
      .get(`${API_URL}/users/current_user`)
      .then((response) => {
        console.warn(
          `🚀 > file: AuthService.tsx:71 > AuthService > .then > response:`,
          response,
        );

        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching the current user:", error);
      });
  }

  getAuthHeaders() {
    return Cookies.getJSON("authHeaders");
  }
}

export default new AuthService();
