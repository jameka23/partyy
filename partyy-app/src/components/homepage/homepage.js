import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import './homepage.css'
import { Card, Button } from 'reactstrap'

class Homepage extends Component {

    // this function will handle the user logging out of the application
    handleLogout = () => {
        sessionStorage.clear()
        this.props.history.push('/login')
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
                                <Button component={Link} to='/throwParty'>
                                    Throw Party
                                </Button>
                            </Card>
                            <Card>
                                <Button component={Link} to='/listParties'>
                                    My Hosted Parties
                                </Button>
                            </Card>
                        </div>
                        <div className="homepage--secondChild">
                            <Card>
                                <Button component={Link} to='/searchParty'>
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