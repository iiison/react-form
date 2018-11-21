import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

function getField({ props, context }) {
  const { id } = props
  const { formData : { fields } } = context

  return fields[id]
}

function getOptionValue(options, filterPropName, value) {
  return options.filter((option) => {
    return option[filterPropName] === value
  })[0]
}

export default class Select extends Component {
  drawSelectedValue = () => {
    const field = getField({
      props   : this.props,
      context : this.context
    })
    const { placeholder, options, value, classes : { displayValueClass } } = field
    const content = value ? getOptionValue(options, 'value', value).displayName : placeholder

    return <div className={`col-12 field-value ${displayValueClass} select-value`}>{content}</div>
  }

  drawOptions = ({ optionClass }) => {
    const { id } = this.props
    const { fields } = this.context
    const field = getField({
      props   : this.props,
      context : this.context
    })
    const { options, value, placeholder, classes } = field
    const defaultOption = (
      <div
        key='default'
        role='button'
        onClick={() => { this.updateSelect() }}
        className={`${optionClass} option default`}
      >{placeholder}</div>
    )

    const renderedOptions = options.map((option) => {
      const { id, displayName, isDisabled = false, value : optionValue } = option

      return (
        <div
          key={id}
          role='button'
          onClick={() => { this.updateSelect(option) }}
          className={`${optionClass} option ${value === optionValue && classes.selectedOptionClass} ${isDisabled ? 'disabled-option' : ''}`}
        >{displayName}</div>
      )
    })

    return [defaultOption, ...renderedOptions]
  }

  updateSelect({ value } = { value : '' }) {
    const field = getField({
      props   : this.props,
      context : this.context
    })
    const { id, options, events } = field
    const {
      setFieldValue,
      validateForm,
      formData = {}
    } = this.context

    setFieldValue({
      field,
      event : {},
      value,
    }, () => { validateForm(id) })

    if (events && events.onChange && !formData.errors[id].length) {
      events.onChange({
        formData,
        setFieldValue
      })
    }
  }

  render() {
    const {
      formData = {}
    } = this.context
    const {
      fields,
      defaultClasses,
      errors : allErrors
    } = formData
    const { id } = this.props

    if ( fields && fields[id] ) {
      const field = fields[id]

      const {
        label,
        classes,
        shouldUseDefaultClasses
      } = field
      const {
        contClass,
        labelClass,
        errorClass,
        optionsContClass,
        optionClass
      } = classes
      const {
        contClass  : defaultContClass,
        errorClass : defaultErrorClass,
        labelClass : defaultLabelClass
      } = defaultClasses
      const errors = allErrors[id]

      return (
        <div className={`select-box ${contClass} ${shouldUseDefaultClasses && defaultContClass} grid col-12 input-cont`}>
          {
            label
              ? <div className={`col-12 ${labelClass} ${shouldUseDefaultClasses && defaultLabelClass} label`}>{label}</div>
              : ''
          }
          <div className={`select`}>
            {this.drawSelectedValue()}
            <div className={`grid options ${optionsContClass}`}>
              {this.drawOptions({ optionClass })}
            </div>
          </div>
          {
            errors
              ? <div className={`col-12 error ${errorClass} ${shouldUseDefaultClasses && defaultErrorClass}`}>{errors}</div>
              : ''
          }
        </div>
      )
    }

    return (<div/>)
  }

  componentDidMount() {
    this.context.addField(this.props)
  }

  static defaultProps = {
    value                   : '',
    label                   : '',
    events                  : {},
    validate                : '',
    placeholder             : 'Select',
    shouldValidateField     : true,
    shouldUseDefaultClasses : true,
    classes                 : {
      contClass           : '',
      labelClass          : '',
      fieldClass          : '',
      errorClass          : '',
      optionClass         : '',
      selectedOptionClass : ''
    }
  }

  static propTypes = {
    id                      : PropTypes.string.isRequired,
    value                   : PropTypes.string,
    events                  : PropTypes.object,
    classes                 : PropTypes.object,
    label                   : PropTypes.string,
    validate                : PropTypes.string,
    shouldValidateField     : PropTypes.bool,
    shouldUseDefaultClasses : PropTypes.bool,
    placeholder             : PropTypes.string,
    displayName             : PropTypes.string.isRequired,
    options                 : PropTypes.array.isRequired
  }

  static contextTypes       = {
    addField      : PropTypes.func.isRequired,
    setFieldValue : PropTypes.func.isRequired,
    validateForm  : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired
  }
}

