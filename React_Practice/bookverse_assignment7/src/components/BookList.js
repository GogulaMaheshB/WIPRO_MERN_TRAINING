import React, { useState } from "react";
import BookCard from "./BookCard";

function BookList() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", price: 399 },
    { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 299 },
    { id: 3, title: "Deep Work", author: "Cal Newport", price: 349 },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* View Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn btn-${view === "grid" ? "primary" : "outline-primary"}`}
          onClick={() => setView("grid")}
        >
          Grid View
        </button>

        <button
          className={`btn btn-${view === "list" ? "primary" : "outline-primary"}`}
          onClick={() => setView("list")}
        >
          List View
        </button>
      </div>

      {/* Books */}
      <div className={view === "grid" ? "row" : ""}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            view={view}
          />
        ))}
      </div>
    </>
  );
}

export default BookList;
