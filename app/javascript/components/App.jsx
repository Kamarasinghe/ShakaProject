import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'; // Connects component to Redux
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Messages from './Messages';

// Used to grab what you need from the store and pass to component
const mapStateToProps = (state) => {
  return {
    admin: state.isAdmin,
    username: state.username,
  };
};

export class App extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      signin: false
    }

    this.signUp = this.signUp.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  signUp() {
    axios.post('/signup', { 
      user: { 
        first: this.state.first, 
        username: this.state.username, 
        email: this.state.email,
        password: this.state.password 
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>ShakaProject</NavbarBrand>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink className='signUp' onClick={() => { this.toggleModal('signup') }}>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='signIn' onClick={() => { this.toggleModal('signin') }}>Sign In</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        {this.state.signup ? (<SignUp toggle={this.toggleModal} signUp={this.signUp} />) : <div></div>}
        {this.state.signin ? (<SignIn toggle={this.toggleModal} />) : <div></div>}
        <Messages />
      </div>
    );
  }
};

export default connect(mapStateToProps)(App);
