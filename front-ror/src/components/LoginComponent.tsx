import { Form, Button, Container } from "react-bootstrap";
import React, { useState } from "react";
import AuthService from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    AuthService.login(email, password)
      .then( async (res) => {
        let currentUser = await  AuthService.getCurrentUser();
        console.warn(`🚀 > .then > currentUser:`, currentUser);

        Cookies.set('currrent-user', JSON.stringify(currentUser), { expires: 7 });

         navigate('/quests');
      })
      .catch((err) => {
        console.warn(`🚀 > handleLogin > err:`, err);
        setError("Invalid email or password");
      });
  };
  return (
    <Container className="center">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" variant="primary p-2" onClick={handleLogin}>
          Login
        </Button>
        {error && <p>{error}</p>}
      </Form>
    </Container>
  );
};

export default LoginComponent;
