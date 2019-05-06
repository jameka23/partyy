import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap'
import './searchResults.css'

//override reactstrap css 
const cardStyle = {
    backgroundColor: 'rgb(164,94,240)'
}

export default class SearchPartyResults extends Component {


    render() {
        // console.log("The age range to be searched is: ", this.props.searchAgeRange, "The zipcode is: ", this.props.searchZipcode)
        return (
            <React.Fragment>

                <div>
                    {
                        this.props.parties
                            .filter(party => (party.zipcode === Number(this.props.searchZipcode)))
                            .filter(party => (party.ageRange == this.props.searchAgeRange))
                            .map(party => (
                                <Card className="searchCard" style={cardStyle}>
                                        <CardTitle className="title">{party.name}</CardTitle>
                                    <div key={party.id}>
                                        <CardText>Address: {party.streetAddress}</CardText>
                                        <CardText>Zipcode: {party.zipcode}</CardText>
                                        <CardText>Date: {party.date}</CardText>
                                        <CardText>Time: {party.time}</CardText>
                                        <CardText>Age Range: {party.ageRange}</CardText>
                                    </div>
                                </Card>
                            ))
                    }
                </div>

            </React.Fragment>
        )
    }
}