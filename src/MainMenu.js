import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ForTable from 'material-ui/svg-icons/action/account-circle';
import ForKit from 'material-ui/svg-icons/maps/local-dining';
import Fordessertkit from 'material-ui/svg-icons/social/cake';
import ForCashier from 'material-ui/svg-icons/editor/attach-money';
import AddMenu from 'material-ui/svg-icons/content/add-circle-outline';
import Chart from 'material-ui/svg-icons/editor/insert-chart';

// import './App.css';


class MainMenu extends Component {

  render() {
    return (
      <div class="center">
        <h4> PLEASE VERIFY YOUR DEVICE </h4>

        <List>
          <ListItem primaryText="Table" leftIcon={<ForTable />}/>
          <ListItem primaryText="Kitchen" leftIcon={<ForKit />} onClick={()=>this.props.history.push('/kitchen')}/>
          <ListItem primaryText="Dessert Kitchen" leftIcon={<Fordessertkit />}/>
          <ListItem primaryText="Cashier" leftIcon={<ForCashier />}/>
          <ListItem primaryText="Menu Management" leftIcon={<AddMenu />} onClick={()=>this.props.history.push('/manage')}/>
          <ListItem primaryText="Sale Report" leftIcon={<Chart />}/>
        </List>

      </div>
    );
  }
}

export default MainMenu;
