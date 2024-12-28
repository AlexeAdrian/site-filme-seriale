'use client';
import React, {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import {Box, Typography, Card, CardMedia, CardContent, CircularProgress} from "@mui/material";

export default function SerieDetails() {
    const {id} = useParams();
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSerieDetails = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=771ef4f34ba0f808896ea9d73b270e5b`);
            setSerie(response.data);
            setLoading(false);
        } catch (error) {
            console.error(`The serie details are unavailable`, error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSerieDetails();
        } 
    }, [id]);

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight : "100vh" }}>
            <CircularProgress />
            </Box>
        );
    } if (!serie) {
        return <Typography variant="h6">Serie not found!</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 2}}>
            <CardMedia component="img" height="500" image={`https://image.tmdb.org/t/p/w500${serie.poster_path || ''}`} alt ={serie.name} sx={{ objectFit: "contain", widht: "100%", maxHeight: "500px"}} />
            <CardContent>
                <Typography variant="h4" gutterBottom>{serie.name}                    
                </Typography>
                <Typography variant="body1" gutterBottom>{serie.overview}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Release Date: {serie.first_air_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {serie.vote_average}/10
                </Typography>
            </CardContent>
        </Card>
    )
}