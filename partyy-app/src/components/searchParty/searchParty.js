import React, { Component } from 'react'
import SearchPartyResults from './searchPartyResults'
import { Button } from 'reactstrap'

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
                    <input
                        id="searchZipcode"
                        type="number"
                        placeholder="Enter a zipcode"
                        maxLength="5"
                        value={this.state.searchZipcode}
                        onChange={(event) => { this.setState({ searchZipcode: event.target.value }) }}
                    />
                </div>
                <div>
                    <label htmlFor="searchAgeRange">Search By Age Range</label>
                    <select
                        id="searchAgeRange"
                        onChange={(event) => { this.setState({ searchAgeRange: event.target.value }) }}
                        value={this.state.searchAgeRange}
                        open={this.state.open}
                    >
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
                    <Button onClick={this.handleSearch}>
                        Search
                    </Button>
                    <br />
                    {this.state.goSearch && <SearchPartyResults parties={this.props.parties} searchAgeRange={this.state.searchAgeRange} searchZipcode={this.state.searchZipcode} />}
                </div>
            </React.Fragment >
        )
    }
}