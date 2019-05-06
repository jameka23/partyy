import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button } from 'reactstrap'
import './register.css'
import reg from './register1.png'
import back from './back.png'

// this is to override reactstrap's style
const regBtnStyle ={
    color: 'black',
    backgroundColor: 'rgb(232, 112, 97)'
}


class Register extends Component{
    state = {
        name: '',
        username: '',
        password: '',
        email: ''
    }

    handleSignUp = event => {
        if (this.state.username === "") {
            alert("Please enter a user name")
        } else if (this.state.email === "") {
            alert("Please enter an email address")
        } else if (this.state.password === "") {
            alert("Please enter a password")
        } else if (this.props.users.some(user => {return user.username.toLowerCase() === this.state.username.toLowerCase()})) {
            alert("User name is already taken")
            console.log("already taken username")
        } else if (this.props.users.some(user => {return user.email.toLowerCase() === this.state.email.toLowerCase()})){
            alert("Email address already exists")
            console.log("already taken email")
        }else{
            const newUserObj = {
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
            this.props.addRegisteredUser(newUserObj)
            // .then(() => this.props.history.push('/login'))
        }
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleGoBack = () => {
        this.props.history.push('/login')
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    <img 
                        src={back}
                        alt="back arrow"
                        className="backIcon"
                        onClick={this.handleGoBack}
                    />
                </div>
                <div>
                    <img 
                        src={reg}
                        alt="register.png"
                        className="regIcon"
                    />
                </div>
                <form className="regForm">
                    <div>
                        <input 
                            className="regInputs"
                            required
                            placeholder="name"
                            id="name"
                            className="inputField"
                            value={this.state.name}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <input 
                        className="regInputs"
                            required
                            placeholder="username"
                            id="username"
                            className="inputField"
                            value={this.state.username}
                            onChange={this.handleFieldChange}                        
                        />
                    </div>
                    <div>
                        <input 
                        className="regInputs"
                            type="password"
                            required
                            placeholder="password"
                            className="inputField"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <input 
                        className="regInputs"
                            type="email"
                            required
                            placeholder="email"
                            id="email"
                            value={this.state.email}
                            className="inputField"
                            onChange={this.handleFieldChange}                        
                        />
                    </div>
                    <div className="signBtn">
                        <Button
                        style={regBtnStyle}
                            onClick={this.handleSignUp}
                        >Sign Up</Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
export default withRouter(Register)