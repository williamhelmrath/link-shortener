import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Paper from "@material-ui/core/Paper";
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
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper variant="outlined" style={{ maxWidth: "40vw" }}>
          Have a long-ass link that you need to shorten? Let Bro Shortener do
          the heavy lifting for you!
        </Paper>
        <div>
          <h1>Shorten your link!</h1>
          <SearchBar handleShorten={handleShorten} />
        </div>
      </div>
      {postResp && (
        <h1>
          Your new link is: broshortener.herokuapp.com/{postResp.shortened_link}
        </h1>
      )}
    </div>
  );
}
