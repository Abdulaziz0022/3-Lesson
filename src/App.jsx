import { useRef, useState } from "react";
import "./index.css";

function Table({ books, deleteBook, editBook }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Year</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={index}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>
              <button className="delete-btn" onClick={() => deleteBook(index)}>
                Delete
              </button>
            </td>
            <td>
              <button className="edit-btn" onClick={() => editBook(index)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [books, setBooks] = useState([
    { name: "Book 1", author: "Author 1", year: 2000 },
    { name: "Book 2", author: "Author 2", year: 2001 },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const nameRef = useRef();
  const authorRef = useRef();
  const yearRef = useRef();

  const saveBook = () => {
    const name = nameRef.current.value.trim();
    const author = authorRef.current.value.trim();
    const year = yearRef.current.value.trim();

    if (!name || !author || !year) {
      alert("Please fill in all fields before saving.");
      return;
    }

    if (editIndex === null) {
      setBooks([...books, { name, author, year: Number(year) }]);
    } else {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = { name, author, year: Number(year) };
      setBooks(updatedBooks);
      setEditIndex(null);
    }

    nameRef.current.value = "";
    authorRef.current.value = "";
    yearRef.current.value = "";
  };

  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const editBook = (index) => {
    const book = books[index];
    nameRef.current.value = book.name;
    authorRef.current.value = book.author;
    yearRef.current.value = book.year;
    setEditIndex(index);
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Book List</h1>
        <input ref={nameRef} type="text" placeholder="Enter book name" />
        <input ref={authorRef} type="text" placeholder="Enter author name" />
        <input ref={yearRef} type="number" placeholder="Enter year" />
        <button onClick={saveBook}>
          {editIndex === null ? "Add Book" : "Update Book"}
        </button>
      </div>
      <div className="BookList">
        <Table books={books} deleteBook={deleteBook} editBook={editBook} />
      </div>
    </div>
  );
}

export default App;
