'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CircularProgress } from '@mui/material';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=771ef4f34ba0f808896ea9d73b270e5b`
      );
      setMovie(response.data);

      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=771ef4f34ba0f808896ea9d73b270e5b`
      );
      const trailerData = trailerResponse.data.results.find(
        (video) => video.type === 'Trailer'
      );
      if (trailerData) {
        setTrailer(trailerData.key);
      }

      const similarMoviesResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=771ef4f34ba0f808896ea9d73b270e5b`
      );
      setSimilarMovies(similarMoviesResponse.data.results);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ marginLeft: 2 }}>Loading movie details...</Typography>
      </Box>
    );
  }

  if (!movie) {
    return <Typography variant="h6">Movie not found!</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: '#1e293b', color: 'white', padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Lobster, cursive', textAlign: 'center' }}>
        {movie.title}
      </Typography>
      
      <Card sx={{ backgroundColor: "#00010", maxWidth: 900, margin: '20px auto', padding: 2 }}>
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{ objectFit: 'contain' }}
        />
        <Typography variant="body1" sx={{ marginTop: 2 }}>{movie.overview}</Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {movie.release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average}/10
        </Typography>

        {trailer && (
          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            <Typography variant="h6">Trailer:</Typography>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        )}

        {similarMovies.length > 0 && (
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>Similar Movies:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {similarMovies.map((similarMovie) => (
                <Card key={similarMovie.id} sx={{ width: 200, cursor: 'pointer', borderRadius: '15px' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                  />
                  <Typography variant="body2" sx={{ textAlign: 'center', padding: 1, backgroundColor: '#393E46', color: '#eeeeee' }}>
                    {similarMovie.title}
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
