import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import App from '../components/App';

describe ('The app component', () => {
  const wrapper = shallow(<App />);

  it ('should exist', () => {
    expect(wrapper.exists());
  });
});