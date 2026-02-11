import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import BookDetails from "./pages/BookDetails"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  )
}

export default App
