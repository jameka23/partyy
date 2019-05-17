import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
    Card, CardText, CardBody,
    CardTitle
} from 'reactstrap'
import deleteicon from './delete.png'
import './listParty.css'
import home from './home.png'
import host from './host5.png'
import edit from './pencil.png'


// this function will do an override on reactstrap's css
const cardStyle = {
    // backgroundColor: '#9162e4'
    borderRadius: "5%"
}

// const btnStyle = {
//     color: 'black',
//     backgroundColor: 'rgb(252,216,85)'
// }

class ListParty extends Component {

    handleGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        // console.log(this.props.parties)
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
                <div>
                    <img 
                        src={host}
                        alt="host"
                        className="host"
                    />
                </div>
                <div className="party--container">
                    {
                        this.props.parties.filter(party => Number(party.userId) === Number(sessionStorage.getItem("userId")))
                            .reverse()
                            .map(party => (
                                <Card key={party.id} style={cardStyle} className="user--parties text--center" body>
                                    <CardBody>
                                        <h3 className="headerListParties"><CardTitle>{party.name}</CardTitle></h3>
                                        <div className="innerCardText">
                                            <CardText>Address: {party.address}</CardText>
                                            {/* <CardText>zip code: {party.zipcode}</CardText> */}
                                            <CardText>Date: {party.date}</CardText>
                                            <CardText>Time: {party.time}</CardText>
                                            <CardText>Age Range: {party.ageRange}</CardText>
                                            {/* <CardText>Latitude: {party.lat}</CardText> */}
                                        </div>

                                        <div className="listPartyBtns">
                                            {/* <Button
                                                style={btnStyle}
                                                className="editBtn"
                                                size="small"
                                                onClick={() => { this.props.history.push(`/${party.id}/edit`) }}
                                            >Edit</Button> */}
                                            <img 
                                                src={edit}
                                                alt="edit"
                                                className="editBtn"
                                                size="small"
                                                onClick={() => { this.props.history.push(`/${party.id}/edit`) }}
                                            />
                                            {/* <label>Edit</label> */}
                                            {/* <Button
                                                style={btnStyle}
                                                className="deleteBtn"
                                                size="small"
                                                onClick={() => {
                                                    const deleteConfrim = window.confirm(`Are you sure you want to delete ${party.name} party and be a party pooper?`)
                                                    if (deleteConfrim) {
                                                        this.props.deleteParty(party.id)
                                                    }
                                                }}
                                            >Delete</Button> */}
                                            <img 
                                                src={deleteicon}
                                                alt="deleteicon"
                                                className="deleteBtn"
                                                size="small"
                                                onClick={() => {
                                                    const deleteConfrim = window.confirm(`Are you sure you want to delete ${party.name} party and be a party pooper?`)
                                                    if (deleteConfrim) {
                                                        this.props.deleteParty(party.id)
                                                    }
                                                }}
                                            />
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