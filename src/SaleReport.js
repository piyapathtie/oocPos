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
        axios.get(`/user/whoami`)
            .then((response) => {
                console.log("this is check")
                console.log(response.data);
                if(response.data !== "manager"){
                    this.props.history.push('/mainmenu')
                }
            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/')
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
        var dayy = "";
        var month = "";

        console.log(date.toLocaleDateString().split("/")[0].length)
        if(date.toLocaleDateString().split("/")[0].length == 1){
            dayy = 0 + date.toLocaleDateString().split("/")[0]
        }
        else{
            dayy =  date.toLocaleDateString().split("/")[0]
        }

        if(date.toLocaleDateString().split("/")[1].length == 1){
            month = 0 + date.toLocaleDateString().split("/")[1]
        }

        else{
            month = date.toLocaleDateString().split("/")[1]
        }

        this.requestForEachDay(dayy + "/" + month + "/" + date.toLocaleDateString().split("/")[2])

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
