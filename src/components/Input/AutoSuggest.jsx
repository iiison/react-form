import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line import/no-extraneous-dependencies

import { debounce } from '../../utils/utils'
import Input from './Input'

function renderSuggestions ({ Template, state, suggestionsClasses, clickEvent }) {
  const { currentIndex, suggestions, error, showSuggestions } = state
  const notFoundMessage = 'No matching suggestion.'
  let items

  if (!showSuggestions) {
    return ''
  }

  if (error || !suggestions.length) {
    items = <li className={'suggestions col-12 lighter-color'}>{'No matching suggestion.'}</li>
  }

  items = suggestions.map((suggestion, index) => {
    const isSelected = currentIndex === index
    const props = {
      ...suggestion,
      isSelected,
    }

    return (
      <Template
        {...props}
        key={index} // eslint-disable-line react/no-array-index-key
        clickEvent={() => clickEvent(suggestion)}
      />
    ) 
  })

  return (<ul className={`col-12 grid suggestions ${suggestionsClasses.contClass}`}>{items}</ul>)
}

function getIndexOnArrowPress(currentIndex, key, suggestions) {
  const totalSuggestions = suggestions.length - 1
  const arrowKeyIndexMap = {
    ArrowDown : 1,
    ArrowUp   : -1
  }
  const index = currentIndex + arrowKeyIndexMap[key]
  let newIndex = index

  if (newIndex < 0) {
    newIndex = totalSuggestions
  }

  if (newIndex > totalSuggestions) {
    newIndex = 0
  }
  
  return newIndex
}

export default class AutoSuggest extends Component {
  state = {
    showSuggestions : false,
    currentIndex    : 0,
    suggestions     : [],
    error           : ''
  }

  setCurrentIndex = (index) => {
    this.setState({
      currentIndex : index
    })
  }

  handleInputBlur = (event) => {
    const { onBlur } = this.props.events

    this.setState({
      showSuggestions : false
    })
    
    if (onBlur && typeof onBlur === 'function') {
      onBlur(event)
    }
  }

  handleKeyDown = ({ key }) => {
    const { onValueSelection } = this.props
    const { currentIndex, suggestions, showSuggestions } = this.state

    switch (key) {
    case 'Escape' : 
      this.setState({ showSuggestions : false })
      break

    case 'ArrowDown' :
    case 'ArrowUp' :
      const newIndex = getIndexOnArrowPress(currentIndex, key, suggestions)

      this.setState({
        currentIndex    : newIndex,
        showSuggestions : true
      })
      break

    case 'Enter' :
      if (showSuggestions && suggestions.length) {
        onValueSelection(suggestions[currentIndex])
        this.setState({ showSuggestions : false })
      }
      break
    default : 
      return
    }
  }

  handleSuggestionClick = (suggestion) => {
    this.props.onValueSelection(suggestion)
    this.setState({
      showSuggestions : false
    })
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
      const { suggestions = [], error } = await getSuggestions(value)

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
    const clickEvent = this.handleSuggestionClick
    const { Template, suggestionsClasses, ...rest } = this.props

    rest.onFieldChange = this.debouncedHandleChange
    rest.events = {
      onKeyDown : this.handleKeyDown,
      // onBlur    : this.handleInputBlur
    }

    return (
      <div className={`col-12 grid relative`}>
        <Input {...rest} />
        {renderSuggestions({ Template, state, suggestionsClasses, clickEvent })}
      </div>
    )
  }

  componentWillMount() {
    this.debouncedHandleChange = debounce(this.handleFieldChange, this.props.delay)
  }

  static defaultProps = {
    delay              : 500,
    minLength          : 3,
    events             : {},
    suggestionsClasses : {
      contClass : ''
    }
  }

  static contextTypes = {
    setFieldValue : PropTypes.func.isRequired,
    formData      : PropTypes.object.isRequired
  }

  static propTypes = {
    onFieldChange      : PropTypes.func, // eslint-disable-line react/require-default-props
    getSuggestions     : PropTypes.func.isRequired,
    onValueSelection   : PropTypes.func.isRequired,
    Template           : PropTypes.func.isRequired,
    minLength          : PropTypes.number,
    delay              : PropTypes.number,
    suggestionsClasses : PropTypes.shape({
      contClass : PropTypes.string
    })
  }
}

