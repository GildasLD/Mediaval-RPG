import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userInput = useRef();
  const handleLogin = () => {
    AuthService.login(login, password)
      .then((res) => {
        let currentUser = res;
        Cookies.remove("current-user", { path: "" });
        Cookies.set("current-user", JSON.stringify(currentUser), {
          sameSite: "None",
          secure: true,
          expires: 7,
        });
        // navigate("/quests/1/1");
        navigate("/characters");
      })
      .catch((err) => {
        console.warn(`🚀 > handleLogin > err:`, err);
        setError("Invalid login or password");
      });
  };
  const handleRegister = () => {
    AuthService.register(login, password)
      .then(async (res) => {
        console.warn(`🚀 > file: Login.tsx:34 > .then > res:`, res);
      })
      .catch((err) => {
        console.warn(`🚀 > handleRegister > err:`, err);
        setError("Invalid login or password");
      });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid maxWidth="sm">
        <FormControl>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            variant="filled"
            size="small"
          />
        </FormControl>
        <FormControl>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Button
              sx={{ marginTop: 2, backgroundColor: "#577581", color: "#000" }}
              variant="contained"
              onClick={handleLogin}
            >
              Connexion
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{ marginTop: 2, backgroundColor: "#577581", color: "#000" }}
              variant="contained"
              onClick={handleRegister}
            >
              Inscription
            </Button>
          </Grid>
        </Grid>
        {error && <p>{error}</p>}
      </Grid>
    </Box>
  );
};
export default Login;
