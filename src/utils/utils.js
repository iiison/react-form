import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export function wrapWithContext(context, contextTypes, Elements) {
  class WrapWithContext extends Component {
    getChildContext = () => context

    render() {
      return (
        <div>
          {this.props.children}
        </div>
      ) 
    }

    getChildContext() {
      return context
    }

    static childContextTypes = contextTypes
  }

  return WrapWithContext
}


/**
 * Debounce input function
 *
 * @param   {Function} func function to be debounced
 * @param   {Number}   time time to wait
 *
 * @returns {Function}      debounced function
 */
export function debounce(func, time) {
  let timeout

  return function(...args) {
    const ref = this

    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(ref, args), time)
  }
}

