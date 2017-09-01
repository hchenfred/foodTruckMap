import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Form from './Form';

test('Form component should render as expected', () => {
  const component = shallow(<Form />);
  expect(component.find('input').length).toBe(2);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});