import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { getCurrentUser } from 'aws-amplify/auth';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

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

  async function currentAuthenticatedUser() {
    try {
      const { username } = await getCurrentUser();
      return username;
    } catch (err) {
      console.log(err);
    }
  }

  const sendMessage = async () => {
    const username = await currentAuthenticatedUser();
    const fullMessage = `${username}: ${messageInput}`;
    await axios.post('https://2nkhu94g77.execute-api.us-east-1.amazonaws.com/default/messages', { message: fullMessage });
    setMessageInput('');
  };

  return (
    <Box component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <div>
          {messages.map((msg, index) => (
            <Typography key={index} variant="body1" gutterBottom>
              {msg}
            </Typography>
          ))}
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="messageInput"
          label="Type your message here"
          name="messageInput"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatBox;
