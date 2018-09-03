import React, { Component } from 'react';
import { Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input 
} from 'reactstrap';

class SignIn extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Log Into Account</ModalHeader>
          <ModalBody>
            <InputGroup size='lg'>
              <InputGroupAddon addonType='prepend' className='username'>Username</InputGroupAddon>
              <Input name='username' onChange={this.props.handleChange} />
            </InputGroup>
            <InputGroup size='lg'>
              <InputGroupAddon addonType='prepend' className='password'>Password</InputGroupAddon>
              <Input type='password' name='password' onChange={this.props.handleChange} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' className='login' onClick={() => { this.props.signIn() }}>Log In</Button>
            <Button color='secondary' onClick={() => { this.props.toggle('login') }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default SignIn;