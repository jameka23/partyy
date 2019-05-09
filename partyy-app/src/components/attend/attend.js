import React, { Component } from 'react'
import { withRouter } from 'react-router'
// import { GoogleApiWrapper} from 'google-maps-react';
import { Card, CardText, CardTitle } from 'reactstrap'
import Iframe from 'react-iframe'
import logo from './logo1.png'
import './attend.css'
import home from './home.png'
import address from './address.png'

// override boostrap
const cardStyle = {
    backgroundColor: 'rgb(224,149,60)'
}


// set the map height and witdh
// const mapStyle = {
//     height: "100%",
//     witdh: "100%"

// }

class Attend extends Component {

    handleGoBack = () => {
        this.props.history.push('/')
    }

    state = {
        userLocation: { lat: 32, lng: 32 }
    }

    componentDidMount() {
        // using the building browswer's geolocation, get the user's location and set those lat/long values to the state
        navigator.geolocation.getCurrentPosition(position => {
            let coordinates = position.coords
            let lat = coordinates.latitude
            let long = coordinates.longitude

            // console.log(lat, long)
            this.setState({ userLocation: { lat: lat, lng: long } })
        })
    }

    render() {
        let user = Number(sessionStorage.getItem('userId'))
        // const { userLocation } = this.state
        // console.log(this.props.attend)
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
                                </div>
                                <div>
                                    <img
                                        src={address}
                                        alt="address"
                                        className="address"
                                    />
                                </div>
                                <div>
                                    <Iframe
                                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCG2YSwz6R1RhKp8XwAWdUy3NY8noP18kU&origin=${this.state.userLocation.lat},${this.state.userLocation.lng}&destination=${attending.party.lat},${attending.party.long}`}
                                        height="100%"
                                        width="100%"
                                        display="initial"
                                        // position="relative"
                                        zoom={12}
                                        className="iframeBox"
                                        title="my map"
                                        
                                    ></Iframe>
                                </div>
                            </Card>
                        ))
                }

            </React.Fragment>
        )
    }
}

export default withRouter(Attend)
// export default GoogleApiWrapper({ apiKey: 'AIzaSyCG2YSwz6R1RhKp8XwAWdUy3NY8noP18kU' })(Attend);