import React, { Component } from "react";
import BookCard from "./BookCard";
import AuthorInfo from "./AuthorInfo";

class BookList extends Component {
    state = {
        selectedAuthor: null,
        books: [
            {
                id: 1,
                title: "The React Way",
                author: "Dan Abramov",
                bio: "Core team member of React.",
                topBooks: ["Redux Explained", "React Patterns", "JS Deep Dive"]
            },
            {
                id: 2,
                title: "Learning JavaScript",
                author: "Kyle Simpson",
                bio: "Author of You Don’t Know JS.",
                topBooks: ["YDKJS Scope", "YDKJS Async", "ES6 & Beyond"]
            }, {
                id: 3,
                title: "Clean Code",
                author: "Robert C. Martin",
                bio: "Software engineer and author known as Uncle Bob.",
                topBooks: ["Clean Architecture", "Agile Principles", "Clean Coder"]
            }
        ]
    };

    handleSelect = (book) => {
        this.setState({ selectedAuthor: book });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        {this.state.books.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.title}
                                author={book.author}
                                onSelect={() => this.handleSelect(book)}
                            />
                        ))}
                    </div>
                </div>

                <div className="col-md-4">
                    {this.state.selectedAuthor && (
                        <AuthorInfo author={this.state.selectedAuthor} />
                    )}
                </div>
            </div>
        );
    }
}

export default BookList;
