import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getLocalUser } from "../../helpers/User";
import { useEffect, useRef, useState } from "react";
import GamePlay from "../../service/GamePlay";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: "#ffffff85",
  borderRadius: ".4em",
}));

const InventoryShow = ({ selectedCharacter, inventory, onUpdateInventory }) => {
  const refUser = useRef(0);
  const userId = refUser.current.id;
  const [username, setUsername] = useState("");

  const handleUpdate = (newInventory: any) => {
    const updatedInventory = {
      newInventory,
      ...inventory,
    };
    onUpdateInventory(updatedInventory);
  };
  useEffect(() => {
    if (selectedCharacter) {
      console.warn(`selectedCharacter:33`, selectedCharacter);
    } else {
      console.warn(`no selectedCharacter to show:34`, selectedCharacter);
    }
  }, [selectedCharacter]);
  useEffect(() => {
    let currentUser = getLocalUser();
    if (currentUser) {
      refUser.current = currentUser;
      const l_username = refUser.current.username;
      const u_username =
        l_username.charAt(0).toUpperCase() + l_username.slice(1);
      setUsername(u_username);
    }
  }, []);
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        flexDirection="column"
        // minHeight="60vh"
        // maxWidth="100vh"
        sx={{ p: 1 }}
      >
        <Typography variant="h6" component="div">
          Bienvenue {username} !
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        // minHeight="60vh"
        // maxWidth="100vh"
        sx={{ p: 1 }}
      >
        <Typography variant="h6" component="div">
          Inventaire
        </Typography>

        <Demo>
          <List dense={true}>
            <ListItem sx={{ mr: 16 }}>
              <Button
                name="Argent"
                onClick={() => {
                  alert(`Vous avez ${inventory?.money} pièces d'or`);
                }}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                <ListItemText primary="Argent " secondary={inventory?.money} />
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const response = await GamePlay.updateInventory(
                      userId,
                      "helmet",
                    );
                    await GamePlay.updateUserCharacters(
                      selectedCharacter,
                      "helmet",
                    );
                    handleUpdate(response);
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                <ListItemText
                  primary="Chapeau "
                  secondary={inventory?.helmet}
                />
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const response = await GamePlay.updateInventory(
                      userId,
                      "shield",
                    );
                    await GamePlay.updateUserCharacters(
                      selectedCharacter,
                      "shield",
                    );
                    handleUpdate(response);
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                <ListItemText
                  primary="Plastron "
                  secondary={inventory?.shield}
                />
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const response = await GamePlay.updateInventory(
                      userId,
                      "weapon",
                    );
                    await GamePlay.updateUserCharacters(
                      selectedCharacter,
                      "weapon",
                    );
                    handleUpdate(response);
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                <ListItemText primary="Épée " secondary={inventory?.weapon} />
              </Button>
              {/* <Button sx={{ mr: 1 }} variant="outlined">
                <ListItemText primary="Objets " secondary={inventory?.items} />
              </Button> */}
            </ListItem>
          </List>
        </Demo>
        <small style={{ padding: 1, color: "#ababab", margin: 0 }}>
          {JSON.stringify(selectedCharacter, null, 2)}
        </small>
      </Box>
    </div>
  );
};
export default InventoryShow;
