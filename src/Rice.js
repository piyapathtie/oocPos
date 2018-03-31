import {Component} from "react";
import React from "react";

import waterfall from 'async/waterfall';
import axios from "./AxiosConfiguration";


class EachMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            price: props.price,
            img: props.image,
            categoryType: props.categoryType,
            id: props.id,
        }

        this.state.item = [
        ]
    }

    _buttonClick = () => {

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
            <div className="recipe">
                <a className="btnStyle3 btnStyle addToCart" id="addToCart" onClick={() =>  this._buttonClick()}>Add to Cart</a>
                <div className="obj" id={this.state.name} >
                    <div> <img src={this.state.img}/> </div>
                    <div> <h4>{this.state.name}</h4> - {this.state.price} </div>
                </div>
            </div>
        )
    }
}

export default class Rice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [],
        };
    }

    componentDidMount() {
        axios.get("test/each_kitchen?categoryType=FOOD")
            .then((response) => {
                // this.state.menus = response.data
                // console.log(response.data);

                this.setState({menus: response.data})
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
                        return (<EachMenu
                            categoryType={menu.categoryType}
                            name={menu.name}
                            price={menu.price}
                            image={"http://192.168.1.174:8080/test/image/" + menu.filepath}
                            id={menu.id}
                        />)
                    })}
                </div>
            </div>

        );
    }
}