import React, { Component } from 'react'
import {Card, CardTitle, CardText} from 'reactstrap'

export default class SearchPartyResults extends Component {


    render(){
        console.log("The age range to be searched is: ",this.props.searchAgeRange, "The zipcode is: ", this.props.searchZipcode)
        return(
            <React.Fragment>
                <Card>
                    <div>
                        {
                            this.props.parties
                            .filter(party => (party.zipcode === Number(this.props.searchZipcode)))
                            .filter(party => (party.ageRange == this.props.searchAgeRange))
                            .map(party => (
                                <div key={party.id}>
                                    <CardTitle>{party.name}</CardTitle>
                                    <CardText>{party.address}</CardText>
                                    <CardText>{party.zipcode}</CardText>
                                    <CardText>{party.date}</CardText>
                                    <CardText>{party.time}</CardText>
                                    <CardText>{party.ageRange}</CardText>
                                    <hr />
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}