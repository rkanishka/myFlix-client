import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import "./movie-view.scss"

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((b) => b.id === movieId);

  useEffect(() => {
        if(user && user.FavoriteMovies)  {
            const isFavorite = user.FavoriteMovies.includes(movieId);
            setIsFavorite(isFavorite);
        }
    }, [movieId, user]);
	
  const addtoFavorite = () => {
        fetch(`https://moviedb-fdeb4b5f0aa4.herokuapp.com/users/${user.name}/${movieId}`,
        {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            }
        })
        .then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(true);
        })
        .catch((e) => {
            console.log(e); 
        });       
    };
    const removefromFavorite = () => {
        fetch(`https://moviedb-fdeb4b5f0aa4.herokuapp.com/users/${user.name}/${movieId}`,
        {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            }
        })
        .then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(false);
        })
        .catch((e) => {
        console.log(e);
        });       
    };


  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <Link to={`/`}>	  
        <button className="back-button" style={{ cursor: "pointer"}} > Back </button>
      </Link>	  
      <div className="mt-1"> 
                {isFavorite ? (
                    <Button variant="danger" onClick={removefromFavorite}>Remove from favorite</Button>
                ) : (
                    <Button variant="primary" onClick={addtoFavorite}>Add to favorite</Button>   
                )}
       </div>	  
    </div>
  );
};
