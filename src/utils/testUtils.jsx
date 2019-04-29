import React, { Component } from 'react'

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

