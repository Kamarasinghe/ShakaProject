import React, { Component } from 'react';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class SelectedMessage extends Component {
  render() {
    return (
      <div>
          <Modal isOpen={true}>
            <ModalHeader>Edit Message</ModalHeader>
            <ModalBody>
              <Label for='firstName' style={{paddingRight: '5px'}}>Original:</Label>
              {this.props.selectedMessage.message}
              <br />
              <Form>
                <FormGroup style={{paddingTop: '15px'}}>
                  <Input type='text' name='message' className='editMessage' maxLength='70' onChange={this.props.handleChange} value={this.props.message} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' className='update' onClick={() => { this.props.handleSubmit(this.props.selectedMessage.id) }}>Update</Button>
              <Button color='secondary' onClick={() => { this.props.toggle() }}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </div>
    );
  }
};

export default SelectedMessage;