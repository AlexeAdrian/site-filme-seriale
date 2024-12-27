'use client';
import React, {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import {Box, Typography, Card, CardMedia, CardContent, CircularProgress} from "@mui/material";

export default function MovieDetails() {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=771ef4f34ba0f808896ea9d73b270e5b`);
            setMovie(response.data);
            setLoading(false);
        } catch (error) {
            console.error(`The movie details are unavailable`, error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMovieDetails();
        } 
    }, [id]);

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight : "100vh" }}>
            <CircularProgress />;
            </Box>
        );
    } if (!movie) {
        return <Typography variant="h6">Movie not found!</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 2}}>
            <CardMedia component="img" height="500" image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt ={movie.title} />
            <CardContent>
                <Typography variant="h4" gutterBottom>{movie.title}                    
                </Typography>
                <Typography variant="body1" gutterBottom>{movie.overview}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Release Date: {movie.release_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average}/10
                </Typography>
            </CardContent>
        </Card>
    )
}