import React, { Component } from 'react';
import { Container, InputGroup, Button, FormControl, Form, Row } from 'react-bootstrap';

class SearchForm extends Component {

    render() {
        return (
            <Container>
                <Row >
                    <Form onSubmit={this.props.handleSearch} className='d-flex'>
                        <InputGroup className="m-3">
                            <Button type='submit' variant="outline-warning" id="button-addon1">
                                Explore!
                            </Button>
                            <FormControl
                                placeholder='Enter a City Name'
                                aria-label="City Name"
                                aria-describedby="basic-addon1"
                                name='searchCity'
                            />
                        </InputGroup>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default SearchForm;