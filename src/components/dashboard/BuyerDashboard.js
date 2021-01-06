import React from 'react';
import {getAllOrdersForUser} from "../../services/OrderService";
import Card from "react-bootstrap/Card";
import _ from 'lodash';

class BuyerDashboard extends React.Component {

    state = {
        orders: [],
        mostRecentOrder: {}
    }

    componentDidMount = async () => {
        await getAllOrdersForUser(this.props.username)
            .then(orders => this.setState({
                orders: orders
            }))
        let total = 0;
        let recentOrder = {}
        this.state.orders.forEach(order => {
            order.items.forEach(item => {
                total = total + parseInt(item.quantity);
            })
            recentOrder = order;
        })
        this.setState({
            totalBooks: total,
            mostRecentOrder: recentOrder
        })
    }

    render() {
        return (
            <div>
                <div className={"container"}>
                    <h1 className={"text-center carousel-style"}> Hey {this.props.username}!</h1>
                    <h2 className={"text-center carousel-style"}> Are you ready to buy some books today?</h2>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-md-4"}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1 className={"text-center dashboard-logo"}><i className="fas fa-book"></i></h1>
                                        &nbsp;
                                        <h4 className={"text-center"}>Books Ordered</h4>
                                    </Card.Title>
                                    <Card.Text>
                                        <h4 className={"text-center"}>{this.state.totalBooks}</h4>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className={"col-md-4"}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1 className={"text-center dashboard-logo-success"}><i className="fas fa-chart-line"></i></h1>
                                        &nbsp;
                                        <h4 className={"text-center"}>Orders Placed</h4>
                                    </Card.Title>
                                    <Card.Text>
                                        <h4 className={"text-center"}>{this.state.orders.length}</h4>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className={"col-md-4"}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1 className={"text-center dashboard-logo-success"}><i className="fas fa-money-check-alt"></i>
                                        </h1>
                                        &nbsp;
                                        <h4 className={"text-center"}>Last Purchase</h4>
                                    </Card.Title>
                                    <Card.Text>
                                        <h4 className={"text-center"}>
                                            {(_.get(this.state.mostRecentOrder, ['items','0','totalPrice'], 0)*1.15).toFixed(2)}
                                            &nbsp;
                                            <i className="fas fa-dollar-sign"></i>
                                        </h4>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <br />
                    <br />

                </div>
            </div>

        );
    }
}

export default BuyerDashboard;

