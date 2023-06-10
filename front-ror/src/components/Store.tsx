import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../helpers/User";
import GamePlay from "../service/GamePlay";
const Demo = styled("div")(() => ({
  backgroundColor: "#ffffff85",
  borderRadius: ".4em",
  padding: "1.5em",
}));
const Store = () => {
  const refUser = useRef(0);
  const [open, setOpen] = useState(false);
  const [translate, setTranslate] = useState("");
  useEffect(() => {
    let currentUser = getLocalUser();
    if (currentUser) {
      refUser.current = currentUser;
    }
  }, []);
  const [cookieContent, setCookieContent] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    let getCookie = Cookies.get("mainCharacter");
    if (getCookie != null) {
      getCookie = JSON.parse(getCookie);
      setCookieContent(getCookie);
      // console.warn(`\n🚀 > Store > cookieContent`, cookieContent);
    } else {
      console.warn("\n🚀 > ERROR : Store > cannot get cookie");
    }
    // console.warn("\n🚀 > useEffect > cookie-js set cookie");
  }, [cookieContent.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/characters");
  };
  const userID = refUser.current.id;
  const handleObjectSelection = (object) => {
    switch (object) {
      case "helmet":
        setTranslate("un chapeau");
        break;
      case "shield":
        setTranslate("un bouclier");
        break;
      case "weapon":
        setTranslate("une épée");
        break;
      default:
        break;
    }
    const updatedCookieContent = { ...cookieContent, selectedObject: object };
    Cookies.set("mainCharacter", JSON.stringify(updatedCookieContent));

    if (userID != null) {
      GamePlay.updateInventory(userID, object, 1).then((response) => {
        handleClickOpen();
        console.warn("response => ", JSON.stringify(response, null, 2));
        handleClickOpen();
        // alert(`OK, vous avez choisi de vous procurer ${translate}, bon choix !`);
        // navigate("/characters");
      });
    } else {
      navigate("/");
    }
  };

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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography
              sx={{
                px: 2,
              }}
              variant="h6"
              component="div"
            >
              Bravo !
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                color: "#272727",
                bgcolor: "background.paper",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                minWidth: 300,
              }}
            >
              <Typography variant="h6" component="div">
                Vous avez choisi <b>{translate}</b>
                <br /> Bon choix !
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default Store;
