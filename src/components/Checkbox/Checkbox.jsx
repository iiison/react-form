import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies
import * as styles from './styles.css'

export default class Checkbox extends Component {
  handleSelectBoxChange = ({ event }) => {
    const { options, id, events } = this.props
    const { formData : { fields }, setFieldValue } = this.context
    const field = fields[id]
    const fieldValue = event.currentTarget.value
    const isChecked = event.currentTarget.checked
    const previousValue = field.value || []
    const value = isChecked === true ? [...previousValue, fieldValue] : (() => {
      const previousValueCopy = [...previousValue]
      const index = previousValueCopy.indexOf(fieldValue)

      previousValueCopy.splice(index, 1)

      return previousValueCopy
    })()

    setFieldValue({ event, field, value })
  }

  drawOptions({ optionClass }) {
    const { options, id : fieldID } = this.props
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
            type='checkbox'
            defaultChecked={field.value.indexOf(value) !== -1}
            onChange={(evt) => {
              const event = { ...evt }

              evt.persist()
              this.handleSelectBoxChange({ event })
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
      <div className='input-cont'>
      {(formData.fields && formData.fields[id]) ? this.drawOptions({ optionClass }) : ''}
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
    value                   : PropTypes.array,
    events                  : PropTypes.object,
    classes                 : PropTypes.object,
    label                   : PropTypes.string,
    validate                : PropTypes.string,
    shouldValidateField     : PropTypes.bool,
    shouldUseDefaultClasses : PropTypes.bool,
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

