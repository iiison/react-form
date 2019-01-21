import React               from 'react'
import renderer            from 'react-test-renderer'
import PropTypes           from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies
import { mount }           from 'enzyme'

import Input               from './Input'
import FormContainer       from '../../FormContainer'
import { wrapWithContext } from '../../utils/utils'

/* eslint-disable react/jsx-filename-extension */
const defaultContext = {
  addField      : jest.fn(),
  setFieldValue : jest.fn(),
  validateForm  : jest.fn(),
  formData      : {
    defaultClasses :{
      contClass : 'default-contClass',
      fieldClass : 'default-fieldClass',
      errorClass : 'default-errorClass',
      labelClass : 'default-labelClass'
    },
    fields : {
      email : {
        value : ''
      }
    }
  }
}
const contextTypes = {
  addField      : PropTypes.func,
  setFieldValue : PropTypes.func,
  formData      : PropTypes.object,
  validateForm  : PropTypes.func,
}
const defaultInputArgs = {
  id                      : 'email',
  type                    : 'text',
  value                   : '',
  onFieldChange           : null,
  validate                : 'required',
  placeholder             : 'enter value',
  displayName             : 'Email',
  shouldUseDefaultClasses : true,
  classes                 : {
    contClass  : 'cont-class',
    fieldClass : 'field-class',
    errorClass : 'error-class',
    labelClass : 'label-class'
  },
}

// Snapshot matching for Login Container
describe('>>> Input Container -- Snapshot Test', () => {
  it('Matches the snapshot with default props', () => {
    const tree = renderer.create(
      <FormContainer>
        <Input value='' id='email' />
      </FormContainer>
    ).toJSON()


    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with predefined value', () => {
    const tree = renderer.create(
      <FormContainer>
        <Input id='email' value='test' />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with label in input', () => {
    const customProps = { ...defaultInputArgs }
    const customFormProps = { ...defaultContext.formData }

    customProps.label = 'Input label'
    customProps.placeholder = 'custom placeholder'
    customProps.displayName = 'custom display name'

    const tree = renderer.create(
      <FormContainer defaultClasses={customProps.defaultClasses}>
        <Input {...customProps} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with custom props', () => {
    const customProps = { ...defaultInputArgs }
    const customFormProps = { ...defaultContext.formData }

    customProps.placeholder = 'custom placeholder'
    customProps.displayName = 'custom display name'

    const tree = renderer.create(
      <FormContainer defaultClasses={customProps.defaultClasses}>
        <Input {...customProps} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot when Textarea is rendered', () => {
    const customProps = { ...defaultInputArgs }
    const customFormProps = { ...defaultContext.formData }

    customProps.type = 'textarea'
    customProps.rows = 5
    customProps.value = 'big textarea value'
    customProps.placeholder = 'custom textarea placeholder'
    customProps.displayName = 'custom textarea name'

    const tree = renderer.create(
      <FormContainer defaultClasses={customProps.defaultClasses}>
        <Input {...customProps} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with error in input', () => {
    const customContext = { ...defaultContext }
    const props = {
      ...defaultInputArgs,
      onFieldChange : jest.fn(),
      validate : 'email'
    }

    customContext.formData.fields.email = props
    customContext.formData.errors = {
      email : 'some error'
    }

    const WrappedWithContextComponent = wrapWithContext(customContext, contextTypes)
    const tree = renderer.create(
      <WrappedWithContextComponent>
        <Input { ...props } />
      </WrappedWithContextComponent>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot without using default classes provided by form', () => {
    const customContext = { ...defaultContext }
    const props = {
      ...defaultInputArgs,
      validate                : 'email',
      onFieldChange           : jest.fn(),
      shouldUseDefaultClasses : false
    }

    customContext.formData.fields.email = props
    customContext.formData.errors = {
      email : 'some error'
    }

    const WrappedWithContextComponent = wrapWithContext(customContext, contextTypes)
    const tree = renderer.create(
      <WrappedWithContextComponent>
        <Input { ...props } />
      </WrappedWithContextComponent>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
// *************************************************************

/* eslint-enable */


// Check DOM Behaviour
describe('>>> Input Container -- Shallow Rendering', () => {
  let mountedScreen
  const inputScreen = (customProps = {}, customContext = {}) => {
    const initialState = {
      id    : 'email',
      value : ''
    }

    if (!mountedScreen) {
      const updatedState = {
        ...initialState,
        ...customProps
      }

      mountedScreen = mount(<FormContainer><Input {...updatedState} /></FormContainer>)
    }

    return mountedScreen
  }

  beforeEach(() => {
    mountedScreen = undefined
  })

  it('Triggers input change function when input changed', () => {
    const props = { onFieldChange : jest.fn() }
    const tree = inputScreen(props)

    const input = tree
      .find('input')
      .at(0)

    input.simulate('change', {
      target : {
        value : 'test'
      }
    })

    expect(props.onFieldChange).toHaveBeenCalled()
  })
})
// *************************************************************

