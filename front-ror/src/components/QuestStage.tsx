import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GamePlay from "../service/GamePlay";

const QuestStage = (props) => {
  let questId = props.questId;
  let stageId = props.stageId;
  const [riddles, setRiddles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [progress, setProgress] = useState([]);
  const [character, setCharacter] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let currentCharacter = Cookies.get("mainCharacter");
    if (currentCharacter != null) {
      currentCharacter = JSON.parse(currentCharacter);
      console.warn("\n🚀 > quests > currentCharacter:", currentCharacter);
      setCharacter(currentCharacter);
    }
  }, [character?.id]);
  const Demo = styled("div")(({ theme }) => ({
    padding: "1em",
    backgroundColor: "#ffffff85",
    borderRadius: ".4em",
  }));

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
        navigate(`/quests/store`);
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            flexDirection="column"
            className="center"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                p: 1,
                m: 1,
                borderRadius: 1,
              }}
            >
              <Demo>
                <Typography
                  variant="h6"
                  style={{ padding: 1, color: "#000", margin: 0 }}
                >
                  <b>Énigme</b>
                </Typography>
                <div className="mt-2 background-white">
                  {riddles[currentIndex].question}
                </div>
              </Demo>
            </Box>

            <FormControl>
              <Demo>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="riddleAnswer"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                >
                  {[
                    riddles[currentIndex].firstSuggestion,
                    riddles[currentIndex].secondSuggestion,
                    riddles[currentIndex].thirdSuggestion,
                    riddles[currentIndex].fourthSuggestion,
                  ].map((suggestion, index) => (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div
                        onClick={() => setSelectedAnswer(suggestion)}
                        className="riddles--suggestions background-white rounded"
                      >
                        <FormControlLabel
                          value={suggestion}
                          control={<Radio />}
                          label={suggestion}
                        />
                      </div>
                    </Box>
                  ))}
                </RadioGroup>
              </Demo>
            </FormControl>
            <Button
              className="btn btn-primary"
              style={{ backgroundColor: "#b13226", margin: "2em" }}
              onClick={handleSubmitAnswer}
            >
              Envoyer
            </Button>
          </Box>
        )}
      </div>
    </Box>
  );
};
export default QuestStage;
