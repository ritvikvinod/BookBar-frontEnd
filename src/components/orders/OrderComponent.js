import * as React from "react";
import './OrderComponent.css';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getAllOrdersForUser} from "../../services/OrderService";
import _ from 'lodash';
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";
import Fade from 'react-reveal/Fade';


const mapStateToProps = ({session}) => ({
    session
});

class OrderComponent extends React.Component {

    state = {
        orders: []
    }

    componentDidMount = () => {
        getAllOrdersForUser(this.props.session.username)
            .then(orders => this.setState({
                orders: orders
            }))
        window.scrollTo(0,0);
    }

    totalSum = (items) => {
        return _.sumBy(items, function (items) {
            return items.totalPrice;
        })
    }


    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                    <div className="container order-page">
                        <br/>
                        <h1 className={"text-center carousel-style"}>Order History</h1>
                        <br/>
                        <div className={"container"}>
                            {this.state.orders &&
                            this.state.orders.map(order =>
                                <Fade left>
                                    <div className={"card card-margins"}>
                                        <div className={"card-header order-header-color"}>
                                            <span><b>Online Order: </b> {order._id}</span>
                                            <b className={"date-margin"}>Order Date</b>
                                            <div className="dropdown float-right">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="btn btn-light" id="dropdown-basic">
                                                        More Details
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <div>
                                                            <h5 className="carousel-style text-center">Order Invoice</h5>
                                                            <br/>
                                                            <table className="table w-auto dropdown-font">
                                                                <thead>
                                                                <tr>
                                                                    <th scope="col">SUBTOTAL</th>
                                                                    <th scope="col">$ {this.totalSum(order.items)}</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>Shipping</td>
                                                                    <td>$ {(this.totalSum(order.items) * 0.05).toFixed(2)}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Tax</td>
                                                                    <td>$ {(this.totalSum(order.items) * 0.10).toFixed(2)}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total</th>
                                                                    <th>$ {(this.totalSum(order.items) * 1.15).toFixed(2)}</th>
                                                                </tr>
                                                                </tbody>
                                                            </table>

                                                        </div>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>

                                        <div className={"row"}>

                                            <div className={"col-md-4 small-cards"}>


                                                {order.items.map(item =>
                                                    <span>
                                                        <img
                                                            className=""
                                                            alt=""
                                                            src={item.image}/>
                                                            &nbsp;x <b>{item.quantity} </b>
                                                    </span>
                                                )}


                                            </div>
                                            <div className="col-md-4 text-center">
                                                <br/>
                                                <b className={"date-margin-mobile"}>Order Date</b>
                                                <h1 className={"carousel-style"}>{order.createdAt.toString().substring(0,10)}</h1>
                                                <span>{_.get(this.props.session,['email'])}</span>
                                            </div>
                                            <div className="col-md-3">
                                                <br/>
                                                <p className={"text-center"}>
                                                    <b>Preparing</b>
                                                </p>
                                                <ProgressBar now={60} />
                                                <span className="text-disabled">Shipped by {new Date(2020, 10, 24).toDateString()}</span>
                                            </div>


                                        </div>
                                    </div>
                                </Fade>
                            )}
                            <br/>
                        </div>


                    </div>
                <br/>
                <br/>
                <h4 className={"text-center carousel-style"}>You've seen all your purchases!</h4>
            </div>
        )
    }
}

export default connect(mapStateToProps)
(withRouter(OrderComponent))
