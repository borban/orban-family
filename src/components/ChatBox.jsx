import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

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

  const sendMessage = async () => {
    await axios.post('https://2nkhu94g77.execute-api.us-east-1.amazonaws.com/default/messages', { message: messageInput });
    setMessageInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
