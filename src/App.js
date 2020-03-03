import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Link, Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
	state = {
		showSearchPage: false,
		query: '',
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

	updateQuery = (query) => {
		this.setState(() => ({
			query: query.trim()
		}))
	}

	render() {
		const { showSearchPage, query, books, bookshelves } = this.state;

		const filterBooks = query === '' 
			? books
			: books.filter((b) => (
				b.title.toLowerCase().includes(query.toLowerCase())
			))

		return (
			<div className="app">
				<Route path="/search" render={() => (
					<div className="search-books">
						<div className="search-books-bar">
							<Link to="/" className="close-search">Close</Link>
							<div className="search-books-input-wrapper">
								<input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateQuery(e.target.value)}/>
							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid">
								{filterBooks.map((book) => (
									<BookSearch key={book.id} book={book} updateShelf={this.updateShelf} />
								))}
							</ol>							
						</div>
					</div>

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