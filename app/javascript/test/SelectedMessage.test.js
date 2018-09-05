import React from 'react';
import { configure, shallow } from 'enzyme';
import SelectedMessage from '../components/SelectedMessage';

describe ('Test the selected message modal component', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<SelectedMessage selectedMessage={{ message: 'test' }} />);
    instance = wrapper.instance();
  });

  it ('should exist', () => {
    expect(wrapper.exists());
  });

  it ('should be a stateless component', () => {
    expect(wrapper.state()).toBe(null);
  });

  it ('should have field to edit the message', () => {
    expect(wrapper.find('.editMessage').length).toBe(1);
  });

  it ('should have submit button to update message', () => {
    expect(wrapper.find('.update').length).toBe(1);
  });
});