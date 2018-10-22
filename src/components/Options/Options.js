import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default class Option extends Component {
  getChecboxNewValue = ({ event, field, isChecked }) => {
    const previousValue = field.value || []
    const fieldValue = event.currentTarget.value
    const value = isChecked === true ? [...previousValue, fieldValue] : (() => {
      const previousValueCopy = [...previousValue]
      const index = previousValueCopy.indexOf(fieldValue)

      previousValueCopy.splice(index, 1)

      return previousValueCopy
    })()

    return value
  }

  handleInputChange = ({ event }) => {
    const { id } = this.props
    const { formData : { fields, errors }, setFieldValue, validateForm } = this.context
    const field = fields[id]
    const { options, events, type } = field
    const fieldValue = event.currentTarget.value
    const isChecked = event.currentTarget.checked
    const value = type === 'checkbox'
      ? this.getChecboxNewValue({ event, field, isChecked })
      : fieldValue

    
    setFieldValue({ event, field, value }, () => {
      validateForm(id)
      
      if (field.events.onChange && typeof field.events.onChange === 'function') {
        const { formData } = this.context

        field.events.onChange({
          formData,
          setFieldValue
        })
      }
    })
  }

  drawOptions({ optionClass, optionContClass, optionLabelClass }) {
    const { options, id : fieldID, type } = this.props
    const { formData : { fields } } = this.context
    const field = fields[fieldID]
    const renderedOptions = options.map((option) => {
      const { id, value, displayName } = option

      return (
        <div key={id}>
          <input
            id={id}
            value={value}
            name={fieldID} 
            type={type}
            defaultChecked={field.value.indexOf(value) !== -1}
            onChange={(evt) => {
              const event = { ...evt }

              evt.persist()
              this.handleInputChange({ event })
            }}
          />
          <label htmlFor={id}>{displayName}</label>
        </div>
      )
    })

    return renderedOptions
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
      optionClass,
      optionContClass,
      optionLabelClass
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
      <div className={`input-cont ${shouldUseDefaultClasses && defaultContClass} ${contClass}`}>
        {
          label
            ? <div className={`col-12 ${labelClass} ${shouldUseDefaultClasses && defaultLabelClass} label`}>{label}</div>
            : ''
        }
        {(formData.fields && formData.fields[id]) ? this.drawOptions({ optionClass, optionContClass, optionLabelClass }) : ''}
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
    value                   : [],
    label                   : '',
    events                  : {},
    validate                : '',
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
    events                  : PropTypes.object,
    classes                 : PropTypes.object,
    label                   : PropTypes.string,
    validate                : PropTypes.string,
    shouldValidateField     : PropTypes.bool,
    shouldUseDefaultClasses : PropTypes.bool,
    displayName             : PropTypes.string.isRequired,
    options                 : PropTypes.array.isRequired,
    type                    : PropTypes.oneOf(['checkbox', 'radio']).isRequired,
    value                   : PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]).isRequired
  }

  static contextTypes       = {
    addField      : PropTypes.func.isRequired,
    setFieldValue : PropTypes.func.isRequired,
    validateForm  : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired
  }
}

