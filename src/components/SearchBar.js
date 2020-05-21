import React, { useState } from "react";
import {
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (e) => setSearchTerm(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(searchTerm);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-search">
            Book Title
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-search"
            type="text"
            autoFocus={true}
            onChange={(e) => updateSearchTerm(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disabled={searchTerm.length === 0}
                  onClick={(e) => handleSubmit(e)}
                >
                  <SearchIcon></SearchIcon>
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </form>
    </div>
  );
}