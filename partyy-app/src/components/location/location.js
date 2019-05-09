import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Location extends Component{
    render(){
        return(
            <React.Fragment>
                hello, from location
            </React.Fragment>
        )
    }
}

export default withRouter(Location)