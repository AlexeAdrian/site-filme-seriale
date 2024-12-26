"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        width: "100%",
        backgroundColor: "#244848",
        color: "#F5F5DC",
      }}
    >
      <AppBar position="static" style={{ backgroundColor: "inherit" }}>
        <Toolbar>
          <Typography
            variant="body1"
            sx={{ flexGrow: 1, textAlign: "center", color: "#F5F5DC" }}
          >
            © 2024 2Watch.Ro. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
