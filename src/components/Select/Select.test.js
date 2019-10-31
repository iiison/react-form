import React               from 'react'
import renderer            from 'react-test-renderer'
import PropTypes           from 'prop-types'
import { mount }           from 'enzyme'

import Select               from './Select'
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
      selectBox : {
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
const defaultArgs = {
  id                      : 'selectBox',
  value                   : '',
  options                 : [],
  validate                : 'required',
  placeholder             : 'Select Value',
  displayName             : 'Select Box',
  shouldUseDefaultClasses : true,
  classes                 : {
    contClass  : 'cont-class',
    fieldClass : 'field-class',
    errorClass : 'error-class',
    labelClass : 'label-class'
  },
}
const options = [
  {
    id          : 'apple',
    value       : 'applee',
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

describe('>>> Select Container -- Snapshot Test', () => {
  it('Matches the snapshot with default props', () => {
    const selectPops = {
      ...defaultArgs,
      options
    }
    const tree = renderer.create(
      <FormContainer>
        <Select {...selectPops} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with custom props', () => {
    const props = {
      ...defaultArgs,
      options,
      label               : 'Select Fruits',
      value               : 'pineapple',
      placeholder         : 'Select One...',
      displayName         : 'Fruits',
      shouldValidateField : true,
      classes             : {
        contClass           : 'select-cont',
        labelClass          : 'select-label',
        fieldClass          : 'select-box',
        errorClass          : 'select-error',
        optionClass         : 'select-option',
        selectedOptionClass : 'selected-value'
      }
    }

    const tree = renderer.create(
      <FormContainer>
        <Select {...props} />
      </FormContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with error in select box', () => {
    const customContext = { ...defaultContext }
    const props = {
      ...defaultArgs,
      options,
      onFieldChange : jest.fn(),
      validate      : 'required'
    }

    customContext.formData.fields.selectBox = props
    customContext.formData.errors = {
      selectBox : 'some error'
    }

    const WrappedWithContextComponent = wrapWithContext(customContext, contextTypes)
    const tree = renderer.create(
      <WrappedWithContextComponent>
        <Select {...props} />
      </WrappedWithContextComponent>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
// *************************************************************

// Test DOM Behaviour
describe('>>> Select Box Container -- Shallow Rendering', () => {
  let mountedScreen
  const selectScreen = (customProps = {}) => {
    const initialState = {
      id    : 'selectBox',
      value : '',
      options
    }

    if (!mountedScreen) {
      const updatedState = {
        ...initialState,
        ...customProps
      }

      mountedScreen = mount(<FormContainer><Select {...updatedState} /></FormContainer>)
    }

    return mountedScreen
  }

  beforeEach(() => {
    mountedScreen = undefined
  })

  it('Triggers the change function when select value is changed', () => {
    const props = {
      events : {
        onChange : jest.fn()
      }
    }

    const tree = selectScreen(props)
    const optionsInTree = tree.find({role : 'button'})
    const optionOrange = optionsInTree.at(2)

    optionOrange.simulate('click')

    const expectedValue = 'Fruit orange'
    const selectedValue = tree
      .find('.field-value')
      .at(0)
      .text()

    expect(selectedValue).toEqual(expectedValue)
    expect(props.events.onChange).toHaveBeenCalled()
  })
})
/* eslint-enable*/

