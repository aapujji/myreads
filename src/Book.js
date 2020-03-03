import React from 'react'

class Book extends React.Component {
	state = {
		value: this.props.book.shelf
	}

	render() {
		const { value } = this.state;
		const { book, updateShelf } = this.props;
		console.log(book);

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
						<div className="book-shelf-changer">
							<select onChange={(e) => updateShelf(book,e.target.value)} defaultValue={value}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					{book.authors.map((author) => (
						<div key={author} className="book-authors">{author}</div>
					))}
				</div>
			</li>	
		)
	}
}

export default Book