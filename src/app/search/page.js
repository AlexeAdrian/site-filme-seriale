"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from "@mui/material";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const type = searchParams.get("type") || "movie";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${type}?api_key=771ef4f34ba0f808896ea9d73b270e5b&query=${query}`
        );
        setResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch search results", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, type]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!results.length) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
        No results found for "{query}".
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Results for "{query}":
      </Typography>
      <Grid container spacing={2}>
        {results.map((result) => (
          <Grid item xs={12} sm={6} md={3} key={result.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${result.poster_path || ""}`}
                alt={result.title || result.name}
              />
              <CardContent>
                <Typography variant="h6">{result.title || result.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
