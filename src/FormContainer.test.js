import React, { Component } from 'react'
import renderer      from 'react-test-renderer'
import { mount }     from 'enzyme'
import PropTypes     from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import FormContainer from './FormContainer'

/* eslint-disable react/jsx-filename-extension */
class SmallComponent extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <input type='text' />
      </div>    
    )
  }
}

SmallComponent.contextTypes = {
  addField : PropTypes.func
}

// Snapshot matching for Form Container
describe('>>> Form Container -- Snapshot Test', () => {
  it('Matches the snapshot when no elements passed to the Form', () => {
    const tree = renderer.create(<FormContainer />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot when some data is passed to the Form', () => {
    const formContent = (
      <div>
        <input type='text' />
      </div>
    )
    const tree = renderer.create(
      <FormContainer>
        {formContent}
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
// *************************************************************

/* eslint-enable */


// Check DOM Behaviour
describe('>>> Form Container -- Shallow Rendering', () => {
  const formContent = (
    <div>
      <input type='text' />
    </div>
  )
  let mountedScreen
  const formScreen = (customState = {}, content) => {
    if (!mountedScreen) {
      mountedScreen = mount(
        <FormContainer {...customState}>
          {content}
        </FormContainer>
      )
    }

    return mountedScreen
  }

  beforeEach(() => {
    mountedScreen = undefined
  })

  it('Renders Empty Form', () => {
    const tree = formScreen({}, [])

    const expected = 0
    const result = tree
      .find('form')
      .children()
      .length

    expect(result).toEqual(expected)
  })

  it('Renders Form Component With valid elements in it', () => {
    const tree = formScreen({}, <SmallComponent />)

    // TODO: Need to test context variables, still figuringout a way to access them here.
  })

  // TODO: State Test when function called
})
// *************************************************************

