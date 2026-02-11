import Dispatcher from "../dispatcher/AppDispatcher"

let books = []

const listeners = []

const BookStore = {
  getBooks() {
    return books
  },

  emitChange() {
    listeners.forEach(listener => listener())
  },

  addChangeListener(listener) {
    listeners.push(listener)
  },

  removeChangeListener(listener) {
    const index = listeners.indexOf(listener)
    if (index > -1) listeners.splice(index, 1)
  }
}

Dispatcher.register(action => {
  switch (action.type) {
    case "ADD_BOOK":
      books = [...books, { ...action.payload, id: Date.now() }]
      BookStore.emitChange()
      break
    default:
      break
  }
})

export default BookStore
