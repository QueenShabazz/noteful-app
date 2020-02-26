import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddNote from './AddNote'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe(`Form component`, () => {

  it('renders the Form default', () => {
    const wrapper = shallow(
        <AddNote />
        )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
})