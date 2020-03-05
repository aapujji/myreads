import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Link, Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: [],
		bookshelves: [
			{
				id: 'currentlyReading',
				title: 'Currently Reading'
			},
			{
				id: 'wantToRead',
				title: 'Want to Read'
			},
			{
				id: 'read',
				title: 'Read'
			}
		]
	}

	componentDidMount() {
		BooksAPI.getAll()
		  .then((books) => {
			this.setState(() => ({
				books
			}))
		})
	}

	updateShelf = (book, shelf) => {
		BooksAPI.update(book, shelf)
		  .then((updates) => {
		  	book.shelf = shelf;
		  	this.setState(currentState => ({
		  		books: currentState.books 
		  		  .filter((b) => b.id !== book.id)
		  		  	.concat(book)
		  	}))
		})
	}

	render() {
		const { books, bookshelves } = this.state;

		return (
			<div className="app">
				<Route path="/search" render={() => (
					<BookSearch booksSaved={books} updateShelf={this.updateShelf} />
				)} />
				<Route exact path="/" render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<BookShelf bookshelves={bookshelves} books={books} updateShelf={this.updateShelf} />
						</div>
						<div className="open-search">
							<Link to="/search">Add a book</Link>
						</div>
					</div>
				)} />
			</div>
		)
	}
}

export default BooksApp