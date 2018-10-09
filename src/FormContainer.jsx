import React, { Component } from 'react'
import PropTypes            from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import validations          from './utils/validationRules'

/**
 * Main Component, a HOC, will store all fields' state.
 */
export default class FormContainer extends Component {
  constructor(props) {
    super(props)

    const {
      isDisabled = false,
      shouldValidateForm,
      defaultClasses
    } = this.props

    this.state = {
      shouldValidateForm,
      defaultClasses,
      isDisabled,
      isFetching : false
    }
  }

  getChildContext() {
    return {
      setFieldValue : ({ event, field, value, isMultipleValues, id = 'value' }) => {
        const fieldName = field.id
        const setState = (name, fieldValue) => {
          this.setState((prevState) => ({
            ...prevState,
            fields : {
              ...prevState.fields,
              [fieldName] : {
                ...prevState.fields[name],
                shouldValidateField : true,
                [id] : fieldValue
              }
            }
          }))
        }

        if (!value) {
          setState(fieldName, event.currentTarget.value)
        } else if (isMultipleValues) {
          const stateCopy = { ...this.state }

          for (const item in value) {
            stateCopy.fields[item].shouldValidateField = true
            stateCopy.fields[item][id] = value[item]
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
            [data.id] : {
              ...data,
              shouldValidateField : false
            }
          }
        }))
      },

      setFormData : (data) => {
        this.setState((prevState) => ({
          ...prevState,
          ...data
        }))
      },

      validateForm : (fieldName) => {
        const { shouldValidateForm, fields } = this.state
        const field = fields[fieldName]

        if (shouldValidateForm) {
          if (field && field.shouldValidateField) {
            this.validateField(field)

            return
          }

          for (const field in fields) {
            const fieldData = fields[field]

            if (fieldData) {
              this.validateField(fieldData)
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

  validateField = (fieldData) => {
    const {
      id,
      label,
      value,
      validate,
      displayName,
      customRules = {}
    } = fieldData
    const rules = validate ? validate.split('|') : ''

    if (rules.length) {
      for (const rule in rules) {
        const ruleName = rules[rule]
        const ruleDetails = ruleName.split('-')
        const [ ruleValue, ...ruleArgs ] = ruleDetails
        const validation = validations[ruleValue] || customRules[ruleValue]

        if (validation) {
          const result = validation.rule.apply(null, ruleArgs).test(value)
          let error = ''

          if (!result) {
            error = validation.formatter.apply(null, [ displayName || id, ...ruleArgs])
          }

          this.setState((prevState) => ({
            ...prevState,
            errors : {
              ...prevState.errors,
              [id] : error
            }
          }))

          if (error) {
            break
          }
        } else {
          throw `invalid validation rule: ${ruleValue}, please use an existing validation rule name or pass a custom function with same name through 'customRules' prop in Input: ${fieldData.id}. Rule value should be an object with keys: 'rule' as an Regex and 'formatter' as a function, that formats the value.`
        }
      }
    }

    return ''
  }

  static defaultProps = {
    errors             : {},
    children           : <div />,
    isDisabled         : false,
    shouldValidateForm : true,
    defaultClasses     : {
      contClass  : '',
      inputClass : '',
      errorClass : '',
      labelClass : ''
    }
  }

  static propTypes = {
    children           : PropTypes.node.isRequired,
    isDisabled         : PropTypes.bool,
    shouldValidateForm : PropTypes.bool,
    defaultClasses     : PropTypes.object
  }

  static childContextTypes = {
    addField      : PropTypes.func,
    setFieldValue : PropTypes.func,
    validateForm  : PropTypes.func,
    formData      : PropTypes.object,
    setFormData   : PropTypes.func
  }
}

