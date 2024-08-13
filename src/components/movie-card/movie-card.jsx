import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    tile: PropTypes.string,
    description: PropTypes.string,	  
    director: PropTypes.string	  
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired	
}
