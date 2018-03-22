import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import MainMenu from "./MainMenu";
import Manage from "./Manage";
import Kitchen from "./Kitchen";
import tableNo from "./TableNo"
import Dessert from "./Dessert"
import Cashier from "./Cashier"
import SaleReport from "./SaleReport"
import Menu from "./Menu"


function Path(){
  return (
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router>
          <div>
            <Route path="/" exact component={App}/>
            <Route path="/mainmenu" exact component={MainMenu} />
            <Route path="/manage" exact component={Manage} />
            <Route path="/kitchen" exact component={Kitchen} />
            <Route path="/tableNo" exact component={tableNo} />
            <Route path="/dessert" exact component={Dessert} />
            <Route path="/cashier" exact component={Cashier} />
            <Route path="/saleReport" exact component={SaleReport} />
            <Route path="/menu" exact component={Menu} />
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

ReactDOM.render(
  <Path />,
  document.getElementById('root'));
registerServiceWorker();
