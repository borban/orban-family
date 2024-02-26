import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Authenticator, useTheme, View, Image } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import TopNavBar from './components/TopNavBar';
import { Container } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

Amplify.configure(awsExports);

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large} marginTop={'15vh'}>
        <RocketLaunchIcon sx={{fontSize: 50}} color='primary'/>
      </View>
    );
  }
}

export default function App() {
  return (
    <Authenticator hideSignUp={true} components={components}>
      <Container disableGutters maxWidth='true'>
        <TopNavBar />
      </Container>
    </Authenticator>
  );
}