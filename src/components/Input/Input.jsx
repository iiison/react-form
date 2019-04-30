import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default class Input extends Component {
  handleInputBlur = ({ evt, field }) => {
    const { id } = this.props
    const {
      value,
      events,
      shouldValidateField
    } = field
    const {
      validateForm,
      setFieldValue
    } = this.context
    const event = { ...evt }

    evt.persist()
    if (shouldValidateField) {
      validateForm(id)
    } else {
      setFieldValue({
        event,
        field,
        value : value.toString().length > 0,
        id    : 'shouldValidateField' 
      })
    }

    if (events.onBlur && typeof events.onBlur) {
      events.onBlur(field)
    }
  }

  handleInputChange = ({ evt, field }) => {
    const event = { ...evt }
    const { onFieldChange } = field
    const { setFieldValue } = this.context

    evt.persist()
    setFieldValue({
      event,
      field
    })

    if (onFieldChange && typeof onFieldChange === 'function') {
      onFieldChange(event, field, setFieldValue)
    }
  }

  selectInputElement = ({ type, props }) => {
    return type === 'textarea' ? <textarea {...props} /> : <input {...props} />
  } 

  drawElements = ({ shouldUseDefaultClasses, classes, content, defaultClasses }) => {
    return content
      ? <div className={`col-12 ${classes} ${shouldUseDefaultClasses && defaultClasses}`}>{content}</div>
      : ''
  }

  getInputClassName = ({ fieldClass, shouldUseDefaultClasses, defaultInputClass }) => (
    `${fieldClass} ${shouldUseDefaultClasses && defaultInputClass} col-12`
  )

  selectField = ({ fields, id }) => {
    return fields ? fields[id] : {}
  }

  render() {
    const { id } = this.props
    const { formData } = this.context
    const {
      fields, 
      defaultClasses,
      errors : allErrors
    } = formData

    if (!fields || !fields[id]) {
      return (<div />)
    }

    const {
      contClass  : defaultContClass,
      fieldClass : defaultInputClass,
      errorClass : defaultErrorClass,
      labelClass : defaultLabelClass
    } = defaultClasses
    const field = this.selectField({ fields, id })
    const {
      value,
      type,
      rows,
      label,
      events,
      placeholder,
      shouldUseDefaultClasses,
      classes :  {
        contClass,
        fieldClass,
        errorClass,
        labelClass
      }
    } = field

    const errors = allErrors && allErrors[id]
    // const updatedContClass = ``
    const props = {
      ...events,
      type,
      placeholder,
      value,
      className : this.getInputClassName({ fieldClass, shouldUseDefaultClasses, defaultInputClass }),
      onBlur    : (evt) => this.handleInputBlur({ evt, field }),
      onChange  : (evt) => this.handleInputChange({ evt, field })
    }

    if (type === 'textarea') {
      delete props.type
      delete props.value

      props.defaultValue = value
      props.rows = rows || 2
    }

    const element = this.selectInputElement({ type, props })

    return (
      <div className={`${contClass}  ${shouldUseDefaultClasses && defaultContClass} input-cont col-12 grid`}>
        {
          this.drawElements({
            shouldUseDefaultClasses,
            classes        : `${labelClass} label`,
            content        : label,
            defaultClasses : defaultLabelClass
          })
        }
        {element}
        {
          this.drawElements({
            shouldUseDefaultClasses,
            classes        : errorClass,
            content        : errors,
            defaultClasses : defaultErrorClass
          })
        }
      </div>
    )
  }

  componentWillMount() {
    this.context.addField(this.props)
  }

  static contextTypes = {
    addField      : PropTypes.func.isRequired,
    setFieldValue : PropTypes.func.isRequired,
    validateForm  : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  static propTypes = {
    id                      : PropTypes.string.isRequired,
    value                   : PropTypes.string,
    label                   : PropTypes.string,
    validate                : PropTypes.string,
    placeholder             : PropTypes.string,
    displayName             : PropTypes.string,
    onFieldChange           : PropTypes.func,
    shouldUseDefaultClasses : PropTypes.bool,
    shouldValidateField     : PropTypes.bool,
    type                    : PropTypes.oneOf(['email', 'text', 'number', 'tel', 'password', 'textarea']),
    events                  : PropTypes.shape({
      onBlur : PropTypes.func
    }),
    classes : PropTypes.shape({
      labelClass : PropTypes.string,
      contClass  : PropTypes.string,
      errorClass : PropTypes.string,
      fieldClass : PropTypes.string,
    })
  }

  static defaultProps = {
    type                    : 'text',
    value                   : '',
    label                   : '',
    placeholder             : '',
    events                  : {},
    validate                : '',
    displayName             : '',
    onFieldChange           : null,
    shouldValidateField     : false,
    shouldUseDefaultClasses : true,
    classes                 : {
      labelClass : '',
      contClass  : '',
      errorClass : '',
      fieldClass : ''
    }
  }
}

