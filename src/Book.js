import React from 'react'
import PropTypes from 'prop-types';

class Book extends React.Component {
	state = {
		value: this.props.shelf ? this.props.shelf : 'none'
	}

	render() {
		const { value } = this.state;
		const { book, shelf, updateShelf } = this.props;

		if (!book.imageLinks) {
			book.imageLinks = 'https://via.placeholder.com/128x170/ff7f7f/333333?text=NoImage';
		}

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
						<div className="book-shelf-changer">
							<select value={shelf} onChange={(e) => updateShelf(book,e.target.value)} defaultValue={value}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					{book.authors ? book.authors.map((author) => (
						<div key={author} className="book-authors">{author}</div>
					)) : (
						<div className="book-authors">Unknown</div>
					)}
				</div>
			</li>	
		)
	}
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	shelf: PropTypes.string.isRequired,
	updateShelf: PropTypes.func.isRequired
};

export default Book