import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import VerticalMenu from "./components/VerticalMenu";
import Home from "./components/Home";
import AddCard from "./components/AddCard";

Amplify.configure(awsconfig);

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <VerticalMenu appComp={<Home />} />} />
        <Route exact path="/addCard" component={() => <VerticalMenu appComp={<AddCard />} />} />
      </Switch>
    </BrowserRouter>
  ) : (
    <AmplifyAuthenticator />
  );
}

export default App;
