import React from 'react';
import './App.css';
import AppBar from './components/AppBar'
import {Button} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <AppBar user="Faye"/>
      <Button variant="contained" color="primary">Test</Button>
    </div>
  );
}

export default App;
