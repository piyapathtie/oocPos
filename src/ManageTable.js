import React from 'react';
import axios from './AxiosConfiguration'
import IconButton from 'material-ui/IconButton';
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import Drawer from 'material-ui/Drawer';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton';

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
            title="Manage Table"
            iconElementLeft={
                <IconButton onClick={onClick}>
                    <BackIcon/>
                </IconButton>}
            style={{backgroundColor: "#D50000"}}
        />
    );
}


class ManageTable extends React.Component {
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
        axios.get(`/user/whoami`)
            .then((response) => {
                console.log("this is check")
                console.log(response.data);
                if(response.data === "table"){
                    this.props.history.push('/menu')
                }
            })
            .catch((error) => {
                console.log(error)
                this.props.history.push('/')
            });

        this.fetch();
        this.interval = setInterval(this.tick, 50000);
    }

    fetch = () => {
        axios.get("/demo//all_table_true")
            .then((response) => {
                this.setState({tables: response.data})
                console.log(this.state.tables)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    logOut = (tableNum) => {
        axios.put(`/demo/table_logout?table_num=${tableNum}`)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    };


    render(){

        const {tables} = this.state

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
                                    title={"Table: " + each.tableNumber}
                                />
                                <CardActions>
                                    <FlatButton label="Log Out" onClick={()=>this.logOut(each.tableNumber)}/>
                                </CardActions>
                            </Card>
                        )
                    })
                    }


                </div>

            </div>
        )
    }
}

export default ManageTable;
