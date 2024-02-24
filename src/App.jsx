import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import TopNavBar from './components/TopNavBar';

Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator hideSignUp={true}>
        <TopNavBar/>
    </Authenticator>
  );
}