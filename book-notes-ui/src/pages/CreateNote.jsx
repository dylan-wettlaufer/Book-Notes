import React, {useState, } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function CreateNote() {

    const params = useParams();
    const id = params.id;

    const [chapter, setChapter] = useState("");
    const [newNote, setNewNote] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/note",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    chapter,
                    newNote,
                    id
                  }),
                }
              );
              
            if (response.ok) {
                // Redirect to the notes page after successful submission
                navigate(`/notes/${id}`);
            } else {
                console.log("Failed to create note");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Header />
            <div className="create-note-div">
            
            <form className="note-form" onSubmit={(event) => handleSubmit(event)}>
                <input className="chapter-input" placeholder="Chapter" value={chapter} onChange={(event) => setChapter(event.target.value)}></input>
                <textarea className="new-note-input" placeholder="Note" value={newNote} onChange={(event) => setNewNote(event.target.value)}></textarea>
                <button className="submit-note-button" type="submit">Submit Note</button>
            </form>
            
        </div>
        </div>
        
    )
}

export default CreateNote;