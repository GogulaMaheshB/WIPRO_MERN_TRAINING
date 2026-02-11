import React, { Component } from "react";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";

class App extends Component {
  componentDidMount() {
    console.log("📚 BookVerse App Loaded");
  }

  render() {
    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">📖 BookVerse</h1>
        <SearchBar />
        <BookList />
      </div>
    );
  }
}

export default App;
