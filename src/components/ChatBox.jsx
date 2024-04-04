import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getCurrentUser } from 'aws-amplify/auth';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [websocket, setWebsocket] = useState(null);
  const [connectedClients, setConnectedClients] = useState([]);

  useEffect(() => {
    const ws = new W3CWebSocket('wss://jxehlc264l.execute-api.us-east-1.amazonaws.com/production/');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      fetchConnectedClients(); // Fetch connected clients when WebSocket connection is opened
    };

    ws.onmessage = (event) => {
      // Use the received data directly as a string
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    setWebsocket(ws);

    return () => {
      if (ws.readyState === W3CWebSocket.OPEN || ws.readyState === W3CWebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const cachedUsername = localStorage.getItem('username');
        if (cachedUsername) {
          setUsername(cachedUsername);
        } else {
          const { username } = await getCurrentUser();
          setUsername(username);
          localStorage.setItem('username', username);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsername();
  }, []);

  const fetchConnectedClients = async () => {
    try {
      const response = await axios.get('https://hoixsu8aca.execute-api.us-east-1.amazonaws.com/prod/connectedClients'); // Adjust the URL based on your API endpoint
      const bodyArray = JSON.parse(response.data.body);
      const connectionIdsArray = bodyArray.map(item => item.connectionId);
      setConnectedClients(connectionIdsArray);
    } catch (error) {
      console.error('Error fetching connected clients:', error);
    }
  };

  const sendMessage = () => {
    if (!websocket) {
      console.error('WebSocket connection not established.');
      return;
    }

    const currentTime = new Date(new Date().toLocaleString('en', { timeZone: 'America/Denver' }));
    const formattedTime = '[' + currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '] ';

    const fullMessage = formattedTime + `${username}: ${messageInput}`;

    // Construct the message object
    const messageObject = {
      action: 'sendMessage',
      message: fullMessage
    };

    // Stringify the message object
    const finalMessage = JSON.stringify(messageObject);

    // Send the message via WebSocket
    websocket.send(finalMessage);
    console.log(finalMessage);
    setMessageInput('');
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box maxWidth="500px" mx="auto">
      <Paper elevation={3} style={{ padding: '20px', maxHeight: '60vh', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <Typography key={index} variant="body1" gutterBottom>
            {msg}
          </Typography>
        ))}
      </Paper>
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Connected Clients:
      </Typography>
      <Box>
        <Typography variant="body1">
          {connectedClients.map((id, index) => (
            <div key={index}>{id}</div>
          ))}
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: '10px' }}>
        <Grid item xs={9}>
          <TextField
            variant="outlined"
            fullWidth
            id="messageInput"
            label="Type message and hit enter"
            name="messageInput"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            type="button"
            onClick={sendMessage}
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            fullWidth
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatBox;
