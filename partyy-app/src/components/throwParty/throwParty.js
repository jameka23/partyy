import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button } from 'reactstrap'
import './throwParty.css'
import home from './home.png';
import throw from './throw.png';
// this is styling that will override reactstrap styling



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
                <form className="throwForm">
                    <div>
                        <img 
                            src={throw}
                            alt="throwImg"
                            className="throwPic"
                        />
                    </div>

                    <div>
                        <input
                            className="nameInput"
                            id="name"
                            name="name"
                            placeholder=" Party Name"
                            autoFocus
                            required
                            onChange={this.handleFieldChange} />
                    </div>
                    <div>
                        <input
                            id="streetAddress"
                            name="streetAddress"
                            required
                            className="addyInput"
                            placeholder="Street Address"
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <input
                            id="zipcode"
                            type="number"
                            maxLength="5"
                            name="zipcode"
                            className="zipInput"
                            required
                            placeholder="Zipcode"
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div className="labeledInputs">
                        <div>
                            <label>Date</label><br />
                            <input
                                id="date"
                                type="date"
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <div>
                            <label>Time</label><br />
                            <input
                                id="time"
                                type="time"
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <div>
                            <label>Age Range</label>
                            <br />
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
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            onClick={this.constructNewParty}
                        >
                            Save
                            </Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
export default withRouter(ThrowParty)