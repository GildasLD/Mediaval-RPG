import { useEffect, useRef, useState } from "react";
import { getLocalUser } from "../../../helpers/User";
import GamePlay from "../../../service/GamePlay";

export const useCharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [newCharacterName, setNewCharacterName] = useState("");
  const [inventory, setInventory] = useState({});

  const refUser = useRef(0);

  useEffect(() => {
    let currentUser = getLocalUser();
    if (currentUser) {
      refUser.current = currentUser;
    }
  }, []);

  useEffect(() => {
    fetchUserCharacters();
    fetchInventory();
  }, []);

  const fetchUserCharacters = () => {
    GamePlay.fetchUserCharacters()
      .then((response) => {
        if (response.length > 0) {
          // setSelectedCharacter(response[0].id);
        }
        setCharacters(response);
        fetchInventory();
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  };

  const fetchInventory = () => {
    const userId = refUser.current.id;
    if (userId != null) {
      GamePlay.fetchUser(userId)
        .then((response) => {
          setInventory(response.inventory);
        })
        .catch((error) => {
          console.error("Error fetching inventory :", error);
        });
    }
  };

  const createCharacter = () => {
    GamePlay.createCharacter(newCharacterName)
      .then((response) => {
        fetchUserCharacters();
        setNewCharacterName("");
      })
      .catch((error) => {
        console.error("Error creating character:", error);
      });
  };

  return {
    characters,
    selectedCharacter,
    setSelectedCharacter,
    newCharacterName,
    setNewCharacterName,
    inventory,
    setInventory,
    createCharacter,
    fetchUserCharacters,
    fetchInventory,
  };
};
