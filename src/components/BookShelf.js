import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BookCategory from './BookCategory'

export default class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

  //Updates Shelf with specific books
  updateBook = (book, shelf) => {
    this.props.onChangeBookShelf(book, shelf)
  }

  render() {
    const { books, title } = this.props

    return (
      <div className="list-books-content">
        <div className="list-books">
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map((book) => (
                  <BookCategory 
                  book={book} 
                  key={book.id} 
                  title={book.title} 
                  author={book.authors} 
                  image={book.imageLinks.smallThumbnail} 
                  onShelfChange={(shelf) => { this.updateBook(book, shelf) }} 
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
