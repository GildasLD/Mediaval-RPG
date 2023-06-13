import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3009";
axios.defaults.withCredentials = true;

class GamePlay {
  createCharacter(characterName) {
    let userId: number = Cookies.get("current-user");
    userId = JSON.parse(userId).id || 1;
    return axios
      .request({
        method: "POST",
        url: `${API_URL}/user_characters`,
        headers: { "Content-Type": "application/json" },
        data: {
          user_character: {
            user_id: `${userId}`,
            character: { name: `${characterName}`, description: null },
          },
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        // console.warn(
        //   `🚀 > file: GamePlay.tsx:29 > GamePlay > createCharacter > error:`,
        //   error,
        // );
      });
  }

  fetchUserCharacters(user = null) {
    return axios
      .get(`${API_URL}/user_characters/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // console.warn(
        //   `🚀 > file: GamePlay.tsx:39 > GamePlay > returnaxios.get > error:`,
        //   error,
        // );

        return error;
      });
  }

  updateUserCharacters(charID = null, itemName, addition = 1) {
    let data = {
      [itemName]: addition,
    };
    switch (itemName) {
      case "helmet":
        data["lifePoints"] = addition * 5;
        break;
      case "shield":
        data["defense"] = addition * 3;
        break;
      case "weapon":
        data["strength"] = addition * 7;
        break;
      default:
        console.warn(
          "\n🚀 > ERROR : front-ror/src/service/GamePlay.tsx:66 > GamePlay > switch (itemName)",
          "Invalid item name provided",
        );
        return;
    }
    return axios
      .request({
        method: "PATCH",
        url: `${API_URL}/user_characters/${charID}`,
        headers: { "Content-Type": "application/json" },
        data: data,
      })
      .then((response) => {
        // console.warn(
        //   "\n🚀 > file : front-ror/src/service/GamePlay.tsx:62 > GamePlay > .then > response:",
        //   response,
        // );
        return response.data;
      });
  }

  updateInventory(userId, itemName, addition = -1) {
    return axios
      .request({
        method: "PATCH",
        url: `${API_URL}/inventories/${userId}`,
        headers: { "Content-Type": "application/json" },
        data: {
          [itemName]: addition,
        },
      })
      .then((response) => {
        // console.warn(
        //   `🚀 > file: GamePlay.tsx:58 > GamePlay > .then > response:`,
        //   response.data,
        // );
        return response.data;
      });
  }

  fetchUser(user = null) {
    return axios.get(`${API_URL}/users/${user}`).then((response) => {
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
