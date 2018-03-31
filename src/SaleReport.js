import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';


import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

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
          title="Sale Report"
          iconElementLeft={
            <IconButton onClick={onClick}>
              <BackIcon/>
            </IconButton>}
          style={{backgroundColor: "#D50000"}}
        />
    );
}


let DateTimeFormat;


class SaleReport extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            dates: [],
            secondsElapsed: 0,
            report:[],
            controlledDate: null,
            dateToSend: null,
        }
    }

    componentDidMount() {
        axios.get("/allRecord")
            .then((response) => {
                // this.state.menus = response.data
                // console.log(response.data);
                console.log(response)
                this.setState({dates: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    requestForEachDay = (date) => {
        console.log(date)
        const data = new FormData();
        data.append('date', date);
        axios.post("/getRecord", data)
            .then((response) => {
                console.log(response);
                this.setState({report: response.data})
                // this.forceUpdate()
            })
            .catch((error) => {
                console.log(error)
            })
    };

    handleChange = (event, date) => {
        // console.log(new Date())
        // console.log(date)
        console.log(date.toLocaleDateString().split("/")[0].length)
        if(date.toLocaleDateString().split("/")[0].length == 1){
            this.setState({
                controlledDate: date,
                dateToSend: 0+date.toLocaleDateString()
            }, ()=> this.requestForEachDay(this.state.dateToSend));
        }
        else{
            this.setState({
                controlledDate: date,
                dateToSend: date.toLocaleDateString()
            }, ()=> this.requestForEachDay(this.state.dateToSend));
        }

    };

  render(){

      const {dates, showCheckboxes, report} = this.state

    return (
      <div >
        <Bar onClick={()=>this.props.history.push('/mainmenu')}/>

          <DatePicker
              hintText="Select Date"
              mode="landscape"
              value={this.state.controlledDate}
              onChange={this.handleChange}
              textFieldStyle={{backgroundColor: "white",}}
              fullWidth={true}
          />

          <Table>
              <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                  <TableRow>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Amount</TableHeaderColumn>
                      <TableHeaderColumn>Total</TableHeaderColumn>
                  </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={showCheckboxes}>

                  {report.map((each) => {
                      return(
                          <TableRow>
                              <TableRowColumn>{each.name}</TableRowColumn>
                              <TableRowColumn>{each.amount}</TableRowColumn>
                              <TableRowColumn>{each.price}</TableRowColumn>
                              {/*<TableRowColumn> <RaisedButton onClick={() => this.requestForEachDay(each)}/> </TableRowColumn>*/}
                          </TableRow>
                      )
                  })
                  }

              </TableBody>
          </Table>
      </div>
    )
  }
}

export default SaleReport;
