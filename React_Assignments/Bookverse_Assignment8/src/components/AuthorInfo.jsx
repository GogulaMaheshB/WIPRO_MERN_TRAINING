import React, { Component } from "react";

class AuthorInfo extends Component {
  componentDidMount() {
    console.log("📘 Author data loaded:", this.props.author.author);
  }

  render() {
    const { author } = this.props;

    return (
      <div className="card border-success">
        <div className="card-body">
          <h4 className="card-title">{author.author}</h4>
          <p className="card-text">{author.bio}</p>

          <h6>Top 3 Books:</h6>
          <ul>
            {author.topBooks.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default AuthorInfo;
