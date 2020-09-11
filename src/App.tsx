import React from 'react';
import './App.css';
import AppBar from './components/AppBar'
import {Button} from '@material-ui/core'
import { createCards } from './graphql/mutations';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData)
    });
}, []);

  const add = async () => {
    const add = { id: "id", category: "SNS", question: "Question", answer:"answer" };
    try{
      await API.graphql(graphqlOperation(createCards, {input: add}))
    }
    catch(e){
      console.log('Error',e)
    }
  }

return authState === AuthState.SignedIn && user ? (
  <div className="App">
          <AppBar user={user.username} signOut={<AmplifySignOut/>}/>
          <Button onClick={()=>add()}variant="contained" color="primary">Test</Button>
  </div>
) : (
  <AmplifyAuthenticator />
);
}

export default App;
