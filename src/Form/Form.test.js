import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Form from './Form'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe(`Form component`, () => {

  it('renders the Form default', () => {
    const wrapper = shallow(
        <Form />
        )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
})