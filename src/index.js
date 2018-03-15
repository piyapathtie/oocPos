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
