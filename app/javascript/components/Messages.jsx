import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Messages extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>First Name</Col>
          <Col>Last Name</Col>
          <Col>Message</Col>
          <Col>Sent At</Col>
        </Row>
        {this.props.sampleData.map((user) => {
          return (
            <Row>
              <Col>{user.first}</Col>
              <Col>{user.last}</Col>
              <Col>{user.username}</Col>
              <Col>{user.createdAt}</Col>
            </Row>
          );
        })}
      </Container>
    );
  }
};

export default Messages;