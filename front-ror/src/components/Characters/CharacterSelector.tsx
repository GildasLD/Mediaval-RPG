import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getLocalUser } from "../../helpers/User";
import GamePlay from "../../service/GamePlay";
import InventoryShow from "../Inventory/InventoryShow";
import CharacterDetails from "./CharacterDetails";
import { useNavigate } from "react-router-dom";

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [newCharacterName, setNewCharacterName] = useState("");
  const [inventory, setInventory] = useState({});
  const navigate = useNavigate();
  // Character
  const updateInventory = async (updatedInventory) => {
    const newInventory = updatedInventory.newInventory;
    setInventory(newInventory);
    updateCharacter();
    await fetchInventory();
  };
  const updateCharacter = async () => {
    await fetchUserCharacters();
  };
  const refUser = useRef(0);
  useEffect(() => {
    let currentUser = getLocalUser();
    if (currentUser) {
      console.warn(
        `🚀 > file: CharacterSelector.tsx:26 > useEffect > currentUser:`,
        currentUser,
      );
      refUser.current = currentUser;
    }
  }, []);
  useEffect(() => {
    console.warn(`🚀 > file: inventory:`, JSON.stringify(inventory));
    fetchUserCharacters();
    fetchInventory();
  }, []);
  const fetchUserCharacters = () => {
    GamePlay.fetchUserCharacters()
      .then((response) => {
        console.warn("\n > .then > response:", response);
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
  const handleUseCharacter = () => {
    navigate("/quests");
  };

  return (
    <div>
      {inventory && (
        <InventoryShow
          selectedCharacter={selectedCharacter}
          inventory={inventory}
          onUpdateInventory={updateInventory}
        />
      )}
      {selectedCharacter && (
        <CharacterDetails
          characters={characters}
          selectedCharacter={selectedCharacter}
          onUpdateCharacter={fetchUserCharacters}
        />
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignSelf="center"
        flexDirection="row"
        maxWidth="100vh"
        style={{
          padding: 0,
          margin: "0em 4em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            style={{ padding: 1, color: "#000", margin: 0 }}
          >
            <b>Sélectionner</b>
          </Typography>
          <FormControl size="small">
            <Select
              style={{ padding: "0.5rem", color: "#000", margin: "0" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCharacter}
              label="Personnage"
              onChange={(e) => setSelectedCharacter(e.target.value)}
            >
              {characters.map((character) => (
                <MenuItem key={character.id} value={character.id}>
                  {character.character.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{ marginTop: 2, backgroundColor: "#577581", color: "#000" }}
            variant="contained"
            onClick={handleUseCharacter}
          >
            Utiliser
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            style={{ padding: 1, color: "#000", margin: 0 }}
          >
            <b>Créer un personnage</b>
          </Typography>
          <TextField
            style={{ padding: "0.5rem", color: "#000", marginTop: ".0" }}
            hiddenLabel
            id="name"
            variant="filled"
            size="small"
            name="name"
            type="text"
            placeholder="Nom"
            value={newCharacterName}
            onChange={(e) => setNewCharacterName(e.target.value)}
          />
          <Button
            sx={{ marginTop: 2.2, backgroundColor: "#577581", color: "#000" }}
            variant="contained"
            onClick={createCharacter}
          >
            Create
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default CharacterSelector;
