import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getCurrentUser } from 'aws-amplify/auth';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    const ws = new W3CWebSocket('wss://jxehlc264l.execute-api.us-east-1.amazonaws.com/production/');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
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

  const sendMessage = () => {
    if (!websocket) {
      console.error('WebSocket connection not established.');
      return;
    }
  
    const currentTime = new Date(new Date().toLocaleString('en', { timeZone: 'America/Chicago' }));
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
    <Box>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {messages.map((msg, index) => (
          <Typography key={index} variant="body1" gutterBottom>
            {msg}
          </Typography>
        ))}
      </div>
      <TextField
        variant="outlined"
        margin='dense'
        fullWidth
        id="messageInput"
        label="Type message and hit enter"
        name="messageInput"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="button"
        onClick={sendMessage}
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        style={{ marginTop: '8px' }}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatBox;
