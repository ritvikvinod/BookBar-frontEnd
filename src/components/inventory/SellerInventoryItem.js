import * as React from "react";
import './InventoryComponent.css';
import {searchBooksByISBN, deleteBookListing,editBookListing} from "../../services/BookService";
import t from 'typy';
import {Link} from "react-router-dom";

class SellerInventoryItem extends React.Component {

    state = {
        currentBook: {},
        editing: false,
        price: this.props.book.price.amount,
        quantity: this.props.book.quantity
    }

    componentDidMount = async () => {
        this.setState(({
            currentBook: await searchBooksByISBN(this.props.book.isbn.identifier)
        }))
    }

    editBookListing = async (isbn, newPrice, newQuantity) => {
        this.setState(({
            price: newPrice,
            quantity: newQuantity
        }))
        let details = {
            isbn: isbn,
            price: newPrice,
            quantity: newQuantity
        }
        await editBookListing(isbn,details)
    }

    deleteBookListing = async (isbn) => {
        await deleteBookListing(isbn)
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="">
                    <div id="searchResultsContainer" className="py-5 px-5 card-group">
                        <div className={"card card-margins"}>
                            <div className={"card-header"}>
                                <div className={"row"}>
                                    <div className={"col-md-5 small-cards img-center"}>
                                            <Link to={`/bookDetails/${t(
                                                 this.state.currentBook,
                                                 'volumeInfo.industryIdentifiers[0].identifier').safeObject}`}>
                                                {t(this.state.currentBook,'volumeInfo.imageLinks').safeObject &&
                                                    <img className="img-size-medium"
                                                         src={t(this.state.currentBook,'volumeInfo.imageLinks').safeObject &&
                                                         t(this.state.currentBook,'volumeInfo.imageLinks.thumbnail').safeObject}
                                                         alt="Card cap"/>}
                                            </Link>
                                            <br />
                                            <br />
                                            {!this.state.editing && <div>
                                                <button type="button"
                                                        class="btn btn-outline-success btn-block"
                                                        onClick={() => {
                                                            this.setState({editing: true})
                                                        }}>
                                                    <i class="fas fa-edit"></i> Edit Listing
                                                </button>
                                                <button type="button"
                                                        class="btn btn-outline-success btn-block"
                                                        onClick={() => {
                                                            this.deleteBookListing(this.props.book.isbn.identifier)
                                                        }}>
                                                    <i class="fas fa-trash"></i> Delete Listing
                                                </button>
                                            </div>}
                                            {this.state.editing &&
                                                <button class="btn btn-outline-success btn-block"
                                                    onClick={() => {
                                                        this.editBookListing(this.props.book.isbn.identifier,this.state.price,this.state.quantity)
                                                        this.setState({editing: false})
                                                    }}><i class="fas fa-check"></i> Update Listing </button>
                                            }

                                    </div>
                                    <div className="col-md-6 text-center">
                                        <table className="table table-hover borderless">
                                            <tbody>
                                            <tr>
                                                <td><label className="font-weight-bold">Title</label></td>
                                                <td><span>{t(this.state.currentBook,'volumeInfo.title').safeObject}</span></td>
                                            </tr>
                                            <tr>
                                                <td><label className="font-weight-bold">Author</label></td>
                                                <td><span>{t(this.state.currentBook,'volumeInfo.authors').safeObject}</span></td>
                                            </tr>
                                            <tr>
                                                <td><label className="font-weight-bold">ISBN-13</label></td>
                                                <td><span>{this.props.book.isbn.identifier}</span></td>
                                            </tr>
                                            <tr>
                                                <td><label className="font-weight-bold">Price</label></td>
                                                {!this.state.editing && <td><span itemProp="isbn">
                                                    {this.props.book.price.currency} {this.state.price}
                                                 </span></td>}
                                                {this.state.editing && <td>
                                                    <div class="input-group mb-3">
                                                        <input type="number" class="form-control"
                                                               onChange={(e) => {
                                                                   this.setState({
                                                                      price: e.target.value
                                                                  })}}
                                                               value={this.state.price} />
                                                          <div class="input-group-prepend">
                                                            <span class="input-group-text">$</span>
                                                          </div>
                                                    </div>
                                                </td>}
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"><label>Quantity</label></td>
                                                {!this.state.editing &&
                                                    <td>{this.state.quantity}</td>
                                                }
                                                {this.state.editing && <td>
                                                    <input type="number" class="form-control"
                                                           onChange={(e) => {
                                                               this.setState({
                                                                  quantity: e.target.value
                                                              })}}
                                                           value={this.state.quantity} />
                                                </td>}
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )


    }
}

export default SellerInventoryItem;
