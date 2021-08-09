import React, { Component } from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap';
class Header extends Component {

    render() {
        return (<header>
            <Navbar bg="warning " expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home"><h2 className='text-light'>City Explorer</h2></Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto">
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>);
    }
}

export default Header;
