import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {Card} from 'reactstrap'
import logo from './logo1.png'
import './attend.css'
import home from './home.png'

class Attend extends Component{

    handleGoBack = () =>{
        this.props.history.push('/')
    }

    render(){
        console.log(this.props.attend)
        let user = Number(sessionStorage.getItem('userId'))
        return(
            <React.Fragment>
                <div>
                    <img 
                        src={home}
                        alt="home"
                        className="home"
                        onClick={this.handleGoBack}
                    />
                </div>
                <div>
                    <img 
                        src={logo}
                        alt="logo"
                        className="logoAttend"
                    />
                </div>
                {
                    this.props.attend.filter(attending => attending.userId === user)
                    .map(attending => (
                        <Card key={attending.id}className="attendingCards">
                            <div key={attending.id}>
                                <p>{attending.party.name}</p>
                                <p>{attending.party.address}</p>
                            </div>
                        </Card>
                    ))
                }

            </React.Fragment>
        )
    }
}

export default withRouter(Attend)