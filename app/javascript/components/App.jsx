import React, { Component } from 'react';
import { connect } from 'react-redux'; // Connects component to Redux
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Messages from './Messages';

import { usersAndMessages } from '../../../sampledata';

// Used to grab what you need from the store and pass to component
const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    username: state.username
  };
};

export class App extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      signin: false
    }

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
        {this.state.signup ? (<SignUp toggle={this.toggleModal} />) : <div></div>}
        {this.state.signin ? (<SignIn toggle={this.toggleModal} />) : <div></div>}
        <Messages sampleData={usersAndMessages} />
      </div>
    );
  }
};

export default connect(mapStateToProps)(App);
