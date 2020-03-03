import React from 'react'
import Book from './Book'

class BookSearch extends React.Component {
	render() {
		const { book, updateShelf } = this.props;

		return (
			<Book book={book} updateShelf={updateShelf} />
		)
	}
}

export default BookSearch