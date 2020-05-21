import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
function App() {
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
  if (!postResp)
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Shorten your link!</h1>
        <SearchBar handleShorten={handleShorten} />
      </div>
    );
  console.log(postResp);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Shorten your link!</h1>
        <SearchBar handleShorten={handleShorten} />
      </div>
      <h1>Your new link is: {postResp.shortened_link}</h1>
    </div>
  );
}

export default App;
