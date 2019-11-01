import React               from 'react'
import renderer            from 'react-test-renderer'
import PropTypes           from 'prop-types'
import { mount }           from 'enzyme'

import Options               from './Options'
import FormContainer       from '../../FormContainer'
import { wrapWithContext } from '../../utils/testUtils'

/* eslint-disable react/jsx-filename-extension */
const defaultContext = {
  addField      : jest.fn(),
  setFieldValue : jest.fn(),
  validateForm  : jest.fn(),
  formData      : {
    defaultClasses : {
      contClass  : 'default-contClass',
      fieldClass : 'default-fieldClass',
      errorClass : 'default-errorClass',
      labelClass : 'default-labelClass'
    },
    fields : {
      optionsBox : {
        value   : '',
        options : []
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
const customClasses = {
  contClass           : 'options-cont',
  labelClass          : 'options-label',
  fieldClass          : 'options-field',
  errorClass          : 'options-error',
  optionClass         : 'option-unit',
  selectedOptionClass : 'selected-option'
}
const options = [
  {
    id          : 'apple',
    value       : 'apple',
    displayName : 'Fruit Apple'
  },
  {
    id          : 'orange',
    value       : 'orange',
    displayName : 'Fruit orange'
  },
  {
    id          : 'pineapple',
    value       : 'pineapple',
    displayName : 'Fruit Pineapple'
  }
]
const defaultArgs = {
  id                      : 'optionsBox',
  type                    : 'radio',
  value                   : '',
  options                 : [],
  validate                : 'required',
  displayName             : 'Fruits',
  shouldUseDefaultClasses : true
}

describe('>>> Options Container -- Snapshot Test', () => {
  it('Matches the snapshot for radio button with default props', () => {
    const optionsProps = {
      ...defaultArgs,
      options
    }
    const tree = renderer.create(
      <FormContainer>
        <Options {...optionsProps} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot for radio button with custom props', () => {
    const props = {
      ...defaultArgs,
      options,
      label               : 'Options Fruits',
      value               : 'pineapple',
      displayName         : 'Fruits',
      shouldValidateField : true,
      classes             : customClasses
    }

    const tree = renderer.create(
      <FormContainer>
        <Options {...props} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with error in radio button', () => {
    const customContext = { ...defaultContext }
    const props = {
      ...defaultArgs,
      options,
      onFieldChange : jest.fn(),
      validate      : 'required'
    }

    customContext.formData.fields.optionsBox = props
    customContext.formData.errors = {
      optionsBox : 'some error'
    }

    const WrappedWithContextComponent = wrapWithContext(customContext, contextTypes)
    const tree = renderer.create(
      <WrappedWithContextComponent>
        <Options {...props} />
      </WrappedWithContextComponent>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot for checkbox with default props', () => {
    const optionsProps = {
      ...defaultArgs,
      type : 'checkbox',
      options
    }
    const tree = renderer.create(
      <FormContainer>
        <Options {...optionsProps} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot for checkbox with custom props', () => {
    const props = {
      ...defaultArgs,
      options,
      type                : 'checkbox',
      label               : 'Options Fruits',
      value               : ['pineapple', 'orange'],
      displayName         : 'Fruits',
      shouldValidateField : true,
      classes             : customClasses
    }

    const tree = renderer.create(
      <FormContainer>
        <Options {...props} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with error in checkbox', () => {
    const customContext = { ...defaultContext }
    const props = {
      ...defaultArgs,
      options,
      type          : 'checkbox',
      onFieldChange : jest.fn(),
      validate      : 'required'
    }

    customContext.formData.fields.optionsBox = props
    customContext.formData.errors = {
      optionsBox : 'some error'
    }

    const WrappedWithContextComponent = wrapWithContext(customContext, contextTypes)
    const tree = renderer.create(
      <WrappedWithContextComponent>
        <Options {...props} />
      </WrappedWithContextComponent>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
// *************************************************************

// Test DOM Behaviour
describe('>>> Select Box Container -- Shallow Rendering', () => {
  let mountedScreen
  const optionsScreen = (customProps = {}) => {
    const initialState = {
      id    : 'optionsBox',
      value : '',
      type  : 'radio',
      options
    }

    if (!mountedScreen) {
      const updatedState = {
        ...initialState,
        ...customProps
      }

      mountedScreen = mount(<FormContainer><Options {...updatedState} /></FormContainer>)
    }

    return mountedScreen
  }

  beforeEach(() => {
    mountedScreen = undefined
  })

  it('Triggers the change function in radio button', () => {
    const props = {
      events : {
        onChange : jest.fn()
      }
    }

    const tree = optionsScreen(props)
    const optionsInTree = tree.find('input')
    const optionOrange = optionsInTree.at(1)
    const optionPinaple = optionsInTree.at(2)

    optionOrange.simulate('change', {
      currentTarget : {
        checked : true,
        value   : 'orange'
      }
    })

    let selectedInput = tree.find({ defaultChecked : true })

    expect(selectedInput.length).toEqual(1)
    expect(selectedInput.prop('value')).toEqual('orange')
    expect(props.events.onChange).toHaveBeenCalled()

    optionPinaple.simulate('change', {
      currentTarget : {
        checked : true,
        value   : 'pineapple'
      }
    })

    selectedInput = tree.find({ defaultChecked : true })

    expect(selectedInput.length).toEqual(1)

    expect(tree.find('#pineapple').prop('defaultChecked')).toEqual(true)
    expect(tree.find('#orange').prop('defaultChecked')).toEqual(false)
  })

  it('Triggers the change function in checkbox', () => {
    const props = {
      type   : 'checkbox',
      events : {
        onChange : jest.fn()
      }
    }

    const tree = optionsScreen(props)
    const optionsInTree = tree.find('input')
    const optionOrange = optionsInTree.at(1)
    const optionPinaple = optionsInTree.at(2)

    optionOrange.props().onChange({
      persist       : jest.fn(),
      currentTarget : {
        checked : true,
        value   : 'orange'
      }
    })
    tree.update()
    
    let selectedInput = tree.find({ defaultChecked : true })

    expect(selectedInput.length).toEqual(1)
    expect(selectedInput.prop('value')).toEqual('orange')
    expect(props.events.onChange).toHaveBeenCalled()

    optionPinaple.props().onChange({
      persist       : jest.fn(),
      currentTarget : {
        checked : true,
        value   : 'pineapple'
      }
    })
    tree.update()

    selectedInput = tree.find({ defaultChecked : true })

    expect(selectedInput.length).toEqual(2)

    expect(tree.find('#pineapple').prop('defaultChecked')).toEqual(true)
    expect(tree.find('#orange').prop('defaultChecked')).toEqual(true)
    expect(props.events.onChange).toHaveBeenCalled()
  })
})
// *************************************************************
