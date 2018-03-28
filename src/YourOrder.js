import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import axios from './AxiosConfiguration';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


function Bar({onClickLeft}) {
    return(
        <AppBar
            title="Your Order"
            style={{backgroundColor: "#D50000"}}
            onLeftIconButtonClick={onClickLeft}
        />
    );
}



class YourOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openLeft: false,
            showCheckboxes: false,
            secondsElapsed: 0,
            open: false,
            sum: 0,
            openthank: false,
            opencancel: false,
            recId: String(localStorage.getItem("BillID")),
            data: [],
            order: [],
            openDialog: false,
        }
        this.tick  = this.tick.bind(this)
    }


    handleOpenDialog = () => {
        this.setState({openDialog: true});
    };

    handleCloseDialog = () => {
        this.setState({openDialog: false});
    };



    tick = () => {
        // console.log("tick")
        // this.fetchData(String(localStorage.getItem("tableID")))
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
        this.fetchData(this.state.recId);
    }

    componentDidMount = () => {
        this.fetchData(this.state.recId);
        this.interval = setInterval(this.tick, 5000);
    }

    componentWillUnmount = () =>{
        clearInterval(this.interval);
    }

    fetchData = (recId) => {
        // console.log("fetch")

        axios.get(`/each_table?recId=${recId}`)
            .then((response) => {
                // console.log(response.data[0].menu.name)
                this.setState({data: response.data})
                // console.log(this.state.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    checkout = (recid) => {
        this.handleOpenDialog()
        console.log("click")
        axios.get(`checkout?id=${recid}`)
            .then((response) => {
                this.setState({order: response.data})
                console.log(response)
                // this.setState({sum: response.data})
                // console.log("try", response.data)
                // console.log(this.state.sum)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    addCashier = (table_id) => {
        this.handleClose()
        this.handleOpenthank()
        axios.post(`/check_out_1/${String(table_id)}`)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    finish = (table_id) => {
        this.handleClosethank()
        this.props.history.push('/main')

    }


    remove = (uuid) => {
        axios.put(`/check_cancel?id=${uuid}`)
            .then((response) => {
                console.log(response.data)
                if(response.data === false){
                    this.handleOpencancel()
                }
                else{
                    this.forceUpdate()
                }
                // this.fetchData(String(localStorage.getItem("tableID")));
                // console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    // handleOpenthank = () => {
    //     this.setState({openthank: true});
    // };
    //
    // handleClosethank = () => {
    //     this.setState({openthank: false});
    // };
    //
    // handleOpencancel = () => {
    //     this.setState({opencancel: true});
    // };
    //
    // handleClosecancel = () => {
    //     this.setState({opencancel: false});
    // };

    handleLeftToggle = () =>{
        this.setState({openLeft: !this.state.openLeft})
    }

    render() {

        const {data, showCheckboxes, sum, order} = this.state
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseDialog}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onClick={this.handleCloseDialog}
            />,
        ];


        return (
            <div>
                <Bar onClickLeft={this.handleLeftToggle}/>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.openLeft}
                    onRequestChange={(openLeft) => this.setState({openLeft})}
                >
                    <MenuItem onClick={()=>this.props.history.push('/menu')}>Menu</MenuItem>
                    <MenuItem onClick={() => this.props.history.push('/yourorder')}>Your Order</MenuItem>
                </Drawer>

                <Table
                    // style={{ marginTop: "70px"}}
                >
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>

                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Cancellation</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={showCheckboxes} style={{ marginTop: "10px"}}>

                        {data.map((each) => {
                            return(

                                <TableRow key={each.UUID}>
                                    {/* <TableRowColumn>{each.id}</TableRowColumn> */}
                                    <TableRowColumn>{each.menu.name}</TableRowColumn>
                                    <TableRowColumn>{each.currentStatus}</TableRowColumn>
                                    <TableRowColumn>

                                        <IconButton disabled={!(each.currentStatus === "Waiting")} onClick={() => this.remove(each.id)}>
                                            <Cancel />
                                        </IconButton>

                                        {/* <IconButton iconClassName='material-ui/svg-icons/navigation/cancel' onClick={() => this.remove(each.UUID)} />  */}
                                    </TableRowColumn>
                                </TableRow>

                            )
                        })
                        }

                    </TableBody>
                </Table>

                <RaisedButton
                    label="Check Out"
                    secondary={true}
                    fullWidth={true}
                    onClick={()=>this.checkout(localStorage.getItem("BillID"))}
                />

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
        );
    }
}

export default YourOrder;