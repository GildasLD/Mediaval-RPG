import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../helpers/User";
import GamePlay from "../service/GamePlay";
import ConfirmationDialog from "../helpers/ConfirmationDialog";

const Demo = styled("div")(() => ({
  backgroundColor: "#ffffff85",
  borderRadius: ".4em",
  padding: "1.5em",
}));
const Store = () => {
  const refUser = useRef(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Bravo !");
  const [userID, setUserID] = useState(1);
  useEffect(() => {
    const currentUser = getLocalUser();

    console.warn(`\n🚀 > currentUser:`, currentUser);

    if (currentUser) {
      refUser.current = currentUser;
      if (currentUser.id) {
        setUserID(currentUser.id);
      }
    }
  }, []);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/characters");
  };
  const handleObjectSelection = (object: string) => {
    let itemName = "";
    switch (object) {
      case "helmet":
        itemName = "un chapeau";
        break;
      case "shield":
        itemName = "un bouclier";
        break;
      case "weapon":
        itemName = "une épée";
        break;
      default:
        break;
    }
    const translatedMessage = `Vous avez choisi ${itemName}, bon choix !`;
    setMessage(translatedMessage);

    // console.warn(`\n🚀 > userID:`, userID);

    GamePlay.updateInventory(userID, object, 1).then(() => {
      handleClickOpen();
    });
    handleClickOpen();
    // navigate("/");
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        flexDirection="column"
        sx={{ p: 1 }}
      >
        <Demo>
          <Typography variant="h6" component="div">
            Vous pouvez récuperer un objet au choix !
          </Typography>
          <List dense={true}>
            <Box sx={{ mr: 1 }}>
              <ListItem sx={{ mr: 16 }}>
                <Button
                  onClick={() => handleObjectSelection("helmet")}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  <ListItemText primary="Chapeau" />
                </Button>
                <Button
                  onClick={() => handleObjectSelection("shield")}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  <ListItemText primary="Plastron" />
                </Button>
                <Button
                  onClick={() => handleObjectSelection("weapon")}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  <ListItemText primary="Épée " />
                </Button>
              </ListItem>
            </Box>
          </List>
        </Demo>
      </Box>
      <div>
        <ConfirmationDialog
          title={title}
          content={message}
          open={open}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};
export default Store;
