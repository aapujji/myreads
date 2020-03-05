import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
	render() {
		const { books, bookshelves, updateShelf } = this.props;

		return (
			<div>
				{bookshelves.map((shelf) => {
					const filterBooks = books.filter(book => book.shelf === shelf.id);
					return (
						<div className="bookshelf" key={shelf.id}>
							<h2 className="bookshelf-title">{shelf.title}</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{filterBooks.map((book) => (
										<Book key={book.id} book={book} shelf={shelf.id} updateShelf={updateShelf} />
									))}
								</ol>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}

export default BookShelf