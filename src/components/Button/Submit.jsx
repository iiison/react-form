import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default class Submit extends Component {
  render() {
    const {
      displayName,
      events,
      classes,
      loadingClass,
      loadingText,
      shouldUseDefaultClasses
    } = this.props
    const { validateForm, formData = {}, setFormData } = this.context
    const { onClick, ...restEvents } = events
    const { defaultClasses, isFetching, errors } = formData
    const { contClass : defaultContClass } = defaultClasses
    const { buttonClass, contClass } = classes
    const finishRequest = () => {
      setFormData({ isFetching : false })
    }

    return (
      <div className={`col-12 grid input-cont ${shouldUseDefaultClasses && defaultContClass} ${contClass}`}>
        <input
          className={`${buttonClass} submit ${isFetching && loadingClass}`}
          {...restEvents}
          type="submit"
          value={`${isFetching ? loadingText || 'loading...' : displayName}`} 
          onClick={(event) => {
            event.preventDefault()

            if (!isFetching) {
              validateForm()

              if (errors && Object.values(errors).join('').length === 0) {
                setFormData({ isFetching : true })
                onClick({
                  formData,
                  finishRequest
                })
              }
            }
          }}
        />
      </div>
    )
  }

  static propTypes = {
    displayName             : PropTypes.string.isRequired,
    events                  : PropTypes.object,
    classes                 : PropTypes.object,
    loadingClass            : PropTypes.string,
    shouldUseDefaultClasses : PropTypes.bool
  }

  static defaultProps = {
    events                  : {},
    classes                 : {
      buttonClass : '',
      contClass   : ''
    },
    loadingClass            : '',
    shouldUseDefaultClasses : true
  }

  static contextTypes = {
    formData     : PropTypes.object.isRequired,
    validateForm : PropTypes.func.isRequired,
    setFormData  : PropTypes.func.isRequired
  }
}

