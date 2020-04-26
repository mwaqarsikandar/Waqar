import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Nav } from 'react-bootstrap'


import NavigationBar from './NavigationBar';
import Poll from './Poll';
import '../css/custom.css'

class Home extends Component {
    state = {
        switchQuestion : false,
    }

    handleChangeAnswered = () => {
        this.setState({
            switchQuestion : true
        })
    }
    handleChangeUnAnswered = () => {
        this.setState({
            switchQuestion : false
        })
    }
   
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    <Col xs={6} md={6}>
                        <Nav justify variant="tabs" defaultActiveKey="link-1">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" onClick={this.handleChangeUnAnswered}>Unanswered</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" onClick={this.handleChangeAnswered}>Answered</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        {this.state.switchQuestion === false ? (
                            this.props.unanswerQuestions.map((q) => (
                                <Poll key={q.id} ques={q} />
                            ))
                        ) : this.props.answerQuestions.map((q) => (
                            <Poll key={q.id} ques={q} />
                        ))}
                    </Col>
                </Container>
            </div>
        )
    }
}
function mapStateToProps({ users, questions, authedUser }) {
    let allQuests = Object.values(questions)
    let logInUser = users[authedUser] 
    let logInAnswers = logInUser ? Object.keys(logInUser.answers) : []
    return {
        answerQuestions : allQuests.filter((question) => logInAnswers.includes(question.id))
                                        .sort((a, b) => b.timestamp - a.timestamp),
        unanswerQuestions: allQuests.filter((question) => !logInAnswers.includes(question.id))
                                        .sort((a, b) => b.timestamp - a.timestamp)
    }
}
export default connect(mapStateToProps)(Home)
