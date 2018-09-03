import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; // Connects component to Redux
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { signIn } from '../redux/actions/index'
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

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: username => dispatch(signIn(username))
  };
};

export class App extends Component {
  constructor() {
    super();
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
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signUp() {
    axios.post('/signup', { 
      user: { 
        first: this.state.first, 
        username: this.state.username, 
        email: this.state.email,
        password: this.state.password 
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

  signIn() {
    axios.post('/login', { 
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      if (res.data === 'failed') {
        alert('Invalid username or password');
      } else {
        this.setState({
          first: res.data.first,
          username: '',
          password: ''
        });

        this.props.signIn(res.data.username);
        this.toggleModal('signin');
      }
    })
  }

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

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>ShakaProject</NavbarBrand>
          { this.props.signedIn ? (
              <Nav className='ml-auto' navbar>
                <NavItem>
                  Hello, {this.state.first}
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
