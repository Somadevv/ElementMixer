import { Container } from "../Components/Container";
import { useEffect, useState } from "react";
import React from "react";
import { Input } from "../Components/Input";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
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
      <Container width={"100vw"} height={"100vh"} bgColor={"#0B1929"}>
        <div
          style={{
            marginRight: "12.5%",
            float: "left",
            width: "200px",
            height: "100vh",
            borderRight: "1px white groove",
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
              margin: "0 auto",
              width: "125px",
              height: "50px",
              borderBottom: "1px white groove",
            }}
          >
            <p style={{ color: "wheat", fontSize: "1.5rem" }}>NOTES</p>
          </div>
          {sessionVars.map((x, idx) => (
            <div
              style={{
                borderRadius: "7.5px",
                textAlign: "center",
                margin: "20px",
                paddingLeft: "5px",
                border: "1px white groove",
                width: "auto",
                height: "50px",
                color: "wheat",
                fontSize: "1rem",
              }}
            >
              <p key={idx}> {x.title}</p>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "relative",
            top: "10vh",
            display: "inline-block",
            width: "60%",
            height: "500px",
            border: "1px cyan groove",
            backgroundColor: "#1A202C",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "85%",
              border: "1px white groove",
              backgroundColor: "none",
              color: "wheat",
              fontSize: "1.75rem",
              textAlign: "center",
            }}
          >
            TITLE
            <Input width={"100px"} height={"50px"} placeholder={"TITLE"} innerRef={noteTitleRef} />
            <Input width={"100px"} height={"50px"} placeholder={"Add note body"} innerRef={noteBodyRef} />
          </div>
          <div style={{ bottom: "0", borderTop: "1px white groove" }}>
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
      </Container>
    </Fragment>
  );
}
