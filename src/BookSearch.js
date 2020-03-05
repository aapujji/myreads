import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookSearch extends React.Component {
	state = {
		query: '',
		error: false,
		filteredBooks: []
	}

	filterBooks = (query) => {
		this.setState({ query })

		if (!query || query === '') {
			this.setState({
				filteredBooks: [],
				error: true
			})
		} else {
			BooksAPI.search(query)
				.then(results => {
					results.map((result) => {
						for (const bookSaved of this.props.booksSaved) {
							if (result.id === bookSaved.id) {
								result.shelf = bookSaved.shelf
							}
						}
					})
					this.setState({
						filteredBooks: results,
						error: false
					})
				})
				.catch((err) => {
					this.setState({
						filteredBooks: [],
						error: true
					})
				})
		}
	}

	render() {
		const { updateShelf } = this.props;
		const { query, error, filteredBooks } = this.state;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.filterBooks(e.target.value)} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{error === true && (
							<div>Sorry, there are no books that match your search</div>
						)}
						{error === false && (
							filteredBooks.map((book) => (
								<Book key={book.id} book={book} shelf={book.shelf} updateShelf={updateShelf} />
							))
						)}
					</ol>			
				</div>
			</div>
		)
	}
}

BookSearch.propTypes = {
	booksSaved: PropTypes.array.isRequired,
	updateShelf: PropTypes.func.isRequired
};

export default BookSearch