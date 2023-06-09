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
import { useEffect, useState } from "react";
import GamePlay from "../../service/GamePlay";
import CharacterDetails from "./CharacterDetails";
import mockCharacters from "./mockCharacters.json";
import { getLocalUser } from "../../helpers/User";

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [newCharacterName, setNewCharacterName] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    let currentUser = getLocalUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = () => {
    GamePlay.fetchCharacters()
      .then((response) => {
        if (response.length > 0) {
          setSelectedCharacter(response[0].id);
        }
        setCharacters(response);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  };
  const createCharacter = () => {
    GamePlay.fetchCharacters()
      .then((response) => {
        if (response.length > 0) {
          setSelectedCharacter(response[0].id);
        }
        setCharacters(response);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  };

  const handleCharacterCreation = () => {
    axios
      .post("/characters", { name: newCharacterName })
      .then((response) => {
        console.warn(
          `🚀 > file: CharacterSelector.tsx:50 > .then > response:`,
          response,
        );

        fetchCharacters(); // Refetch characters after creation
        setNewCharacterName(""); // Reset the new character name input
      })
      .catch((error) => {
        console.error("Error creating character:", error);
      });
  };
  const handleUseCharacter = () => {
    axios
      .post("/characters", { name: newCharacterName })
      .then((response) => {
        console.warn(
          `🚀 > file: CharacterSelector.tsx:50 > .then > response:`,
          response,
        );

        fetchCharacters(); // Refetch characters after creation
        setNewCharacterName(""); // Reset the new character name input
      })
      .catch((error) => {
        console.error("Error creating character:", error);
      });
  };

  return (
    <div>
      {selectedCharacter && (
        <CharacterDetails
          characters={characters}
          selectedCharacter={selectedCharacter}
        />
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="60vh"
        maxWidth="100vh"
        style={{
          padding: "2em 4em",
          margin: 0,
        }}
      >
        <Typography variant="h4" style={{ padding: "0.5rem", color: "#000" }}>
          <b>Sélectionner un personnage</b>
        </Typography>
        <FormControl fullWidth>
          <Select
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
        <Typography variant="h4" style={{ padding: "0.5rem", color: "#000" }}>
          <b>Créer un personnage</b>
        </Typography>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue="Small"
          variant="filled"
          size="small"
          name="character_name"
          type="text"
          placeholder="Nom"
          value={newCharacterName}
          onChange={(e) => setNewCharacterName(e.target.value)}
        />
        <Button
          sx={{ marginTop: 2, backgroundColor: "#577581", color: "#000" }}
          variant="contained"
          onClick={handleCharacterCreation}
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default CharacterSelector;
