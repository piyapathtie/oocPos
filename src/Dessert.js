import {Component} from "react";
import React from "react";

import waterfall from 'async/waterfall';
import axios from "./AxiosConfiguration";
import config from './config'
import Snackbar from 'material-ui/Snackbar';

class EachMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            price: props.price,
            img: props.image,
            categoryType: props.categoryType,
            id: props.id,
            open: false,
        }

        this.state.item = [
        ]
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    _buttonClick = () => {

        this.setState({open: true})

        // Dont do this style!!
        const {categoryType, name, price, id} = this.state;
        waterfall([
            function(callback) {

                callback(null, localStorage.getItem("Cart"));

            },
            function(items, callback) {
                // console.log(items === null)
                if (items === null) {
                    var arr = []
                    callback(null, arr)
                }else {
                    callback(null, JSON.parse(items))
                }
            },
            function(data, callback) {
                data.push({categoryType: categoryType,
                    name: name,
                    price: price,
                    // id: parseInt(localStorage.getItem("tableID")),
                    // status: "Waiting",
                    id: id,
                });
                callback(null, data);
            },
            function(data, callback) {
                console.log(data)
                console.log(JSON.stringify(data))
                localStorage.setItem("Cart", JSON.stringify(data))
                callback(null, true);
            }
        ], function (err, result) {
        });

    }

    render(){
        return (
            <div>
            <div className="recipe">
                <a className="btnStyle3 btnStyle addToCart" id="addToCart" onClick={() =>  this._buttonClick()}>Add to Cart</a>
                <div style={{backgroundColor: "white", padding: "10px", borderRadius: "10px"}}
                     id={this.state.name} >
                    <div> <img src={this.state.img}/> </div>
                    <div> <h4>{this.state.name}</h4> - {this.state.price} </div>
                </div>
            </div>
                <Snackbar
                    open={this.state.open}
                    message="Your order is added to cart"
                    autoHideDuration={1500}
                    onRequestClose={this.handleRequestClose}
                />
                </div>
        )
    }
}


function MenuCard({menu, ...props}){
    return (<EachMenu
        categoryType={menu.categoryType}
        name={menu.name}
        price={menu.price}
        image={config.imagePath + menu.filepath}
        id={menu.id}
        {...props}
    />)
}

export default class Dessert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [],
        };
    }

    componentDidMount() {
        axios.get("test/each_kitchen?categoryType=DESSERT")
            .then((response) => {
                // this.state.menus = response.data
                this.setState({menus: response.data})
                // console.log(response.data);
                console.log(this.state.menus)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render(){
        return(
            <div className="body-content">
                <div className="recipe-menu">
                    {this.state.menus.map((menu) => {
                        return (<MenuCard menu={menu} key={menu.id}/>)
                    })}
                </div>
            </div>

        );
    }
}