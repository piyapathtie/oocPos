import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from './AxiosConfiguration'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import {List, ListItem} from 'material-ui/List';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { browserHistory } from 'react-router';

// import './Menu.css';

import Badge from 'material-ui/Badge';
// import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';



// const style = {
//   // top: 20,
//   margin: 12,
//   bottom: 0,
// };
//
//
//
// function getIndex(value, arr) {
//     for(var i = 0; i < arr.length; i++) {
//         if(arr[i] === value) {
//             return i;
//         }
//     }
//     return -1; //to handle the case where the value doesn't exist
// }


class Bar extends React.Component {
  render(){
    return(
      <div>
        <AppBar
          title="Spice House"
          iconElementLeft={
            <IconButton onClick={()=>this.props.history.push('/mainmenu')}>
              <BackIcon/>
            </IconButton>}
          style={{backgroundColor: "#D50000"}}
        />
      </div>
    );
  }
}

class MBar extends React.Component {

  render(){
    return (
      <Route component={Bar} />
    );
  }
}

export default MBar;
