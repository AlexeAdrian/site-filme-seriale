"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import Link from 'next/link';

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeries = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=771ef4f34ba0f808896ea9d73b270e5b"
      );
      setSeries(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching series: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Box sx={{ backgroundColor: "#1e293b", minHeight: "100vh", padding: "20px", color: "white"}}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mt: 1, 
          fontFamily: "Lobster, cursive", 
          ml: 13
        }}
      >
        Popular Series
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {series.map((serie) => (
          <Link key={serie.id} href={`series/${serie.id}`} passHref>
            <Card 
              sx={{ 
                width: 200, 
                cursor: "pointer", 
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
              />
              <Typography
                variant="body2"
                sx={{ 
                  textAlign: "center", 
                  padding: 1, 
                  backgroundColor: "#393E46",
                  color: "#eeeeee"
                }}
              >
                {serie.name}
              </Typography>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
