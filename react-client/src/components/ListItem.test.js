import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
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