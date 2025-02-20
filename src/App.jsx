import { useRef, useState } from "react";
import "./index.css";

function Table({ arr, deleteBook }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Year</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {arr.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.author}</td>
            <td>{item.year}</td>
            <td>
              <button className="delete-btn" onClick={() => deleteBook(index)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [book_list, setBookList] = useState([
    { name: "Book 1", author: "Author 1", year: 2000 },
    { name: "Book 2", author: "Author 2", year: 2001 },
  ]);

  const nameRef = useRef();
  const authorRef = useRef();
  const yearRef = useRef();

  const addBook = () => {
    if (
      !nameRef.current.value.trim() ||
      !authorRef.current.value.trim() ||
      !yearRef.current.value.trim()
    ) {
      alert("Please fill in all fields before adding a book.");
      return;
    }

    setBookList([
      ...book_list,
      {
        name: nameRef.current.value,
        author: authorRef.current.value,
        year: Number(yearRef.current.value), 
      },
    ]);

    nameRef.current.value = "";
    authorRef.current.value = "";
    yearRef.current.value = "";
  };

  const deleteBook = (index) => {
    const updatedList = book_list.filter((_, i) => i !== index);
    setBookList(updatedList);
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Book List</h1>
        <input ref={nameRef} type="text" placeholder="Enter the name of book" />
        <input ref={authorRef} type="text" placeholder="Enter the name of author" />
        <input ref={yearRef} type="number" placeholder="Enter the year of book" />
        <button onClick={addBook}>Add New Book</button>
      </div>
      <div className="BookList">
        <Table arr={book_list} deleteBook={deleteBook} />
      </div>
    </div>
  );
}

export default App;
