import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Col, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import { setAuthedUser } from '../actions/authedUser'
import { fakeAuth } from '../authentication/auth'


class Signin extends Component {
    state = {
        userid: null,
        redirectToRef: false
    }
    handleChange = (f) => {
        this.setState({
            userid: f.target.value
        })
    }
    Signin = (f) => {
        f.preventDefault()
        fakeAuth.authenticate(() => {
            this.setState({
                redirectToRef: true
            })
        })
        this.props.dispatch(setAuthedUser(this.state.userid))
    }
    render() {
        const { redirectToRef } = this.state
        const { from } = this.props.location.state || { from : { pathname: '/' } }

        if (redirectToRef === true) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <Container>
                <Col xs={6}>
                    <Card>
                        <Card.Header as="h5">Would You Rather App</Card.Header>
                        <Card.Body>
                            <Card.Title>Sign In to begin the game</Card.Title>
                            <Form>
                                <Form.Group controlId="users">
                                    <Form.Control as="select" onChange={this.handleChange}>
                                    <option hidden value="default">Sign In</option>
                                        {this.props.users.map((id) => (
                                            <option key={id} value={id}>
                                                {id}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={this.Signin}>Sign In</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Signin)