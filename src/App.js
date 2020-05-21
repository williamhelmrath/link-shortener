import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

export default function App() {
  const [postResp, setPostResp] = useState(null);

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
          style={{ maxWidth: "70vw", marginBottom: "2vh" }}
        >
          <h1>
            Have a long-ass link that you need to shorten? Let Bro Shortener do
            the heavy lifting for you!
          </h1>
        </Paper>

        <SearchBar handleShorten={handleShorten} />

        {postResp && (
          <h1>
            Your new link is: bro-shortener.herokuapp.com/
            {postResp.shortened_link}
          </h1>
        )}
      </div>
    </CssBaseline>
  );
}
