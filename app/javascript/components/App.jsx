import React, { Component } from 'react';
import { connect } from 'react-redux'; // Connects component to Redux
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Signup from './Signup';

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
      register: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  // Handles opening and closing of both register and login modals
  toggleModal (modal) {
    (modal === 'signup') ? (
      this.setState({
        signup: !this.state.signup
      })
    ) : (
      this.setState({
        register: !this.state.register
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
                <NavLink onClick={ () => { this.toggleModal('signup') } }>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href=''>Register</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        {this.state.signup ? (<Signup toggle={this.toggleModal} />) : <div></div>}
      </div>
    );
  }
};

App = connect(mapStateToProps)(App);
export default App;