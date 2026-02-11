import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import withLoader from "../hoc/withLoader"
import FadeWrapper from "../components/FadeWrapper"

const BookDetails = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data)
        setLoading(false)
      })
  }, [id])

  if (!book) return null

  return (
    <FadeWrapper>
      <div className="max-w-xl mx-auto bg-white/10 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-200 mb-4">{book.author}</p>
        <p className="mb-6">{book.description}</p>

        <Link
          to="/home"
          className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
        >
          ← Back to Home
        </Link>
      </div>
    </FadeWrapper>
  )
}

export default withLoader(BookDetails)
