import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  List,
  Stack,
  Avatar,
  TextField,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: "#ffffff85",
  borderRadius: ".4em",
}));
const CharacterDetails = ({ characters, selectedCharacter }) => {
  let characterToDisplay = characters.find((character) => {
    return character.id === selectedCharacter;
  });

  console.warn(`🚀 > file: characterToDisplay :`, characterToDisplay);

  const image = "/avatars/" + characterToDisplay?.character?.image + ".png";
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
          Character Details
        </Typography>
        <Demo>
          <List dense={true}>
            <ListItem sx={{ mr: 16 }}>
              <Avatar alt="Travis Howard" src={image} />
              <ListItemText
                primary="Name "
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
                secondary={characterToDisplay?.strength}
              />
              <ListItemText
                primary="Sagesse "
                secondary={characterToDisplay?.wisdom}
              />
            </ListItem>
          </List>
        </Demo>
      </Box>
    </div>
  );
};

export default CharacterDetails;
