import React, {useState, useEffect} from 'react';
import '../App.css';
import BookForm from '../components/BookForm';
import Book from '../components/Book';
import Header from '../components/Header';

function BookPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/book");
          const books = await response.json() 
          setBooks(books);
          console.log(books);
        } catch (err) {
          console.log(err);
        }
      }
      fetchBooks();
    }, []);

    async function handleSubmit(event, title, author)  {
        event.preventDefault();
        if (books.includes(title)) {
        console.log("Book is already added");
        } else {

        try {
            const response = await fetch(
            `http://localhost:5000/api/book/${title}/${author}`,
            {
                method: "POST",
            }
            );

            const newBook = await response.json();
            setBooks([...books, newBook]);

        } catch (err) {
            console.log(err);
        }
        }
    }

    async function deleteBook(bookID) {
        try {
        await fetch(`http://localhost:5000/api/book/${bookID}`,
            {
            method: "DELETE",
            });

            const updatedBookList = books.filter(
            (book) => book.id !== bookID
            )
            setBooks(updatedBookList)
        } catch (err) {
        console.log(err);
        }
    }

    return (
        <div className='app-container'>
            <Header />
            <BookForm submitFunction={handleSubmit} />
            <div className='book-container'>
                {books.map((book) => {
                return (
                    <Book key={book.id} title={book.title} image_url={book.image_url} id={book.id} delete={deleteBook} />
                )
                })}
            </div>
        </div>
    )
}

export default BookPage;