import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ForTable from 'material-ui/svg-icons/action/account-circle';
import ForKit from 'material-ui/svg-icons/maps/local-dining';
import Fordessertkit from 'material-ui/svg-icons/social/cake';
import ForCashier from 'material-ui/svg-icons/editor/attach-money';
import AddMenu from 'material-ui/svg-icons/content/add-circle-outline';
import Chart from 'material-ui/svg-icons/editor/insert-chart';
import authentication from './store.js'
import { Redirect } from 'react-router'
// import './App.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import urlencode from "form-urlencoded";
import axios from "./AxiosConfiguration";


function Bar(onClick) {
    return(
        <AppBar
          title="Main Menu"
          showMenuIconButton={false}
          style={{backgroundColor: "#D50000"}}
          iconElementRight={<LogOutButton onClick={onClick}/>}
        />
  );
}

function LogOutButton(onClick) {
    return(
        <RaisedButton
            label="Log Out"
            primary={true}
            onClick={onClick}
        />
    );
}


class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    sendRequest = () => {
        axios.post("/logout")
            .then((response) => {
                console.log("log out")
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    };

  render() {
      console.log(localStorage.getItem("login"))

    if (localStorage.getItem("login") != "true") {
      return <Redirect to='/'/>;
    }


    return (
      <div>
          <AppBar
              title="Main Menu"
              showMenuIconButton={false}
              style={{backgroundColor: "#D50000"}}
              iconElementRight={<RaisedButton
                  label="Log Out"
                  primary={true}
                  onClick={this.sendRequest}
              />}
          />
        <div class="center">
          <h4> PLEASE VERIFY YOUR DEVICE </h4>
          <List>
            <ListItem primaryText="Table" leftIcon={<ForTable />} onClick={()=>this.props.history.push('/tableNo')}/>
            <ListItem primaryText="Kitchen" leftIcon={<ForKit />} onClick={()=>this.props.history.push('/kitchen')}/>
            <ListItem primaryText="Dessert Kitchen" leftIcon={<Fordessertkit />} onClick={()=>this.props.history.push('/dessertkitchen')}/>
            <ListItem primaryText="Cashier" leftIcon={<ForCashier />} onClick={()=>this.props.history.push('/cashier')}/>
            <ListItem primaryText="Menu Management" leftIcon={<AddMenu />} onClick={()=>this.props.history.push('/manage')}/>
            <ListItem primaryText="Sale Report" leftIcon={<Chart />} onClick={()=>this.props.history.push('/saleReport')}/>
          </List>
        </div>
    </div>
    );
  }
}

export default MainMenu;
