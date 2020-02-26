import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FolderNotes from './FolderNotes'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe(`FolderNotes component`, () => {
  const propNotes= {
    notes: [
      {
        "id": "1",
        "name": "tests are great",
        "modified": "2019-01-03T00:00:00.000Z",
        "folderId": "1",
        "content": "Testing1"
      },
      {
        "id": "2",
        "name": "tests are great2",
        "modified": "2019-01-03T00:00:00.000Z",
        "folderId": "2",
        "content": "Testing2"
      },
      {
        "id": "3",
        "name": "tests are great3",
        "modified": "2019-01-03T00:00:00.000Z",
        "folderId": "3",
        "content": "Testing3"
      },
      {
        "id": "3",
        "name": "tests are great4",
        "modified": "2019-01-03T00:00:00.000Z",
        "folderId": "3",
        "content": "Testing4"
      },
    ]
  }
  
  it('renders the FolderNotes default', () => {
    const wrapper = shallow(
        <FolderNotes />
        )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
})