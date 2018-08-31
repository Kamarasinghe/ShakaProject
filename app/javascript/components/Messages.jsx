import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Messages extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>First Name</Col>
          <Col>Username</Col>
          <Col>Message</Col>
        </Row>
        {this.props.sampleData.map((user, idx) => {
          return (
            <Row className='userAndMessage' key={idx}>
              <Col>{user.first}</Col>
              <Col>{user.username}</Col>
              <Col>{user.message}</Col>
            </Row>
          );
        })}
      </Container>
    );
  }
};

export default Messages;