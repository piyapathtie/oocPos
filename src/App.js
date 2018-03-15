import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import axios from './AxiosConfiguration';
import urlencode from 'form-urlencoded'
import RaisedButton from 'material-ui/RaisedButton';
import authentication from './store.js'


function UsernameField({onChange}){
  return (<TextField
    hintText="Username Field"
    floatingLabelText="Username"
    onChange={(e) => onChange(e.target.value)}
  />)
}

function PasswordField({onChange}){
  return (<TextField
    hintText="Password Field"
    floatingLabelText="Password"
    type="password"
    onChange={(e) => onChange(e.target.value)}
  />)
}

function LoginButton({onClick}){
  return (<RaisedButton label="Login"
    secondary={true}
    onClick={onClick}
  />)
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  sendRequest = () => {
    var loginParams = {
        username: this.state.username,
        password: this.state.password
      }

      axios.post("/login", urlencode(loginParams))
        .then((response) => {
          console.log(response);
          console.log('sucess');
          authentication.authen = true
          authentication.role = response.data.role
          console.log(authentication);
        })
        .catch((error) => {
          console.log(error)
          console.log('failed');
        })
  }

  onUsernameChange(username){
    this.setState({username})
  }

  onPasswordChange(password){
    this.setState({password})
  }

  render() {
    return (
      <div class="center">
          <h4> LOGIN TO YOUR RESTAURANT ACCOUNT </h4>
          <br/>
            <UsernameField onChange={this.onUsernameChange.bind(this)} />
          <br />
            <PasswordField onChange={this.onPasswordChange.bind(this)} />
          <br />
          <div class="right">
            <LoginButton onClick={this.sendRequest}/>
          </div>
      </div>
    );
  }
}

export default App;
