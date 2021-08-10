import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Row, Card, Alert } from 'react-bootstrap';
import Weather from './Weather';
import SearchForm from './Form';
import Movie from './Movie';
class Main extends Component {
    constructor() {
        super()
        this.state = {
            strQuery: '',
            cityData: [],
            catchErr: false,
            errMsg: '',
            weatherData: [],
            moviesData: [],
            errorType:'',
        }
    }

    handleSearch = async (e) => {
        e.preventDefault();
        await this.setState({
            strQuery: e.target.searchCity.value
        })
        // console.log(this.state.strQuery)

        let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.strQuery}&format=json`;

        try {
            let locationData = await axios.get(url)
            await this.setState({
                cityData: locationData.data[0],
                catchErr: false,
            });
            this.getWeather(locationData.data[0].lon, locationData.data[0].lat)
            this.getMovies(locationData.data[0].display_name.split(',')[0])
            // console.log(this.state.cityData);
        } catch (e) {
            await this.setState({
                catchErr: true,
                errMsg: `| The location NOT FOUND`,
                errorType:e
            });
        }
    }

    getWeather = async (lon, lat) => {
        let url = `${process.env.REACT_APP_LOCALHOST}/weather/${lon}/${lat}`;
        console.log(url);
        try {
            let wData = await axios.get(url);

            await this.setState({
                weatherData: wData.data,
            });
            // console.log(this.state.weatherData);
        } catch (error) {
            this.setState({
                errMsg: `| The weather for given location NOT FOUND`,
                catchErr: true,
                errorType:error,
                weatherData: [],
            });
            // console.log(this.state.errMsg);
        }
    };

    getMovies = async (city) => {
        let url = `${process.env.REACT_APP_LOCALHOST}/movies/${city}`;

        console.log(url);
        try {
            let mData = await axios.get(url);
            await this.setState({
                moviesData: mData.data,
            });
        } catch (error) {
            this.setState({
                errMsg: ` | No Movies Data for given location`,
                showToast: true,
                catchErr: true,
                moviesData: [],
                errorType:error,
            });
        }

    };

    render() {
        return (
            <>
                <SearchForm handleSearch={this.handleSearch} />
                <Container fluid>
                    <Row className="justify-content-center m-3">
                        {this.state.catchErr && <Alert variant='warning'>
                         {this.state.errMsg}
                        </Alert>}
                    </Row>
                    <Row className="justify-content-center m-3">
                    <Col></Col>
                        <Col md='auto'>
                            <Card className='m-3'>
                                <Card.Header style={{ background: '#FFC107' }}>
                                    City Name :  {this.state.cityData.display_name}
                                </Card.Header>
                                <Card.Body style={{margin:'0px' ,padding:"0px"}}>
                                    <Card.Img
                                    
                                        src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=16`}
                                        variant="top" />
                                    <Card.Text style={{padding:"10px"}}>
                                        longitude:  {this.state.cityData.lon}
                                    </Card.Text>
                                    <Card.Text style={{padding:"10px"}}>
                                        latitude: {this.state.cityData.lat}
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="justify-content-center m-3" style={{ paddingBottom: '40px' }}>
                    <h1 className='text-center m-3' style={{background:'#ddd'}}>Weather Forecast </h1>
                    <Col className=' m-1'>
                        {this.state.weatherData &&
                            <div className='d-flex p-2' style={{ flexWrap: 'wrap' }}>
                                {this.state.weatherData.map((element, index) =>
                                    <Weather
                                        key={index}
                                        date={element.date}
                                        description={element.description}
                                        temp={element.temp}
                                    />)}
                            </div>}
                            </Col>
                    </Row>
                    <Row  className="justify-content-center m-3 " style={{ paddingBottom: '40px' }}>
                    <h1 className='text-center m-3' style={{background:'#ddd',marginBottom:"10px"}}>Movies </h1>
                    <>
                        {this.state.moviesData &&
                            <>
                                {this.state.moviesData.map((element, index) => <Movie
                                    key={index}
                                    released_on={element.released_on}
                                    title={element.title}
                                    image_url={element.image_url}
                                    total_votes={element.total_votes}
                                    average_votes={element.average_votes}
                                    overview ={element.overview}
                                />
                                )}
                            </>}
                            </>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Main;