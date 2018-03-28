import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"


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


class SaleReport extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showCheckboxes: false,
            dates: [],
            secondsElapsed: 0,
        }
    }

    componentDidMount() {
        axios.get("/user/allRecord")
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

  render(){

      const {dates, showCheckboxes} = this.state

    return (
      <div >
        <Bar onClick={()=>this.props.history.push('/mainmenu')}/>


          <Table style ={{top: "100px"}}>
              <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                  <TableRow>
                      <TableHeaderColumn>Dates</TableHeaderColumn>
                      {/*<TableHeaderColumn>Name</TableHeaderColumn>*/}
                      {/*<TableHeaderColumn>Button</TableHeaderColumn>*/}
                      {/*<TableHeaderColumn>Status</TableHeaderColumn>*/}
                  </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={showCheckboxes}>

                  {dates.map((each) => {
                      return(
                          // console.log(each)

                          <TableRow key={each.UUID}>
                              <TableRowColumn>{each.data}</TableRowColumn>
                              {/*<TableRowColumn>{each}</TableRowColumn>*/}
                              {/*<TableRowColumn>*/}
                                  {/*/!* {<DropDownMenuOpenImmediateExample />} *!/*/}
                                  {/*<MenuItem  primaryText="Waiting" onClick={() => this.updateItemStatus(each.key.id, "Waiting")}/>*/}
                                  {/*<MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>*/}
                                  {/*<MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>*/}
                              {/*</TableRowColumn>*/}
                              {/*<TableRowColumn>{each.key.currentStatus}</TableRowColumn>*/}
                              {/* <TableRowColumn> <RaisedButton onClick={() => console.log(each)}/> </TableRowColumn> */}
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
