import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {Card, CardText, CardTitle} from 'reactstrap'
import logo from './logo1.png'
import './attend.css'
import home from './home.png'
import address from './address.png'

const cardStyle = {
    backgroundColor: 'rgb(224,149,60)'
} 

class Attend extends Component{

    handleGoBack = () =>{
        this.props.history.push('/')
    }

    state = {
        // userLocation: {lat: 32, lng: 32}
        userLatitude: 32,
        userLongitude: 32
    }
    render(){
        console.log(this.props.attend)
        let user = Number(sessionStorage.getItem('userId'))
        return(
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
                        </Card>
                    ))
                }

            </React.Fragment>
        )
    }
}

export default withRouter(Attend)