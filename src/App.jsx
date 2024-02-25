import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import TopNavBar from './components/TopNavBar';
import { Container } from '@mui/material';

Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator hideSignUp={true}>
      <Container>
        <TopNavBar />
      </Container>
    </Authenticator>
  );
}