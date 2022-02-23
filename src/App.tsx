import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom"
import Editor from "@monaco-editor/react"
import { Grid } from "@mui/material"
import WebsocketClient from './components/WebsocketClient';

function App() {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >
  
    <Grid item>
      <WebsocketClient />
    </Grid>   
     
  </Grid>
  );
}

export default App;
