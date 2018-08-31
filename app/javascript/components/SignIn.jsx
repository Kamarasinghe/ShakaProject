import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SignIn extends Component {
  render(props) {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Log Into Account</ModalHeader>
          <ModalBody>
            TODO: Login form
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={'TODO'}>Log In</Button>{' '}
            <Button color="secondary" onClick={() => { this.props.toggle('login') }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default SignIn;