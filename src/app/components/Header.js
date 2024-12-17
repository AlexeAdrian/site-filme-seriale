"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AppBar position="static" style={{ backgroundColor: "#244848" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#F5F5DC" }}>
          2Watch.Ro
        </Typography>
        <Button sx={{ color: "#F5F5DC" }}>About</Button>
        <Button sx={{ color: "#F5F5DC" }}>Movies</Button>
        <Button sx={{ color: "#F5F5DC" }}>Series</Button>
      </Toolbar>
    </AppBar>
  );
}
