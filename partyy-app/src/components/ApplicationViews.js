import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'
import partyManager from './modules/partyManager'
import userManager from './modules/userManager'
import attendManager from './modules/attendManager'
import Homepage from './homepage/homepage'
import ThrowParty from '../components/throwParty/throwParty'
import ListParty from '../components/listParty/listParties'
import EditParty from '../components/listParty/editParty'
import SearchParty from '../components/searchParty/searchParty'
import Login from '../components/authentication/login'
import Register from '../components/authentication/register'
import Attend from '../components/attend/attend'
import Location from '../components/location/location'

class ApplicationView extends Component {

    //check for authentication is in local session storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    // set the state
    state = {
        parties: [],
        users: [],
        attend: [],
        activeUser: Number(sessionStorage.getItem("userId"))
    }

    componentDidMount() {
        // creating an object to store all the parties and users from the fetch calls 
        const newState = {}

        // get all the data 
        partyManager.all()
            .then(parties => this.setState({ parties: parties }))
            .then(() => userManager.all())
            .then(users => this.setState({ users: users }))
            .then(() => attendManager.all())
            .then(attending => this.setState({attend: attending}))
            .then(() => this.setState(newState))
    }

    componentWillUpdate() {
        if (this.state.activeUser === "") {
            let user = sessionStorage.getItem("userId");
            this.setState({ activeUser: parseInt(user) })
        }
    }

    //this function test for authentication and user has entered the correct information 
    isAuthenticated = () => {
        if (sessionStorage.getItem("userId") !== null) {
            return true;
        } else {
            return false;
        }
    }

    // this function will create a party
    createParty = (newPartyObj) => {
        partyManager.post(newPartyObj)
            .then(() => partyManager.all())
            .then(parties => {
                this.setState({
                    parties: parties
                })
            })
            .then(() => this.props.history.push('/listParties'))
    }

    // this function will edit a party that you have created
    updateParty = (editedPartyObj, id) => {
        partyManager.put(editedPartyObj, id)
            .then(() => partyManager.all())
            .then(parties => {
                this.setState({
                    parties: parties
                })
            })
            .then(() => this.props.history.push('/listParties'))
    }


    // this function will delete a party that you just created
    deleteParty = id => {
        partyManager.delete(id)
            .then(() => partyManager.all())
            .then(parties => {
                this.setState({
                    parties: parties
                })
            })
            .then(() => this.props.history.push('/listParties'))
    }

    // this function will add another user to that was just registered
    addRegisteredUser = newUserObj => {
        userManager.post(newUserObj)
            .then(() => userManager.all())
            .then(users => {
                this.setState({
                    users: users,
                    activeUser: sessionStorage.getItem("userId")
                })
            })
            .then(() => this.props.history.push('/login'))
    }

    // this function will add a user attendance to their attending parties
    attendParty = attendingObject => {
        attendManager.post(attendingObject)
            .then(() => attendManager.all())
            .then(attending => this.setState({attend: attending}))
            .then(() => this.props.history.push('/attend'))
    }


    // this function will allow users to delete a party that they are going to attend
    deleteAttendingParty = partyToDeleteId => {
        attendManager.delete(partyToDeleteId)
            .then(() => attendManager.all())
            .then(attending => this.setState({attend: attending}))
            .then(() => this.props.history.push('/attend')) 
    }

    ageValues = [
        {
            id: 1,
            value: "under 21"
        },
        {
            id: 2,
            value: "over 21"
        },
        {
            id: 3,
            value: "21 to 25"
        },
        {
            id: 4,
            value: "25 to 30"
        }
    ]


    // this function will set the session storage 
    render() {
        // console.log(sessionStorage.getItem("userId"), this.state.activeUser)
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    // this route will go to the home page which will have all the buttons that are need to navigate
                    if (this.isAuthenticated()) {
                        return <Homepage users={this.state.users} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/login" render={(props) => {
                    return <Login users={this.state.users} />
                }} />
                <Route exact path="/register" render={(props) => {
                    return <Register users={this.state.users} addRegisteredUser={this.addRegisteredUser} />
                }} />
                <Route exact path="/throwParty" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ThrowParty
                            activeUser={this.state.activeUser}
                            parties={this.state.parties}
                            {...props}
                            ageValues={this.ageValues} // delete later
                            createParty={this.createParty} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/listParties" render={(props) => {
                    if (this.isAuthenticated()) {
                        // console.log("this is the current user: ", this.state.activeUser)
                        return <ListParty
                            {...props}
                            parties={this.state.parties}
                            updateParty={this.updateParty}
                            deleteParty={this.deleteParty}
                            activeUser={this.state.activeUser} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/:partyId(\d+)/edit" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EditParty
                            activeUser={this.state.activeUser}
                            updateParty={this.updateParty}
                            ageValues={this.ageValues}
                            {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/searchParty" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SearchParty
                            {...props}
                            attend={this.state.attend}
                            ageValues={this.ageValues}
                            parties={this.state.parties} 
                            attendParty={this.attendParty}/>
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/location" render={(props) =>{
                    if(this.isAuthenticated()){
                        return <Location
                            {...props}
                            attendParty={this.attendParty}/>
                    }else{
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/attend" render={(props) => {
                    if(this.isAuthenticated()){
                        return <Attend 
                            {...props}
                            parties={this.state.parties}
                            users={this.state.users}
                            attend={this.state.attend}
                            deleteAttendingParty={this.deleteAttendingParty}
                        />
                    }else{
                        return <Redirect to='/login' />
                    }
                }}/>
            </React.Fragment>
        )
    }
}
export default withRouter(ApplicationView)