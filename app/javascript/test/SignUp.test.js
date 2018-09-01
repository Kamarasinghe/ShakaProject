import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import SignUp from '../components/SignUp';

describe ('Test the sign up modal component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it ('should exist', () => {
    expect(wrapper.exists());
  });

  it ('should have first name field', () => {
    expect(wrapper.find('.firstName').length).toBe(1);
  });

  it ('should have username field', () => {
    expect(wrapper.find('.username').length).toBe(1);
  });

  it ('should have e-mail field', () => {
    expect(wrapper.find('.email').length).toBe(1);
  });

  it ('should have password field', () => {
    expect(wrapper.find('.password').length).toBe(1);
  });
});