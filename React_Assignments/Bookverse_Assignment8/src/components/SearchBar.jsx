import React, { Component, createRef } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
  }

  focusInput = () => {
    this.searchRef.current.focus();
  };

  render() {
    return (
      <div className="mb-4 text-center">
        <input
          type="text"
          ref={this.searchRef}
          className="form-control mb-2"
          placeholder="Search books..."
        />
        <button className="btn btn-primary" onClick={this.focusInput}>
          Focus Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
