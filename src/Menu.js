import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import AppBar from 'material-ui/AppBar';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import CartIcon from "material-ui/svg-icons/action/shopping-cart"
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import axios from "./AxiosConfiguration";
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
    button:{
      position: "absolute",
        bottom: 0,
    },
};


function Bar({onClickLeft, onClickRight}) {
    return(
        <AppBar
          title="Menu"
          iconElementRight={
            <IconButton>
              <CartIcon/>
            </IconButton>}
          style={{backgroundColor: "#D50000"}}
          onLeftIconButtonClick={onClickLeft}
          onRightIconButtonClick={onClickRight}
        />
    );
}

function DrawerRight(){
  return(
      <AppBar title="Cart"
              // onClick={this.handleClose}
            // iconElementLeft={<IconButton/>}
              showMenuIconButton={false}
              style={{backgroundColor: "#D50000", textAlign: "center",}}/>
  );
}

function ButtonCart(){
    return(
        <RaisedButton
            label="Order"
            // disabled={data.length === 0}
            secondary={true}
            style = {styles.button}
            // style={{margin: 12, bottom: 0}}
            // labelStyle={{top: "15px", fontSize: "18px"}}
            fullWidth={true}
            // style={{minWidth: "100%", height: "50px",}}
        />
    );
}


export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        slideIndex: 0,
        openRight: false,
        openLeft: false,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  componentDidMount() {
      // axios.get("/test/image/BAKEDMUSSELSINBUTTERWITHGARLIC.jpg")
      //     .then((response) => {
      //         var imageName = require(response)
      //         console.log(response);
      //     })
      //     .catch((error) => {
      //         console.log(error)
      //     })
  }



  handleRightToggle = () => {
    this.setState({openRight: !this.state.openRight})
  }

  handleLeftToggle = () =>{
      this.setState({openLeft: !this.state.openLeft})
  }


  render() {
    return (
      <div>
          <div style={{position: "fixed", width:'100%', zIndex: 10000, backgroundColor: 'black'}}>
              <Bar
                onClickLeft={this.handleLeftToggle}
                onClickRight={this.handleRightToggle}
              />
              <Drawer
                  docked={false}
                  width={250}
                  open={this.state.openLeft}
                  onRequestChange={(openLeft) => this.setState({openLeft})}
              />
              <Drawer
                  docked={false}
                  // width={250}
                  openSecondary={true}
                  open={this.state.openRight}
                  onRequestChange={(openRight) => this.setState({openRight})}
              >
                  <DrawerRight/>
                  <ButtonCart/>
              </Drawer>
          </div>

          {/*<img src ="http://192.168.1.174:8080/test/image/BAKEDMUSSELSINBUTTERWITHGARLIC.jpg" />*/}

      </div>
    );
  }
}
