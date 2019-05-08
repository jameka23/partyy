import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {Card} from 'reactstrap'


class Attend extends Component{


    render(){
        console.log(this.props.attend)
        let user = Number(sessionStorage.getItem('userId'))
        return(
            <React.Fragment>
                {
                    this.props.attend.filter(attending => attending.userId === user)
                    .map(attending => (
                        <Card>
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