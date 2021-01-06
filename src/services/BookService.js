import {BACKEND_API} from "../common/constants";

export const searchBooks = async(title) => {
    let results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40&orderBy=newest`)
        .then(response =>
            response.json().then(res => res.items));
    // console.log("this is first results " + results[0].volumeInfo)
    results = results.filter(book => book.volumeInfo.hasOwnProperty('imageLinks'))


    return results
}

export const searchBooksByISBN = async(isbnNumber) => {
    let results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber}`)
        .then(response => response.json())
        .then(res => res.items);
    //console.log(results[0])
    return results[0];
}

export const searchBooksForCarousel = async(title, sorter) => {
    let results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40&orderBy=${sorter}`)
        .then(response =>
            response.json().then(res => res.items));
    results = results.filter(book => book.volumeInfo.hasOwnProperty('imageLinks'))


    return results
}

export  const searchBooksMatchingIsbn = async(isbn) => {
    console.log(isbn)
    let results = await(await fetch(`${BACKEND_API}/api/book/getBookByIsbn/${isbn}`)).json();
        // .then(res => res.json().then(res => res));
    console.log('match isbn results' + results);
    return results;
}

export const sellBook = async (newBook) => {
     const response = await fetch(`${BACKEND_API}/api/book/Addbook`, {
         method: "POST",
         body: JSON.stringify(newBook),
         headers: {
             'content-type': 'application/json'
         }
     })
     return await response.json()
}

export const getAllBooks = () => {
    return fetch(`${BACKEND_API}/api/book/getAllBooks`)
        .then(response => response.json())
}

export const deleteBookListing = async (isbn) => {
    return await fetch(`${BACKEND_API}/api/book/deleteBook/${isbn}`, {
          method: 'DELETE'
      })
    .then(response => response.json())
}

export const editBookListing = async (isbn,details) => {
    return await fetch(`${BACKEND_API}/api/book/updateBook/${isbn}`, {
         method: "PUT",
         body: JSON.stringify(details),
         headers: {
             'content-type': 'application/json'
         }
      })
    .then(response => response.json())
}