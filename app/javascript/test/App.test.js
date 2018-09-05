import React from 'react';
import { configure, shallow } from 'enzyme';
import { App } from '../components/App';


describe ('The app component', () => {
  const wrapper = shallow(<App admin={true} />);
  const instance = wrapper.instance();

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

  it ('handleChange should change state depending on input', () => {
    instance.handleChange({ target : { name: 'first', value: 'Test' }});
    instance.handleChange({ target : { name: 'email', value: 'test@test.com' }});
    instance.handleChange({ target : { name: 'username', value: 'testing' }});
    instance.handleChange({ target : { name: 'password', value: 'asdf' }});

    expect(wrapper.state().first).toBe('Test');
    expect(wrapper.state().email).toBe('test@test.com');
    expect(wrapper.state().username).toBe('testing');
    expect(wrapper.state().password).toBe('asdf');
  });
});