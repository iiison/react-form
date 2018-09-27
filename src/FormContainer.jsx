import React, { Component } from 'react'
import PropTypes            from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

/**
 * Main Component, a HOC, will store all fields' state.
 */
export default class FormContainer extends Component {
  constructor(props) {
    super(props)

    const {
      isDisabled = false,
      shouldValidateForm = false
    } = this.props

    const defaultState = {
      isDisabled         : false,
      shouldValidateForm : false
    }

    this.state = {
      ...defaultState,
      shouldValidateForm,
      isDisabled
    }
  }

  getChildContext() {
    return {
      setFieldValue : ({ event, field, value, isMultipleValues }) => {
        const fieldName = field.id
        const setState = (name, fieldValue) => {
          this.setState((prevState) => ({
            ...prevState,
            fields : {
              ...prevState.fields,
              [fieldName] : {
                ...prevState.fields[name],
                value : fieldValue
              }
            }
          }))
        }

        if (!value) {
          setState(fieldName, event.currentTarget.value)
        } else if (isMultipleValues) {
          const stateCopy = { ...this.state }

          for (const item in value) {
            stateCopy.fields[item].value = value[item]
          }

          this.setState((prevState) => ({
            ...prevState,
            ...stateCopy
          }))
        } else {
          setState(fieldName, value)
        }

        return this.state
      },

      addField : (data) => {
        this.setState((prevState) => ({
          ...prevState,
          fields : {
            ...prevState.fields,
            [data.id] : data 
          }
        }))
      },

      validateForm : (fieldName) => {
        const { shouldValidateForm, fields } = this.state

        if (shouldValidateForm) {
          if (fieldName) {
            FormContainer.validateField(fields[fieldName])

            return
          }

          for (const field in fields) {
            if (field.validate) {
              this.validateField(fields[field])
            }
          }
        }

        return
      },
      formData : this.state
    }
  }

  /**
   * React Lifecycle Method: Renders the data
   *
   * @return {DOM} Main container DOM.
   */
  render() {
    return (
      <form action=''>
        {this.props.children}
      </form>
    )
  }

  static validateField = (fieldData) => {
    const rules = fieldData.validate.split('|')

    console.log(fieldData)
  }

  static defaultProps = {
    children           : <div />,
    isDisabled         : false,
    shouldValidateForm : false
  }

  static propTypes = {
    children           : PropTypes.node.isRequired,
    isDisabled         : PropTypes.bool,
    shouldValidateForm : PropTypes.bool
  }

  static childContextTypes = {
    addField      : PropTypes.func,
    setFieldValue : PropTypes.func,
    validateForm  : PropTypes.func,
    formData      : PropTypes.object
  }
}

