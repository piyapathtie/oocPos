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


function Bar() {
    return(
        <AppBar
          title="Main Menu"
          showMenuIconButton={false}
          style={{backgroundColor: "#D50000"}}
        />
  );
}


class MainMenu extends Component {

  render() {

    // if (!authentication.authen) {
    //   return <Redirect to='/'/>;
    // }

    console.log(authentication)

    return (
      <div>
        <Bar/>
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
