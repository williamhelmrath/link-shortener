import React, { useState } from "react";
import { FormControl, OutlinedInput } from "@material-ui/core";

export default function SearchBar({ handleShorten }) {
  const [link, setLink] = useState("");
  const updateLink = (e) => setLink(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShorten(link);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined">
          <OutlinedInput
            id="outlined-adornment-search"
            type="text"
            autoFocus={true}
            onChange={(e) => updateLink(e)}
          />
        </FormControl>
      </form>
    </div>
  );
}
