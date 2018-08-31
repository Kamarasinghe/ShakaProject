import React, { Component } from 'react';
import { connect } from 'react-redux'; // Connects component to Redux
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
  }

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>ShakaProject</NavbarBrand>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href=''>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href=''>Register</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  };
};

App = connect(mapStateToProps)(App);
export default App;