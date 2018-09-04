import React from 'react'
import * as api from './utils/api'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import SavedBooks from './components/SavedBooks'
import BookSearch from './components/BookSearch'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  //Loads all books when component mounts to the DOM
  componentDidMount() {
    this.loadAllBooks();
  }

  //Method for making an API call to Udacity endpoint for all books
  loadAllBooks = () => {
    api.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
        console.log(books);
      })
  }

  //Method to update user shelf upon selections
  changeShelf = (book, shelf) => {
    api.update(book, shelf)
      .then(() => {
        this.loadAllBooks();
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div>
            <SavedBooks
              books={this.state.books}
              onChange={this.changeShelf}
            />
            <Link to='/search'>
              <button className="add-button"></button>
            </Link>
          </div>
        )} />
        <Route path='/search' render={(history) => (
          <div>
            <BookSearch
              allBooks={this.state.books}
              onChange={this.changeShelf}
            />
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp