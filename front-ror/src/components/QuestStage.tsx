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
import ConfirmationDialog from "../helpers/ConfirmationDialog";

const QuestStage = (props) => {
  const questId = props.questId;
  const stageId = parseInt(props.stageId, 10);
  const [open, setOpen] = useState(false);

  const [riddles, setRiddles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [progress, setProgress] = useState([]);
  const [character, setCharacter] = useState({});
  const navigate = useNavigate();
  const handleClickOpen = (message = null) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (type === "error") {
      return;
    }
    if (type === "final") {
      navigate(`/quests/store`);
    }
    if (type === "goodAnswer") {
      setCurrentIndex(0);
      navigate(`/quests/${questId}/${currentIndex + 2}`);
    }
  };
  useEffect(() => {
    let currentCharacter = Cookies.get("mainCharacter");
    if (currentCharacter != null) {
      currentCharacter = JSON.parse(currentCharacter);
      setCharacter(currentCharacter);
    }
  }, [character?.id]);
  const Demo = styled("div")(() => ({
    padding: "1em",
    backgroundColor: "#ffffff85",
    borderRadius: ".4em",
  }));

  useEffect(() => {
    GamePlay.getRiddles(questId, stageId)
      .then((res) => {
        setRiddles(res);
      })
      .catch((err) => {
        console.warn(`🚀 > ERROR : `, JSON.stringify(err, null, 2));
      });
  }, [questId, stageId]);
  const handleSubmitAnswer = () => {
    if (selectedAnswer === riddles[currentIndex].answer) {
      setProgress([
        ...progress,
        { quest: { stage: { [currentIndex]: true } } },
      ]);

      if (stageId === 2) {
        setTitle("Bravo !");
        setMessage("Trop fort !");
        setType("final");
        handleClickOpen("Trop fort !");
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer("");
        navigate(`/quests/${questId}/${currentIndex + 2}`);
        setCurrentIndex(0);
        setTitle("Bravo !");
        setMessage("Bonne réponse !");
        setType("wip");
        handleClickOpen("Bien joué !");
      }
    } else {
      setTitle("Nope !");
      setMessage("Mauvaise réponse !");
      setType("wip");
      handleClickOpen("Essaye encore ?");
    }
  };
  return (
    <div>
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
                    {riddles[currentIndex]?.question}
                  </div>
                </Demo>
              </Box>
              <FormControl>
                <Demo>
                  <RadioGroup
                    name="riddleAnswer"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  >
                    {[
                      riddles[currentIndex]?.firstSuggestion,
                      riddles[currentIndex]?.secondSuggestion,
                      riddles[currentIndex]?.thirdSuggestion,
                      riddles[currentIndex]?.fourthSuggestion,
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
export default QuestStage;
