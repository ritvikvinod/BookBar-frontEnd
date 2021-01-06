import React from 'react';
import '../components/SearchBoxComponent.css'
import {searchBooks} from "../services/BookService";

import 'react-multi-carousel/lib/styles.css';
import BookCarousel from "./BookCarousel";
import SearchResultsComponent from "./SearchResultsComponent";
import SellerDashboard from "./dashboard/SellerDashboard";
import BuyerDashboard from "./dashboard/BuyerDashboard";
import {Fade} from "react-reveal";

import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";


const mapStateToProps = ({session}) => ({
    session
});

class SearchBoxComponent extends React.Component {

    state = {
        books: [],
        title: ''
    }


    searchBooks = async (title) => {
        if(title){
            await searchBooks(title)
                        .then(results => this.setState({
                            books: results,
                            title: title
                        }))
        }



    }

    async componentDidMount() {
        if(this.props.searchQuery) {
            await searchBooks(this.props.searchQuery)
                .then(results => this.setState({
                    books: results,
                    title: this.props.searchQuery
                }))
        }
    }



    render() {
        return (
            <div>

                <div className={"jumbotron jumbotron-fluid "+
                    (this.props.session.userType === 'SELLER'? 'seller-bg-picture' : 'buyer-bg-picture')}>
                    <div className="container">
                        <br/>
                        <br/>
                        <br/>

                        <Fade top cascade collapse>
                            <h1 className="text-center h1-color">Shop online with Bookbar,</h1>
                        </Fade>
                        <div className="responsive-small-screen"><br />
                        <br /></div>
                        <h1 className="text-center h1-color">our Web Development final project!</h1>
                    </div>
                    &nbsp;
                    &nbsp;

                    <div className="d-flex justify-content-center h-100">
                        <div className="searchbar">
                            <input className="search_input"
                                   type="text"
                                   placeholder="Search books"
                                   value={this.state.title}
                                   onChange={(e) => this.setState({
                                       title: e.target.value
                                   })}/>
                            <Link to={`/search/${this.state.title}`}
                                  onClick={() => this.searchBooks(this.state.title)}
                                  className="search_icon"><i className="fas fa-search"></i></Link>
                        </div>
                    </div>
                </div>


                {this.props.session.userType === 'BUYER' && this.props.searchMode &&
                    <BuyerDashboard
                        username={this.props.session.username} />}
                {this.props.session.userType === 'SELLER' && this.props.searchMode &&
                    <SellerDashboard
                        username={this.props.session.username} />}

                {this.props.session.userType !== 'SELLER' && this.props.searchMode && <div className="container">
                        <Fade left cascade>
                            <h2 className="carousel-style">Most Relevant Books</h2>
                        </Fade>
                        &nbsp;
                        <Fade top>
                            <BookCarousel
                                title="dan brown"
                                sorter="relevance"
                            />
                        </Fade>


                    <Fade left cascade>
                        <br/>
                        <h2 className="carousel-style">Newest Books</h2>
                    </Fade>
                    &nbsp;
                    <Fade top>
                        <BookCarousel
                            title="nicholas sparks"
                            sorter="newest"
                        />
                    </Fade>


                    <h2 className="carousel-style">Some Classics</h2>
                    &nbsp;
                    <BookCarousel
                        title="enid blyton"
                        sorter="newest"
                    />


                </div>
                }

                {this.props.session.userType === 'SELLER' && this.props.searchMode &&
                <div className={"container"}>
                    <Fade left cascade>
                        <br/>
                        <h2 className="carousel-style">Hot Books to Sell</h2>
                    </Fade>
                    &nbsp;
                    <Fade top>
                        <BookCarousel
                            title="paulho coelho"
                            sorter="newest"
                        />
                    </Fade>
                </div>
                }

                {!this.props.searchMode &&
                <SearchResultsComponent
                    books={this.state.books}
                    title={this.state.title}

                />}

            </div>

        );
    }
}

export default connect(mapStateToProps)
(withRouter(SearchBoxComponent))

