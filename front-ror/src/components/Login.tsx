import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
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
} from "@mui/material";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    AuthService.login(login, password)
      .then(async (res) => {
        console.warn(`🚀 > file: Login.tsx:16 > .then > res:`, res);
        let currentUser = res;
        Cookies.remove("currrent-user", { path: "" });
        Cookies.set("currrent-user", JSON.stringify(currentUser), {
          sameSite: "None",
          secure: true,
          expires: 2,
        });

        // let test = JSON.parse(Cookies.get(
        //   "currrent-user"
        // ));
        // console.warn(`🚀 > file: Login.tsx:24 > .then > test:`,   test);

        // navigate("/quests/1/1");
        navigate("/characters");
      })
      .catch((err) => {
        console.warn(`🚀 > handleLogin > err:`, err);
        setError("Invalid login or password");
      });
  };
  const handleRegister = () => {
    navigate("/register");
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
            defaultValue="Small"
            variant="filled"
            size="small"
          />
        </FormControl>
        <FormControl>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Small"
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
