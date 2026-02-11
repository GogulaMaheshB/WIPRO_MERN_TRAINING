import React, { Component } from "react";
import PropTypes from "prop-types";

class BookCard extends Component {
  render() {
    const { title, author, onSelect } = this.props;

    return (
      <div className="col-md-6 mb-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Author: {author}</p>
            <button className="btn btn-outline-primary" onClick={onSelect}>
              View Author
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BookCard;
