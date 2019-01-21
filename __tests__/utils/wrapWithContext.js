import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

export default function wrapWithContext(context, contextTypes, Elements) {
  class WrapWithContext extends Component {
    getChildContext = () => context

    render() {
      return (
        <div>
          {this.props.children}
        </div>
      ) 
    }

    static childContextTypes = contextTypes
  }

  return WrapWithContext
}

