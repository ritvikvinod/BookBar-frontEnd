import React from "react";
import './BookDetailsComponent.css';
import {searchBooksByISBN, sellBook, searchBooksMatchingIsbn} from "../services/BookService";
import {addToCart} from "../services/CartServices";
import {addToWishList} from "../services/WishService";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import t from 'typy';
import _ from 'lodash';
import BookCarousel from "./BookCarousel";

const mapStateToProps = ({session}) => ({
    session
});

class BookDetails extends React.Component {

    state = {
        book: {},
        bookAlreadyListed: false,
        sellAmount: 0,
        quantity: 1,
        available: false,
        price: 33.65,
        seller: "-",
        message:"",
        alertType: "",
        messageCart: ""
    }

    loadBook = async () => {
        await searchBooksByISBN(this.props.isbn)
            .then(book => this.setState(({
                book: book
            })))
        console.log(this.state.book);
        this.findIfBookAlreadyListedForSelling();
        console.log("here", this.state.book);

        //to search internal db for price or out of stock
        await searchBooksMatchingIsbn(this.props.isbn)
            .then(res => {
                if (res.length > 0) {
                    this.setState(({
                        available: true,
                        price: res[0].price.amount,
                        seller: res[0].seller
                    }))
                }
            });
    }

    componentDidMount = async () => {
        window.scrollTo(0,0);
        this.loadBook();
    }

    componentDidUpdate(prevProps) {

      if (this.props.isbn !== prevProps.isbn) {
        this.loadBook();
        window.location.reload();
      }

      setTimeout(() => this.setState({message:'', messageCart:''}), 4000);
    }


    findIfBookAlreadyListedForSelling = () => {
        searchBooksMatchingIsbn(this.props.isbn)
            .then(book => {
                if (book[0]) {
                    this.setState(({
                        bookAlreadyListed: true
                    }))
                } else {
                    this.setState(({
                        bookAlreadyListed: false
                    }))
                }
            })
    }

    addBookForSell = async (sellAmount, currency, quantity) => {
        let price = {
            amount: sellAmount,
            currency: currency
        }
        let isbn = {
            type: this.state.book.volumeInfo.industryIdentifiers[0].type,
            identifier: this.props.isbn
        }
        const newBook = {
            isbn: isbn,
            quantity: quantity,
            price: price,
            seller: this.props.session.username
        }
         await sellBook(newBook)
    }

    addToCart = async () => {
        let newTotal = this.state.quantity * this.state.price;
        console.log("newTotal", newTotal);
        let item = {
            "totalPrice": newTotal,
            "quantity": this.state.quantity,
            "unitPrice": this.state.price,
            "seller": this.state.seller,
            "image": _.get(this.state.book, ['volumeInfo', 'imageLinks', "thumbnail"], 'No Image'),
            "title": _.get(this.state.book, ['volumeInfo', 'title'], 'No Title'),
        }

        let username = this.props.session.username;

        console.log("item", item);

        let res = await addToCart(item, username)

        console.log("res add cart", res);

        this.setState({messageCart: "Added to Cart. Go to cart to complete the order!", alertType:"bg-success rounded"})
    }

    addToWishList = async () => {
        let item = {
            "image": _.get(this.state.book, ['volumeInfo', 'imageLinks', "thumbnail"], 'No Image'),
            "title": _.get(this.state.book, ['volumeInfo', 'title'], 'No Title'),
        }

        let username = this.props.session.username;

        console.log("item", item);
        if (this.props.session.username != null) {
            await addToWishList(item, username)

            // alert(` ${item.title} book added to your wishlist!!`)
            this.setState({message: "Added to wishlist", alertType:"bg-success rounded"})
        }else{
            this.setState({message: "Login to create your wishlist!!", alertType:"bg-info rounded"})

        }

    }


    render() {
        return (
            <div className="bg-pic container">

                <div className="book-details container">
                    <br/>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-md-4 col-lg-3">
                            <br/>
                            <br/>
                            <br/>
                            {t(this.state.book, 'volumeInfo.imageLinks').safeObject &&
                            <img className="card-img-top"
                                 src={t(this.state.book, 'volumeInfo.imageLinks').safeObject &&
                                 t(this.state.book, 'volumeInfo.imageLinks.thumbnail').safeObject}
                                 alt="Card cap"/>}
                            <br/>
                            <br/>
                            <p><i className="fas fa-arrow-alt-circle-right"></i> Share</p>
                            <button className={"btn fb-col"}><i className="fab fa-facebook-f"></i></button>&nbsp;
                            <button className={"btn pin-col"}><i className="fab fa-pinterest"></i></button>&nbsp;
                            <button className={"btn inst-logo"}><i className="fab fa-instagram"></i></button>&nbsp;
                            <button className={"btn tw-col"}><i className="fab fa-twitter"></i></button>
                        </div>
                        <div className="col-md-8 col-lg-6">
                            <br/>
                            <br/>
                            <br/>
                            {t(this.state.book, 'volumeInfo.title').safeObject &&
                            <h2 className="text-center carousel-style">
                                <b>{t(this.state.book, 'volumeInfo.title').safeObject}</b></h2>}
                            <h6 className="float-right carousel-style">By {[t(this.state.book, 'volumeInfo.authors').safeObject].join(', ')}</h6>
                            <br/>
                            <br/>
                            <h4 className="carousel-style"><b>Description</b></h4>
                            <div className="">
                                <p className="carousel-style"> {t(this.state.book, 'volumeInfo.description').safeObject}</p>
                            </div>
                            <br/>
                            <div className={"carousel-style"}>
                                <h4><b>Book Details</b></h4>
                                <p>
                                    <b>Format: </b><span><em>{_.get(this.state.book, ['volumeInfo', 'printType'], '-')}</em></span>
                                    <br/><b>Language: </b>
                                    <em>{_.get(this.state.book, ['volumeInfo', 'language'], 'en')}</em>
                                    <br/><b>Publisher: </b>
                                    <em>{_.get(this.state.book, ['volumeInfo', 'publisher'], 'NO Publisher')}</em>
                                    <br/><b>Rating: </b>
                                    <em>{_.get(this.state.book, ['volumeInfo', 'averageRating'], '5')}/5</em>
                                    <br/><b>ISBN: </b>
                                    <em>{_.get(this.state.book, ['volumeInfo', 'industryIdentifiers', '0', 'identifier'], 'No ISBN')}</em>
                                    <br/><b>Page Count: </b>
                                    <em>{_.get(this.state.book, ['volumeInfo', 'pageCount'], '150')}</em>
                                    <br/><b>Categories: </b>
                                    <em>{_.get(this.state.book, ['volumeInfo', 'categories'], 'No ISBN')}</em>
                                    <br/><b>Seller: </b> <em>{this.state.seller}</em>
                                </p>
                            </div>


                        </div>
                        <div className="col-lg-3">
                            <br/>
                            <br/>
                            <br/>
                            <div className={this.state.alertType} style={{color:"white", textAlign:"center"}}> {this.state.message}</div>
                            <div className={this.state.alertType} style={{color:"white", textAlign:"center"}}> {this.state.messageCart}</div>
                            {/*<div className="alert alert-info" role="alert" >*/}
                            {/*    {this.state.message}*/}
                            {/*</div>*/}
                            <div className="card">
                                <div className="card-body">
                                    {(this.props.session.userType === undefined || this.props.session.userType === 'BUYER')
                                    && this.state.available === true && <div>
                                        <h6 className="card-subtitle mb-2 text-muted"><em>Purchase this book for: </em>
                                        </h6>
                                        {/*<br/>*/}
                                        <h3>$ {this.state.price}
                                            <span
                                                className="small text-muted"> USD</span></h3>
                                        <br/>
                                        {this.props.session.userType === undefined && <Link to={"/login"}>
                                            <button className="btn btn-block btn-outline-dark">Login to Purchase</button>
                                        </Link>}

                                        {this.props.session.username !== null && <div>
                                            <p>
                                                <label className="firstLabel">Quantity: </label>
                                                <select className="col-sm-5 form-class"
                                                        onChange={(event => {
                                                                const newValue = event.target.value
                                                                this.setState(({
                                                                    quantity: newValue
                                                                }))
                                                            }
                                                        )}
                                                >

                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                         </p>
                                             <br/>

                                        <button className="btn btn-block btn-success" onClick={()=> this.addToCart()}>
                                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                            &nbsp; Add To Cart
                                        </button>
                                        <button className="btn btn-block  bg-success text-white" onClick={()=> this.addToWishList()}>
                                            <i className="fas fa-heart text-white" aria-hidden="true"></i>
                                            &nbsp; Add to wishlist
                                        </button>
                                             </div>}


                                    </div>}

                                    {((this.props.session.userType === undefined || this.props.session.userType === 'BUYER')
                                        && this.state.available === false) && <div>
                                        <h6 className="card-subtitle mb-2 text-muted"><em>Out of stock!
                                            Please check back after a few days.</em></h6>
                                        <br/>
                                        <h3>$3.98
                                            <span
                                                className="small text-muted"> USD</span></h3>
                                        <p className=""><strong>BEST RATES AVAILABLE!</strong>
                                        </p>

                                        {/*<button className="btn btn-block btn-success">*/}
                                        {/*    <i className="fa fa-shopping-cart" aria-hidden="true"></i>*/}
                                        {/*    &nbsp; Add To Cart*/}
                                        {/*</button>*/}
                                        <button className="btn btn-block text-white bg-success"
                                                onClick={() => this.addToWishList()}>
                                            <i className="fas fa-heart text-white"></i>
                                            &nbsp; Add to wishlist
                                        </button>
                                    </div>}


                                    {this.props.session.userType === 'SELLER' &&
                                    this.state.bookAlreadyListed &&
                                    <div>
                                        <button className="btn btn-block btn-success disabled">
                                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                            &nbsp; Already Listed
                                        </button>
                                    </div>}

                                    {this.props.session.userType === 'SELLER' &&
                                    !this.state.bookAlreadyListed && <div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="number"
                                                   class="form-control"
                                                   aria-label="Amount"
                                                   placeholder="Selling Price"
                                                   min="0"
                                                   onChange={(e) => this.setState({
                                                       sellAmount: e.target.value
                                                   })}/>

                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="number"
                                                   className="form-control"
                                                   aria-label="Quantity"
                                                   placeholder="Quantity"
                                                   min="0"
                                                   onChange={(e) => this.setState({
                                                       quantity: e.target.value
                                                   })}/>
                                        </div>

                                        <Link to="/inventory">
                                            <button className="btn btn-block btn-success"
                                                    onClick={() => this.addBookForSell(this.state.sellAmount, '$', this.state.quantity)}>
                                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                &nbsp; Sell
                                            </button>
                                        </Link>
                                    </div>}
                                </div>


                            </div>
                            <br/>
                            <a href={`https://www.goodreads.com/book/isbn/${_.get(this.state.book, ['volumeInfo', 'industryIdentifiers', '0', 'identifier'])}`}>
                                <button className={"btn btn-block goodreads"}>
                                    <i className="fab fa-goodreads"></i>
                                    &nbsp;
                                    Read more on Goodreads
                                </button>
                            </a>
                        </div>

                    </div>

                </div>
                <br/>
                <br/>


                {/*<div className="container book-details col-md-12">
                    <strong><h5 className="carousel-style">About the
                        Book</h5></strong>
                    <table className="table table-striped table-condensed">
                        <tbody>
                        <tr>
                            <td><label className="carousel-style">Format</label></td>
                            <td><span><em>{_.get(this.state.book, ['volumeInfo', 'printType'], '-')}</em></span></td>
                            <td className="hidden-xs"><label className="carousel-style">Language</label></td>
                            <td className="hidden-xs">
                                <em>{_.get(this.state.book, ['volumeInfo', 'language'], 'en')}</em></td>
                        </tr>
                        <tr>
                            <td><label className="carousel-style">Publisher</label></td>
                            <td>
                                <span> <em>{_.get(this.state.book, ['volumeInfo', 'publisher'], 'NO Publisher')}</em></span>
                            </td>
                            <td className="hidden-xs carousel-style"><label>Rating</label></td>
                            <td className="hidden-xs"><em><span
                                itemProp="bookEdition">{_.get(this.state.book, ['volumeInfo', 'averageRating'], '5')}/5</span></em>
                            </td>
                        </tr>
                        <tr>
                            <td><label className="carousel-style">ISBN</label></td>
                            <td>
                                <span><em>{_.get(this.state.book, ['volumeInfo', 'industryIdentifiers', '0', 'identifier'], 'No ISBN')}</em></span>
                            </td>
                            <td className="hidden-xs carousel-style"><label>Page Count</label></td>
                            <td className="hidden-xs">
                                <em>{_.get(this.state.book, ['volumeInfo', 'pageCount'], '150')}</em></td>
                        </tr>

                        <tr>
                            <td><label className="carousel-style">Categories</label></td>
                            <td><em>{_.get(this.state.book, ['volumeInfo', 'categories'], 'No ISBN')}</em></td>
                            <td className="hidden-xs carousel-style"><label>Seller</label></td>
                            <td className="hidden-xs"><em>{this.state.seller}</em></td>
                        </tr>
                        </tbody>
                    </table>
                </div>*/}
                <br/>
                <h3 className="carousel-style"> - Readers also enjoyed --</h3>
                <BookCarousel
                    title={_.get(this.state.book, ['volumeInfo', 'title'])}
                    sorter="newest"
                />
            </div>

        )
    }
}

export default connect(mapStateToProps)
(withRouter(BookDetails))
