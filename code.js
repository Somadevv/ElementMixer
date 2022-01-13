import { useEffect, useState } from "react";
import React from "react";
import { Input } from "../Components/Input";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [note, setNote] = useState([]);
  const [sessionVars, setSessionVars] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const noteTitleRef = React.createRef();
  const noteBodyRef = React.createRef();

  const addNote = (x, y) => {
    let notes = [...note];
    notes.push({ title: x, body: y });
    setNote(notes);
    (noteTitleRef.current.value = ""), (noteBodyRef.current.value = "");
  };

  useEffect(() => {
    let tempSessionVariables = [];
    note.forEach((note, index) => {
      let data = { title: note.title, body: note.body };
      window.sessionStorage.setItem(`Note: ${index}`, JSON.stringify(data));
      tempSessionVariables.push(JSON.parse(window.sessionStorage.getItem(`Note: ${index}`)));
      let parsedTempSessionVariables = Object.values(tempSessionVariables);
      setSessionVars(parsedTempSessionVariables);
    });
  }, [note]);

  return (
    <Fragment>
      <div className="container">
        <div className="sidebar">
          <div className="notesIntro">
            <p className="notesText">NOTES</p>
          </div>
          {sessionVars.map((x, idx) => (
            <div className="notesTextContainer">
              <p key={idx}> {x.title}</p>
            </div>
          ))}
        </div>

        <div className="notepadViewContainer">
          <div className="notepadTitleContainer">
          <TextField
            inputRef={noteTitleRef}
            InputLabelProps={{
              style: { color: 'white'}, 
           }}
            id="standard-basic"
            label="Title"
            variant="standard"
          />
          </div>
       
          <LoadingButton
              color="secondary"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                addNote(noteTitleRef.current.value, noteBodyRef.current.value);
                setLoading(false);
                }, 1000);
              }}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </LoadingButton>
        </div>
      </div>
    </Fragment>
  );
}
