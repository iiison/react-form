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
    const finishRequest = ({ apiErrors = '' } = {}) => {
      const newState = {
        apiErrors,
        isFetching : false
      }

      setFormData(newState)
    }

    /* eslint-disable react/jsx-no-literals */
    return (
      <div className={`col-12 grid input-cont ${shouldUseDefaultClasses && defaultContClass} ${contClass}`}>
        <input
          className={`${buttonClass} submit ${isFetching && loadingClass}`}
          {...restEvents}
          type='submit'
          value={`${isFetching ? loadingText : displayName}`} 
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
  /* eslint-enable */

  static propTypes = {
    displayName             : PropTypes.string.isRequired,
    loadingText             : PropTypes.string,
    loadingClass            : PropTypes.string,
    shouldUseDefaultClasses : PropTypes.bool,
    events                  : PropTypes.shape({
      onClick : PropTypes.func
    }),
    classes : PropTypes.shape({
      buttonClass : PropTypes.string,
      contClass   : PropTypes.string
    })
  }

  static defaultProps = {
    events                  : {},
    classes                 : {
      buttonClass : '',
      contClass   : ''
    },
    loadingText             : 'Loading...',
    loadingClass            : '',
    shouldUseDefaultClasses : true
  }

  static contextTypes = {
    validateForm : PropTypes.func.isRequired,
    setFormData  : PropTypes.func.isRequired,
    formData     : PropTypes.shape({
      defaultClasses : PropTypes.shape({
        labelClass : '',
        contClass  : '',
        errorClass : '',
        fieldClass : ''
      }),
      isFetching : PropTypes.bool, 
      errors : PropTypes.object // eslint-disable-line
    }),
  }
}

