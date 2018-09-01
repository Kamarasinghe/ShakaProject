import React, { Component } from 'react';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Messages extends Component {
  constructor() {
    super();

    this.state = {
      currentMessages: [],
      pageNum: 1
    }

    this.paginationFilter = this.paginationFilter.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    // Set the initial first 5 messages
    this.paginationFilter(1);
  }

  changePage(action) {
    if (typeof action === 'string') {
      // Make sure the pageNum does not go more than paginationNum
      if (action === 'next' && this.state.pageNum < this.props.paginationNum) {
        let pageNum = this.state.pageNum + 1;
        // Run paginationFilter to show correct messages
        this.paginationFilter(pageNum);
        // Set the state to the new pageNum
        this.setState({
          pageNum: pageNum
        });
      } else if (action === 'previous' && this.state.pageNum > 1) {
        let pageNum = this.state.pageNum - 1;
        // Run paginationFilter to show correct messages
        this.paginationFilter(pageNum);
        // Set the state to the new pageNum
        this.setState({
          pageNum: pageNum
        });
      }
    } else {
      // Run the paginationFilter and pass in clicked page number
      this.paginationFilter(action)
      // Update state with new pageNum
      this.setState({
        pageNum: action
      });
    }
  } 

  paginationFilter(pageNum) {
    // Create variable for all messages passed through props
    let allMessages = this.props.sampleData;
    // Designate how many messages to show 
    let endSlice = pageNum * 5;
    // Variable for where to begin array slice
    let beginSlice = endSlice - 5;
    let selectedMessages = allMessages.slice(beginSlice, endSlice);

    this.setState({
      currentMessages: selectedMessages
    });
  }

  render() {
    return (
      <Container>
        <div>
          <Row>
            <Col>First Name</Col>
            <Col>Username</Col>
            <Col>Message</Col>
          </Row>
          {this.state.currentMessages.map((user, idx) => {
            return (
              <Row className='userAndMessage' key={idx}>
                <Col>{user.first}</Col>
                <Col>{user.username}</Col>
                <Col>{user.message}</Col>
              </Row>
            );
          })}
        </div>
        <div>
          <Pagination aria-label='messages pagination'>
            <PaginationItem>
              <PaginationLink previous onClick={() => { this.changePage('previous')}} />
            </PaginationItem>
              {[...Array(this.props.paginationNum)].map((num, idx) => {
                let pageNum = idx + 1;

                return (
                  <div key={idx}>
                    <PaginationItem>
                      <PaginationLink onClick={() => { this.changePage(pageNum) }}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  </div>
                );
              })}
            <PaginationItem>
              <PaginationLink next onClick={() => { this.changePage('next')}} />
            </PaginationItem>
          </Pagination>
        </div>
      </Container>
    );
  }
};

export default Messages;