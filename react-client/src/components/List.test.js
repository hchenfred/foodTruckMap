import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

test('List component should render as expected', () => {
  const component = shallow(<List searchedResults={[]}/>);
  console.log(component);
});