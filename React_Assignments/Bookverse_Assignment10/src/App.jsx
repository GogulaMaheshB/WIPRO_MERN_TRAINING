import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import BookDetails from "./pages/BookDetails"
import AddBook from "./pages/AddBook"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/add-book" element={<AddBook />} />
    </Routes>
  )
}

export default App
