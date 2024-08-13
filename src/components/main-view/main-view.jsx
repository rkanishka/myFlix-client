import { useState, useEffect } from "react";
//import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");	
  const [movies, setMovies] = useState([]);
  const [user, setUser] =useState(storedUser? storedUser : null);
  const [token, setToken] =useState(storedToken? storedToken : null);	 
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    
    if (!token) {
      return;	    
    }	    
    fetch("https://moviedb-fdeb4b5f0aa4.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}	    
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api", data);      
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            director: movie.Director?.Name 
          };
       });

        setMovies(moviesFromApi);
      })
  }, [token]);	
  
  if(!user) { 
    return (
      <>   
	<LoginView 
	 onLoggedIn={(user, token) => {
	   setUser(user);
           setToken(token);
         }} 
	/>
	or
	<SignupView />
      </>	    
    );
  }

  
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
      <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button> 
      </div>
    </div>
  );
