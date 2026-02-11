import { useParams, Link } from "react-router-dom"
import bookStore from "../flux/stores/BookStore"
import FadeWrapper from "../components/FadeWrapper"

const BookDetails = () => {
  const { id } = useParams()
  const book = bookStore.getBooks().find(b => b.id == id)

  if (!book) return null

  return (
    <FadeWrapper>
      <div className="max-w-xl mx-auto bg-white/10 p-8 rounded-xl">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-lg mb-4">{book.author}</p>
        <p>Price: ₹{book.price}</p>

        <Link to="/home" className="block mt-4 underline">
          ← Back
        </Link>
      </div>
    </FadeWrapper>
  )
}

export default BookDetails
