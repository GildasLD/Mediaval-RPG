import { Form, Button, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import AuthService from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const QuestsComponent = () => {
  const [quests, setQuests] = useState([]);
  useEffect(() => {
    AuthService.getQuests()
      .then((res) => {
        console.warn(`🚀 > .then > res:`, res);
        setQuests(res);
      })
      .catch((err) => {
        console.warn(`🚀 > handleLogin > err:`, JSON.stringify(err, null, 2));
      });
  }, []);

  return (
    <div>
      <h1>Available Quests</h1>
      <ul>
        {quests.map(quest => (
          <li key={quest.id}>
            <h2>{quest.title}</h2>
            <p>{quest.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default QuestsComponent;
