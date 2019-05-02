import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './homepage.css'
import { Card, Button } from 'reactstrap'

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

    render() {
        return (
            <React.Fragment>
                <Button
                    onClick={this.handleLogout}
                >Logout</Button>

                <div className="homepage--parent">
                    <Card>
                        <div className="homepage--firstChild">
                            <Card>
                                <Button onClick={this.handleThrowParty}>
                                    Throw Party
                                </Button>
                            </Card>
                            <Card>
                                <Button onClick={this.handleHostedParty}>
                                    My Hosted Parties
                                </Button>
                            </Card>
                        </div>
                        <div className="homepage--secondChild">
                            <Card>
                                <Button onClick={this.handleSearchPary}>
                                    Search Party
                                </Button>
                            </Card>
                            <Card>
                                <Button>
                                    Go Party
                                </Button>
                            </Card>
                        </div>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(Homepage)