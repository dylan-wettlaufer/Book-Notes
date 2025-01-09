# Book Notes

## Overview
The **Book Notes Application** allows users to:
- Add books to their personal library.
- Write and organize notes for each book.

This application is built with:
- **Frontend:** React
- **Backend:** Node.js and Express
- **Database:** PostgreSQL

## Features
- Personal library management
- Note-taking functionality for books
- Responsive design for seamless use on multiple devices

---

## Installation and Setup

### Prerequisites
Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/dylan-wettlaufer/Book-Notes.git
cd Book-Notes
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd book-notes-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   touch .env
   ```
   Add the following variables to your `.env` file:
   ```env
   DB_PASSWORD=your_postgres_password
   DB_USER=your_postgres_user
   DB_HOST=localhost
   DB_NAME=book-notes
   DB_PORT=5432
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../book-notes-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

### Database Setup Using pgAdmin4
1. Open **pgAdmin4** and log in.
2. Right-click on "Servers" and select "Create" > "Server...".
3. In the "General" tab, enter a name for your server (e.g., `BookNotesDB`).
4. In the "Connection" tab, fill in the following details:
   - **Host name/address:** `localhost`
   - **Port:** `5432`
   - **Maintenance database:** `postgres`
   - **Username:** Your PostgreSQL username (e.g., `postgres`)
   - **Password:** Your PostgreSQL password
5. Click "Save" to connect to the server.
6. Once connected, right-click on "Databases" under your server and select "Create" > "Database...".
7. Enter `book-notes` as the database name and click "Save".
8. Your database is now ready for use.

### Access the Application
Once both servers are running, you can access the application in your browser at:
```
http://localhost:3000
```

---

## Folder Structure
```
Book-Notes/
├── book-notes-server/    # Backend code
├── book-notes-ui/        # Frontend code
└── README.md             # Project documentation
```

---

## API Credit
This project utilizes the Open Library API for book information. Special thanks to [Open Library](https://openlibrary.org/) for providing this service.

---

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

