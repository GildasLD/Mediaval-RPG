import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if ("login" === name) {
      setLogin(value);
    } else if ("password" === name) {
      setPassword(value);
    }
  }

  const isAdmin = (loggedInUser) => {
    if ("GameMaster" === loggedInUser.role) {
      return true;
    }
  };
  const handleLogin = async () => {
    try {
      let loggedInUser = await AuthService.login(login, password);
      loggedInUser =
        (isAdmin(loggedInUser) && {
          ...loggedInUser,
          isAdmin: true,
        }) ||
        loggedInUser;
      Cookies.remove("current-user", { path: "" });
      Cookies.set("current-user", JSON.stringify(loggedInUser), {
        sameSite: "None",
        secure: true,
        expires: 7,
      });
      if (loggedInUser?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/characters");
      }
    } catch (error) {
      console.warn("Error:", error);
      setError(
        "Une erreur est survenue, veuillez vérifier vos identifiants de connexion",
      );
    }
  };
  const handleRegister = async () => {
    try {
      await AuthService.register(login, password);
    } catch (err) {
      console.warn(`🚀 > handleRegister > err:`, err);
      setError("Invalid login or password");
    }
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
            type="text"
            placeholder="Login"
            name="login"
            value={login}
            onChange={handleInputChange}
            variant="filled"
            size="small"
          />
        </FormControl>
        <FormControl>
          <TextField
            hiddenLabel
            variant="filled"
            size="small"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handleInputChange}
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
