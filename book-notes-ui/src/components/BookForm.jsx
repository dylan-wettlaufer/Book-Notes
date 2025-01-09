import React, {useState} from "react";
import '../App.css';

function BookForm(props) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    return (
        <form className='book-form' onSubmit={(event) => {
            props.submitFunction(event, title, author);
            setTitle("");
            setAuthor("");
          }}>
            <input placeholder="Book Title" onChange={(event) => {
              setTitle(event.target.value)
            }}
            value={title}></input>
            <input placeholder='Author' onChange={(event => setAuthor(event.target.value))} value={author}></input>
            <button className="book-form-button" type="submit">Add Book</button>
          </form>
    )
}

export default BookForm;