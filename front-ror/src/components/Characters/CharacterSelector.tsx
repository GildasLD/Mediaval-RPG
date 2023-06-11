import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useRef } from "react";
import { getLocalUser } from "../../helpers/User";
import InventoryShow from "../Inventory/InventoryShow";
import CharacterDetails from "./CharacterDetails";
import { useNavigate } from "react-router-dom";
import { useCharacterSelector } from "./hooks/useCharacterSelector";

const CharacterSelector = () => {
  const {
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
  } = useCharacterSelector();

  const navigate = useNavigate();
  // Character
  const updateInventory = async (updatedInventory: { newInventory: any }) => {
    const newInventory = updatedInventory.newInventory;
    setInventory(newInventory);
    updateCharacter();
    fetchInventory();
  };
  const updateCharacter = async () => {
    fetchUserCharacters();
  };
  const refUser = useRef(0);
  useEffect(() => {
    let currentUser = getLocalUser();
    if (currentUser) {
      // console.warn(
      //   `🚀 > file: CharacterSelector.tsx:26 > useEffect > currentUser:`,
      //   currentUser,
      // );
      refUser.current = currentUser;
    }
  }, []);
  useEffect(() => {
    // console.warn(
    //   `🚀 > file: CharacterSelector.tsx:49 > useEffect > currentUser:`,
    //   selectedCharacter,
    // );
  }, [selectedCharacter]);
  useEffect(() => {
    // console.warn(`🚀 > file: inventory:`, JSON.stringify(inventory));
    fetchUserCharacters();
    fetchInventory();
  }, []);

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
          {/* <pre style={{ padding: 10, color: "black" }}>
            {JSON.stringify(selectedCharacter, null, 2)} selecteChar
          </pre> */}
          <FormControl size="small">
            <Select
              style={{ padding: "0.5rem", color: "#000", margin: "0" }}
              value={selectedCharacter}
              label="Personnage"
              onChange={(e) => setSelectedCharacter(e.target.value)}
            >
              {characters.map((character) => (
                <MenuItem
                  key={character.character_id}
                  value={character.character_id}
                >
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
