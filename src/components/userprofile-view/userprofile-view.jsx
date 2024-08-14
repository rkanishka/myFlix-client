import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from './user-info';
import { ProfileUpdate } from './profile-update';
export const UserprofileView = ( {user,token,updatedUser,onLoggedOut}) => {
  
  	
  const ProfileDelete = () => {
        fetch(`https://moviedb-fdeb4b5f0aa4.herokuapp.com/users/${user.Username}`, 
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            
        }
        ).then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("Account deleted successfully!");
                onLoggedOut();
            } else {
            alert("Failed to delete account!");
            }
        })
    }

  return (
    <Container>
      <Row className="justify-content-center">
          <Col>
              <Card>
                  <Card.Header>
                      <UserInfo name={user.name} email={user.email}/>
                  </Card.Header>
              </Card>
          </Col>
          <Col xs={12}>
              <Card>
                  <Card.Body>
                  <ProfileUpdate
                      user={user}
                      token={token}
                      updatedUser={updatedUser}
                  />
                  </Card.Body>
                  <Card.Body>
                   <Button 
                      variant="danger"
                      onClick={() => {
                          ProfileDelete();
                      }}>
                          Delete account
                      </Button>
                  </Card.Body>
              </Card>
          </Col>
      </Row>
    </Container>

  );
};
