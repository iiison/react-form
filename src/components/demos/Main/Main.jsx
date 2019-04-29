import React, { Component } from 'react'
import Form, { Input } from '$COMPONENTS'

// import Input from '/Input'
// import TextArea from './TextArea'
// import Submit from './Submit'
// import Select from './Select'
// import Options from './Checkbox'
// import AutoSuggest from './AutoSuggest'
// import { default as Form } from './From'
// import Form, { Input } from 'react-state-form'
// import Form, { Input } from './list'

function Template({ name, isSelected }) {
  return (
    <div className='suggestions col-12'>
      {`${name} ${isSelected ? '*' : ''}`}
    </div>
  )
}

export default class Main extends Component {
  handleEmailChange = (event, field, setField) => {
    if (event.currentTarget.value.length > 2) {
      field.done = () => {
        setField({ event, field, value : 'test' })
      }
    }
  }

  getSuggestions = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const body = await response.json()

    return {
      suggestions : body
    }
  }

  render() {
    const fieldDetails = {
      email : {
        id          : 'email',
        value       : 'email',
        placeholder : 'enter email',
        label       : 'Enter emai',
        displayName : 'email',
        validate    : 'required|alphaNumeric|minLength-3|maxLength-3'
        // onInputChange : this.handleEmailChange
      },
      auto : {
        id             : 'userss',
        placeholder    : 'Enter username(auto suggest)',
        label          : 'Auto Suggests',
        displayName    : 'auto sugegst',
        validate       : 'required',
        getSuggestions : this.getSuggestions
        // onInputChange : this.handleEmailChange
      },
      address : {
        id                  : 'address',
        type                : 'textarea',
        placeholder         : 'enter address',
        label               : 'Enter address',
        displayName         : 'address',
        validate            : 'alphaNumeric|minLength-3|maxLength-3',
        shouldValidateField : false,
        onFieldChange       : () => {
          console.log('this shit happened')
        },
        events             : {
          onBlur : () => {
            console.log('blurred')
          }
        }
        // onInputChange : this.handleEmailChange
      },
      password : {
        id          : 'password',
        label       : 'enter password ',
        placeholder : 'enter password',
        validate    : 'numeric',
        type        : 'email'
      },
      submt : {
        displayName : 'Enter the dragon',
        loadingText : 'wait..',
        events      : {
          onClick({ finishRequest, formData }) {
            const timeout = 2000

            console.log(formData)

            window.setTimeout(() => {
              finishRequest()
            }, timeout)
          }
        }
      },
      select : {
        id       : 'gender',
        value    : '3',
        label    : 'gender',
        validate : 'required',
        options  : [
          {
            value       : '3',
            id          : 'male',
            displayName : 'male'
          },
          {
            id          : 'female',
            value       : 'female',
            displayName : 'female'
          },
          {
            id          : 'notSure',
            value       : 'not sure',
            displayName : 'not sure'
          }
        ],
        displayName : 'Gender',
        events      : {
          onChange() {
            console.log('changed bc')
          }
        }
      },
      fruits : {
        id       : 'fruits',
        type     : 'radio',
        label    : 'select fruits',
        validate : 'required',
        events   : {
          onChange({ formData, setFieldValue }) {
            console.log(setFieldValue)
            setFieldValue({
              value : 'zy',
              field : formData.fields.email
            })
          }
        },
        displayName : 'fruits',
        options     : [
          {
            id          : 'apple',
            value       : 'applee',
            displayName : 'Fruit Apple'
          },
          {
            id          : 'orange',
            value       : 'orange',
            displayName : 'Fruit orange'
          },
          {
            id          : 'pineapple',
            value       : 'pineapple',
            displayName : 'Fruit Pineapple'
          }
        ]
      }
    }
    const props = {
      defaultClasses : {
        contClass  : 'testing',
        inputClass : 'input-test another',
        errorClass : 'error-test',
        label      : 'label-test'
      }
    }

    return (
      <div>
        <Form {...fieldDetails.email}>
          <Input {...fieldDetails.email} />
        </Form>
      </div>
    )
  }
}

// <Input {...fieldDetails.email} />
//   <Input {...fieldDetails.address} />
//   <Input {...fieldDetails.password} />
//   <Submit {...fieldDetails.submt} />
//   <Select {...fieldDetails.select} />
//   <Options {...fieldDetails.fruits} />
