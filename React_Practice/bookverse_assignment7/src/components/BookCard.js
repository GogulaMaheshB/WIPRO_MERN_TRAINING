import React from "react";

function BookCard({ title, author, price, view }) {
  return (
    <div className={view === "grid" ? "col-md-4 mb-4" : "mb-3"}>
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">{title}</h5>
          <p className="card-text">Author: {author}</p>
          <p className="fw-bold">₹{price}</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
