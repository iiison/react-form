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

describe('>>> Select Container -- Snapshot Test', () => {
  it('Matches the snapshot with default props', () => {
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
})

/* eslint-enable*/
