import React, { Component } from 'react';
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
import AppBar from 'material-ui/AppBar';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    // cursor: 'pointer',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    // width: '100%',
    // opacity: 0,
  },
};


function Bar({onClick}) {
    return(
        <AppBar
          title="Add or Delete Menu"
          iconElementLeft={
            <IconButton onClick={onClick}>
              <BackIcon/>
            </IconButton>}
          style={{backgroundColor: "#D50000"}}
        />
    );
}


class Manage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      name: "",
      price: "",
      disable: true,
      file: '',
      imagePreviewUrl: '',
      image: '',
    };
  }

  sendRequest = () => {
    const data = new FormData();
    // const data = {name: this.state.name,
    //   price: this.state.email};
    data.append('name', this.state.name)
    data.append('price', this.state.price)
    data.append('file', this.state.file);
    data.append('kindof', this.state.value);
    console.log(data);
    axios.post("/test/upload", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
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
    if (this.state.name != "" && this.state.price != "") {
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
    if(!isNaN(e.target.value)){
      this.setState({price: e.target.value}, () => this.checkButtonDisable());
    }
  };

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


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
        <Bar onClick={()=>this.props.history.push('/mainmenu')}/>
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
         <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            // style={styles.button}
            containerElement="label"
          >
            <input type="file"
              style={styles.exampleImageInput}
              onChange={(e) => this.handleImageChange(e)}
            />
          </RaisedButton>
          <br />
         <TextField
           style={{marginLeft:"25px"}}
           floatingLabelText="Name"
           value={this.state.name}
           onChange={(e)=> this.updateName(e)}
         />
         <br />
         <TextField
           style={{marginLeft:"25px"}}
           floatingLabelText="Price"
           value={this.state.price}
           onChange={(e)=> this.updatePrice(e)}
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
