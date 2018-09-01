import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import SignIn from '../components/SignIn';

describe ('Test the sign in modal component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignIn />);
  });

  it ('should exist', () => {
    expect(wrapper.exists());
  });

  it ('should have username field', () => {
    expect(wrapper.find('.username').length).toBe(1);
  });

  it ('should have password field', () => {
    expect(wrapper.find('.password').length).toBe(1);
  });
});