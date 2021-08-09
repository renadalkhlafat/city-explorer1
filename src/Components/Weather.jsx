import React, { Component } from 'react'
import { Card,Col } from 'react-bootstrap';

class Weather extends Component {
    
    render() { 
        return ( 
            <Col >
            <Card>
                <Card.Header style={{background:'#FFC107'}}>
                    {this.props.date}
                </Card.Header>
                <Card.Body>
                    {this.props.description==='Scattered clouds'?<img src='https://www.kindpng.com/picc/m/122-1227285_scattered-clouds-weather-symbol-hd-png-download.png' alt='..' width="45px"/>:<img src='https://i.pinimg.com/originals/8a/93/5d/8a935da3c85c3981a0b3eabfdc6221b3.png' alt='..' width="45px"/>}
                    {this.props.description}
                </Card.Body>
                
            </Card>
            </Col>
         );
    }
}
 
export default Weather;