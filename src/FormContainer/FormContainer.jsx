import React, { Component } from 'react'

import { Form } from '$COMPONENTS'
import validations from '$UTILS/validationRules'

/**
 * Test all validation rules ofa field
 *
 * @param {Object} fieldData all field realated data
 *
 * @return {String}         validation error ina field
 */
export function testFieldRules(fieldData) {
  const { validate, value, displayName } = fieldData

  const validationRules = validate.split('|')

  for (const validation in validationRules) {
    const { rule, formatter } = validations[validationRules[validation]]()

    const result = rule.test(value)

    if (result === false) {
      return formatter(displayName)
    }
  }
}

/**
 * Generic Form Handler, Handles form state,
 * Pass Form elemnt's JSON throught the FormContainer and
 * it will redner the form.
 */
export default class FormContainer extends Component {
  /**
   * Constructor for the container
   *
   * @param {Object} props form data
   */
  constructor(props) {
    super(props)
    const { formData : { fields } } = props

    this.state = {
      isTested : false,
    }

    this.state.fields = fields.reduce((prev, curr) => {
      const temp = {
        value          : '',
        error          : '',
        shouldBeTested : false,
        ...curr
      }

      return {
        ...prev,
        [temp.id] : temp
      }
    }, {})
  }

  /**
   * DOM Event : Chaanges `shouldBeTested`, will be executed on
   * keyUp in an input field
   *
   * @param {String} field field name
   */
  makeFieldTestable = (field) => {
    const fieldRef = this.state.fields[field]

    fieldRef.shouldBeTested = true

    this.setState((previousState) => {
      return {
        fields : {
          ...previousState.fields,
          [field] : fieldRef
        }
      }
    })
  }

  /**
   * Handle Key press event on the input,
   * tests field value if field is already has error.
   * @param  {String} field Field name in which event was started
   */
  handleKeyPress = (field) => {
    const fieldData = this.state.fields[field]
    const { error } = fieldData

    this.makeFieldTestable(field)

    if (error) {
      this.validateInput(field)
    }
  }

  /**
   * DOM Event: Handles input value change
   *
   * @param {Object} event DOM event object
   */
  handleChange = (event) => {
    event.preventDefault()

    const elemRef = event.target
    const idName = elemRef.id

    this.setState((previousState) => {
      const { fields } = previousState

      return {
        fields : {
          ...fields,
          [idName] : {
            ...fields[idName],
            value : elemRef.value
          }
        }
      }
    })
  }

  /**
   * Validate single input
   *
   * @param  {String}  field       field name to be tested
   * @param  {Boolean} isFinalTest will be true if whole form is being tested
   * @return {String}              validation error of the field
   */
  validateInput = (field, isFinalTest) => {
    const fieldData = this.state.fields[field]
    const { validate } = fieldData

    if ((fieldData.shouldBeTested === true || isFinalTest) && validate) {
      const error = testFieldRules(fieldData) || ''

      this.setState((previousState) => {
        const { fields } = previousState
        const updatedField = {
          ...fields[field],
          error
        }

        return {
          fields : {
            ...fields,
            [field] : updatedField
          }
        }
      })

      return error
    }
  }

  /**
   * Handles Form Submission, callback actual form submit fxn
   * after the form validation. validation is the part of plugin.
   *
   * @param {Object} event DOM Event object
   */
  handleFormSubmit = (event) => {
    event.preventDefault()

    const { handleSubmit } = this.props
    const { fields } = this.state
    const errors = []

    for ( const field in fields ) {
      const error = this.validateInput(field, true)

      error && errors.push(error)
    }

    if (!errors.length) {
      handleSubmit(fields)
    }
  }

  /**
   * React Lifecycle Method: Renders the data
   *
   * @return {DOM} Main container DOM.
   */
  render() {
    const { fields } = this.state
    const {
      error,
      messages,
      isFetching,
      submitButtonText,
      submitButtonClassName } = this.props

    const props = {
      fields,
      messages,
      events : {
        onSubmit          : this.handleFormSubmit,
        onValueChange     : this.handleChange,
        validateInput     : this.validateInput,
        handleKeyPress    : this.handleKeyPress,
        makeFieldTestable : this.makeFieldTestable
      },
      submitButtonData : {
        error,
        isFetching,
        submitButtonText,
        submitButtonClassName,
        onSubmit : this.handleFormSubmit
      }
    }

    return (
      <Form
        {...props}
      />
    )
  }

  /**
  * React Lifecycle Method: Executes right before the
  * component mounts
  */
  componentWillMount() {
  }
}
