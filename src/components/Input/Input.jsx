import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default class Input extends Component {
  render() {
    const {
      id,
      type,
      value,
      onFieldChange,
      class : inputClass
    } = this.props
    const {
      setFieldValue,
      formData = {}
    } = this.context
    const field = formData.fields ? formData.fields[id] : {}

    return (
      <div className={`${inputClass} input-cont`}>
        <input
          type={type}
          value={field.value || value}
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
    validate      : PropTypes.string,
    onFieldChange : PropTypes.func
  }

  static defaultProps = {
    type          : 'text',
    validate      : null,
    value         : '',
    onFieldChange : null
  }
}

