import React, { Component } from 'react';
import { connect } from 'react-redux'; // Connects component to Redux
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Signup from './Signup';
import SignIn from './SignIn';

// Used to grab what you need from the store and pass to component
const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    username: state.username
  };
};

class App extends Component {
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
                <NavLink onClick={() => { this.toggleModal('signup') }}>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => { this.toggleModal('signin') }}>Sign In</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        {this.state.signup ? (<Signup toggle={this.toggleModal} />) : <div></div>}
        {this.state.signin ? (<SignIn toggle={this.toggleModal} />) : <div></div>}
      </div>
    );
  }
};

App = connect(mapStateToProps)(App);
export default App;