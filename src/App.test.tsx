import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('tests', () => {
  it('renders the component', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
