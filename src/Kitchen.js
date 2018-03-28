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
          title="Kitchen"
          iconElementLeft={
            <IconButton onClick={onClick}>
              <BackIcon/>
            </IconButton>}
          style={{backgroundColor: "#D50000"}}
        />
    );
}


class Kitchen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCheckboxes: false,
      data: [],
      secondsElapsed: 0,
    }
    this.tick  = this.tick.bind(this)
  }

  tick = () => {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData()
    // this.tick()
    this.interval = setInterval(this.fetchData, 5000);
  }

  componentWillUnmount = () =>{
    clearInterval(this.interval);
  }

  updateItemStatus = (id, status) => {
    axios.put(`/update_by_kitchen?id=${id}&currentStatus=${status}`)
      .then((response) => {
        this.fetchData()
        // console.log(response.data);
        // console.log("update complete")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  fetchData = () => {
    console.log("fetch")
    axios.get("/each_kitchen?categoryType=FOOD&status=Done")
      .then((response) => {
        // console.log(isNaN(response.data[0].id))
        this.setState({data: response.data})
          console.log(this.state.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render(){
    const {data, showCheckboxes} = this.state
    return (
      <div >

        <Bar onClick={()=>this.props.history.push('/mainmenu')}/>

        <Table style ={{top: "100px"}}>
          <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

          <TableRow>
            <TableHeaderColumn>Table Number</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Button</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>

          <TableBody displayRowCheckbox={showCheckboxes}>

        {data.map((each) => {
          return(

            <TableRow key={each.UUID}>
              <TableRowColumn>{each.value}</TableRowColumn>
              <TableRowColumn>{each.key.menu.name}</TableRowColumn>
              <TableRowColumn>
                {/* {<DropDownMenuOpenImmediateExample />} */}
                <MenuItem  primaryText="Waiting" onClick={() => this.updateItemStatus(each.key.id, "Waiting")}/>
                <MenuItem  primaryText="Cooking" onClick={() => this.updateItemStatus(each.key.id, "Cooking")}/>
                <MenuItem  primaryText="Done" onClick={() => this.updateItemStatus(each.key.id, "Done")}/>
              </TableRowColumn>
              <TableRowColumn>{each.key.currentStatus}</TableRowColumn>
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

export default Kitchen;
