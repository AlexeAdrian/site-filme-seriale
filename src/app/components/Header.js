"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
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
    <AppBar position="static" style={{ backgroundColor: "#000010" }}>
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
            borderRadius: "20px",
            padding: "2px 10px",
            marginRight: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <TextField
            placeholder="Search..."
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              marginRight: "8px",
              width: "200px",
              "& .MuiInput-underline:before": {
                borderBottomColor: "transparent",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#000010",
              color: "#fff",
              textTransform: "none",
              fontSize: "14px",
              padding: "4px 12px",
              borderRadius: "20px",
              boxShadow: "none",
            }}
          >
            Search
          </Button>
        </Box>
        <Button sx={{ color: "#F5F5DC" }}>
          <Link
            href="/about"
            style={{ textDecoration: "none", color: "#F5F5DC" }}
          >
            About
          </Link>
        </Button>
        <Button sx={{ color: "#F5F5DC" }}>
          <Link
            href="/movies"
            style={{ textDecoration: "none", color: "#F5F5DC" }}
          >
            Movies
          </Link>
        </Button>
        <Button sx={{ color: "#F5F5DC" }}>
          <Link
            href="/series"
            style={{ textDecoration: "none", color: "#F5F5DC" }}
          >
            Series
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
