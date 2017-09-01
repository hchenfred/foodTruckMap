import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Map from './Map';

test('Map component should render as expected', () => {
  const component = shallow(<Map />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});