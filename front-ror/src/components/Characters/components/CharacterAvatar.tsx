import { Avatar, Box } from "@mui/material";

const CharacterAvatar = ({ characterImageId }) => {
  const image = "/avatars/" + characterImageId + ".png";
  return (
    <Box sx={{ mr: 1 }}>
      <Avatar alt="Character Avatar" src={image} />
    </Box>
  );
};

export default CharacterAvatar;
