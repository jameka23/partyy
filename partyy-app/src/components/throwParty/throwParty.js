import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button} from 'reactstrap'

class ThrowParty extends Component {

    state = {
        userId: sessionStorage.getItem("userId"),
        isPublic: false,
        name: '',
        streetAddress: '',
        zipcode: '',
        date: '',
        time: '',
        ageRange: '',
        open: false
    }

    handleClose = (event) => {
        this.setState({ open: false });
        console.log(event.target)
    };


    // this function handle the change of the select 
    handleFieldChange = evt => {
        // console.log(evt.target.value)
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // create a party
    constructNewParty = event => {
        event.preventDefault() // prevent the page from going anywhere else
        if (this.state.zipCode === "") {
            window.alert("Please enter a zip code!")
        } else {
            const newParty = {
                userId: sessionStorage.getItem("userId"),
                isPublic: false,
                name: this.state.name,
                streetAddress: this.state.streetAddress,
                zipcode: Number(this.state.zipcode),
                date: this.state.date,
                time: this.state.time,
                ageRange: this.state.ageRange
            }
            console.log(newParty)
            this.props.createParty(newParty)
        }

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
                            id="name" 
                            name="name"
                            placeholder=" Party Name"
                            autoFocus
                            required
                            onChange={this.handleFieldChange} />
                        <input
                            id="streetAddress" 
                            name="streetAddress"
                            required
                            placeholder="Street Address"
                            onChange={this.handleFieldChange}
                        />
                        <input
                            id="zipcode"
                            type="number"
                            maxLength="5"
                            name="zipcode"
                            required
                            placeholder="Zipcode"
                            onChange={this.handleFieldChange}
                        />
                        <input
                            id="date"
                            type="date"
                            onChange={this.handleFieldChange}
                        />
                        <input
                            id="time"
                            type="time"
                            onChange={this.handleFieldChange}
                        />
                        <label>Age Range</label>
                        <select
                            name="ageRange"
                            id="ageRange"
                            onChange={this.handleFieldChange}
                            open={this.state.open} onClose={this.handleClose}
                        >
                            {
                                this.props.ageValues.map(age => (
                                    <option key={age.id} id={age.value} value={age.value}>{age.value}</option>
                                ))
                            }
                        </select>
                        <Button
                            type="submit"
                            onClick={this.constructNewParty}
                        >
                            Save
                        </Button>
                    </section>
                </form>
            </React.Fragment>
        )
    }
}
export default withRouter(ThrowParty)