import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.js"
import NotesList from "./components/notes-list.component"
import EditNote from "./components/edit-note.component"
import CreateNote from "./components/create-note.component"
import DisplayNote from './components/display-note.component.js';




function App() {

  return (
    
    <Router>
      <Navbar/>
      <br />
      <div className="container">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/display/:id" component={DisplayNote} />
        <Route path="/create" component={CreateNote} />

      </div>

    </Router>

  );
}

export default App;
