"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const type = searchParams.get("type") || "movie";
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchQuery.trim() === "") return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${type}?api_key=771ef4f34ba0f808896ea9d73b270e5b&query=${searchQuery}`
        );
        setResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch search results", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, 1000);

  return () => clearTimeout(debounceSearch); 
}, [searchQuery, type]);

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    if (event.key === "Enter") {
      if (newQuery) {
        router.push(`/search?query=${newQuery}&type=${type}`);
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!results.length) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
        No results found for "{searchQuery}".
      </Typography>
    );
  }
  // bara de cautare
  return (
    <Box
      sx={{
        backgroundColor: "#1e293b",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <TextField
          label="Search for a movie or series"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />
      </Box>

      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 1, fontFamily: "Lobster, cursive", ml: 13 }}
      >
        Results for "{searchQuery}":
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {results.map((result) => (
          <Link key={result.id} href={`movies/${result.id}`} passHref>
            <Card
              sx={{
                width: 200,
                cursor: "pointer",
                borderRadius: "16px",
                backgroundColor: "#374151",
                color: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${
                  result.poster_path || ""
                }`}
                alt={result.title || result.name}
              />
              <CardContent sx={{ padding: "8px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    height: "50px",
                    padding: 1,
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    overflow: "visible",
                  }}
                >
                  {result.title || result.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
