import React, { Component } from 'react';
import { Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Label,
  Form,
  Input 
} from 'reactstrap';

class SignUp extends Component {
  render(props) {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Create an Account</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='firstName'>First Name</Label>
                <Input type='text' name='firstName' className='firstName' />
              </FormGroup>
              <FormGroup>
                <Label for='username'>Username</Label>
                <Input type='text' name='username' className='username' />
              </FormGroup>
              <FormGroup>
                <Label for='email'>E-Mail</Label>
                <Input type='email' name='email' className='email' />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' className='password' />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => { this.props.signUp() }}>Register</Button>{' '}
            <Button color='secondary' onClick={() => { this.props.toggle('signup') }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default SignUp;