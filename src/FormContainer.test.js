import React, { Component } from 'react'
import renderer      from 'react-test-renderer'
import { mount }     from 'enzyme'
import PropTypes     from 'prop-types'

import FormContainer from './FormContainer'
import { Input }     from './components'

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

  it('Renders Form Component With valid elements in it and Checks State', () => {
    const inputProps = {
      id     : 'test',
      value  : 'some value',
      events : {
        onChange : jest.fn()
      }
    }
    const tree = formScreen(
      {}, 
      <Input {...inputProps} />
    )

    const formInput = tree.find('Input')
    const expectedInputsCount = formInput.length
    const { fields } = tree.state()
    const { id, value, type, events : { onChange : onFieldChange } } = fields.test

    expect(expectedInputsCount).toBe(1)
    expect(Object.keys(fields)).toEqual(['test'])

    expect(id).toBe('test')
    expect(type).toBe('text')
    expect(value).toBe('some value')

    const input = formInput.find('input').at(0)
    
    input.simulate('change', {
      traget : {
        value : 'test'
      }
    })

    expect(onFieldChange).toHaveBeenCalled()
  })

  it('Triggers Form Input validation', () => {
    const inputProps = {
      id                  : 'validationTest',
      value               : 'invalid value',
      validate            : 'email',
      shouldValidateField : true
    }
    const tree = formScreen(
      {}, 
      <Input {...inputProps} />
    )

    const formInput = tree.find('input').at(0)

    formInput.prop('onChange')({
      currentTarget : {
        value : 'Value Changed'
      },
      persist : jest.fn()
    })

    tree.update()

    const { fields } = tree.state()

    expect(fields.validationTest.value).toEqual('Value Changed')

    formInput.props().onBlur({
      persist : jest.fn()
    })
    tree.update()

    const { errors } = tree.state()

    expect(errors.validationTest).not.toEqual('')
    expect(errors.validationTest).toEqual('validationTest is not valid email')
  })

  it('Uses custom validation rule to validate input', () => {
    const inputProps = {
      id                  : 'validationTest',
      value               : 'invalid value',
      validate            : 'customRule',
      shouldValidateField : true,
      customRules         : {
        customRule : {
          rule      : () => /\b123456\b/,
          formatter : (fieldName) => `${fieldName} is not valid.`
        }
      }
    }
    const tree = formScreen(
      {}, 
      <Input {...inputProps} />
    )

    const formInput = tree.find('input').at(0)

    formInput.prop('onChange')({
      currentTarget : {
        value : 'Value Changed'
      },
      persist : jest.fn()
    })
    formInput.props().onBlur({
      persist : jest.fn()
    })

    tree.update()

    const { errors } = tree.state()

    expect(errors.validationTest).not.toEqual('')
    expect(errors.validationTest).toEqual('validationTest is not valid.')
  })
})
// *************************************************************

