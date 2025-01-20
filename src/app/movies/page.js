"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Link from "next/link";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("28");
  const [genres] = useState([
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "27", name: "Horror" },
    { id: "53", name: "Thriller" },
    { id: "12", name: "Adventure" },
    { id: "18", name: "Drama" },
    { id: "10749", name: "Romance" },
    { id: "14", name: "Fantasy" },
    { id: "878", name: "Science Fiction" },
    { id: "16", name: "Animation" },
    { id: "9648", name: "Mystery" },
    { id: "99", name: "Documentary" },
    { id: "10751", name: "Family" },
  ]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=771ef4f34ba0f808896ea9d73b270e5b&with_genres=${selectedGenre}&page=1`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies: ", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#1e293b",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <Box sx={{ marginBottom: "20px", textAlign: "left" }}>
        <FormControl variant="filled" sx={{ minWidth: 200 }}>
          <InputLabel>Choose Genre</InputLabel>
          <Select 
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Choose Genre"
            sx={{
              backgroundColor: "#374151",
              color: "white",
            }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
          fontFamily: "Lobster, cursive",
          marginLeft: "13px",
          color: "#F5F5DC",
        }}
      >
        {genres.find((genre) => genre.id === selectedGenre)?.name} Movies
      </Typography> 

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {movies.slice(0, 20).map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
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
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  padding: 1,
                  color: "#F5F5DC",
                  height: "50px",
                }}
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
