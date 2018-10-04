import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default class Submit extends Component {
  render() {
    const {
      displayName,
      events,
      classes
    } = this.props
    const { validateForm, formData = {} } = this.context
    const { onClick, ...restEvents } = events

    return (
      <div className={`col-12 grid input-cont`}>
        <input
          {...restEvents}
          type="submit"
          value={displayName} 
          onClick={(event) => {
            event.preventDefault()
            validateForm()

            if (formData.errors && Object.values(formData.errors).join('').length === 0) {
              onClick({
                formData
              })
            }
          }}
        />
      </div>
    )
  }

  static propTypes = {
    displayName : PropTypes.string.isRequired,
    events : PropTypes.object,
    classes : PropTypes.string
  }

  static defaultProps = {
    events : {},
    classes : ''
  }

  static contextTypes = {
    formData     : PropTypes.object.isRequired,
    validateForm : PropTypes.func.isRequired
  }
}
