import React, {Component} from 'react';
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
import MenuItem from 'material-ui/MenuItem';

import Rice from './Rice'
import Dessert from './Dessert'

import {List, ListItem} from 'material-ui/List';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



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
          style={{backgroundColor: "#d50000"}}
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

function ButtonCart(check){
    return(
        <RaisedButton
            label="Order"
            // disabled={check}
            secondary={true}
            style = {styles.button}
            // style={{margin: 12, bottom: 0}}
            // labelStyle={{top: "15px", fontSize: "18px"}}
            fullWidth={true}
            // style={{minWidth: "100%", height: "50px",}}
        />
    );
}


function getIndex(value, arr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}



export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        slideIndex: 0,
        openRight: false,
        openLeft: false,
        menus: [],
        openDialog: false,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

    componentDidMount() {
        if(localStorage.getItem("BillID") == 0){
            this.handleOpen()
        }
        axios.get(`/user/whoami`)
            .then((response) => {
                console.log("this is check")
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/')
            })
    }


  update = (data, elt) => {
      data.splice(getIndex(elt, data),1)
      localStorage.setItem("Cart", JSON.stringify(data))
      this.forceUpdate()
  }


  handleRightToggle = () => {
    this.setState({openRight: !this.state.openRight})
  }

  handleLeftToggle = () =>{
      this.setState({openLeft: !this.state.openLeft})
  }

    handleOpen = () => {
        this.setState({openDialog: true});
    };

    openBill = () => {
        var data = {
            tablenum: JSON.parse(localStorage.getItem("tableID")),
            status: "unpaid"
        }
        console.log(data)
        axios.post(`/start_process`, data)
            .then((response) => {
                localStorage.setItem('BillID', response.data);
                console.log(response)

            })
            .catch((error) => {
                console.log(error)
            })
        this.setState({openDialog: false});
    };

    sendOrder = () =>{

        var cart = JSON.parse(localStorage.getItem("Cart"))
        console.log(cart)
        axios.post(`/order_to_kitchen?tablenum=${localStorage.getItem("tableID")}`, cart)
            .then((response) => {
                console.log(response)
                this.props.history.push('/yourorder')
                localStorage.setItem('Cart', JSON.stringify([]))
            })
            .catch((error) => {
                console.log(error)
            })
    }


  render() {

      let data = JSON.parse(localStorage.getItem('Cart'));
      data = data == null ? [] : data;

      const actions = [
          <FlatButton
              label="Continue"
              primary={true}
              onClick={this.openBill}
          />,
      ];

    return (
      <div>
          <div style={{position: "fixed", width:'100%', zIndex: 10000,
              // backgroundColor: 'black'
          }}>
              <Bar
                onClickLeft={this.handleLeftToggle}
                onClickRight={this.handleRightToggle}
              />
              <Tabs
                  onChange={this.handleChange}
                  value={this.state.slideIndex}
                  inkBarStyle={{backgroundColor: "#77b26b"}}
              >
                  <Tab label="Food" value={0}
                       style={{backgroundColor: "#e53935"}}
                      />
                  <Tab label="Dessert" value={1}
                       style={{backgroundColor: "#e53935"}}
                  />
              </Tabs>

              <Drawer
                  docked={false}
                  width={250}
                  open={this.state.openLeft}
                  onRequestChange={(openLeft) => this.setState({openLeft})}
              >
                  <MenuItem onClick={()=>this.props.history.push('/menu')}>Menu</MenuItem>
                  <MenuItem onClick={() => this.props.history.push('/yourorder')}>Your Order</MenuItem>
              </Drawer>
              <Drawer
                  docked={false}
                  // width={250}
                  openSecondary={true}
                  open={this.state.openRight}
                  onRequestChange={(openRight) => this.setState({openRight})}
              >
                  <DrawerRight/>

                  <List style={{height: "696px", overflow: "scroll"}}>

                      {data.map((each) => {
                          return(
                              <ListItem
                                  // onClick={() => console.log(getIndex(each, data))}
                                  primaryText = {each.name}
                                  secondaryText = {each.price}
                                  rightIconButton={<Cancel onClick={() => this.update(data, each)} />}
                              />
                          )
                      })
                      }
                  </List>
                  <RaisedButton
                      label="Order"
                      disabled={data.length === 0}
                      secondary={true}
                      style = {styles.button}
                      fullWidth={true}
                      onClick={this.sendOrder}
                  />
              </Drawer>
          </div>

          <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
          >
              <div style={styles.slide}>
                  <Rice/>
              </div>
              <div style={styles.slide}>
                  <Dessert/>
              </div>
          </SwipeableViews>


          <Dialog
              title="Welcome to Spice House"
              actions={actions}
              modal={true}
              open={this.state.openDialog}
          >
              Click continue to select your favorite dishes
          </Dialog>

      </div>
    );
  }
}
