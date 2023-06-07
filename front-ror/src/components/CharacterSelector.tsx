import React, { useState, useEffect } from "react";
import axios from "axios";
import GamePlay from "../service/GamePlay";
import {
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Container,
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [newCharacterName, setNewCharacterName] = useState("");

  useEffect(() => {
    // Fetch characters on component mount
    fetchCharacters();
  }, []);
  useEffect(() => {
    // Fetch characters on component mount
   
    console.warn(`🚀 > selectedCharacter:`, selectedCharacter);

  }, [selectedCharacter]);
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

  const handleCharacterCreation = () => {
    axios
      .post("/characters", { name: newCharacterName })
      .then((response) => {
        console.warn(`🚀 > file: CharacterSelector.tsx:50 > .then > response:`, response);

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
        console.warn(`🚀 > file: CharacterSelector.tsx:50 > .then > response:`, response);

        fetchCharacters(); // Refetch characters after creation
        setNewCharacterName(""); // Reset the new character name input
      })
      .catch((error) => {
        console.error("Error creating character:", error);
      });
  };
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      maxWidth="100vh"
      style={{
        padding: "2em 5em"
      }}
    >
      <Typography variant="h4" style={{ padding: '0.5rem', color: '#000'}}>
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
              {character.name}
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>
      <Button sx={{ marginTop: 2, backgroundColor: "#577581", color: "#000" }}
        variant="contained" onClick={handleUseCharacter}>Utiliser</Button>
      <Typography variant="h4" style={{ padding: '0.5rem', color: '#000' }}>
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
      <Button sx={{ marginTop: 2, backgroundColor: "#577581", color: "#000" }}
        variant="contained" onClick={handleCharacterCreation}>Create</Button>

    </Box>
  );
};

export default CharacterSelector;
