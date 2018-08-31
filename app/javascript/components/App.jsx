import React, { Component } from 'react';
import { connect } from 'react-redux'; // Connects component to Redux

// Used to grab what you need from the store and pass to component
const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin
  };
};

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>This from app</div>
    )
  };
};

App = connect(mapStateToProps)(App);
export default App;