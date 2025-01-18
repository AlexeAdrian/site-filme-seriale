import React from "react";
import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        backgroundColor: "#1e293b",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        About 2Watch.Ro
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Welcome to 2Watch.Ro! Here you can watch all your favorite movies and
        series, free of charge and without any cost. Enjoy a wide range of
        content, from classic films to the latest releases.
      </Typography>
      <Typography variant="body1">
        The site was created as part of a project, and i hope you enjoy
        exploring all the great content it has to offer. Feel free to browse and
        watch at any time!
      </Typography>
    </Box>
  );
}
