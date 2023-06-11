import { ListItem, ListItemText } from "@mui/material";

const CharacterStats = ({ character }) => {
  return (
    <ListItem sx={{ mr: 16 }}>
      <ListItemText primary="Nom" secondary={character?.character?.name} />
      <ListItemText primary="XP" secondary={character?.xp} />
      <ListItemText primary="Force" secondary={character?.strength} />
      <ListItemText primary="Niveau" secondary={character?.level} />
      <ListItemText primary="Vie" secondary={character?.lifePoints} />
      <ListItemText primary="Défense" secondary={character?.defense} />
    </ListItem>
  );
};

export default CharacterStats;
