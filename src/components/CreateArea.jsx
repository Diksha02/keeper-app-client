import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [hiddenTitle, displayTitle] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();

    props.onAdd(note);
    
    setNote({
      title: "",
      content: ""
    });
    
  }

  function expand(event) {
    displayTitle(false);
  }

  return (
    <div>
      <form className="create-note">
        {!hiddenTitle && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={expand}
          value={note.content}
          placeholder="Take a note..."
          rows={hiddenTitle ? 1 : 3}
        />
        <Zoom in={!hiddenTitle}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
