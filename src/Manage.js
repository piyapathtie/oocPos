import React, { Component } from 'react';
import MBar from './ManageBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './Menu.css';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CloseIcon from "material-ui/svg-icons/navigation/close"
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import axios from './AxiosConfiguration';

const CardExampleWithAvatar = () => (
  <Card>
    {/* <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      // avatar="images/jsa-128.jpg"
    /> */}
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="/img/loginbg.jpg" alt="" />
    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      {/* <FlatButton label="Action2" /> */}
    </CardActions>
  </Card>
);


class Manage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      name: "",
      email: "",
      disable: true,
      // value: 1,
    };
  }

  sendRequest = () => {
    const data = {name: this.state.name,
      email: this.state.email};
      console.log(this.state.value);
    // axios.post("/demo/order", data)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  checkButtonDisable = () => {
    if (this.state.name != "" && this.state.email != "") {
      this.setState({disable: false})
    }
    else{
      this.setState({disable: true})
    }
  }


  updateName = (e) => {
    this.setState({name: e.target.value}, () => this.checkButtonDisable());
  }


  updatePrice = (e) => {
    this.setState({email: e.target.value}, () => this.checkButtonDisable());
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        backgroundColor="#F44336"
        onClick={this.handleClose}
        style={{float:"left"}}
      />,
      <FlatButton
        label="Save"
        backgroundColor="#8BC34A"
        disabled={this.state.disable}
        onClick={()=> this.sendRequest()}
      />,
    ];
    return (
      <div>
        <MBar/>
        <RaisedButton label="Add Menu" onClick={this.handleOpen}/>
        <Dialog
          title="Create Menu"
          modal={true}
          open={this.state.open}
          actions={actions}
          titleStyle={{backgroundColor:"#D50000", color:"white"}}
       >
         <Paper style={{height:200, width:200, marginTop:"10px", marginLeft:"23px"}} zDepth={1} />
         <br />
         <TextField
           style={{marginLeft:"25px"}}
           floatingLabelText="Name"
           value={this.state.name}
           onChange={(e)=> {this.updateName(e)}}
         />
         <br />
         <TextField
           style={{marginLeft:"25px"}}
           floatingLabelText="Price"
           value={this.state.email}
           onChange={(e)=> {this.updatePrice(e)}}
         />
         <br />
         <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Food" />
          <MenuItem value={2} primaryText="Dessert" />
        </DropDownMenu>
       </Dialog>
      </div>
    );
  }
}


export default Manage;
