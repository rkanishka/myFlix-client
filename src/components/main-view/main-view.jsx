import { useState, useEffect } from "react";
//import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar} from "../navigation-bar/navigation-bar"
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
  

 return (
   <BrowserRouter>	 
     <NavigationBar
	user={user}
	onLoggedOut={() => {
	  setUser(null); 
          setToken(null);
	  localStorage.clear();}}
     />	 
     <Row className="justify-content-md-center">
       <Routes>	 
	 <Route
	   path="/signup"
	   element={
             <>		   
               {user ? (
                  <Navigate to="/" />
	       ) : (       
                  <Col md ={5}>   
                    <SignupView />
                  </Col>
	       )}
             </>
           }
	 />
	 <Route 
	   path="/login"
	   element={
	     <>
	       {user ? (
                  <Navigate to="/" />
	       ):(
                  <Col md ={5}>   
                    <LoginView 
                     onLoggedIn={(user, token) => {
                       setUser(user);
                       setToken(token);
                     }} 
                    />
                  </Col>
	       )
	       }	   
             </>		   
	   }
	 />
         <Route
	   path="/movies/:movieId"
	   element={
             <>
	       {!user ?(
		 <Navigate to="/login" replace />      
	       ) : movies.length === 0 ? (
                 <Col>The list is empty!</Col>
	       ) : (
                 <Col md={8} style={{ border: "1px solid black" }}>	      
                   <MovieView
                      movies={movies}
                   />
                 </Col>	     
	       )	       
	       }	       
             </>		   
	   }
	 />
         <Route
	   path="/"
	   element={
             <>
	       {!user ? (
		  <Navigate to="/login" replace />     
	       ): movies.lenth === 0 ? (
		  <Col>The list is empty!</Col>     
	       ): (
		  <>
                    {movies.map((movie) => (
                      <Col className="mb-5"  key={movie.id} md={3}>		   
                        <MovieCard
                          movie={movie}
                        />
                      </Col>		   
                     ))}
                  </>    
	       )}	       
             </>		   
           }		   
	 />
       </Routes>	 
     </Row>
   </BrowserRouter>	 
 )	 
}
	 
