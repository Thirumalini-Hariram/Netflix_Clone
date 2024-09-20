import React, { useEffect, useState } from 'react';
import axios from './axios';
import YouTube from 'react-youtube';
import './Row.css';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargerow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            const movieName = movie?.name || movie?.title || movie?.original_name || "";
            
            movieTrailer(movieName)
                .then((url) => {
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get('v'));
                    } else {
                        console.log(`Trailer not found for movie: ${movieName}`);
                    }
                })
                .catch((error) => console.error('Error finding the trailer:', error));
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        className={`row__poster ${isLargerow && "row_posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargerow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name || movie.title || "Movie Poster"}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
