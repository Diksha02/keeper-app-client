import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([])
  let count = 0;

  function addNote(newNote) {
    
    const payload = { title: newNote.title, content: newNote.content };
    
    axios({
      url: "https://my-mernstack-keeper-app.herokuapp.com/api/addNote",
      method: "post",
      data: payload
    })
      .then(() => {
        setNotes((prevNotes) => {
          return [...prevNotes, newNote];
        });
        count++;
      })
      .catch(() => {
        console.log("Internal server error");
      });
    
  }

  function deleteNote(id) {
    axios({
      url: "https://my-mernstack-keeper-app.herokuapp.com/api/deleteNote",
      method: "post",
      data: {Id: id}
    })
      .then(()=>{
        count++;
        updateData();
      })
      .catch(()=>{
        console.log("Internal server error");
      });
  
  }

  function updateData() {
    axios.get("https://my-mernstack-keeper-app.herokuapp.com/api/updateNoteList")
      .then((response) => {
      const notesList = response.data;
      console.log("updated");
      setNotes(notesList);
        
      })
      .catch(() => {
        console.log("Internal Server Error");
      });

  }

  useEffect(() => {
    updateData();
  }, [count]);

  

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );

      })}
      <Footer />
    </div>
  );
}

export default App;
