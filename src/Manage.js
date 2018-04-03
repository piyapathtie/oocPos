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
import AddIcon from "material-ui/svg-icons/content/add-circle"

import RiceCanDelete from './RiceCanDelete'
import DessertCanDelete from './DessertCanDelete'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

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
  // errorStyle: {
  //   color: orange500,
  // },
  underlineStyle: {
    borderColor: "#E53935",
  },
  floatingLabelStyle: {
    color: "#E53935",
  },
  floatingLabelFocusStyle: {
    color: "#E53935",
  },
};



function Bar({onClick2, onClick3}) {
    return(
        <AppBar
          title="Add or Delete Menu"
          iconElementLeft={
            <IconButton onClick={onClick2}>
              <BackIcon/>
            </IconButton>}
          iconElementRight={
            <IconButton
                tooltip="Add Menu"
                onClick={onClick3}>
              <AddIcon/>
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
      open: false,
    };
  }

    componentDidMount() {
        axios.get(`/user/whoami`)
            .then((response) => {
                console.log("this is check")
                console.log(response.data);
                if(response.data !== "manager"){
                    this.props.history.push('/mainmenu')
                }
            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/')
            })
    }

  sendRequest = () => {
      // console.log(this.state.value)
    const data = new FormData();
    // const data = {name: this.state.name,
    //   price: this.state.email};
    data.append('name', this.state.name);
    data.append('price', this.state.price);
    data.append('file', this.state.file);
    if(this.state.value === 1){
        data.append('categoryType', "FOOD");
    }
    else{
        data.append('categoryType', "DESSERT");
    }

    // console.log(data);
    axios.post("/test/upload", data)
      .then((response) => {
        this.setState({open: false});
        this.setState({value: 1});
        this.setState({name: ""});
        this.setState({price: ""});
        this.setState({file: ""});
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
  };


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  checkButtonDisable = () => {
    if (this.state.name != "" && this.state.price != "" && this.state.file != "") {
      this.setState({disable: false})
    }
    else{
      this.setState({disable: true})
    }
  };


  updateName = (e) => {
    this.setState({name: e.target.value}, () => this.checkButtonDisable());
  };


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
        imagePreviewUrl: reader.result}, () => this.checkButtonDisable());
    };

    reader.readAsDataURL(file)
  };

    handleChangeTab = (value) => {
        this.setState({
            slideIndex: value,
        });
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
          <div style={{position: "fixed", width:'100%', zIndex: 10000,}}>
              <Bar onClick2={()=>this.props.history.push('/mainmenu')}
                   onClick3={this.handleOpen}
              />

          </div>

        <Dialog
          title="Create Menu"
          modal={true}
          open={this.state.open}
          actions={actions}
          titleStyle={{backgroundColor:"#D50000", color:"white"}}
          contentStyle={{ width: '30%',}}
        >
         <br />
            <input type="file"
              style={{marginLeft:"20px"}}
              // style={styles.exampleImageInput}
              onChange={(e) => this.handleImageChange(e)}
            />
          {/* </RaisedButton> */}
          <br />
         <TextField
           style={{marginLeft:"20px"}}
           floatingLabelText="Name"
           value={this.state.name}
           onChange={(e)=> this.updateName(e)}
           underlineFocusStyle={styles.underlineStyle}
           floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
         />
         <br />
         <TextField
           style={{marginLeft:"20px"}}
           floatingLabelText="Price"
           value={this.state.price}
           onChange={(e)=> this.updatePrice(e)}
           underlineFocusStyle={styles.underlineStyle}
           floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
         />
         <br />
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="Food" />
                <MenuItem value={2} primaryText="Dessert" />
            </DropDownMenu>
       </Dialog>

          <RiceCanDelete/>
          <DessertCanDelete/>

      </div>
    );
  }
}


export default Manage;
