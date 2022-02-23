import * as React from "react";
import { TextField, Card, Grid, Typography, Button } from "@mui/material"

type MyProps = {}

type MyState = {
  sendMessage: string,
  receiveMessage: string,
  webSocket: WebSocket
}

const createWs = () => {
  let socket = new WebSocket("ws://localhost:3333")
  socket.onclose = (event) => {
    console.log("websocket disconnected")
    console.log(event)
  }
  socket.onopen = (event) => {
    console.log("websocket connected")
  }
  socket.onerror = (event) => {
    console.log("websocket error: " + event)
  }

  socket.onmessage = (event) => {
    console.log(event.data)
  }

  return socket
}



class WebsocketClient extends React.Component<MyProps, MyState> {
  state: MyState = {
    sendMessage: "",
    receiveMessage: "",
    webSocket: createWs()
  }

  render () {
    return (
      <Grid container direction="column">
        <TextField 
          id="outlined-basic"
          label="Send message"
          variant="outlined"
          value={this.state.sendMessage}
          onChange={this.handleMessageChange}
        />
        <Card>
          <Typography >
            {this.state.receiveMessage}
          </Typography>
        </Card>
        <Grid container direction="row">
          <Button onClick={this.wsSendMessage}>Send Message</Button>
          <Button onClick={this.isWebsocketConnected() ? this.wsDisconnect : this.wsReconnect} color={this.isWebsocketConnected() ? "error" : "success"}>{this.isWebsocketConnected() ? "Disconnect" : "Reconnect"}</Button>
        </Grid>
      </Grid>

    )
  }

  handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      sendMessage: event.target.value
    }))
  }

  isWebsocketConnected = (): Boolean => {
    return this.state.webSocket.readyState === 1
  }

  wsReconnect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState(() => ({
      webSocket: createWs()
    }))
  }

  wsDisconnect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("client disconnected")
    this.state.webSocket.close();
  }

  wsSendMessage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("message sent")
    this.state.webSocket.send(this.state.sendMessage)
    console.log(this.state.webSocket.readyState)
  }
}

export default WebsocketClient