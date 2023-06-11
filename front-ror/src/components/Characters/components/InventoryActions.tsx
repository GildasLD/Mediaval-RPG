import { Button, ListItemText } from "@mui/material";
import GamePlay from "../../../service/GamePlay";

const InventoryActions = ({ character, userId, onUpdate }) => {
  const characterId = character?.character_id;
  const handleAction = (type: string, value: number) => {
    GamePlay.updateInventory(userId, type, value).then((response) => {
      GamePlay.updateUserCharacters(characterId, type, -value).then(
        (response) => {
          onUpdate();
        },
      );
    });
  };

  return (
    <>
      <Button
        sx={{ mr: 1 }}
        onClick={() => handleAction("helmet", 1)}
        variant="outlined"
      >
        <ListItemText primary="Chapeau" secondary={character?.helmet} />
      </Button>
      <Button
        sx={{ mr: 1 }}
        onClick={() => handleAction("shield", 1)}
        variant="outlined"
      >
        <ListItemText primary="Plastron" secondary={character?.shield} />
      </Button>
      <Button
        sx={{ mr: 1 }}
        onClick={() => handleAction("weapon", 1)}
        variant="outlined"
      >
        <ListItemText primary="Épée" secondary={character?.weapon} />
      </Button>
    </>
  );
};

export default InventoryActions;
