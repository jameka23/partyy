import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PartyManager from '../modules/partyManager'
import { Button } from 'reactstrap'

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

        if (this.state.partyZipCode === "") {
            window.alert("Please enter a zip code!")
        } else {
            const editedParty = {
                userId: sessionStorage.getItem("userId"),
                id: parseInt(this.props.match.params.partyId),
                name: this.state.partyName,
                streetAddress: this.state.partyStreetAddress,
                zipcode: Number(this.state.partyZipCode),
                isPublic: false,
                ageRange: this.state.partyAgeRange,
                date: this.state.partyDate,
                time: this.state.partyTime
            }
            this.props.updateParty(editedParty, this.props.match.params.partyId)
        }
    }

    componentDidMount() {
        PartyManager.get(parseInt(this.props.match.params.partyId))
            .then(party => {
                // console.log(party)
                this.setState({
                    partyName: party.name,
                    partyStreetAddress: party.streetAddress,
                    partyZipCode: Number(party.zipcode),
                    partyDate: party.date,
                    partyTime: party.time,
                    partyAgeRange: party.ageRange,
                    userId: sessionStorage.getItem("userId"),
                })
            })
    }

    handleGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <div>
                        <Button
                            onClick={this.handleGoBack}
                        >Go Back</Button>
                    </div>
                    <section>
                        <input
                            id="partyName"
                            name="partyName"
                            placeholder=" Party Name"
                            autoFocus
                            required
                            value={this.state.partyName}
                            onChange={(event) => this.setState({ partyName: event.target.value })} />
                        <input
                            id="partyStreetAddress"
                            name="partyStreetAddress"
                            required
                            placeholder="Street Address"
                            value={this.state.partyStreetAddress}
                            onChange={(event) => this.setState({ partyStreetAddress: event.target.value })}
                        />
                        <input
                            id="partyZipCode"
                            type="number"
                            maxLength="5"
                            name="partyZipCode"
                            required
                            placeholder="Zipcode"
                            value={this.state.partyZipCode}
                            onChange={(event) => this.setState({ partyZipCode: event.target.value })}
                        />
                        <input
                            id="partyDate"
                            type="date"
                            onChange={this.handleFieldChange}
                        />
                        <input
                            id="partyTime"
                            type="time"
                            onChange={this.handleFieldChange}
                        />
                        <label>Age Range</label>
                        <select
                            name="partyAgeRange"
                            id="partyAgeRange"
                            value={this.state.partyAgeRange}
                            onChange={(event) => { this.setState({ partyAgeRange: event.target.value }) }}
                            open={this.state.open} onClose={this.handleClose}
                        >
                            {
                                this.props.ageValues.map(age => (
                                    <option key={age.id} id={age.value} value={age.value}>{age.value}</option>
                                ))
                            }
                        </select>
                    </section>
                    <div>
                        <Button
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