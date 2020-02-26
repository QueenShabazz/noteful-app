import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddFolder from './AddFolder'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe(`AddItemForm component`, () => {
  it('renders the form', () => {
      
    const wrapper = shallow(
        <AddFolder folder="test" />
        )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})