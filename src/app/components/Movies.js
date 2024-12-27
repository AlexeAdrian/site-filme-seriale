"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import Link from 'next/link';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=771ef4f34ba0f808896ea9d73b270e5b"
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Popular Movies
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {movies.map((movie) => (
          <Link key={movie.id} href={`movie/${movie.id}`} passHref>
            <Card sx={{ width: 200, cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "center", padding: 1 }}
              >
                {movie.title}
              </Typography>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
