import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

import '../css/QuestionDetail.css'

class Card extends Component {
    render() {
        const { toUser } = this.props
        return (
                <Card>
                    <Card.Img variant="top" src={toUser.avatarURL} />
                    <Card.Body>
                        <Card.Title>{toUser.name}</Card.Title>
                            <div className="cell">Answered Questions: {Object.keys(toUser.answers).length}</div>
                            <div className="cell">Created Question: {toUser.questions.length}</div>
                            <div className="cell">Score: {Object.keys(toUser.answers).length + toUser.questions.length}</div>
                    </Card.Body>
                </Card>
        )
    }
}

export default Card