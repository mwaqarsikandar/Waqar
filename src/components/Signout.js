import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { unsetAuthedUser } from '../actions/authedUser'

class Signout extends Component {
  componentWillMount () {
    this.props.dispatch(unsetAuthedUser())
  }
  render () {
    return <Redirect to='/' />
  }
}

export default connect()(Signout)
