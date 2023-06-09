import React, { useState, useEffect } from "react";
import AuthService from "../service/AuthService";
import GamePlay from "../service/GamePlay";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Container,
  Checkbox,
  FormControl,
  TextField,
  Button,
  InputLabel,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

const QuestStage = (props) => {
  let questId = props.questId;
  let stageId = props.stageId;
  const [riddles, setRiddles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [progress, setProgress] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    GamePlay.getRiddles(questId, stageId)
      .then((res) => {
        // console.warn(`🚀 > .then > res:`, res);
        setRiddles(res);
      })
      .catch((err) => {
        console.warn(`🚀 > handleLogin > err:`, JSON.stringify(err, null, 2));
      });
  }, []);

  const handleSubmitAnswer = () => {
    if (selectedAnswer === riddles[currentIndex].answer) {
      setProgress([
        ...progress,
        { quest: { stage: { [currentIndex]: true } } },
      ]);
      if (stageId == 2) {
        alert("YES YOU DID IT");
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer("");
        navigate(`/quests/${questId}/${currentIndex + 2}`);
        location.reload();
      }
    } else {
      alert("Mauvaise réponse ! Réessayez.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div>
        {riddles.length > 0 && (
          <div>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              flexDirection="column"
              className="center"
            >
              <div className="mt-2 background-white">
                {riddles[currentIndex].question}
              </div>
              {[
                riddles[currentIndex].firstSuggestion,
                riddles[currentIndex].secondSuggestion,
                riddles[currentIndex].thirdSuggestion,
                riddles[currentIndex].fourthSuggestion,
              ].map((suggestion, index) => (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <div
                    onClick={() => setSelectedAnswer(suggestion)}
                    className="riddles--suggestions background-white rounded"
                    key={index}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={suggestion}
                          name="riddleAnswer"
                        >
                          <FormControlLabel
                            value={suggestion}
                            control={<Radio />}
                            label={suggestion}
                          />
                          <FormControlLabel
                            value={suggestion}
                            control={<Radio />}
                            label={suggestion}
                          />
                          <FormControlLabel
                            value={suggestion}
                            control={<Radio />}
                            label={suggestion}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </Box>
              ))}
              <Button
                className="btn btn-primary mt-3"
                style={{ backgroundColor: "#b13226" }}
                onClick={handleSubmitAnswer}
              >
                Envoyer
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
};

export default QuestStage;
