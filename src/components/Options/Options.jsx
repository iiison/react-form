import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies
import { drawElements } from '$UTILS/componentUtils'

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
    const { formData : { fields }, setFieldValue, validateForm } = this.context
    const field = fields[id]
    const { type } = field
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
    const fieldValueAsList = Array.isArray(field.value) ? field.value : [field.value]
    const renderedOptions = options.map((option) => {
      const { id, value, displayName } = option

      return (
        <div key={id} className={optionContClass}>
          <input
            id={id}
            value={value}
            name={fieldID} 
            type={type}
            className={optionClass}
            defaultChecked={fieldValueAsList.includes(value)}
            onChange={(evt) => {
              const event = { ...evt }

              evt.persist()
              this.handleInputChange({ event })
            }}
          />
          <label htmlFor={id} className={optionLabelClass}>{displayName}</label>
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
          drawElements({
            shouldUseDefaultClasses,
            defaultClasses : defaultLabelClass,
            classes        : `${labelClass} label`,
            content        : label
          })
        }
        {(formData.fields && formData.fields[id]) ? this.drawOptions({ optionClass, optionContClass, optionLabelClass }) : ''}
        {
          drawElements({
            shouldUseDefaultClasses,
            defaultClasses : defaultErrorClass,
            classes        : errorClass,
            content        : errors
          })
        }
      </div>
    )
  }

  componentDidMount() {
    this.context.addField(this.props)
  }

  static defaultProps = {
    displayName             : '',
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
    label                   : PropTypes.string,
    validate                : PropTypes.string,
    shouldValidateField     : PropTypes.bool,
    shouldUseDefaultClasses : PropTypes.bool,
    displayName             : PropTypes.string,
    options                 : PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    type                    : PropTypes.oneOf(['checkbox', 'radio']).isRequired,
    events                  : PropTypes.shape({
      onChange : PropTypes.func
    }),
    classes : PropTypes.shape({
      contClass           : PropTypes.string,
      labelClass          : PropTypes.string,
      fieldClass          : PropTypes.string,
      errorClass          : PropTypes.string,
      optionClass         : PropTypes.string,
      selectedOptionClass : PropTypes.string
    }),
    value : PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]).isRequired
  }

  static contextTypes = {
    addField      : PropTypes.func.isRequired,
    setFieldValue : PropTypes.func.isRequired,
    validateForm  : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }
}

