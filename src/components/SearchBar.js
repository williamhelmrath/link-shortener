import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  Button,
  FormHelperText,
} from "@material-ui/core";

const validUrl = require("valid-url");

export default function SearchBar({ handleShorten }) {
  const [link, setLink] = useState("");
  const [isValid, setIsValid] = useState(true);
  const updateLink = (e) => {
    setLink(e.target.value);
    if (!isValid) setIsValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validUrl.isWebUri(link)) handleShorten(link);
    else setIsValid(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined">
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div>
              <OutlinedInput
                id="outlined-adornment-search"
                error={!isValid}
                helperText="Invalid link"
                type="text"
                placeholder="Shorten your link"
                autoFocus={true}
                onChange={(e) => updateLink(e)}
                style={{
                  marginRight: "1vw",
                  background: "white",
                  width: "40vw",
                }}
              />
              {!isValid && <FormHelperText error>Invalid Link</FormHelperText>}
            </div>
            <Button
              variant="contained"
              color="primary"
              disabled={link.length === 0}
              onClick={(e) => handleSubmit(e)}
              style={{ height: "57px" }}
            >
              Shorten
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
}
