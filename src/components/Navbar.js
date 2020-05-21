import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Navbar() {
  return (
    <AppBar position="static" style={{ marginBottom: "2vh", display: "flex" }}>
      <Toolbar variant="dense">
        <Typography variant="h6" style={{ marginRight: "1vh" }}>
          Bro Shortener
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
