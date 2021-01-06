import * as React from "react";
import './InventoryComponent.css';
import {getAllBooks} from "../../services/BookService";
import SellerInventoryItem from "./SellerInventoryItem";
import {connect} from "react-redux";
import { withRouter} from "react-router-dom";
import Fade from 'react-reveal/Fade';

const mapStateToProps = ({session}) => ({
    session
});

class InventoryComponent extends React.Component {

    state = {
        books: [],
        title: ''
    }

    componentDidMount = () => {
         getAllBooks()
            .then(books => this.setState(({
                books:books
            })))
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>

                    <div>
                        <h1 className={"text-center carousel-style"}>My Inventory</h1>
                        <br/>
                        {/*<div className="d-flex justify-content-center h-100">
                            <div className="search-bar">
                                <input className="search-input"
                                       type="text"
                                       placeholder="Search for Books"
                                       value={this.state.title}
                                       onChange={(e) => this.setState({
                                           title: e.target.value
                                       })}/>
                                <Link to={`/search/${this.state.title}`}>
                                    <i className="fas fa-search search-icon"></i>
                                </Link>
                                <span className="search-icon-text"> Search for Books</span>
                            </div>
                        </div>*/}


                    <div className="row">
                        {this.state.books && this.state.books.map(book =>
                            book.seller === this.props.session.username ?
                              <div className="col-sm-10 col-md-10 col-lg-6">
                                  <Fade left clear>
                                      <SellerInventoryItem
                                          book = {book} />
                                  </Fade>
                              </div> : <div></div>
                        )}
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps)
(withRouter(InventoryComponent))
