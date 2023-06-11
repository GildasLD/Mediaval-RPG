import { Box, Button, Container, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleRegister = () => {
    AuthService.register(username, password)
      .then(async (res) => {
        let currentUser = await AuthService.getCurrentUser();
        console.warn(`  > .then > currentUser:`, currentUser);
        Cookies.set("current-user", JSON.stringify(currentUser), {
          expires: 7,
        });
        navigate("/quests/1/1");
      })
      .catch((err) => {
        console.warn(`🚀 > handleRegister > err:`, err);
        setError("Invalid login or password");
      });
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        // minHeight="60vh"
        // maxWidth="100vh"
        sx={{ p: 1 }}
      >
        <Typography variant="h6" component="div">
          Inventaire
        </Typography>
        <Container className="center">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirmation">
              <Form.Label>Confirmation</Form.Label>
              <Form.Control
                name="password_confirm"
                type="password"
                placeholder="Confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-2" onClick={handleRegister}>
              Inscription
            </Button>
            <Button className="mt-2" onClick={handleLogin}>
              Connexion
            </Button>
            {error && <p>{error}</p>}
          </Form>
        </Container>
      </Box>
    </div>
  );
};
export default Register;
