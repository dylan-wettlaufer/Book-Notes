import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

function Book(props) {
    return (
        <div className='book-item'>
            <header className='book-header'>
              <h3 className='book-title'>{props.title}</h3>
              <button className='remove-button' onClick={() => props.delete(props.id)}>X</button>
            </header>
            <img className='book-cover' src={props.image_url} alt={props.title}/>
            <Link to={`/notes/${props.id}`}>
                <button className="link-button">
                    Notes
                </button>
            </Link>
          </div>
    )
}

export default Book;