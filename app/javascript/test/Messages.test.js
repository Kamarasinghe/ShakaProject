import React from 'react';
import { configure, shallow } from 'enzyme';
import { usersAndMessages } from '../../../sampledata';
import { Messages } from '../components/Messages';

describe ('Test the Message component', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<Messages />);
    wrapper.setState({ paginationNum: 2 });
    wrapper.setProps({ allMessages: usersAndMessages })
    instance = wrapper.instance();
  });

  it ('should exist', () => {
    expect(wrapper.exists());
  });

  it ('selectedMessage should set state', () => {
    instance.selectMessage('Test');
    expect(wrapper.state().selectMessage).toBe(true);
    expect(wrapper.state().selectedMessage).toBe('Test');
  });

  it ('paginationFilter should set 5 messages to state', () => {
    instance.paginationFilter(1);
    expect(wrapper.state().currentMessages.length).toBe(5);
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