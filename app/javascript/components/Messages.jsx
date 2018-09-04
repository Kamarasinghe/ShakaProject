import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import { getMessages } from '../redux/actions/index';
import SelectedMessage from './SelectedMessage';
import { 
  Container, 
  Row, 
  Col, 
  Pagination, 
  PaginationItem, 
  PaginationLink,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input
} from 'reactstrap';


const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    signedIn: state.signedIn,
    allMessages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: messages => dispatch(getMessages(messages))
  };
};

export class Messages extends Component {
  constructor() {
    super();

    this.state = {
      currentMessages: [],
      selectMessage: false,
      selectedMessage: {},
      paginationNum: '',
      message: '',
      pageNum: 1
    }

    this.changePage = this.changePage.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectMessage = this.selectMessage.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
    this.messageDelete = this.messageDelete.bind(this);
    this.messageUpdate = this.messageUpdate.bind(this);
    this.compareValues = this.compareValues.bind(this);
    this.paginationFilter = this.paginationFilter.bind(this);
  }

  componentDidMount() {
    this.getMessages();
  }

  getMessages() {
    axios.get('/messages')
    .then((res) => {
      let paginationNum = Math.ceil(res.data.length / 5);
      // Send messages to store
      this.props.getMessages(res.data);
      // Set max amount of pages
      this.setState({
        paginationNum: paginationNum
      });
    }).then(() => {
      // Set the initial first 5 messages
      this.paginationFilter(1);
    });
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  messageSubmit() {
    axios.post('/message', { messages: { message: this.state.message, user_id: this.props.userId }})
    .then((res) => {
      if (res.data === 'Success') {
        this.getMessages();
        this.changePage(this.state.pageNum);
        ReactDOM.findDOMNode(this.refs.messageInput).value = '';
      } else {
        alert('An error has occurred, are you signed in?');
      }
    })
  }

  messageDelete(id) {
    axios.delete('/message', { data: { messageId: id }})
    .then(() => {
      this.getMessages();
    });
  }

  messageUpdate(id) {
    axios.patch('/message', { messageId: id, newMessage: this.state.message })
    .then(() => {
      this.selectMessage('');
      this.getMessages();
    });
  }

  selectMessage(message) {
    if (message) {
      this.setState({
        selectMessage: true,
        selectedMessage: message,
        message: message.message
      });
    } else {
      this.setState({
        selectMessage: false
      });
    }
  }

  compareValues(key, createdAt, order='asc') {
    return function(a, b) {
      // Grab the user property within message 
      if (createdAt) {
        a = a.user;
        b = b.user;
      }

      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // Property doesn't exist on either object
          return 0; 
      }
  
      // Turn key into uppercase if string
      const upperCaseKeyA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const upperCaseKeyB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (upperCaseKeyA > upperCaseKeyB) {
        comparison = 1;
      } else if (upperCaseKeyA < upperCaseKeyB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  filter(action) {
    let category = action[0];
    let createdAt = category === 'created_at' ? false : true;
    let direction = action[1];
    let sorted;
    
    if (direction === 'down') {
      sorted = this.props.allMessages.sort(this.compareValues(category, createdAt, 'desc'));
    } else {
      sorted = this.props.allMessages.sort(this.compareValues(category, createdAt));
    }

    this.setState({
      allMessages: sorted
    });

    this.paginationFilter(1);
  }

  changePage(action) {
    if (typeof action === 'string') {
      // Make sure the pageNum does not go more than paginationNum
      if (action === 'next' && this.state.pageNum < this.state.paginationNum) {
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
    // Designate how many messages to show 
    let endSlice = pageNum * 5;
    // Variable for where to begin array slice
    let beginSlice = endSlice - 5;
    let selectedMessages = this.props.allMessages.slice(beginSlice, endSlice);
    
    this.setState({
      currentMessages: selectedMessages
    });
  }

  render() {
    return (
      <div>
        <Container>
          <div>
            <Row style={{paddingBottom: 10}}>
              <Col xs='2' className='heading' style={{fontWeight: 'bold', fontSize: '22px'}}>
                First Name 
                <i style={{fontWeight: '200'}} className='fas fa-arrow-alt-circle-up' onClick={() => { this.filter(['first', 'up']) }} />
                <i style={{fontWeight: '200'}} className='fas fa-arrow-alt-circle-down' onClick={() => { this.filter(['first', 'down']) }} />
              </Col>
              <Col xs='2' className='heading' style={{fontWeight: 'bold', fontSize: '22px'}}>
                Username 
                <i style={{fontWeight: '200'}} className='fas fa-arrow-alt-circle-up' onClick={() => { this.filter(['username', 'up']) }} />
                <i style={{fontWeight: '200'}} className='fas fa-arrow-alt-circle-down' onClick={() => { this.filter(['username', 'down']) }} />
              </Col>
              <Col xs='6' className='heading' style={{fontWeight: 'bold', fontSize: '22px'}}>
                Message
                <i style={{fontWeight: '200'}} className='fas fa-arrow-alt-circle-up' onClick={() => { this.filter(['created_at', 'up']) }} />
                <i style={{fontWeight: '200'}} className='fas fa-arrow-alt-circle-down' onClick={() => { this.filter(['created_at', 'down']) }} />
              </Col>
            </Row>
            {this.state.currentMessages.map((message, idx) => {
              return (
                <Row className='userAndMessage' key={idx} style={{paddingBottom: 5}}>
                  <Col xs='2'>{message.user.first}</Col>
                  <Col xs='2'>{message.user.username}</Col>
                  <Col xs='6'>{message.message}</Col>
                  <Col xs='2'>
                    {this.props.userId === message.user.id ? (
                      <div>
                        <i className='far fa-edit' style={{paddingRight: '10px'}} onClick={() => { this.selectMessage(message) }} />
                        <i className='far fa-trash-alt' onClick={() => { this.messageDelete(message.id) }} />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
              );
            })}
          </div>
          <Row>
            <Col xs='6' style={{paddingTop: '5px'}}>
              <InputGroup>
                <Input maxLength='70' ref='messageInput' onChange={this.handleChange} />
                <InputGroupAddon addonType='append'>
                  <InputGroupText onClick={this.messageSubmit}>Send Message</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col xs='6' style={{paddingTop: '5px'}}>
              <Pagination aria-label='messages pagination'>
                <PaginationItem>
                  <PaginationLink previous onClick={() => { this.changePage('previous')}} className='previous' />
                </PaginationItem>
                  {[...Array(this.state.paginationNum)].map((num, idx) => {
                    let pageNum = idx + 1;

                    return (
                      <div key={idx}>
                        <PaginationItem className={`paginationPage ${pageNum}`}>
                          <PaginationLink onClick={() => { this.changePage(pageNum) }}>
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      </div>
                    );
                  })}
                <PaginationItem>
                  <PaginationLink next onClick={() => { this.changePage('next')}} className='next' />
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
        </Container>
        <div>
          {this.state.selectMessage ? 
            <SelectedMessage 
              selectedMessage={this.state.selectedMessage}
              message={this.state.message} 
              toggle={this.selectMessage} 
              handleChange={this.handleChange}
              handleSubmit={this.messageUpdate} 
            /> : <div></div>
          }
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);