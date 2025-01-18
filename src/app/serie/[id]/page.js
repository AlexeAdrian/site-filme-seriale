"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";

export default function SeriesDetails() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [similarSeries, setSimilarSeries] = useState([]);

  const fetchSeriesDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=771ef4f34ba0f808896ea9d73b270e5b`
      );
      setSerie(response.data);

      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=771ef4f34ba0f808896ea9d73b270e5b`
      );
      const trailerData = trailerResponse.data.results.find(
        (video) => video.type === "Trailer"
      );

      if (trailerData) {
        setTrailer(trailerData.key);
      } else {
        setTrailer(null);
      }

      const similarSeriesResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=771ef4f34ba0f808896ea9d73b270e5b`
      );
      setSimilarSeries(similarSeriesResponse.data.results);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching series details: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeriesDetails();
  }, [id]);

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
        <Typography sx={{ marginLeft: 2 }}>
          Loading series details...
        </Typography>
      </Box>
    );
  }

  if (!serie) {
    return <Typography variant="h6">Series not found!</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#1e293b", color: "white", padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "Lobster, cursive", textAlign: "center" }}
      >
        {serie.name}
      </Typography>

      <Card sx={{ maxWidth: 900, margin: "20px auto", padding: 2 }}>
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
          alt={serie.name}
          sx={{ objectFit: "contain" }}
        />
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {serie.overview}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          First Air Date: {serie.first_air_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {serie.vote_average}/10
        </Typography>

        {trailer ? (
          <Box sx={{ marginTop: 3, textAlign: "center" }}>
            <Typography variant="h6">Trailer:</Typography>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 2 }}
          >
            No trailer available for this series.
          </Typography>
        )}

        {similarSeries.length > 0 && (
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
              Similar Series:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {similarSeries.map((similarSerie) => (
                <Card
                  key={similarSerie.id}
                  sx={{ width: 200, cursor: "pointer", borderRadius: "15px" }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${similarSerie.poster_path}`}
                    alt={similarSerie.name}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      padding: 1,
                      backgroundColor: "#393E46",
                      color: "#eeeeee",
                    }}
                  >
                    {similarSerie.name}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
}
