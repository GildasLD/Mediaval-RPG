import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3009';
axios.defaults.withCredentials = true;
class AuthService {
  login(email, password) {
    return axios.post(`${API_URL}/users/sign_in`, {
      user: {
        email, password
      }
    })
      .then(response => {
        console.warn(`🚀 > AuthService > login > response:`, response);

        if (response.headers['access-token']) {
          const authHeaders = {
            'access-token': response.headers['access-token'],
            client: response.headers.client,
            uid: response.headers.uid,
          };
          Cookies.set('authHeaders', authHeaders, { expires: 7 });
        }
        return response.data;
      });
  }
  getQuests() {
    return axios.get(`${API_URL}/quests`)
      .then(response => {
        console.warn(`🚀 > quests > login > response:`, response.data);
        return response.data;
      });
  }

  logout() {
    const authHeaders = Cookies.getJSON('authHeaders');
    if (authHeaders) {
      return axios.delete(`${API_URL}/users/sign_out`, { headers: authHeaders })
        .then(() => {
          Cookies.remove('authHeaders');
        });
    }
  }

  isAuthenticated() {
    return !!Cookies.getJSON('authHeaders');
  }
  getCurrentUser() {
    return axios.get(`${API_URL}/current_user`)
      .then(response => {
        console.warn(`🚀 > AuthService > login > getCurrentUser:`, response.data);
        return response.data;
      }).catch(error => {
        console.error('Error fetching the current user:', error);
      });
  }


  getAuthHeaders() {
    return Cookies.getJSON('authHeaders');
  }
}

export default new AuthService();
