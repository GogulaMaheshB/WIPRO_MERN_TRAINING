import Dispatcher from "../dispatcher/AppDispatcher"

const BookActions = {
  addBook(book) {
    Dispatcher.dispatch({
      type: "ADD_BOOK",
      payload: book
    })
  }
}

export default BookActions
