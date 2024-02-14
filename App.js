import React, { useState } from 'react';
import './App.css';



// MovieCard component
const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.posterURL} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

// MovieList component
const MovieList = ({ movies, onCardClick }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.title} movie={movie} onClick={onCardClick} />
      ))}
    </div>
  );
};

// Filter component
const Filter = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
    onFilterChange({ title: event.target.value, rate });
  };

  const handleRateChange = event => {
    setRate(event.target.value);
    onFilterChange({ title, rate: event.target.value });
  };

  return (
    <div className="filter">
      <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
      <input type="number" placeholder="Rate" value={rate} onChange={handleRateChange} />
    </div>
  );
};

// Main App component
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: "carter",
      description: "Description for Movie 1",
      posterURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwxRYxwsheC-nANognu6z9Va98XLoQLQ-xutuSAt713OufDyF",
      rating: 4,
      trailerLink: "https://youtu.be/JW7INCwnE1Y?si=x9FQH7YUACBA6e1m"
    },
    {
      title: "Interceptor",
      description: "Description for Movie 2",
      posterURL: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTxb7A9X-FoM6kcMiKTeoAa92cMutRrAvTqiQYUUGAFktPZbrLM",
      rating: 3,
      trailerLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Hitman",
      description: "Description for Movie 3",
      posterURL: "https://resizing.flixster.com/y3dP-69SxLG0WgHMCvLnNSl3KYM=/300x300/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p169802_v_v13_ax.jpg",
      rating: 5,
      trailerLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Function to add a new movie
  const addMovie = (title, description, posterURL, rating, trailerLink) => {
    const newMovie = { title, description, posterURL, rating, trailerLink };
    setMovies([...movies, newMovie]);
  };

  // Function to filter movies
  const handleFilterChange = ({ title, rate }) => {
    const filtered = movies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(title.toLowerCase());
      const rateMatch = rate === '' || movie.rating >= parseInt(rate);
      return titleMatch && rateMatch;
    });
    setFilteredMovies(filtered);
  };

  // Function to handle movie card click
  const handleCardClick = movie => {
    setSelectedMovie(movie);
  };

  // Function to go back to home page
  const goBackToHome = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      {selectedMovie ? (
        <div className="description-page">
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.description}</p>
          <iframe width="560" height="315" src={selectedMovie.trailerLink} title="Trailer" frameBorder="0" allowFullScreen></iframe>
          <button onClick={goBackToHome}>Go Back</button>
        </div>
      ) : (
        <div className="home-page">
          <Filter onFilterChange={handleFilterChange} />
          <MovieList movies={filteredMovies.length > 0 ? filteredMovies : movies} onCardClick={handleCardClick} />
          <button onClick={() => addMovie("New Movie", "Description", "https://via.placeholder.com/150", 0, "https://www.youtube.com/embed/dQw4w9WgXcQ")}>Add New Movie</button>
        </div>
      )}
    </div>
  );
};

export default App;
