import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default class Input extends Component {
  render() {
    const {
      id,
      type,
      rows,
      value,
      label,
      events,
      placeholder,
      onFieldChange,
      shouldValidateField,
      classes :  {
        contClass = '',
        inputClass = '',
        errorClass = '',
        labelClass = ''
      }
    } = this.props
    const {
      setFieldValue,
      validateForm,
      formData = {}
    } = this.context
    const field = formData.fields ? formData.fields[id] : {}
    const errors = formData.errors && formData.errors[id]
    const props = {
      ...events,
      type,
      placeholder,
      value     : field.value || value,
      className : `${inputClass} col-12`,
      onBlur    : (evt) => {
        const event = { ...evt }

        evt.persist()
        if (field.shouldValidateField) {
          validateForm(field.id)
        } else {
          setFieldValue({
            event,
            field,
            value : field.value.toString().length > 0,
            id    : 'shouldValidateField' 
          })
        }

        if (events.onBlur && typeof events.onBlur) {
          events.onBlur(field)
        }
      },
      onChange : (evt) => {
        const event = { ...evt }

        evt.persist()
        setFieldValue({
          event,
          field
        })

        if (onFieldChange && typeof onFieldChange === 'function') {
          onFieldChange(event, field, setFieldValue)
        }
      }
    }

    if (type.toLowerCase() === 'textarea') {
      delete props.type
      delete props.value

      props.defaultValue = field.value || value
      props.rows = rows || 2
    }

    const element = type === 'textarea'
      ? <textarea {...props} />
      : <input {...props} />

    return (
      <div className={`${contClass} input-cont col-12 grid`}>
        {
          label
            ? <div className={`col-12 ${labelClass} label`}>{label}</div>
            : ''
        }
        { element }
        {
          errors
            ? <div className={`col-12 error ${errorClass}`}>{errors}</div>
            : ''
        }
      </div>
    )
  }

  componentDidMount() {
    this.context.addField(this.props)
  }

  static contextTypes = {
    addField      : PropTypes.func.isRequired,
    setFieldValue : PropTypes.func.isRequired,
    validateForm  : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired
  }

  static propTypes = {
    id            : PropTypes.string.isRequired,
    type          : PropTypes.string,
    value         : PropTypes.string,
    label         : PropTypes.string,
    classes       : PropTypes.object,
    validate      : PropTypes.string,
    placeholder   : PropTypes.string,
    displayName   : PropTypes.string,
    onFieldChange : PropTypes.func
  }

  static defaultProps = {
    type                : 'text',
    value               : '',
    events              : {},
    classes             : {},
    validate            : null,
    displayName         : '',
    onFieldChange       : null,
    shouldValidateField : false,
  }
}

