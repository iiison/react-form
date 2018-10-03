import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default class Input extends Component {
  render() {
    const {
      id,
      type,
      error,
      value,
      label,
      placeholder,
      onFieldChange,
      classes :  {
        contClass = '',
        inputClass = '',
        errorClass = '',
        labelClass = ''
      } = {}
    } = this.props
    const {
      setFieldValue,
      formData = {}
    } = this.context
    const field = formData.fields ? formData.fields[id] : {}

    return (
      <div className={`${contClass} input-cont col-12 grid`}>
        {
          label
            ? <div className={`col-12 ${labelClass} label`}>{label}</div>
            : ''
        }
        <input
          type={type}
          placeholder={placeholder}
          value={field.value || value}
          className={`${inputClass} col-12`}
          onChange={(evt) => {
            const event = { ...evt }

            evt.persist()
            setFieldValue({
              event,
              field
            })

            if (onFieldChange && typeof onFieldChange === 'function') {
              onFieldChange(event, field, setFieldValue)
            }
          }}
        />
        {
          error
            ? <div className={`col-12 error ${errorClass}`}>{error}</div>
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
    formData      : PropTypes.object.isRequired
  }

  static propTypes = {
    id            : PropTypes.string.isRequired,
    type          : PropTypes.string,
    error         : PropTypes.string,
    value         : PropTypes.string,
    label         : PropTypes.string,
    classes       : PropTypes.object,
    validate      : PropTypes.string,
    placeholder   : PropTypes.string,
    onFieldChange : PropTypes.func
  }

  static defaultProps = {
    type          : 'text',
    validate      : null,
    value         : '',
    onFieldChange : null
  }
}

