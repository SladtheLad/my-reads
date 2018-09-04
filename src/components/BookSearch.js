import React, { Component } from 'react'
import * as api from '../utils/api'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BookCategory from './BookCategory'

export default class BookSearch extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    books: [],
    query: ''
  }

  //Method for search query updates
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
    console.log(query)
    this.handleSearch(query)
  }

  //Method that adds shelf property to all books then matches shelf if already added
  searchShelfChange = (books) => {
    const allBooks = this.props.allBooks

    for (let book of books) {
      book.shelf = 'none'
    }

    //Will iterate into search result object and saved books object and update 
    //the same state on both search page and main application page
    for (let book of books) {
      for (let b of allBooks) {
        if (book.title === b.title) {
          book.shelf = b.shelf
        }
      }
    }

    return books
  }

  //Method that filters through books with imageLinks and authors
  filterBooks = (books) => {
    return books.filter((book) => (book.imageLinks)).filter((book) => (book.authors));
  }

  //Method that alerts the user that a book has been added
  bookRefresh = (b, shelf) => {
    this.props.onChange(b, shelf);

    switch (shelf) {
      case 'wantToRead':
        alert('Book Added - Want to Read');
        break;
      case 'currentlyReading':
        alert('Book Added - Currently Reading');
        break;
      default:
        alert('Book Added - Read')
    }

  }

  //Method that handles the search from API
  handleSearch = (query) => {
    if (query.length > 0) {
      api.search(query)
        .then((books) => {
          if (books.length > 0) {
            books = this.filterBooks(books);
            books = this.searchShelfChange(books);
            console.log(books);
            this.setState(() => {
              return { books: books }
            })
          } else {
            this.setState({ books: [], query: '' })
          }
        })
    }
  }

  render() {
    const { books, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">
            close
            </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        {books.length > 0 && (
          <div>
            <p className="now-showing"> Now showing {books.length} book results. </p>
            <div className="search-books-results">
              <ol className="books-grid">
                {query.length !== 0 && books.map((book) => (
                  <BookCategory
                    book={book}
                    key={book.id}
                    title={book.title}
                    author={book.authors}
                    image={book.imageLinks.smallThumbnail}
                    onShelfChange={(shelf) => { this.bookRefresh(book, shelf) }}
                  />
                ))}
              </ol>
            </div>
          </div>
        )}

      </div>
    )
  }
}