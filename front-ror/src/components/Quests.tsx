import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import GamePlay from "../service/GamePlay";
import {
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Container,
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Image from "../helpers/ImageComponent";
const Quests = () => {
  const [quests, setQuests] = useState([]);
  const navigate = useNavigate();
  let { questId } = useParams();
  useEffect(() => {
    console.warn(`🚀 > Quests > questId:`, questId);
  }, [questId]);

  useEffect(() => {
    GamePlay.getQuests()
      .then((res) => {
        console.warn(`🚀 > .then > res:`, res);
        setQuests(res);
      })
      .catch((err) => {
        console.warn(`🚀 > handleLogin > err:`, JSON.stringify(err, null, 2));
      });
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      minHeight="100vh"
      maxWidth="100vh"
      style={{
        padding: "2em 5em"
      }}
    >
      {quests.map((quest) => (
        <>
          <Box style={{
            padding: "2em 1em"
          }}
            onClick={() => {
              navigate(`/quests/${quest.id}/1`);
            }}
            className=" "
          >
            <Image imageName={quest.image} />
            <Box
              className="bg-white p-1 rounded img-description bg-opacity-40"
              key={quest.id}
            >
              {quest.description}{" "}
            </Box>
          </Box>
        </>
      ))}
    </Box>
  );
};
export default Quests;
