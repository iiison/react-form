import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import { debounce } from '../../utils/utils'
import { Input } from './Input'

function renderSuggestions ({ Template, state }) {
  const { currentIndex, suggestions, error, showSuggestions } = state

  if (!showSuggestions) {
    return ''
  }

  if (error || !suggestions.length) {
    return <div className='suggestions'>{'No matching suggestion.'}</div>
  }

  return suggestions.map((suggestion, index) => {
    const isSelected = currentIndex === index
    const props = {
      ...suggestion,
      isSelected,
    }

    return <Template {...props} key={index} /> // eslint-disable-line react/no-array-index-key
  })
}

export default class AutoSuggest extends Component {
  state = {
    showSuggestions : false,
    currentIndex    : 0,
    suggestions     : [],
    error           : ''
  }

  handleKeyDown = ({ key }) => {
    const { currentIndex, suggestions } = this.state
    const arrowKeyIndexMap = {
      ArrowDown : 1,
      ArrowUp   : -1
    }

    if (key === 'Escape') {
      this.setState({ showSuggestions : false })
    }

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const index = currentIndex + arrowKeyIndexMap[key]
      const totalSuggestions = suggestions.length - 1
      let newIndex = index

      if (newIndex < 0) {
        newIndex = totalSuggestions
      }

      if (newIndex > totalSuggestions) {
        newIndex = 0
      }

      this.setState({
        currentIndex : newIndex
      })
    }
  }

  handleFieldChange = async (event, field, setFieldValue) => {
    this.setState({ showSuggestions : true })

    const { onFieldChange, getSuggestions, minLength } = this.props
    const value = event.target.value

    if (!value) {
      this.setState({
        suggestions     : [],
        showSuggestions : false
      })

      return
    }

    if (value && value.length > minLength) {
      const { suggestions, error } = await getSuggestions(value)

      this.setState({
        error,
        suggestions
      })

      if (onFieldChange && typeof onFieldChange === 'function') {
        onFieldChange(event, field, setFieldValue)
      }

      return
    }
  }

  render() {
    const state = this.state
    const { Template, ...rest } = this.props

    rest.onFieldChange = this.debouncedHandleChange
    rest.events = {
      onKeyDown : this.handleKeyDown
    }

    return (
      <div className='col-12 grid'>
        <Input {...rest} />
        <div className='col-12 grid suggestions'>{renderSuggestions({ Template, state })}</div>
      </div>
    )
  }

  componentWillMount() {
    this.debouncedHandleChange = debounce(this.handleFieldChange, this.props.delay)
  }

  static defaultProps = {
    delay     : 500,
    minLength : 3
  }

  static contextTypes = {
    setFieldValue : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired
  }

  static propTypes = {
    onFieldChange  : PropTypes.func, // eslint-disable-line react/require-default-props
    getSuggestions : PropTypes.func.isRequired,
    Template       : PropTypes.func.isRequired,
    minLength      : PropTypes.number,
    delay          : PropTypes.number
  }
}

