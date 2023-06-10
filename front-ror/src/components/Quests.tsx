import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../helpers/ImageComponent";
import GamePlay from "../service/GamePlay";

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
        padding: "2em 5em",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        flexDirection="row"
        // minHeight="60vh"
        // maxWidth="100vh"
        sx={{
          p: 1,
          color: "#272727",
          bgcolor: "#ffffffa6",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {quests.map((quest) => (
          <>
            <Box
              style={{
                padding: "2em 1em",
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
    </Box>
  );
};
export default Quests;
