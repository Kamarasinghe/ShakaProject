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
                <Input type='text' name='first' className='firstName' onChange={this.props.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for='username'>Username</Label>
                <Input type='text' name='username' className='username' onChange={this.props.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for='email'>E-Mail</Label>
                <Input type='email' name='email' className='email' onChange={this.props.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' className='password' onChange={this.props.handleChange} />
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