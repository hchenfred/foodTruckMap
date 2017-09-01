import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import List from './List';
import ListItem from './ListItem';

test('List component should render as expected', () => {
  const searchedResults = [{
    applicant: 'Munch A Bunch',
    address: '100 Brannan St',
    dayshours: 'Mo-Fr:10AM-11AM',
    fooditems: 'good food!',
    cnn: '123456'
  }];
  const component = shallow(<List searchedResults={searchedResults}/>);
  const tree = toJson(component);
  expect(component.find(ListItem).length).toBe(1);
  expect(tree).toMatchSnapshot();
});

test('List component should render as expected', () => {
  const component = shallow(<List searchedResults={[]}/>);
  const tree = toJson(component);
  expect(component.find(ListItem).length).toBe(0);
  expect(tree).toMatchSnapshot();
});