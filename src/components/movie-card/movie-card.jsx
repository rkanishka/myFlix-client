import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie}) => {
  return (
    <Card className="h-100">
      <Card.Img variant ="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
	<Link to={`movies/${encodeURIComponent(movie.id)}`}>  
          < Button variant="link"> Open </Button>
	</Link> 
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    tile: PropTypes.string,
    description: PropTypes.string,	  
    director: PropTypes.string	  
  }).isRequired
}
