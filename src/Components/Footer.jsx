import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
class Footer extends Component {

    render() {
        return (
          <footer className=" py-2" >
          <Container fluid bg='warning'>
            &copy; {new Date().getFullYear()} Renad Al-Khlafat
            </Container>
        </footer>
       );
    }
}

export default Footer;