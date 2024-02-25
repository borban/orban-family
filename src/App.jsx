import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Authenticator, useTheme, View, Image } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import TopNavBar from './components/TopNavBar';
import { Container } from '@mui/material';

Amplify.configure(awsExports);

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large} marginTop={'15vh'}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  }
}

export default function App() {
  return (
    <Authenticator hideSignUp={true} components={components}>
      <Container>
        <TopNavBar />
      </Container>
    </Authenticator>
  );
}