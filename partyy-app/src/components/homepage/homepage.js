import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './homepage.css'
// import { Button } from 'reactstrap'
import invite from './images/invitation.png'
import dj from './images/dj.png'
import vip from './images/vip.png'
import eye from './images/eye-glasses.png'
import exit from './images/exit.png'

class Homepage extends Component {

    // this function will handle the user logging out of the application
    handleLogout = () => {
        sessionStorage.clear()
        this.props.history.push('/login')
    }

    handleThrowParty = () => {
        this.props.history.push('/throwParty')
    }

    handleHostedParty = () => {
        this.props.history.push('/listParties')
    }

    handleSearchPary = () => {
        this.props.history.push('/searchParty')
    }

    handleAttendParty = () => {
        this.props.history.push('/attend')
    }
    render() {
        return (
            <React.Fragment>
                {/* <Button
                    className="logoutButton"
                    onClick={this.handleLogout}
                >Logout</Button> */}
                <img 
                    src={exit}
                    alt="exit"
                    className="exit"
                    onClick= {this.handleLogout}
                />
                <div className="parent">
                    <div className="homepage--parent">
                        <div className="homepage--firstChild">
                            <div className="throwCard">
                                {/* <Button onClick={this.handleThrowParty}>
                                    Throw Party
                                </Button> */}
                                <img src={invite}
                                    className="throwImg"
                                    alt="invite"
                                    onClick={this.handleThrowParty} />
                                <label className="throwLabel">Throw A Party</label>
                            </div>
                            <div className="djCard">
                                {/* <Button onClick={this.handleHostedParty}>
                                    My Hosted Parties
                                </Button> */}
                                <img src={dj}
                                    className="djImg"
                                    alt="dj"
                                    onClick={this.handleHostedParty} />
                                <label className="hostLabel"><strong>My Hosted Parties</strong></label>
                            </div>
                        </div>
                        <div className="homepage--secondChild">
                            <div className="eyeCard">
                                {/* <Button onClick={this.handleSearchPary}>
                                    Search Party
                                </Button> */}
                                <img src={eye}
                                    className="eyeImg"
                                    alt="eye"
                                    onClick={this.handleSearchPary} />
                                <label className="searchLabel">Search Party</label>
                            </div>
                            <div className="vipCard">
                                {/* <Button>
                                    Go Party
                                </Button> */}
                                <img src={vip}
                                    className="vipImg"
                                    alt="vip"
                                    onClick={this.handleAttendParty}
                                />
                                <label className="attendLabel">Attending Parties</label>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(Homepage)