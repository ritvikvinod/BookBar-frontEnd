import * as React from "react";
import './CartComponent.css'
import {Link} from "react-router-dom";
import Fade from 'react-reveal/Fade';
import _ from "lodash";
import {clearCartForUser, getCartItemsForUser} from "../../services/CartServices";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addToOrder} from "../../services/OrderService";
import Zoom from 'react-reveal/Zoom';
import Modal from "react-bootstrap/Modal";
import PrivacyPolicyComponent from "../privacy/PrivacyPolicyComponent";

const mapStateToProps = ({session}) => ({
    session
});

class CartComponent extends React.Component {

    state = {
        books: [],
        total: '',
        isOpen: false
    }

    showModal = () => {
        this.setState({
            isOpen: true
        })
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        })


    }

    checkoutFunctions = async () => {
        this.showModal()
        await clearCartForUser(this.props.session.username)
        let orderAdded = await addToOrder(this.state.books,this.props.session.username)
        await setTimeout(() => this.setState({
            books: []
        }),2000)
    }


    totalSum = () => {
        return _.sumBy(this.state.books, function (book) {
            return book.totalPrice;
        })
    }

    clearCart = () => {
        clearCartForUser(this.props.session.username)
        this.setState({
            books: []
        })
    }



    componentDidMount = async () => {
        await getCartItemsForUser(this.props.session.username)
            .then(results => this.setState({
                books: results
            }))
        window.scrollTo(0,0);
    }



    render() {
        return (
            <div className="container cart-font cart-background">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                {this.state.books.length === 0 &&
                <div>
                    <h1>Shopping Cart</h1>
                    <h2>Your cart is currently empty!</h2>
                    <br/>
                    <Link to={"/"}>
                        <button className="btn btn-dark">Continue Shopping</button>
                    </Link>
                    <br/>
                    <br/>

                </div>}
                {this.state.books.length !== 0
                && <div className="row">

                    <div className="col-md-8 border-right">
                        <h3 className="cart-header carousel-style">Your Cart</h3>

                        <br/>
                        <br/>

                        <table className="table w-auto">


                            <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.books &&
                            this.state.books.map(book =>
                                <Fade left cascade>
                                    <tr>
                                        <td>
                                            <img
                                                src={_.get(book, ['image'])}
                                                alt="pic"
                                            />
                                            &nbsp;
                                        </td>
                                        <td>
                                            $ {_.get(book, ['unitPrice'])}
                                        </td>
                                        <td>
                                            {_.get(book, ['quantity'])}
                                        </td>
                                        <th>
                                            $ {_.get(book, ['totalPrice'])}
                                        </th>
                                    </tr>
                                </Fade>
                            )
                            }


                            </tbody>



                        </table>
                    </div>
                    <div className="col-md-4">
                        <Fade top cascade>
                            <h3 className="carousel-style">Order Summary</h3>
                            <br/>
                            <table className="table w-auto">
                                <thead>
                                <tr>
                                    <th scope="col">SUBTOTAL</th>
                                    <th scope="col">$ {this.totalSum()}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Shipping</td>
                                    <td>$ {(this.totalSum() * 0.05).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td>$ {(this.totalSum() * 0.10).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <th>$ {(this.totalSum() * 1.15).toFixed(2)}</th>
                                </tr>
                                </tbody>
                            </table>
                        </Fade>
                        <Modal show={this.state.isOpen} onHide={this.hideModal}>
                            <br/>
                            <br/>
                            <Modal.Body><h4 className={"carousel-style"}>Congratulations, order has been placed!</h4></Modal.Body>
                            <Modal.Footer>
                                {/*<button type="button" className="btn btn-outline-info"
                                        onClick={this.hideModal}>Close
                                </button>*/}
                            </Modal.Footer>
                        </Modal>
                        <Fade top>
                            <Link to={"/cart"}>
                                <button
                                    onClick={() => {
                                        this.checkoutFunctions()
                                    }}
                                    className="btn btn-dark btn-block">
                                    Proceed to checkout
                                </button>
                            </Link>
                            <button
                                onClick={() => {
                                    this.clearCart()
                                }}
                                className="btn btn-danger btn-block cart-sm-btn">
                                Clear Cart
                            </button>
                            <br/>
                            <p className="text-center">or checkout with:</p>
                            <br/>
                            <a href="https://www.paypal.com/us/home">
                                <button
                                    className="btn btn-primary btn-block">
                                    <i className="fab fa-paypal"></i>
                                </button>
                            </a>
                        </Fade>
                        <br/>
                        <p className="text-center">Questions? We can help! Contact us</p>
                        <p className="text-center">1-800-756-3436</p>
                    </div>
                </div>}


            </div>)
    }
}

export default connect(mapStateToProps)
(withRouter(CartComponent))
