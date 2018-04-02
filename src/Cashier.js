import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Drawer from 'material-ui/Drawer';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton';

import Badge from 'material-ui/Badge';
import AddMenu from 'material-ui/svg-icons/content/add-circle-outline';
import MoneyIcon from 'material-ui/svg-icons/editor/monetization-on';


import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


function Bar({onClick}) {
    return(
        <AppBar
          title="Cashier"
          iconElementLeft={
            <IconButton onClick={onClick}>
              <BackIcon/>
            </IconButton>}
          style={{backgroundColor: "#D50000"}}
        />
    );
}


class Cashier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            openDialog: false,
            order: [],
            showCheckboxes: false,
            recid: 0,
        };
        this.tick  = this.tick.bind(this)
    }

    tick = () => {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
        this.fetch();
    }

    componentDidMount() {
        this.fetch();
        this.interval = setInterval(this.tick, 5000);
    }

    fetch = () => {
        axios.get("/demo/show_cashier")
            .then((response) => {
                this.setState({tables: response.data})
                console.log(this.state.tables)
            })
            .catch((error) => {
                console.log(error)
            })
    };


    checkOut = (recid) =>{
        axios.get(`checkout?id=${recid}`)
            .then((response) => {
                this.setState({order: response.data})
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    setPaid = (recid) =>{
        axios.post(`/setStatus?id=${recid}`)
            .then((response) => {
                console.log(response)
                this.handleCloseDialog();
            })
            .catch((error) => {
                console.log(error)
            })
    };

    handleOpenDialog = (recid) => {
        this.setState({openDialog: true});
        this.setState({recid: recid})
        this.checkOut(localStorage.getItem("BillID"));
    };

    handleCloseDialog = () => {
        this.setState({openDialog: false});
    };

  render(){

      const {tables, showCheckboxes, sum, order} = this.state

      const actions = [
          <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleCloseDialog}
          />,
          <FlatButton
              label="Confirm Paid"
              primary={true}
              // keyboardFocused={true}
              onClick={()=>this.setPaid(this.state.recid)}
          />,
      ];


    return (
      <div >

        <Bar onClick={()=>this.props.history.push('/mainmenu')}/>


          <div style={{marginTop: "100px",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
          }}>
          {tables.map((each) => {
              return(
                  <Card className="recipe-menu">
                      <CardHeader
                          title={"#" + each.tablenum}
                          subtitle={"Bill: " + each.id}
                      />
                      <CardActions>
                          <FlatButton label="Check Out" onClick={()=>this.handleOpenDialog(each.id)}/>
                          <IconButton disabled={!("pending" === each.status)}>
                              <MoneyIcon
                                  color={"green"}
                                  viewBox={'0 0 24 24'}
                              />
                          </IconButton>
                      </CardActions>
                  </Card>
              )
          })
          }

              <Card className="recipe-menu">
                  <CardHeader
                      title={"Take away"}
                      subtitle="Bill: "
                  />
                  <CardActions>
                      <FlatButton label="Action1" />
                      <IconButton >
                          <MoneyIcon color={"green"} viewBox={'0 0 24 24'}/>
                      </IconButton>
                  </CardActions>
              </Card>

          </div>

          <Dialog
              title="Your Order"
              actions={actions}
              modal={false}
              open={this.state.openDialog}
              // onRequestClose={this.handleCloseDialog}
              autoScrollBodyContent={true}
          >
              <Table
                  // style={{ marginTop: "70px"}}
              >
                  <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                      <TableRow>
                          <TableHeaderColumn>Name</TableHeaderColumn>
                          <TableHeaderColumn>Amount</TableHeaderColumn>
                          <TableHeaderColumn>Price</TableHeaderColumn>
                      </TableRow>
                  </TableHeader>

                  <TableBody
                      displayRowCheckbox={showCheckboxes}
                  >

                      {order.map((each) => {
                          return(
                              <TableRow>
                                  <TableRowColumn>{each.name}</TableRowColumn>
                                  <TableRowColumn>{each.amount}</TableRowColumn>
                                  <TableRowColumn>{each.price}</TableRowColumn>
                              </TableRow>
                          )
                      })
                      }
                  </TableBody>
              </Table>

          </Dialog>

      </div>
    )
  }
}

export default Cashier;
