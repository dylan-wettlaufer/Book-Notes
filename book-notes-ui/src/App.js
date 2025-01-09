import {HashRouter as Router, Routes, Route} from "react-router-dom";
import BookPage from "./pages/BookPage";
import NotePage from "./pages/NotePage";
import CreateNote from "./pages/CreateNote";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookPage/>}/>
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/create/:id" element={<CreateNote />} />
      </Routes>
    </Router>
  )
  
}

export default App;