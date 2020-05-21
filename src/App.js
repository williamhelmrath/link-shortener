import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import "./App.css";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function App() {
  const [postResp, setPostResp] = useState(null);
  const [copied, setCopied] = useState(false);
  const shortenerUrl = "bro-shortener.herokuapp.com/";
  const handleShorten = (link) => {
    fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: link }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((newUrl) => {
        setPostResp(newUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCopied(false);
  };

  return (
    <CssBaseline>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          variant="outlined"
          style={{
            maxWidth: "70vw",
            marginBottom: "2vh",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" style={{ marginBottom: "30px" }}>
            Have a long-ass link that you need to shorten? Let Bro Shortener do
            the heavy lifting for you!
          </Typography>
          <SearchBar handleShorten={handleShorten} />
        </Paper>

        {postResp ? (
          <div
            style={{
              marginTop: "2vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <OutlinedInput
              readOnly
              defaultValue={shortenerUrl + postResp.shortened_link}
              style={{ marginRight: "1vw", width: "30vw" }}
            ></OutlinedInput>
            <CopyToClipboard
              text={shortenerUrl + postResp.shortened_link}
              onCopy={() => setCopied(true)}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ height: "53px" }}
              >
                Copy URL
              </Button>
            </CopyToClipboard>
          </div>
        ) : null}
        <Snackbar open={copied} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="info">Copied!</Alert>
        </Snackbar>
      </div>
    </CssBaseline>
  );
}
