import React, { Component } from 'react'
import SearchPartyResults from './searchPartyResults'
import { Button } from 'reactstrap'
import home from './home.png'
import logo from './logo.png'
import dots from './dots.png'
import './searchParty.css'


// reactstrap css override fro react
const searchBtnBtn = {
    color: 'black',
    backgroundColor: 'rgb(0, 208, 165)'
}

export default class SearchParty extends Component {
    state = {
        searchAgeRange: '',
        searchZipcode: '',
        // searchRadius: '',
        open: false,
        goSearch: false
    }

    handleClose = () => {
        this.setState({ open: false });
        // console.log(event.target)
    };

    handleOpen = () => {
        this.setState({ open: true });
    };



    handleSearch = () => {
        this.setState({ goSearch: true })
    }

    handleGoBack = () => {
        this.props.history.push('/')
    }
    //stretch goals
    radiusDistance = [
        {
            id: 1,
            value: 5
        },
        {
            id: 2,
            value: 10
        },
        {
            id: 3,
            value: 15
        }
    ]


    render() {
        return (
            <React.Fragment>
                <div>
                    <img
                    // this is the home icon
                        className="home"
                        src={home}
                        alt="home"
                        onClick={this.handleGoBack}
                    />
                </div>
                <div>
                    {/* this is the logo image */}
                    <img 
                        src={logo}
                        alt="logo"
                        className="logo1"
                    />
                </div>
                <div className="searchForm">
                    <div>
                        <input
                        className="zipcodeInput"
                            id="searchZipcode"
                            type="number"
                            placeholder="Enter a zipcode"
                            maxLength="5"
                            value={this.state.searchZipcode}
                            onChange={(event) => { this.setState({ searchZipcode: event.target.value }) }}
                        />
                    </div>
                    <div>
                        <label htmlFor="searchAgeRange"
                        className="searchLabel">Search By Age Range</label><br/>
                        <select
                        className="searchSelect"
                            id="searchAgeRange"
                            onChange={(event) => { this.setState({ searchAgeRange: event.target.value }) }}
                            value={this.state.searchAgeRange}
                            open={this.state.open}
                        >
                        <option value="">Age Range</option>
                            {
                                this.props.ageValues.map(age => (
                                    <option
                                        key={age.id}
                                        value={age.value}
                                        id={age.value}
                                    >{age.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <Button 
                        style={searchBtnBtn}
                        className="searchBtn"
                        onClick={this.handleSearch}>
                            Search
                        </Button>
                        <br />
                    </div>
                    <div>
                        <img 
                            src={dots}
                            alt="dots"
                            className="dots"
                        />
                    </div>
                </div>
                        {this.state.goSearch && <SearchPartyResults parties={this.props.parties} searchAgeRange={this.state.searchAgeRange} searchZipcode={this.state.searchZipcode} 
                        attendParty={this.props.attendParty}
                        />}
            </React.Fragment >
        )
    }
}