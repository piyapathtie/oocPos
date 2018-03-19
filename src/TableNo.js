import React from 'react';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import axios from './AxiosConfiguration'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import IconButton from 'material-ui/IconButton';


function Bar({onClick}) {
    return(
        <AppBar
          title="Table No"
          iconElementLeft={
            <IconButton onClick={onClick}>
              <BackIcon/>
            </IconButton>}
          style={{backgroundColor: "#D50000"}}
        />
    );
}


class tableNo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      input: "",
      checkfrombn: true,
      disable: true,
      show: false,
    }
  }

  checkexistedtable = (table_id) => {
    axios.get(`/check_id/${String(table_id)}`)
      .then((response) => {
        this.setState({checkfrombn: response.data})
      }).then(()=>{

        if(this.state.checkfrombn === false){
          this.setState({show: true})
        }

        else{
          localStorage.setItem("tableID", parseInt(this.state.input))
          // this.props.history.push('/main')
          localStorage.setItem('toCart', JSON.stringify([]))
        }

      })
      .catch((error) => {
        console.log(error)
      })
  }

  onButtonClick(){
    this.checkexistedtable(parseInt(this.state.input))
  }

  handleTest(e) {
        if (e.charCode == 13) {
          // console.log('Enter... (KeyPress, use charCode)');
          this.onButtonClick()
        }
  }

  checkButtonDisable = () => {
    if (this.state.input != "") {
      this.setState({disable: false})
    }
    else{
      this.setState({disable: true})
    }
  }

  onNumberType = (e) => {
    if(!isNaN(e.target.value)){
      this.setState({input: e.target.value}, () => this.checkButtonDisable());
    }
  }


  render(){

    return(
      <div>
        <Bar onClick={()=>this.props.history.push('/mainmenu')}/>
        <div class="center">
          <h4> ENTER TABLE NO </h4>
          <div style={{ display: (this.state.show ? 'block' : 'none'), color: "red" }}>This number is already used</div>
          <TextField
            floatingLabelText="Enter table no"
            value={this.state.input}
            onChange={(e) => this.onNumberType(e)}
            onKeyPress ={(e)=> this.handleTest(e)}
          />

          <br/>
            <div class="right">
              <RaisedButton label="Enter"
                secondary={true}
                disabled={this.state.disable}
                onClick={()=> this.onButtonClick()} />
            </div>
        </div>
    </div>
    )
  }
}

export default tableNo;