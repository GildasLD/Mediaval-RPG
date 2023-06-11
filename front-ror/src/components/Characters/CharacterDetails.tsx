import { Box, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { getLocalUser } from "../../helpers/User";

import CharacterAvatar from "./components/CharacterAvatar";
import CharacterStats from "./components/CharacterStats";
import InventoryActions from "./components/InventoryActions";

const Demo = styled("div")(() => ({
  backgroundColor: "#ffffff85",
  borderRadius: ".4em",
}));

const CharacterDetails = ({
  characters,
  selectedCharacter,
  onUpdateCharacter,
}) => {
  const refUser = useRef(0);
  useEffect(() => {
    let currentUser = getLocalUser();
    if (currentUser) {
      refUser.current = currentUser;
    }
  }, []);
  const userID = refUser.current.id;
  let characterToDisplay = characters.find(
    (character: { character_id: any }) => {
      return character.character_id === selectedCharacter;
    },
  );
  const handleUpdate = () => {
    onUpdateCharacter();
  };
  useEffect(() => {
    Cookies.remove("mainCharacter", { path: "" });
    Cookies.set("mainCharacter", JSON.stringify(characterToDisplay), {
      sameSite: "None",
      path: "",
      secure: true,
      expires: 365,
    });
    // console.warn("\n🚀 > useEffect > cookie-js set cookie");
    // handleUpdsate()
  }, [characterToDisplay?.character_id]);
  const characterImageId = characterToDisplay?.character?.image || 1;
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        flexDirection="column"
        // minHeight="60vh"
        // maxWidth="100vh"
        sx={{ p: 2 }}
      >
        <Typography variant="h6" component="div">
          Détails du personnage
        </Typography>
        <Demo>
          <List dense={true}>
            <ListItem sx={{ mr: 16 }}>
              <Box sx={{ mr: 1 }}>
                <CharacterAvatar characterImageId={characterImageId} />
              </Box>
              <CharacterStats character={characterToDisplay} />
            </ListItem>
            <Box sx={{ mr: 1 }}>
              <ListItem sx={{ mr: 16 }}>
                <InventoryActions
                  character={characterToDisplay}
                  userId={userID}
                  onUpdate={handleUpdate}
                />
              </ListItem>
            </Box>
          </List>
        </Demo>
        {/* <div>
          <br />
          <pre style={{ padding: 1, color: "#000000cc" }}>
            <small>
              {JSON.stringify(characterToDisplay, (key, value) => ["shield", "helmet", "weapon", "level", "lifePoints", "strength", "points", "defense", "xp"].includes(key) ? undefined : value, 2)}
            </small>
          </pre>
        </div> */}
      </Box>
    </div>
  );
};
export default CharacterDetails;
