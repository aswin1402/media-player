import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


function Header() {
  return (
    <div>
      <Navbar className="" style={{backgroundColor:"orange"}}>
        <Container>
          <Navbar.Brand href="">
            <Link to={'/'} style={{textDecoration:"none",color:'white'}}>
              <img
                alt=""
                src="https://i.pinimg.com/originals/8f/44/ac/8f44ac53f451c7c7526c915b2bcb1816.gif"
                width="50"
                height="40"
                style={{borderRadius:"50px"}}
                className="d-inline-block align-top"
              />{" "}
              MEDIA PLAYER
            </Link> 
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
