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

