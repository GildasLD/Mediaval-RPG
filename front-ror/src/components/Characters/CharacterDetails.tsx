import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { getLocalUser } from "../../helpers/User";
import GamePlay from "../../service/GamePlay";

const Demo = styled("div")(({ theme }) => ({
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
  const [inventory, setInventory] = useState([]);
  let characterToDisplay = characters.find((character) => {
    return character.id === selectedCharacter;
  });
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
  const image = "/avatars/" + characterImageId + ".png";
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
                <Avatar alt="Travis Howard" src={image} />
              </Box>
              <ListItemText
                primary="Nom "
                secondary={characterToDisplay?.character?.name}
              />
              <ListItemText primary="XP " secondary={characterToDisplay?.xp} />
              <ListItemText
                primary="Force "
                secondary={characterToDisplay?.strength}
              />
              <ListItemText
                primary="Niveau "
                secondary={characterToDisplay?.level}
              />
              <ListItemText
                primary="Vie "
                secondary={characterToDisplay?.lifePoints}
              />
              <ListItemText
                primary="Défense "
                secondary={characterToDisplay?.defense}
              />
            </ListItem>
            <Box sx={{ mr: 1 }}>
              <ListItem sx={{ mr: 16 }}>
                <Button
                  onClick={() => {
                    GamePlay.updateInventory(
                      characterToDisplay.character_id,
                      "helmet",
                      1,
                    ).then((response) => {
                      console.warn("response => ", response);
                      GamePlay.updateUserCharacters(
                        characterToDisplay.character_id,
                        "helmet",
                        -1,
                      ).then((response) => {
                        console.warn("updateUserCharacters => ", response);
                        handleUpdate();
                      });
                    });
                  }}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  <ListItemText
                    primary="Chapeau"
                    secondary={characterToDisplay?.helmet}
                  />
                </Button>
                <Button
                  onClick={() => {
                    GamePlay.updateInventory(
                      characterToDisplay.character_id,
                      "shield",
                      1,
                    ).then((response) => {
                      console.warn("response => ", response);
                      GamePlay.updateUserCharacters(
                        characterToDisplay.character_id,
                        "shield",
                        -1,
                      ).then((response) => {
                        console.warn("updateUserCharacters => ", response);
                        handleUpdate();
                      });
                    });
                  }}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  <ListItemText
                    primary="Plastron"
                    secondary={characterToDisplay?.shield}
                  />
                </Button>
                <Button
                  onClick={() => {
                    GamePlay.updateInventory(
                      characterToDisplay.character_id,
                      "weapon",
                      1,
                    ).then((response) => {
                      console.warn("response => ", response);
                      GamePlay.updateUserCharacters(
                        characterToDisplay.character_id,
                        "weapon",
                        -1,
                      ).then((response) => {
                        console.warn("updateUserCharacters => ", response);
                        handleUpdate();
                      });
                    });
                  }}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  <ListItemText
                    primary="Épée "
                    secondary={characterToDisplay?.weapon}
                  />
                </Button>
              </ListItem>
            </Box>
          </List>
        </Demo>
      </Box>
    </div>
  );
};
export default CharacterDetails;
