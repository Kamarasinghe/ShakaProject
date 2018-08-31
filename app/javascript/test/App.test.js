import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { App } from '../components/App';
import store from '../redux/store'


describe ('The app component', () => {
  const wrapper = shallow(<App admin={true} />);

  it ('should exist', () => {
    expect(wrapper.exists());
  });

  it ('click on sign up should set signup state to true', () => {
    wrapper.find('.signUp').simulate('click');
    expect(wrapper.state().signup).toBe(true);
  });
  
  it ('click on sign in should set signin state to true', () => {
    wrapper.find('.signIn').simulate('click');
    expect(wrapper.state().signin).toBe(true);
  });
});