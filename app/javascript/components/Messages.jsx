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
    isAdmin: state.isAdmin,
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

  // Invoke the function that gets the messages  
  // from the database when the component mounts
  componentDidMount() {
    this.getMessages();
  }

  // Makes the getRequest to /messages and sets
  // state of paginationNum(the maximum amount 
  // of pages), sends the messages to the store
  // for easy access in other components, and also
  // sets the first 5 messages to show using the
  // paginationFilter function 
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

  // Verifies that the messages is at least 4
  // characters. If successfully submitted, then
  // runs getMessages function to retrieve newest
  // message, changes the page back to where user
  // was previously and deletes the user input
  // from the messageInput box.  If not successful
  // shows user error message to make sure they are
  // logged in which is the likely cause the message
  // did not get saved to database. Alerts the user
  // if the message is not at least 4 characters.
  messageSubmit() {
    if (this.state.message.length >= 4) {
      axios.post('/message', { messages: { message: this.state.message, user_id: this.props.userId }})
      .then((res) => {
        if (res.data === 'Success') {
          this.getMessages();
          this.changePage(this.state.pageNum);
          ReactDOM.findDOMNode(this.refs.messageInput).value = '';
        } else {
          alert('An error has occurred, are you signed in?');
        }
      });
    } else {
      alert('Requires at least 4 characters');
    }
  }

  // Handles the deleting of a message by sending
  // the message id with the delete request to /message
  messageDelete(id) {
    axios.delete('/message', { data: { messageId: id }})
    .then(() => {
      this.getMessages();
    });
  }

  // Updates a previously inputted message using a 
  // patch request to /message. Sends message id
  // and the new message along with the request. In
  // order to submit, the message must be at least
  // 4 characters.
  messageUpdate(id) {
    if (this.state.message.length >= 4) {
      axios.patch('/message', { messageId: id, newMessage: this.state.message })
      .then(() => {
        this.selectMessage('');
        this.getMessages();
      });
    } else {
      alert('Requires at least 4 characters');
    }
  }

  // If a message is sent via argument: opens the modal to edit message, 
  // sets the selected message in state for access in Selected Message
  // component. If no message selected, closes the modal.
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

  // compareFunction passed into the sort method
  // Assigns value, 0, 1, or -1, when comparing
  // two properties. If descending order, then 
  // multiply the 'score' by -1 
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

  // Takes in an array that has which category to filter
  // and which direction to sort in. Invoke the sort method
  // with the compareValues function to sort the messages. Set
  // allMessages to the newly sorted and run the paginationFilter
  // with the first page passed in.
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

  // Sets the currentMessages state which are the 
  // messages that are going to be displayed 
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

  // Map through the current messages and display the first name, username, and the message
  // Incorporate conditional rendering so that the current user can edit/delete their own message
  // or if they are admin, can edit/delete any users message
  // Create an array the length of the paginationNum and map through to create each individual
  // pagination number
  // Conditional renders the SelectedMessage component depending on the value of selectMessage
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
                    {this.props.userId === message.user.id || this.props.isAdmin ? (
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