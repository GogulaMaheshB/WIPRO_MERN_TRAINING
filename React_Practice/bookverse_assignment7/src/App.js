import React from "react";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="container my-4 border px-0.5 py-0.5 border-amber-100 mb-1.5 m-2">
      <h1 className="text-center text-primary mb-4">
        📚 BookVerse
      </h1>
      <BookList />
    </div>
  );
}


export default App;
