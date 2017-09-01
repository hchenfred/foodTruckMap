import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import ListItem from './ListItem';

test('ListItem component should render as expected', () => {
  const truck = {
    applicant: 'Munch A Bunch',
    address: '100 Brannan St',
    dayshours: 'Mo-Fr:10AM-11AM',
    fooditems: 'good food!',
    cnn: '123456'
  };
  const component = shallow(<ListItem truck={truck} key={'123456'}/>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('ListItem component should render as expected', () => {
  const truck = {
    applicant: 'Munch A Bunch',
    address: '100 Brannan St',
    dayshours: 'Mo-Fr:10AM-11AM',
    fooditems: 'good food!',
    cnn: '123456',
    marker: {
      setAnimation: function(fake) {

      }
    }
  };
  const handleClick = sinon.stub(ListItem.prototype, 'handleClick').returns(true);
  const wrapper = mount(<ListItem truck={truck} key={'123456'}/>);
  expect(wrapper.find('.card').length).toBe(1);
  wrapper.find('div').simulate('click');
  expect(handleClick.called).toBe(true);
  handleClick.restore();
});