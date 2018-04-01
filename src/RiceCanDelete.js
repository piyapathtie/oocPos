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

        axios.put(`/test/del_menu?id=${this.state.id}`)
            .then((response) => {
                // this.state.menus = response.data
                // console.log(response.data);
                console.log("delete success")
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })

    };

    render(){
        return (
            <div className="recipe">
                <a className="btnStyle4 btnStyle addToCart" id="addToCart" onClick={() =>  this._buttonClick()}>Delete</a>
                <div className="obj" id={this.state.name} >
                    <div> <img src={this.state.img}/> </div>
                    <div> <h4>{this.state.name}</h4> - {this.state.price} </div>
                </div>
            </div>
        )
    }
}

export default class RiceCanDelete extends React.Component {

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