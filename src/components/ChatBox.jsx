import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getCurrentUser } from 'aws-amplify/auth';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const pusher = new Pusher('44267b20dc02476545a0', {
      cluster: 'mt1',
      encrypted: true,
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      pusher.unsubscribe('my-channel');
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

  const sendMessage = async () => {
    const currentTime = new Date(new Date().toLocaleString('en', { timeZone: 'America/Chicago' }));
    const formattedTime = '[ ' + currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '] ';
    
    const fullMessage = formattedTime + `${username}: ${messageInput}`;
    await axios.post('https://ldbesdwsmtdagjlgwd3rzftuyy0vyriu.lambda-url.us-east-1.on.aws/', { message: fullMessage });
    setMessageInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box component="main" maxWidth="xs" height="85vh">
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
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
      </Paper>
    </Box>
  );
};

export default ChatBox;
