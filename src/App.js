import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import axios from './AxiosConfiguration';
import urlencode from 'form-urlencoded'
import RaisedButton from 'material-ui/RaisedButton';
import authentication from './store.js'

function UsernameField({onChange, onKeyPress}){
  return (<TextField
      fullWidth={true}
    hintText="Username"
    floatingLabelText="Username"
    onChange={(e) => onChange(e.target.value)}
    onKeyPress={onKeyPress}
  />)
}

function PasswordField({onChange, onKeyPress}){
  return (<TextField
      fullWidth={true}
    hintText="Password Field"
    floatingLabelText="Password"
    type="password"
    onChange={(e) => onChange(e.target.value)}
    onKeyPress={onKeyPress}
  />)
}

function LoginButton({onClick}){
  return (<RaisedButton label="Login"
                        fullWidth={true}
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
      show: false,
    };
  }

  sendRequest = () => {
    var loginParams = {
        username: this.state.username,
        password: this.state.password
      }

      axios.post("/login", urlencode(loginParams))
        .then((response) => {
          // authentication.authen = true
          // authentication.role = response.data.role
          // console.log(authentication);
            console.log("before");
          this.props.history.push('/mainmenu');
            console.log("after");
        })
        .catch((error) => {
          console.log(error);
          console.log('login failed');
          this.setState({show: true})
          // console.log(authentication);
        })
  }

  onUsernameChange = (username) =>{
    // if (username.charCode == 13) {
    //   this.sendRequest()
    // }
    this.setState({username})
  }

  onPasswordChange = (password) => {
    this.setState({password})
  }

  onEnterpress = (e) => {
    if (e.charCode == 13) {
      this.sendRequest()
    }
  }

  render() {
    return (
        <div>
            <div class="center">
                {/*<div class="cen2">*/}
                    <h4> LOGIN TO ACCESS YOUR RESTAURANT POS</h4>
                    <br/>
                    <div style={{ display: (this.state.show ? 'block' : 'none'), color: "red" }}>Wrong username or password</div>
                    <UsernameField
                        onChange={this.onUsernameChange}
                        onKeyPress={this.onEnterpress}
                    />
                    <br />
                    <PasswordField
                        onChange={this.onPasswordChange}
                        onKeyPress={this.onEnterpress}
                    />
                    <br />
                <br />

                        <LoginButton onClick={this.sendRequest}/>

                {/*</div>*/}
            </div>
        </div>
    );
  }
}

export default App;
