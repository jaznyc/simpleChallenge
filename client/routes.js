import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Home from './Home'

class Routes extends Component{
  render(){
    return(
        <Route path="/" component={Home} />
    )
  }
}

export default Routes
