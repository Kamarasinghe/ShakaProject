import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; // Connects component to Redux
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { signIn, signOut } from '../redux/actions/index'
import SignUp from './SignUp';
import SignIn from './SignIn';
import Messages from './Messages';

// Used to grab what you need from the store and pass to component
const mapStateToProps = (state) => {
  return {
    admin: state.isAdmin,
    signedIn: state.signedIn,
  };
};

// Used to 
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: userInfo => dispatch(signIn(userInfo)),
    signOut: () => dispatch(signOut())
  };
};

export class App extends Component {
  constructor() {
    super();
    // These are all stored in state so that 
    // signIn and signUp forms can update them from 
    // their individual component
    this.state = {
      signup: false,
      signin: false, 
      admin: false,
      first: '',
      email: '',
      username: '',
      password: '',
    }

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Grabs the required information to send with post
  // request to save information to database
  signUp() {
    axios.post('/signup', { 
      user: { 
        first: this.state.first, 
        username: this.state.username, 
        email: this.state.email,
        password: this.state.password,
        isAdmin: this.state.admin 
      }
    }).then((res) => {
      if (res.data === 'Success') {
        this.toggleModal('signup');
        alert('Successfully registered');
      } else {
        alert('Something went wrong, please try again')
      }
    });
  }

  // Send the login information via post request
  signIn() {
    axios.post('/login', { 
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      // If the response is 'failed', then 
      // alert the user. I chose to user alert
      // so that the user is aware that they
      // were not able to log in
      if (res.data === 'failed') {
        alert('Invalid username or password');
      } else {
      // If successfully signed in, I need to 
      // set the state with first name for the
      // nav bar greeting and set the admin,
      // username, and password back to a 
      // neutral state
        this.setState({
          admin: false,
          first: res.data.first,
          username: '',
          password: ''
        });

        // Send username, isAdmin, and userId information to the redux store
        // and then close the signIn modal
        this.props.signIn({ username: res.data.username, isAdmin: res.data.isAdmin, userId: res.data.id });
        this.toggleModal('signin');
      }
    });
  }

  // Send a delete request that destroys the user session
  // and set firstName to neutral state
  signOut() {
    axios.delete('/logout')
    .then((res) => {
      this.setState({
        first: '',
      });

      // Call the redux action to sign user out
      this.props.signOut();
    });
  }

  // If the event name is 'admin' set state true or
  // false for the signup toggle, else update the
  // corresponding state name with value
  handleChange(event) {
    if (event.target.name === 'admin') {
      this.setState({
        admin: !this.state.admin
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  // Handles opening and closing of both sign up and sign in modals
  toggleModal (modal) {
    (modal === 'signup') ? (
      this.setState({
        signup: !this.state.signup
      })
    ) : (
      this.setState({
        signin: !this.state.signin
      })
    )
  }

  // If there is no user signed in, show the sign in and sign up buttons
  // If there is a user signed in, then greet them with their first name
  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand>ShakaProject</NavbarBrand>
          { this.props.signedIn ? (
              <Nav className='ml-auto' navbar>
                <NavItem style={{paddingTop: '8px'}}>
                  Hello, {this.state.first}
                </NavItem>
                <NavItem>
                  <NavLink className='signOut' onClick={this.signOut}>Sign Out</NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink className='signUp' onClick={() => { this.toggleModal('signup') }}>Sign Up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='signIn' onClick={() => { this.toggleModal('signin') }}>Sign In</NavLink>
                </NavItem>
              </Nav>
            )
          }
        </Navbar>
        {this.state.signup ? (<SignUp toggle={this.toggleModal} handleChange={this.handleChange} signUp={this.signUp} />) : <div></div>}
        {this.state.signin ? (<SignIn toggle={this.toggleModal} handleChange={this.handleChange} signIn={this.signIn} />) : <div></div>}
        <Messages />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
  I chose to use modals here because I believe it makes for a better user experience
  if the user isn't redirected from page to page. The state stored in this component are 
  all changed according to user input whereas the Redux store is used to set persistant
  data such as username and if their admin.
*/