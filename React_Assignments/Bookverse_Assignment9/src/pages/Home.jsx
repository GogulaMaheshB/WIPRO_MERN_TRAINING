import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import withLoader from "../hoc/withLoader"
import FadeWrapper from "../components/FadeWrapper"

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(" http://localhost:3000/books")
      .then(res => res.json())
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
  }, [])

  return (
    <FadeWrapper>
      <h1 className="text-4xl font-bold mb-6 text-center">📚 BookVerse</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white/10 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <p className="text-gray-200">{book.author}</p>

            <Link
              to={`/book/${book.id}`}
              className="inline-block mt-4 px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600 transition"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </FadeWrapper>
  )
}

export default withLoader(Home)
