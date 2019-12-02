import React, { Component } from 'react'
import PropTypes            from 'prop-types'

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
      errors     : {},
      isFetching : false
    }
  }

  getChildContext() {
    return {
      setFieldValue : ({ event, field, value, isMultipleValues, id = 'value' }, callBack) => {
        const fieldName = field.id
        const setState = (name, fieldValue) => {
          this.setState((prevState) => ({
            ...prevState,
            fields : {
              ...prevState.fields,
              [fieldName] : {
                ...prevState.fields[name],
                shouldValidateField : true,
                [id]                : fieldValue
              }
            }
          }), callBack)
        }

        if (!value && value !== '') {
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
        if (!data.id) {
          throw `please add "id" property to field: ${data}`
        }

        this.setState((prevState) => ({
          ...prevState,
          errors : {
            ...prevState.errors,
            [data.id] : ''
          },
          fields : {
            ...prevState.fields,
            [data.id] : {
              ...data,
              // shouldValidateField : false // Not sure why this was added
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
          if (field) {
            if ( field.shouldValidateField ) {
              this.validateField(field)
            }

            return
          }

          for (const unit in fields) {
            const fieldData = fields[unit]

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
    const { children } = this.props

    return (
      <form action=''>
        {children}
      </form>
    )
  }

  validateRule({ id, value, displayName, ruleValue, ruleArgs, validation }) {
    if (validation) {
      const stringifiedValue = value.toString()
      const isRuleSatisfied = ( ruleValue !== 'required' && !stringifiedValue )
        ? true
        : validation.rule.apply(null, ruleArgs).test(value.toString())

      let error = ''

      if (!isRuleSatisfied) {
        error = validation.formatter.apply(null, [displayName || id, ...ruleArgs])

        return error
      }
    } else {
      throw `invalid validation rule: ${ruleValue}, please use an existing validation rule name or pass a custom function with same name through 'customRules' prop in Input: ${id}. Rule value should be an object with keys: 'rule' as an Regex and 'formatter' as a function, that formats the value.` // eslint-disable-line
    }

    return ''
  }


  validateField = ({
    id,
    value,
    validate,
    displayName,
    customRules = {}
  }) => {
    let error = ''
    const rules = validate ? validate.split('|') : ''

    if (rules.length) {
      for (const rule in rules) {
        const ruleName = rules[rule]
        const ruleDetails = ruleName.split('-')
        const [ruleValue, ...ruleArgs] = ruleDetails
        const validation = validations[ruleValue] || customRules[ruleValue]


        try {
          error = this.validateRule({ id, value, displayName, ruleValue, ruleArgs, validation })

          if (error !== '') {
            break
          }
        } catch (invalidRuleError) {
          throw invalidRuleError
        } 
      }

      this.setState((prevState) => ({
        ...prevState,
        errors : {
          ...prevState.errors,
          [id] : error
        }
      }))
    }
  }

  static defaultProps = {
    errors             : {}, // eslint-disable-line
    children           : <div />,
    isDisabled         : false,
    shouldValidateForm : true,
    defaultClasses     : {
      contClass  : '',
      fieldClass : '',
      errorClass : '',
      labelClass : ''
    }
  }

  static propTypes = {
    children           : PropTypes.node,
    isDisabled         : PropTypes.bool,
    shouldValidateForm : PropTypes.bool,
    defaultClasses     : PropTypes.shape({
      labelClass : PropTypes.string,
      contClass  : PropTypes.string,
      errorClass : PropTypes.string,
      fieldClass : PropTypes.string,
    })
  }

  static childContextTypes = {
    addField      : PropTypes.func,
    setFieldValue : PropTypes.func,
    validateForm  : PropTypes.func,
    formData      : PropTypes.object, // eslint-disable-line
    setFormData   : PropTypes.func
  }
}

