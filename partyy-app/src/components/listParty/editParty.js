import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Geocode from "react-geocode";
import PartyManager from '../modules/partyManager'
import { Button } from 'reactstrap'
import back from './back.png'
import edit from './edit.png'
import './edit.css'

// this function will override reactstrap's styling
const saveBtnStyle = {
    color: 'black',
    backgroundColor: 'rgb(199,254,103)'
}


class EditParty extends Component {

    // set the state for the edit
    state = {
        partyName: '',
        partyStreetAddress: '',
        partyZipCode: '',
        partyDate: '',
        partyTime: '',
        partyAgeRange: '',
        userId: sessionStorage.getItem("userId"),
        lat: '',
        long: '',
        open: false
    }

    handleClose = (event) => {
        this.setState({ open: false });
        console.log(event.target)
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    // this function will handle the updating of the current state...line 6
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
    }

    // this function will create the edited party
    constructEditedParty = event => {
        event.preventDefault() // keeps from having the page go elsewhere 
        // console.log(typeof (this.state.partyDate))
        if (this.state.partyZipCode === "") {
            window.alert("Please enter a zip code!")
        } else {



            // using the geolocation npm, I am able to convert the user's party location to lat, lng values and therefore use it for google map's api
            Geocode.fromAddress(this.state.partyStreetAddress).then(response => {
                const { lat, lng } = response.results[0].geometry.location;

                const editedParty = {
                    userId: Number(sessionStorage.getItem("userId")),
                    id: parseInt(this.props.match.params.partyId),
                    name: this.state.partyName,
                    address: this.state.partyStreetAddress,
                    zipcode: Number(this.state.partyZipCode),
                    ageRange: this.state.partyAgeRange,
                    date: this.state.partyDate,
                    time: this.state.partyTime,
                    lat: lat,
                    long: lng
                }
                this.props.updateParty(editedParty, this.props.match.params.partyId)
            })
        }
    }

    componentDidMount() {
        PartyManager.get(parseInt(this.props.match.params.partyId))
            .then(party => {
                // console.log(party)
                this.setState({
                    partyName: party.name,
                    partyStreetAddress: party.address,
                    partyZipCode: Number(party.zipcode),
                    partyDate: party.date,
                    partyTime: party.time,
                    partyAgeRange: party.ageRange,
                    lat: party.lat,
                    long: party.long,
                    userId: sessionStorage.getItem("userId"),
                })
            })
    }

    handleGoBack = () => {
        this.props.history.push('/listParties')
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <img
                        src={back}
                        alt="back"
                        className="back"
                        onClick={this.handleGoBack}
                    />
                </div>
                <form>
                    <div>
                        <img
                            src={edit}
                            alt="editlogo"
                            className="editLogo"
                        />
                    </div>
                    <section className="editForm">
                        <div>
                        <label htmlFor="partyName">Name</label><br/>
                            <input
                                className="inputs"
                                id="partyName"
                                name="partyName"
                                placeholder=" Party Name"
                                autoFocus
                                required
                                value={this.state.partyName}
                                onChange={(event) => this.setState({ partyName: event.target.value })} />
                        </div>
                        <div>
                        <label htmlFor="partyStreetAddress">Address</label><br/>
                            <input
                                className="inputs"
                                id="partyStreetAddress"
                                name="partyStreetAddress"
                                required
                                placeholder="Address"
                                value={this.state.partyStreetAddress}
                                onChange={(event) => this.setState({ partyStreetAddress: event.target.value })}
                            />
                        </div>
                        <div>
                        <label htmlFor="partyZipCode">Zipcode</label><br/>
                            <input
                                className="inputs"
                                id="partyZipCode"
                                type="number"
                                maxLength="5"
                                name="partyZipCode"
                                required
                                placeholder="Zipcode"
                                value={this.state.partyZipCode}
                                onChange={(event) => this.setState({ partyZipCode: event.target.value })}
                            />
                        </div>
                        <div><label htmlFor="partyDate">Date</label><br/>
                            <input
                                className="inputs"
                                id="partyDate"
                                placeholder="Date"
                                type="text"
                                value={this.state.partyDate}
                                onChange={(event) => this.setState({ partyDate: event.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="partyTime">Time</label><br/>
                            <input
                                className="inputs"
                                value={this.state.partyTime}
                                id="partyTime"
                                placeholder="Time"
                                type="text"
                                onChange={(event) => this.setState({ partyTime: event.target.value })}
                            />
                        </div>
                        <div className="selection">
                            <label className="ageLabeled">Age Range</label><br />
                            <select
                                className="ageSelection"
                                name="partyAgeRange"
                                id="partyAgeRange"
                                value={this.state.partyAgeRange}
                                onChange={(event) => { this.setState({ partyAgeRange: event.target.value }) }}
                                open={this.state.open} onClose={this.handleClose}
                            >
                                <option value="">Age Range</option>
                                {
                                    this.props.ageValues.map(age => (
                                        <option key={age.id} id={age.value} value={age.value}>{age.value}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </section>
                    <div className="editSaveBtn">
                        <Button
                            style={saveBtnStyle}
                            type="submit"
                            onClick={this.constructEditedParty}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
export default withRouter(EditParty)