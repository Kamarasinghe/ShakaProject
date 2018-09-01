import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Messages from '../components/Messages';

describe ('Test the Message component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Messages paginationNum={2} />);
  });

  it ('should exist', () => {
    expect(wrapper.exists());
  });

  it ('should have 2 pagination pages', () => {
    expect(wrapper.find('.paginationPage').length).toBe(2);
  });

  it ('should not decrease page num if on page one', () => {
    wrapper.find('.previous').simulate('click');
    expect(wrapper.state().pageNum).toBe(1);
  });

  it ('should increase page num by clicking on next', () => {
    wrapper.find('.next').simulate('click');
    expect(wrapper.state().pageNum).toBe(2);
  });

  it ('should not increase page num if on last page', () => {
    wrapper.find('.next').simulate('click');
    wrapper.find('.next').simulate('click');
    wrapper.find('.next').simulate('click');
    wrapper.find('.next').simulate('click');
    expect(wrapper.state().pageNum).toBe(2);
  });
});