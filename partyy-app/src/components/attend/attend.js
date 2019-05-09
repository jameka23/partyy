import React, { Component } from 'react'
// import { withRouter } from 'react-router'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Card, CardText, CardTitle } from 'reactstrap'
import logo from './logo1.png'
import './attend.css'
import home from './home.png'
import address from './address.png'

// override boostrap
const cardStyle = {
    backgroundColor: 'rgb(224,149,60)'
}




class Attend extends Component {

    handleGoBack = () => {
        this.props.history.push('/')
    }

    state = {
        userLocation: { lat: 32, lng: 32 }
        // userLatitude: 32,
        // userLongitude: 32
    }

    componentDidMount (){
        navigator.geolocation.getCurrentPosition(function(position){
            let coordinates = position.coords
            let lat = coordinates.latitude
            let long = coordinates.longitude

            // console.log(lat, long)
            this.setState({userLocation: {lat:lat, lng:long}})
        })
    }
    
    render() {
        let user = Number(sessionStorage.getItem('userId'))
        return (
            <React.Fragment>
                <div>
                    <img
                        src={home}
                        alt="home"
                        className="home"
                        onClick={this.handleGoBack}
                    />
                </div>
                <div>
                    <img
                        src={logo}
                        alt="logo"
                        className="logoAttend"
                    />
                </div>
                {
                    this.props.attend.filter(attending => attending.userId === user)
                        .map(attending => (
                            <Card key={attending.id}
                                style={cardStyle}
                                className="attendingCards">
                                <div key={attending.id}>
                                    <CardTitle>{attending.party.name}</CardTitle>
                                    <CardText>{attending.party.address}</CardText>
                                    <CardText>{attending.party.date}</CardText>
                                    <CardText>{attending.party.time}</CardText>
                                    {/* <p>{this.getCurPos}</p> */}
                                </div>
                                <div>
                                    <img
                                        src={address}
                                        alt="address"
                                        className="address"
                                        onClick={this.getCurPos}
                                    />
                                </div>
                            </Card>
                        ))
                }

            </React.Fragment>
        )
    }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyCG2YSwz6R1RhKp8XwAWdUy3NY8noP18kU' })(Attend);