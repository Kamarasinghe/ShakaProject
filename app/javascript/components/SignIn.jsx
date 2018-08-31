import React, { Component } from 'react';
import { Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input 
} from 'reactstrap';

class SignIn extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Log Into Account</ModalHeader>
          <ModalBody>
            <form onSubmit={'doSomething'}>
              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                <Input name='username' />
              </InputGroup>
              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
                <Input name='password' />
              </InputGroup>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={'TODO'}>Log In</Button>
            <Button color="secondary" onClick={() => { this.props.toggle('login') }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default SignIn;