import axios from "axios";
import Cookies from "js-cookie";
import { sha256 } from "js-sha256";

const API_URL = "http://localhost:3009";
axios.defaults.withCredentials = true;

class AuthService {
  sha256sum = (string) => {
    const cleanLogin = this.cleanLogin(string);
    const hash = sha256(cleanLogin);
    console.warn(`🚀 > file: AuthService.tsx:13 > AuthService > hash:`, hash);
    return hash;
  };

  login(login, password) {
    return axios
      .post(`${API_URL}/users/sign_in.json`, {
        user: {
          login,
          password: this.sha256sum(password),
        },
      })
      .then((response) => {
        console.warn(
          `🚀 > file: AuthService.tsx:23 > AuthService > .then > response:`,
          response,
        );
        return response.data;
      });
  }

  register(login, password) {
    login = this.cleanLogin(login);
    return axios
      .post(`${API_URL}/users.json`, {
        user: {
          username: login,
          email: `${login}${login}@epitech.eu`,
          password: this.sha256sum(password),
          password_confirm: this.sha256sum(password),
        },
      })
      .then((response) => {
        console.warn(
          `🚀 > file: AuthService.tsx:40 > AuthService > .then > response:`,
          response,
        );
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

  cleanLogin(input) {
    let result = input.toLowerCase();
    result = result.replace(/\s+/g, "");
    result = result.replace(/[^a-zA-Z0-9]/g, "");
    return result;
  }
}

export default new AuthService();
