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
                                    <div key={party.id}>
                                        <CardTitle>{party.name}</CardTitle>
                                        <CardText>{party.streetAddress}</CardText>
                                        <CardText>{party.zipcode}</CardText>
                                        <CardText>{party.date}</CardText>
                                        <CardText>{party.time}</CardText>
                                        <CardText>{party.ageRange}</CardText>
                                    </div>
                                </Card>
                            ))
                    }
                </div>

            </React.Fragment>
        )
    }
}