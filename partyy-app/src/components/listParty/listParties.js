import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
    Button, Card, CardText, CardBody,
    CardTitle
} from 'reactstrap'


class ListParty extends Component {

    handleGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Button
                        onClick={this.handleGoBack}
                    >Go Back</Button>
                </div>
                <div className="party--container">
                    {
                        this.props.parties.filter(party => party.user.id === Number(sessionStorage.getItem("userId")))
                            .map(party => (
                                <Card key={party.id} className="user--parties text--center" body>
                                    <CardBody>
                                        <CardTitle>{party.name}</CardTitle>
                                        <CardText>Address: {party.streetAddress}</CardText>
                                        <CardText>zip code: {party.zipcode}</CardText>
                                        <CardText>Date: {party.date}</CardText>
                                        <CardText>Time: {party.time}</CardText>
                                        <CardText>Age Range: {party.ageRange}</CardText>

                                        <div>
                                            <Button
                                                size="small"
                                                onClick={() => { this.props.history.push(`/${party.id}/edit`) }}
                                            >Edit</Button>
                                            <Button
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