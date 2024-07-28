//export const MainView = () => {
//  return (
//    <div>
//      <div>Eloquent JavaScript</div>
//      <div>Mastering JavaScript Functional Programming</div>
//      <div>JavaScript: The Good Parts</div>
//      <div>JavaScript: The Definitive Guide</div>
//      <div>The Road to React</div>
//    </div>
//  );
//};

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export const MainView = () => {
  const [movies, setmovies] = useState([
    {
      id: 1,
      title: 'Piku',
      description:
        'Piku Banerjee (Deepika Padukone) is an architect residing in Chittaranjan Park, Delhi with her 70-year-old widower father, Bhashkor (Amitabh Bachchan). Bhashkor is a hypochondriac with chronic constipation, who traces every problem to his bowel movements',
      genre: 'Comedy',
      director: 'Shoojit Sircar',
    },
    {
      id: 2,
      title: '3-Idiots',
      description:
        '3 IDIOTS follows college best friends, Farhan (R. Madhavan) and Raju (Sharman Joshi), who drive down to Shimla in search for Rancho (Aamir Khan), their long-lost buddy. During their journey, they recall the times they shared together, the mischief they got up to, and all that they learned from Rancho',
      genre: 'Drama',
      director: 'Rajkumar Hirani',
    },
    {
      id: 3,
      title: 'PK',
      description:
        'An alien on Earth loses the only device he can use to communicate with his spaceship. His innocent nature and child-like questions force the country to evaluate the impact of religious views on people',
      genre: 'Fantasy',
      director: 'Rajkumar Hirani',
    },

  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        //return <div key={movie.id}>{movie.title}</div>;
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
