import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button } from 'reactstrap'
import './login.css'

class Login extends Component {
    state = {
        username: '',
        password: '',
        activeUser: sessionStorage.getItem("userId")
    }

    // this function will handle the values that are being entered in the input fields and set their values to be 
    // the value of the state 
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // this function will do all the verification and checking for the users information matching 
    // and alerts the user if they entered the wrong information 
    handleLogin = event => {
        event.preventDefault()

        // set user to a variable and the .find() will return the user that was found, meaning they are a registerd user
        let user = this.props.users.find(user => {
            return user.username === this.state.username && user.password === this.state.password
        })

        // checks that all the inputs are not empty and or if the the user enters the correct information
        if (this.state.username === "") {

            alert("Please enter your username!")

        } else if (this.state.password === "") {
            alert("Please enter your password!")
        } else if (this.state.username === "" && this.state.password === "") {
            alert("Please enter your credentials!")
        } else if (user !== undefined) {

            // if the user is not undefined, then set the sessionStorage.() and set the state
            this.setState({ activeUser: sessionStorage.setItem("userId", user.id) })
            console.log(sessionStorage.getItem("userId"))
            this.props.history.push('/')  // go to to the homepage
        } else {
            alert("You've entered the wrong username and/or password")
        }
    }


    handleSignUp = () => {
        this.props.history.push('/register') // if the user presses the sign up button, then they should be redirected to the register page
    }


    render() {
        // clear the session from the previous user
        sessionStorage.clear()

        return (
            <React.Fragment>
                <form>
                    <div>
                        <input
                            placeholder="username"
                            id="username"
                            required
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="password"
                            id="password"
                            type="password"
                            required
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={this.handleLogin}
                        >Log In</Button>
                        <Button
                            onClick={this.handleSignUp}
                        >Sign Up</Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
export default withRouter(Login)