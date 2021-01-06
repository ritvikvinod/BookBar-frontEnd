import React from 'react';
import {getAllOrdersForSeller} from "../../services/OrderService";
import {getAllBooks} from "../../services/BookService";
import Card from 'react-bootstrap/Card'
import _ from 'lodash';
import './SellerDashboard.css'

class SellerDashboard extends React.Component {

    state = {
        orders: []
    }

    componentDidMount = async () => {
        await getAllOrdersForSeller(this.props.username)
            .then(orders => this.setState({
                orders: orders
            }))
        let totalSold = 0;
        let price = 0;
        let lastOrder = {};
        let recentOrder = {};
        let recentBuyer = '';
        let totalListed = 0;
        let numBooks = 0;

        this.state.orders.forEach(order => {
            order.items.forEach(item => {
                if(item.seller === this.props.username){
                    totalSold = totalSold + parseInt(item.quantity);
                    price = price + parseInt(item.totalPrice);
                    lastOrder = item;
                }
            })
            recentOrder = lastOrder;
            recentBuyer = order.buyer;
        })

        let allBooks = await getAllBooks()
        allBooks.forEach(book => {
          if(book.seller === this.props.username){
            totalListed = totalListed + book.quantity;
            numBooks = numBooks + 1;
          }
        })

        this.setState({
            totalBooks: totalSold,
            totalPrice: price,
            totalUnsold: totalListed-totalSold,
            numBooks: numBooks,
            mostRecentOrder: recentOrder,
            mostRecentBuyer: recentBuyer
        })

    }

    render() {
        return (
            <div className={"container"}>
                <h1 className={"text-center carousel-style"}> Hey {this.props.username}!</h1>
                <h2 className={"text-center carousel-style"}> Are you ready to sell books today?</h2>
                <br/>
                <div className={"row"}>
                    <div className={"col-sm-6 col-md-3"}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className={"text-center dashboard-logo"}><i className="fas fa-book"></i></h1>
                                    &nbsp;
                                    <h4 className={"text-center"}>Listed Books</h4>
                                </Card.Title>
                                <Card.Text>
                                    <h4 className={"text-center"}>{this.state.numBooks}</h4>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className={"col-sm-6 col-md-3"}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className={"text-center dashboard-logo-success"}><i className="fas fa-chart-line"></i></h1>
                                    &nbsp;
                                    <h4 className={"text-center"}>Quantity Sold</h4>
                                </Card.Title>
                                <Card.Text>
                                    <h4 className={"text-center"}>{this.state.totalBooks}</h4>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className={"col-sm-6 col-md-3"}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className={"text-center dashboard-logo-danger"}><i className="fas fa-chart-line"></i></h1>
                                    &nbsp;
                                    <h4 className={"text-center"}>Quantity Unsold</h4>
                                </Card.Title>
                                <Card.Text>
                                    <h4 className={"text-center"}>{this.state.totalUnsold}</h4>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className={"col-sm-6 col-md-3"}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className={"text-center dashboard-logo-success"}><i className="fas fa-dollar-sign"></i></h1>
                                    &nbsp;
                                    <h4 className={"text-center"}>Amount Earned</h4>
                                </Card.Title>
                                <Card.Text>
                                    <h4 className={"text-center"}>{this.state.totalPrice} <i className="fas fa-dollar-sign"></i></h4>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <br/>
                <div className={"row"}>
                    <div className={"col-md-3"}></div>
                    <div className={"col-sm-6 col-md-3"}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className={"text-center dashboard-logo"}><i className="far fa-user"></i></h1>
                                    &nbsp;
                                    <h4 className={"text-center"}>Last Buyer</h4>
                                </Card.Title>
                                <Card.Text>
                                    <h4 className={"text-center"}>
                                        {this.state.mostRecentBuyer ? this.state.mostRecentBuyer : '-'}</h4>
                                </Card.Text>
                            </Card.Body>
                            {console.log(this.state.mostRecentBuyer)}
                        </Card>
                    </div>
                    <div className={"col-sm-6 col-md-3"}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1 className={"text-center dashboard-logo-success"}><i className="fas fa-money-check-alt"></i>
                                        </h1>
                                    &nbsp;
                                    <h4 className={"text-center"}>Last Sale</h4>
                                </Card.Title>
                                <Card.Text>
                                    <h4 className={"text-center"}>
                                        {_.get(this.state.mostRecentOrder, ['totalPrice'], "0")}
                                        &nbsp;
                                        <i className="fas fa-dollar-sign"></i>
                                    </h4>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className={"col-sm-6 col-md-3"}></div>

                </div>


                <br />
                <br />

            </div>

        );
    }
}

export default SellerDashboard;

