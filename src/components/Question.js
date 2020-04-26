import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Form } from 'react-bootstrap'

import NavvBar from './NavvBar';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { handleSaveQuestion } from '../actions/shared'

class Question extends Component {
    state = {
        optionone: null,
        optiontwo: null
    }
    handleChangeone = (f) => {
        this.setState({
            optionone: f.target.value
        })
    }
    handleChangetwo = (f) => {
        this.setState({
            optiontwo: f.target.value
        })
    }
    toonSubmit = (f) => {
        f.preventDefault()
        this.props.dispatch(handleSaveQuestion(this.props.authedUser, this.state.optionone, this.state.optiontwo))
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <NavvBar />
                <Container>
                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>WOULD YOU RATHER...</Card.Title>
                            <Form>
                                <Form.Group controlId="users">
                                <Form.Control onChange={this.handleChangeone} type="text" placeholder="Option One" />
                                <span>Or</span>
                                <Form.Control onChange={this.handleChangetwo} type="text" placeholder="Option Two" />
                                </Form.Group>
                                <Button variant="primary" onClick={this.toonSubmit} block>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Question)