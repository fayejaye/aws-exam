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
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100vh",
      position: "relative",
      background: theme.palette.primary.main,
    },
    signIn: {
      margin: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      msTransform: "translate(-50%,-50%)",
      transform: "translate(-50%,-50%)",
    },
  }),
);

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const classes = useStyles();
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
    <div className={classes.container}>
      <div className={classes.signIn}>
        <AmplifyAuthenticator />
      </div>
    </div>
  );
}

export default App;
