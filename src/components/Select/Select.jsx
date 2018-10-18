import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies
import * as styles from './styles.css'

export default class Select extends Component {
  drawSelectedValue = () => {
    const { placeholder, options, value, id } = this.props
    const { formData : { fields } } = this.context
    const content = (fields && fields[id].value) ? fields[id].value : placeholder

    return <div className={`col-12 field-value`}>{content}</div>
  }

  drawOptions = ({ optionClass }) => {
    const { options, value, placeholder, classes } = this.props
    const renderedOptions = []

    renderedOptions.push(
      <div
        key='default'
        role='button'
        onClick={() => { this.updateSelect() }}
        className={`${optionClass} option default`}
      >{placeholder}</div>
    )

    for (const option in options) {
      const optionValue = options[option]
      const renderedOption = (
        <div
          key={option}
          role='button'
          onClick={() => { this.updateSelect({ option }) }}
          className={`${optionClass} option ${value === optionValue && classes.selectedOptionClass}`}
        >{optionValue}</div>
      ) 

      renderedOptions.push(renderedOption)
    }

    return renderedOptions
  }

  updateSelect({ option } = { option : '' }) {
    const { id, options, events } = this.props
    const {
      setFieldValue,
      validateForm,
      formData = {}
    } = this.context
    const field = formData.fields[id]

    setFieldValue({
      event : {},
      field,
      value : options[option] || ''
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
      id,
      label,
      classes,
      shouldUseDefaultClasses
    } = this.props
    const {
      contClass,
      labelClass,
      errorClass,
      optionClass
    } = classes
    const {
      formData = {}
    } = this.context
    const {
      defaultClasses,
      errors : allErrors
    } = formData
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
        {this.drawSelectedValue()}
        <div className='grid options'>
          {this.drawOptions({ optionClass })}
        </div>
        {
          errors
            ? <div className={`col-12 error ${errorClass} ${shouldUseDefaultClasses && defaultErrorClass}`}>{errors}</div>
            : ''
        }
      </div>
    )
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
    options                 : PropTypes.object.isRequired
  }

  static contextTypes       = {
    addField      : PropTypes.func.isRequired,
    setFieldValue : PropTypes.func.isRequired,
    validateForm  : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired
  }
}

