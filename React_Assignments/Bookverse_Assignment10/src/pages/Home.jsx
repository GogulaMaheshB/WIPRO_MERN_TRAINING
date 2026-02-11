import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BookStore from "../flux/stores/BookStore"
import FadeWrapper from "../components/FadeWrapper"

const Home = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const updateBooks = () => {
      setBooks(BookStore.getBooks())
    }

    BookStore.addChangeListener(updateBooks)
    updateBooks()

    return () => BookStore.removeChangeListener(updateBooks)
  }, [])

  return (
    <FadeWrapper>
      <h1 className="text-4xl font-bold mb-6 text-center">📚 BookVerse</h1>

      <Link to="/add-book" className="block text-center mb-6 underline">
         Add New Book
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white/10 p-6 rounded-xl">
            <h2 className="text-2xl">{book.title}</h2>
            <p>{book.author}</p>

            <Link
              to={`/book/${book.id}`}
              className="inline-block mt-4 bg-pink-500 px-4 py-2 rounded"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </FadeWrapper>
  )
}

export default Home
