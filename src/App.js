import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';


const LoginPage = () => (

    <div class="center">
        <h4> LOGIN TO YOUR RESTAURANT ACCOUNT </h4>
        <br/>
          <TextField
            hintText="Username Field"
            floatingLabelText="Username"
          /><br />
          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
          /><br />
          <br />
          <div class="right">
            <RaisedButton label="Login" secondary={true}/>
          </div>
    </div>

);



class App extends Component {
  render() {
    return (
        LoginPage()
    );
  }
}

export default App;
