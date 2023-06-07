import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3009";
axios.defaults.withCredentials = true;
class GamePlay {
  createCharacter(name) {
    return axios
      .post(`${API_URL}/character`, { name })
      .then((response) => {
       console.warn(`🚀 > file: GamePlay.tsx:11 > GamePlay > .then > response:`, response);

       
        return response.data;
      });
  }
  fetchCharacters() {
    return axios.get(`${API_URL}/characters`).then((response) => {
      return response.data;
    });
  } 
  getQuests() {
    return axios.get(`${API_URL}/quests`).then((response) => {
      return response.data;
    });
  }
  getQuest(id) {
    return axios.get(`${API_URL}/quests/${id}`).then((response) => {
      return response.data;
    });
  }
  getStages(id) {
    return axios.get(`${API_URL}/stages/${id}`).then((response) => {
      return response.data;
    });
  }
  getRiddles(questId, stageId) {
    return axios
      .get(`${API_URL}/riddles`, {
        params: { quest_id: questId, stage_id: stageId },
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new GamePlay();
