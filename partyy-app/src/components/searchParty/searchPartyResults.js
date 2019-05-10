import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap'
import './searchResults.css'
// import locate from './location.png'
import add from './add.png'

//override reactstrap css 
const cardStyle = {
    backgroundColor: 'rgb(164,94,240)'
}

export default class SearchPartyResults extends Component {

    state = {
        partyId: '',
        userId: Number(sessionStorage.getItem("userId"))
    }

    constructAddParty = (event) => {
        
        //do a verification to make sure the user who created the party doesn't end up 
        // adding the party to attend
        let user = Number(sessionStorage.getItem("userId"))
        // console.log(event.target.parentNode.id)
        if(user === Number(event.target.parentNode.id)){
            window.alert("You're hosting the party, silly goose!")
        }else{
            const newAttend ={
                partyId: Number(event.target.id),
                userId: Number(sessionStorage.getItem("userId"))
            }
            this.props.attendParty(newAttend)
        }
    }

    render() {

        return (
            <React.Fragment>

                <div>
                    {
                        this.props.parties
                            .filter(party => (party.zipcode === Number(this.props.searchZipcode)))
                            .filter(party => (party.ageRange === this.props.searchAgeRange))
                            .map(party => (
                                <Card className="searchCard" style={cardStyle}
                                key={party.id}
                                >
                                        <CardTitle className="title">{party.name}</CardTitle>
                                    <div key={party.id}>
                                        <CardText>Address: {party.address}</CardText>
                                        <CardText>Zipcode: {party.zipcode}</CardText>
                                        <CardText>Date: {party.date}</CardText>
                                        <CardText>Time: {party.time}</CardText>
                                        <CardText>Age Range: {party.ageRange}</CardText>
                                    </div>
                                    <div id={party.user.id}>
                                        <img 
                                            src={add}
                                            alt="add"
                                            className="add"
                                            id={party.id}
                                            onClick={this.constructAddParty}
                                        />
                                    </div>
                                </Card>
                            ))
                    }
                </div>

            </React.Fragment>
        )
    }
}