import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Form, Button, Col, ProgressBar, Badge } from 'react-bootstrap'

import NavigationBar from './NavigationBar'
import '../css/QuestionDetail.css'

import { handleAnswer } from '../actions/shared';

class QuestionDetails extends Component {
    state = {
        selectValue : null
    }
    handleChange = (f) => {
        this.setState({
            selectValue: f.target.value
        })
    }
    toonSubmit = (f) => {
        f.preventDefault()
        this.props.dispatch(handleAnswer(this.props.authedUser, this.props.match.params.id, this.state.selectValue))
    }
    render() {
        if(this.props.error) {
            return (
                <Container>
                    <Col>
                        <h1>ERROR 404</h1>
                        <p>SORRY This page is not found</p>
                    </Col>
                </Container>
            )
        }

        let quest = this.props.q ? this.props.q : ''
        let answerMarkOptionOne = this.props.q ? this.props.q.optionOne.votes.includes(this.props.authedUser) : null
        let answerMarkOptionTwo = this.props.q ? this.props.q.optionTwo.votes.includes(this.props.authedUser) : null
        return (
            <div>
                <NavigationBar />
                <Container>
                    {answerMarkOptionOne === true || answerMarkOptionTwo === true ? (
                        <Col xs={6} md={6}>
                            <Card>
                                <Card.Img variant="top" src={this.props.author.avatarURL} />
                                <Card.Body>
                                    <Card.Title>Asked by {this.props.author.name}</Card.Title>
                                    <Card.Text>
                                        YOUR RESULTS ARE:
                                    </Card.Text>
                                    <div>
                                        <div className="cell">
                                            <div>
                                                {answerMarkOptionOne ? (
                                                    <Badge pill variant="warning">
                                                        YOUR VOTE
                                                    </Badge>
                                                ) : ' '}
                                            </div>
                                            Would you rather {quest ? quest.optionOne.text : ''}
                                            <ProgressBar now={quest ? (quest.optionOne.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}
                                                label={`${quest ? (quest.optionOne.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}%`} />
                                            <p>{quest ? `${quest.optionOne.votes.length} out of ${quest.optionTwo.votes.length + quest.optionOne.votes.length}` : ' '}</p>
                                        </div>
                                        <div className="cell">
                                            <div>
                                                {answerMarkOptionTwo ? (
                                                    <Badge pill variant="warning">
                                                        YOUR VOTE
                                                    </Badge>
                                                ) : ' '}
                                            </div>
                                            Would you rather {quest ? quest.optionTwo.text : ''}
                                            <ProgressBar now={quest ? (quest.optionOne.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}
                                                label={`${this.props.q ? (quest.optionTwo.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}%`} />
                                            <p>{quest ? `${quest.optionTwo.votes.length} out of ${quest.optionTwo.votes.length + quest.optionOne.votes.length}` : ' '}</p>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    ) : (
                            <Col xs={6} md={6}>
                                <Card>
                                    <Card.Img variant="top" src={this.props.author.avatarURL} />
                                    <Card.Body>
                                        <Card.Title>{this.props.author.name} ASKS</Card.Title>
                                        <Card.Text>
                                            Would you rather
                                        </Card.Text>
                                        <Form.Group>
                                        <div className="mb-3">
                                            <Form.Check
                                                type="radio"
                                                name="select"
                                                label={quest ? quest.optionOne.text : ''}
                                                onChange={this.handleChange}
                                                value="optionOne"
                                            />

                                            <Form.Check
                                                type="radio"
                                                name="select"
                                                label={quest ? quest.optionTwo.text : ''}
                                                onChange={this.handleChange}
                                                value="optionTwo"
                                            />
                                        </div>
                                        </Form.Group>
                                        <Button variant="primary" block onClick={this.toonSubmit}>Press it to SUBMIT</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
    if(questtions[match.params.id] === undefined) {
        const error = true;
        return {
            error
        }
    }

    let q = questtions[match.params.id]
    let author = q ? users[q.author] : ''
    return {
        q: questtions[match.params.id],
        author,
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionDetails)