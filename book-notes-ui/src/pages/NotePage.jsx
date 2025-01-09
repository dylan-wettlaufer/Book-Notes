import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";

function NotePage() {

    const [notes, setNotes] = useState([]);
    const [book, setBook] = useState(null);

    const params = useParams();
    const id = params.id;

    useEffect(() => {
          const fetchNotes = async () => {
            try {
              const response = await fetch(`http://localhost:5000/api/note/${id}`);
              const data = await response.json()

              const {book, notes} = data;

              setBook(book) 
              setNotes(notes)
            } catch (err) {
              console.log(err);
            }
          }
          fetchNotes();
        }, [id]);

    return (
        <div>
        <Header />

        <div className="content">
            {book ? (
            <div className="book-info">
                <h2 className="book-title">{book.title}</h2>
                <img className="book-cover" src={book.image_url} alt="Book" />
                <Link to={`/create/${id}`}>
                    <button className="note-button">New Note</button>
                </Link>
                
            </div>
        ) : (
            <p>Loading book information...</p>
        )}

            <div className="note-container">
                {notes.map((note) => {
                    return <p key={note.id}>{note.note}</p>;
                })}
            </div>
        </div>

        <Link to="/">
            <button className="back-button">Back</button>
        </Link>
    </div>
    )
}

export default NotePage;