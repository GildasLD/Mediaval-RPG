import { useState } from "react";
import { useParams } from "react-router-dom";
import QuestStage from "./QuestStage";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
const Quest = () => {
  const [choice, setChoice] = useState(null); // 'riddle' or 'fight'
  let { questId, stageId } = useParams();
  const renderRiddleChallenge = () => {
    return <QuestStage questId={questId} stageId={stageId} />;
  };

  const renderFightChallenge = () => {
    return <div>Détails du combat ici...</div>;
  };

  const renderChoiceButtons = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Button
          sx={{ margin: 2, backgroundColor: "#bf502c", color: "#000" }}
          variant="contained"
          className="btn "
          onClick={() => setChoice("riddle")}
        >
          Répondre à une énigme
        </Button>
        <Button
          sx={{ margin: 2, backgroundColor: "#bf502c", color: "#000" }}
          variant="contained"
          className="btn "
          onClick={() => setChoice("fight")}
        >
          Combattre un adversaire
        </Button>
      </Box>
    );
  };

  return (
    <div>
      {choice === null && renderChoiceButtons()}
      {choice === "riddle" && renderRiddleChallenge()}
      {choice === "fight" && renderFightChallenge()}
    </div>
  );
};

export default Quest;
