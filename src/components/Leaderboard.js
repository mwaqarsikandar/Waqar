import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col } from 'react-bootstrap'


import NavBar from './NavBar';
import Card from './Card';

class Leaderboard extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Container>
                <Col xs={6} md={6}>
                {this.props.sortUsers.map((user) => (
                <Card key={user.id} user={user}/>
                ))}
                </Col>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    const sortUsers = (Object.values(users)).sort((a, b) => {
        const x1 = (Object.keys(a.answers)).length + a.questions.length
        const x2 = (Object.keys(b.answers)).length + b.questions.length
        return x2 - x1
      })
    return {
        sortUsers
    }
}

export default connect(mapStateToProps)(Leaderboard)