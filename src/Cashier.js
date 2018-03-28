import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Drawer from 'material-ui/Drawer';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton';



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
        };
    }

    componentDidMount() {
        axios.get("/demo/get_table_2")
            .then((response) => {
                this.setState({tables: response.data})
                console.log(this.state.tables)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    checkOut = (recid) =>{
        axios.get(`checkout?id=${recid}`)
            .then((response) => {
                this.setState({order: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    handleOpenDialog = () => {
        this.setState({openDialog: true});
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
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCloseDialog}
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
                          <FlatButton label="Check Out" onClick={()=>this.handleOpenDialog()}/>
                          <FlatButton label="Action2" />
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
                      <FlatButton label="Action2" />
                  </CardActions>
              </Card>

              <Card className="recipe-menu">
                  <CardHeader
                      title={"Take away"}
                      subtitle="Bill: "
                  />
                  <CardActions>
                      <FlatButton label="Action1" />
                      <FlatButton label="Action2" />
                  </CardActions>
              </Card>

              <Card className="recipe-menu">
                  <CardHeader
                      title={"Take away"}
                      subtitle="Bill: "
                      // actAsExpander={true}
                      // showExpandableButton={true}
                  />
                  <CardActions>
                      <FlatButton label="Action1" />
                      <FlatButton label="Action2" />
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
