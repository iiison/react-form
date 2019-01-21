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
  id            : 'email',
  type          : 'text',
  value         : '',
  onFieldChange : null,
  validate      : 'required',
  placeholder   : 'enter value',
  displayName   : 'Email',
  classes       : {
    contClass  : 'cont-class',
    fieldClass : 'field-class',
    errorClass : 'error-class',
    labelClass : 'label-class'
  },
}

// Snapshot matching for Login Container
describe('>>> Input Container -- Snapshot Test', () => {
  it('Matches the snapshot with default props', () => {
    debugger
    const context = {
      ...defaultContext,
      fields : {
        ...defaultContext.fields,
        email : { ...defaultInputArgs }
      }
    }
    const ComponentWithContext = wrapWithContext(defaultContext, contextTypes, Element)
    const tree = renderer.create(<ComponentWithContext><Input value='' id='email' /></ComponentWithContext>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Matches the snapshot with predefined values', () => {
    // const ComponentWithContext = wrapWithContext(defaultContext, contextTypes, Element)
    // const tree = renderer.create(
    //   <ComponentWithContext>
    //     <Input id='email' value='test' />
    //   </ComponentWithContext>
    // ).toJSON()
    //
    // expect(tree).toMatchSnapshot()
  })
})
// *************************************************************

/* eslint-enable */


// Check DOM Behaviour
{/* describe('>>> Input Container -- Shallow Rendering', () => { */}
{/*   let mountedScreen */}
{/*   const inputScreen = (customProps = {}, customContext = {}) => { */}
{/*     const context = { */}
{/*       ...defaultContext, */}
{/*       ...customContext */}
{/*     } */}
{/*     const ComponentWithContext = wrapWithContext(context, contextTypes, Element) */}
{/*     const initialState = { */}
{/*       id    : 'email', */}
{/*       value : '' */}
{/*     } */}
{/*  */}
{/*     if (!mountedScreen) { */}
{/*       const updatedState = { */}
{/*         ...initialState, */}
{/*         ...customProps */}
{/*       } */}
{/*  */}
{/*       mountedScreen = mount(<ComponentWithContext><Input {...updatedState} /></ComponentWithContext>) */}
{/*     } */}
{/*  */}
{/*     return mountedScreen */}
{/*   } */}
{/*  */}
{/*   beforeEach(() => { */}
{/*     mountedScreen = undefined */}
{/*   }) */}
{/*  */}
{/*   it('Renders dumb component with default props', () => { */}
{/*     const tree = inputScreen() */}
{/*     const expectedValue = '' */}
{/*     const resultValue = tree */}
{/*       .find('input') */}
{/*       .at(0) */}
{/*       .props() */}
{/*       .value */}
{/*  */}
{/*     expect(resultValue).toEqual(expectedValue) */}
{/*     expect(defaultContext.addField).toHaveBeenCalledWith(defaultInputArgs) */}
{/*   }) */}
{/*  */}
{/*   it('Renders input with preset value', () => { */}
{/*     const props = { */}
{/*       value : 'test', */}
{/*     } */}
{/*     const tree = inputScreen(props) */}
{/*  */}
{/*     const expectedValue = 'test' */}
{/*     const resultValue = tree */}
{/*       .find('input') */}
{/*       .at(0) */}
{/*       .props() */}
{/*       .value */}
{/*  */}
{/*     expect(resultValue).toEqual(expectedValue)  */}
{/*   }) */}
{/*  */}
{/*   it('Triggers input change function when input changed', () => { */}
{/*     const props = { */}
{/*       onFieldChange : jest.fn() */}
{/*     } */}
{/*     const tree = inputScreen(props) */}
{/*  */}
{/*     const input = tree */}
{/*       .find('input') */}
{/*       .at(0) */}
{/*  */}
{/*     input.simulate('change', { */}
{/*       target : { */}
{/*         value : 'test' */}
{/*       } */}
{/*     }) */}
{/*  */}
{/*     expect(props.onFieldChange).toHaveBeenCalled() */}
{/*     expect(defaultContext.setFieldValue).toHaveBeenCalled() */}
{/*   }) */}
{/* }) */}
// *************************************************************

