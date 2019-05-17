import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Geocode from "react-geocode";
import { Button } from 'reactstrap'
import './throwParty.css'
import home from './home.png';
import throwImg from './throw2.png';


// this is styling that will override reactstrap styling
const saveBtnStyle = {
    color: 'black',
    backgroundColor: 'rgb(106,138,245)'
}

Geocode.setApiKey("AIzaSyCG2YSwz6R1RhKp8XwAWdUy3NY8noP18kU");

class ThrowParty extends Component {

    state = {
        userId: sessionStorage.getItem("userId"),
        name: '',
        address: '',
        zipcode: '',
        date: '',
        time: '',
        ageRange: '',
        lat: '',
        long: '',
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

            // using the geolocation npm, I am able to convert the user's party location to lat, lng values and therefore use it for google map's api
            Geocode.fromAddress(this.state.address).then(response => {
                const { lat, lng } = response.results[0].geometry.location;
                // console.log(lat, lng)
                const newParty = {
                    userId: Number(sessionStorage.getItem("userId")),
                    name: this.state.name,
                    address: this.state.address,
                    zipcode: Number(this.state.zipcode),
                    date: this.state.date,
                    time: this.state.time,
                    ageRange: this.state.ageRange,
                    lat: Number(lat),
                    long: Number(lng)
                }
                // console.log(newParty)
                this.props.createParty(newParty)
            })


        }

    }

    handleGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <div>
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
                            src={throwImg}
                            alt="throwImg"
                            className="throwPic"
                        />
                    </div>

                    <div>
                        <input
                            className="nameInput  override inputs"
                            id="name"
                            name="name"
                            placeholder=" Party Name"
                            autoFocus
                            required
                            onChange={this.handleFieldChange} />
                    </div>
                    <div>
                        <input
                            id="address"
                            name="address"
                            required
                            className="addyInput override inputs"
                            placeholder="Address"
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <input
                            id="zipcode"
                            type="number"
                            maxLength="5"
                            name="zipcode"
                            className="zipInput override inputs"
                            required
                            placeholder="Zipcode"
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div className=" timedLabel labeled1">
                        {/* <label
                            className="dateLabel"
                            >Date</label><br /> */}
                        <input
                            id="date"
                            type="text"
                            placeholder="Date"
                            className="override"
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div className="labeled2">
                        {/* <label>Time</label><br /> */}
                        <input
                            placeholder="Time"
                            id="time"
                            type="text"
                            className="override"
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        {/* <label className="ageLabel">Age Range</label> */}
                        <br />
                        <select
                            className="ageSelect"
                            name="ageRange"
                            id="ageRange"
                            onChange={this.handleFieldChange}
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
                    <div className="saveBtn">
                        <Button
                            style={saveBtnStyle}
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