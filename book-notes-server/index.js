import express from "express";
import pg from "pg";
import cors from "cors";
import axios  from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 5000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "book-notes",
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
  
db.connect();

app.use(express.json());
app.use(cors());

app.get("/api/book", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM book");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/api/note/:id", async (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        return res.status(400).send("ID must be a valid number");
    }
    try {
        const bookResult = await db.query("SELECT * FROM book WHERE id = $1", [id])
        //SELECT note.id, note.note, book.title, book.image_url FROM note JOIN book ON note.book_id = book.id WHERE book.id = $1;
        const result = await db.query("SELECT * FROM note WHERE book_id = $1", [id]);
        const book = bookResult.rows[0];
        res.json({book, notes: result.rows}); 
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
})

app.post("/api/book/:title/:author", async (req, res) => {
    const title = req.params.title.toLowerCase();
    const author = req.params.author.toLowerCase();

    if (!title || !author) {
        return res.status(400).send("title and author fields required");
    }

    try {
        const response = await axios.get(`https://openlibrary.org/search.json`, {
            params: { title }
          });

        const book = response.data.docs.find(
            (doc) =>
                doc.language && doc.language.includes("eng") &&
                doc.title.toLowerCase() === title && 
                doc.author_name && 
                doc.author_name.some((name) => name.toLowerCase() === author) 
        );

        if (book && book.cover_i) {
            const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

            try {
                const result = await db.query(
                    "INSERT INTO book (title, image_url) VALUES ($1, $2) RETURNING *;",
                [book.title, coverUrl]);

                res.json(result.rows[0]);

            } catch (err) {
                res.status(500).send("Something went wrong");
            }
            
        } else {
            res.status(404).json({ error: "Book cover not found" });
        }

    } catch (err) {
        res.status(500).json({error: "Failed to fetch book cover"});
    }
});

app.post("/api/note", async (req, res) => {
    const { chapter, newNote, id } = req.body;

    if (!newNote) {
        return res.status(400).send("title and author fields required");
    }

    if (!chapter || isNaN(chapter) || chapter <= 0) {
        return res.status(400).send("Chapter must be a valid positive number");
    }

    if (!id || isNaN(id) || id < 0) {
        return res.status(400).send("ID must be a valid number");
    }

    try {
        const result = await db.query("INSERT INTO note (note, book_id, chapter_number) VALUES ($1, $2, $3) RETURNING *;", [newNote, id, chapter]);
        console.log(result.rows);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }


})

app.delete("/api/book/:id", async (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        return res.status(400).send("ID must be a valid number");
    }

    try {
        await db.query("DELETE FROM book WHERE id = $1", [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  