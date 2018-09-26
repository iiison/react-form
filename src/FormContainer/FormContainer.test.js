import React               from 'react'
import renderer            from 'react-test-renderer'
import { mount, shallow }  from 'enzyme'

import loginForm           from '$CONFIG/forms/loginForm.json'
import FormContainer,
{ testFieldRules }         from './FormContainer'

// import loginMessages               from './lang/en.json'

const props = {
  error                 : '',
  isFetching            : false,
  formData              : loginForm,
  handleSubmit          : jest.fn(),
  submitButtonText      : 'Test',
  submitButtonClassName : `button`
}

/* eslint-disable react/jsx-filename-extension */

// Snapshot matching for Login Container
describe('>>> FormContainer Container -- Snapshot Test', () => {
  const initialState = props

  it('Matches the snapshot with isFetching is false', () => {
    const tree = renderer.create(<FormContainer {...initialState} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot when isFetching is true', () => {
    const updatedState = {
      ...props,
      isFetching : true
    }

    const tree = renderer.create(<FormContainer {...updatedState} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot when error occured', () => {
    const updatedState = {
      ...props,
      error : 'not working'
    }

    const tree = renderer.create(<FormContainer {...updatedState} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
// *************************************************************

/* eslint-enable */


// Check DOM Behaviour
describe('>>> Form Container -- Shallow Rendering', () => {
  const initialState = props
  let mountedScreen
  const FormScreen = (customState = {}) => {
    if (!mountedScreen) {
      const updatedState = {
        ...initialState,
        ...customState
      }

      mountedScreen = mount(<FormContainer {...updatedState} />)
    }

    return mountedScreen
  }

  beforeEach(() => {
    mountedScreen = undefined
  })

  it('Test and confirm Button Text.', () => {
    const domTree = FormScreen()

    const expectedButtonText = 'test'
    const buttonText = domTree
      .find('button')
      .first()
      .text()
      .toLowerCase()

    expect(buttonText).toEqual(expectedButtonText)
  })

  it('Test and confirm Button Text when isFetching is true.', () => {
    const domTree = FormScreen({
      isFetching : true
    })
    const expectedButtonText = 'loading...'
    const buttonText = domTree
      .find('button')
      .first()
      .text()
      .toLowerCase()

    expect(buttonText).toEqual(expectedButtonText)
  })

  it('Creates form submission error.', () => {
    const error = 'some random error'
    const domTree = FormScreen({ error })
    const expectedButtonText = 'loading...'

    const errorText = domTree
      .find('p.error')
      .first()
      .text()

    expect(errorText).toEqual(error)
  })

  it('Tests and confirms input count and text.', () => {
    const domTree = FormScreen()
    const expectedInputLength = 2
    const inputs = domTree
      .find('input')

    const firstInputProps = inputs.at(0).props()
    const secondInputProps = inputs.at(1).props()

    let expectedType = 'email'
    expect(firstInputProps.type).toEqual(expectedType)

    expectedType = 'password'
    expect(secondInputProps.type).toEqual(expectedType)

    let expectedPlaceholder = ' '
    expect(firstInputProps.placeholder).toEqual(expectedPlaceholder)

    expectedPlaceholder = ' '
    expect(secondInputProps.placeholder).toEqual(expectedPlaceholder)

    const placeholders = domTree.find('.placeholder')

    const firstPlaceholderText = placeholders.at(0).text()
    const secondPlaceholderText = placeholders.at(1).text()

    let expectedPleaceholderText = 'enter email'
    expect(firstPlaceholderText).toEqual(expectedPleaceholderText)

    expectedPleaceholderText = 'enter password'
    expect(secondPlaceholderText).toEqual(expectedPleaceholderText)
  })

  it('Simulates text change event in an input', () => {
    const getDashboardItems = jest.fn()
    const tree = FormScreen()

    const instance = tree.instance()
    const handleInputChangeSpy = jest.spyOn(instance, 'handleChange')

    const input = tree
      .find('input')
      .first()

    input.instance().value = 'someValue'
    instance.forceUpdate()

    input.simulate('change')

    expect(handleInputChangeSpy).toHaveBeenCalled()
  })

  it('Simulates text key press event in an input', () => {
    const getDashboardItems = jest.fn()
    const tree = FormScreen()

    const instance = tree.instance()
    const handleKeyPressSpy = jest.spyOn(instance, 'handleKeyPress')

    const input = tree
      .find('input')
      .first()

    instance.forceUpdate()
    input.simulate('keyPress')
    expect(handleKeyPressSpy).toHaveBeenCalled()
  })

  it('Simulates submit button click', () => {
    const getDashboardItems = jest.fn()
    const tree = FormScreen()

    const instance = tree.instance()
    const handleFormSubmitSpy = jest.spyOn(instance, 'handleFormSubmit')
    const validateInputSpy = jest.spyOn(instance, 'validateInput')

    const input = tree
      .find('button')
      .first()

    instance.forceUpdate()
    input.simulate('click')

    expect(handleFormSubmitSpy).toHaveBeenCalled()
    expect(validateInputSpy.mock.calls).toEqual([['userName', true], ['password', true]])
  })

  it('Tests email Validation Rules for a field with valid input', () => {
    const result = testFieldRules({
      validate    : 'email',
      value       : 'test@gmail.com',
      displayName : 'Test'
    })

    expect(result).toBeUndefined()
  })

  it('Tests email Validation Rules for a field with invalid input', () => {
    const result = testFieldRules({
      validate    : 'email',
      value       : 'test@om',
      displayName : 'Test'
    })
    const expectedResult = 'Test is not valid'

    expect(result).toEqual(expectedResult)
  })

  it('Tests required Validation Rule for a field with valid input', () => {
    const result = testFieldRules({
      validate    : 'required',
      value       : 'some value',
      displayName : 'Test'
    })

    expect(result).toBeUndefined()
  })

  it('Tests required Validation Rule for a field with invalid input', () => {
    const result = testFieldRules({
      validate    : 'required',
      value       : '',
      displayName : 'Test'
    })
    const expectedResult = 'Test is required'

    expect(result).toEqual(expectedResult)
  })
})
// *************************************************************
