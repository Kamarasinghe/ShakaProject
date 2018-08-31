import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SignUp extends Component {
  render(props) {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Create an Account</ModalHeader>
          <ModalBody>
            TODO: Create form
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={'TODO'}>Register</Button>{' '}
            <Button color="secondary" onClick={() => { this.props.toggle('signup') }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default SignUp;