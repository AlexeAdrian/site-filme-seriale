"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, TextField, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#244848" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#F5F5DC" }}>
          2Watch.Ro
        </Typography>
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F5F5DC",
            borderRadius: "4px",
            padding: "2px 8px",
            marginRight: "16px",
          }}
        >
          <TextField
            placeholder="Cauta..."
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              marginRight: "8px",
              width: "200px",
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Box>
        <Button sx={{ color: "#F5F5DC" }}>
          <Link href="/about" style={{ textDecoration: "none", color: "#F5F5DC" }}>
            About
          </Link>
        </Button>
        <Button sx={{ color: "#F5F5DC" }}>
          <Link href="/movies" style={{ textDecoration: "none", color: "#F5F5DC" }}>
            Movies
          </Link>
        </Button>
        <Button sx={{ color: "#F5F5DC" }}>
          <Link href="/series" style={{ textDecoration: "none", color: "#F5F5DC" }}>
            Series
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
