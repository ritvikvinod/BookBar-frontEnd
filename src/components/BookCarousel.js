import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from "react-router-dom";
import t from "typy";
import "./BookCarousel.css"
import {searchBooksForCarousel} from "../services/BookService";


export default class BookCarousel extends React.Component {

    responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    state = {
        books: []
    }

    searchBooksForCarousel = (title, sorter) => {
        searchBooksForCarousel(title, sorter)
            .then(results => this.setState({
                books: results
            }))

    }

    componentDidMount() {
        this.searchBooksForCarousel(this.props.title, this.props.sorter)
    }


    render() {
        return (
            <div className="container carousel-color carousel-bg">
                &nbsp;
                &nbsp;
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={this.responsive}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >

                    {
                        this.state.books &&
                        this.state.books.map(book =>
                            <div
                                className="col-9">
                                <Link
                                    to={`/bookDetails/${t(
                                        book,
                                        'volumeInfo.industryIdentifiers[0].identifier').safeObject}`}>
                                    <div
                                        className="card">
                                        {book.volumeInfo.imageLinks.thumbnail
                                        &&
                                        <img
                                            className="card-img-top"
                                            src={book.volumeInfo.imageLinks.thumbnail
                                            && book.volumeInfo.imageLinks.thumbnail}
                                            alt="Card cap"/>}

                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </Carousel>
            </div>
        )
    }
}
