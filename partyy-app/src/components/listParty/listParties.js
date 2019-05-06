import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
    Button, Card, CardText, CardBody,
    CardTitle
} from 'reactstrap'
import './listParty.css'
import home from './home.png'

// this function will do an override on reactstrap's css
const cardStyle = {
    backgroundColor: '#9162e4'
}

const btnStyle = {
    color: 'black',
    backgroundColor: 'rgb(252,216,85)'
}

class ListParty extends Component {

    handleGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {/* <Button
                        onClick={this.handleGoBack}
                    >Go Back</Button> */}
                    <img
                        className="home"
                        src={home}
                        alt="home"
                        onClick={this.handleGoBack}
                    />
                </div>
                <div className="party--container">
                    {
                        this.props.parties.filter(party => party.user.id === Number(sessionStorage.getItem("userId")))
                            .map(party => (
                                <Card key={party.id} style={cardStyle} className="user--parties text--center" body>
                                    <CardBody>
                                        <h1 className="header"><CardTitle>{party.name}</CardTitle></h1>
                                        <div className="innerCardText">
                                            <CardText>Address: {party.streetAddress}</CardText>
                                            <CardText>zip code: {party.zipcode}</CardText>
                                            <CardText>Date: {party.date}</CardText>
                                            <CardText>Time: {party.time}</CardText>
                                            <CardText>Age Range: {party.ageRange}</CardText>
                                        </div>

                                        <div className="listPartyBtns">
                                            <Button
                                                style={btnStyle}
                                                className="editBtn"
                                                size="small"
                                                onClick={() => { this.props.history.push(`/${party.id}/edit`) }}
                                            >Edit</Button>
                                            <Button
                                                style={btnStyle}
                                                className="deleteBtn"
                                                size="small"
                                                onClick={() => {
                                                    const deleteConfrim = window.confirm(`Are you sure you want to delete ${party.name} party?`)
                                                    if (deleteConfrim) {
                                                        this.props.deleteParty(party.id)
                                                    }
                                                }}
                                            >Delete</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                    }
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(ListParty)