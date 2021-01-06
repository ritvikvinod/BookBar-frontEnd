import * as React from "react";
import {clearWishList, getWishListItems} from "../../services/WishService";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import './WishlistComponent.css'
import Fade from 'react-reveal/Fade';


const mapStateToProps = ({session}) => ({
    session
});

class WishlistComponent extends React.Component {

    state = {
        books: [],
    }

    componentDidMount = async () => {
        this.setState(({
            books: await getWishListItems(this.props.session.username)
        }))
        window.scrollTo(0,0);
        console.log("wishes", this.state.books);
    }


    clearWishList = async () => {
        let res = await clearWishList(this.props.session.username);
        console.log("res", res);
        this.setState(({
            books: []
        }))
    }


    // deleteBookListing = async (isbn) => {
    //     await deleteBookListing(isbn)
    //     window.location.reload();
    // }

    render() {
        return (

            <div className="search-results-color">
                <br/>
                <br/>
                <br/>

                {this.state.books.length !== 0 && <div>
                    <h1 className="carousel-style search-heading text-center">Your Wishlist
                    </h1>
                    <div id="searchResultsContainer" className="py-5 px-5 card-group">
                        <div className="container">
                            <ul className="list-group">
                                <div className="row">
                                    {
                                        this.state.books &&
                                        this.state.books.map(book =>
                                            <Fade left>
                                                <div
                                                    className="col-sm-4 col-md-3">
                                                    <div
                                                        className="text-center card-fixed-size">
                                                        {book.image
                                                        &&
                                                        <img
                                                            className="img-size"
                                                            src={book.image}
                                                            alt=""/>}
                                                    </div>
                                                    <div
                                                        className="img-title text-center carousel-style">
                                                        <a>
                                                            {book.title}
                                                        </a>
                                                    </div>
                                                    <br/>
                                                    <br/>
                                                </div>
                                            </Fade>
                                        )
                                    }
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">
                            <Fade left>
                                <button className="btn btn-block search-btn btn-danger"
                                        onClick={() => this.clearWishList()}>
                                    <i className="fas fa-trash"></i>
                                    &nbsp;
                                    Clear WishList!
                                </button>
                            </Fade>
                            <br/>

                        </div>
                    </div>
                </div>
                }

                {this.state.books.length === 0 && <div>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className="carousel-style text-center">Add books to wish list </h1>

                    <h1 className="carousel-style text-center">to see them here!</h1>

                    <br/>
                    <br/>
                    <br/>

                </div>
                }


            </div>

        )


    }
}

export default connect(mapStateToProps)
(withRouter(WishlistComponent))
