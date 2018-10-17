# React-Form
The inspiration to build this plugin is:
  - Developer doesn't have to worry about the basic input-chante and data management of form.
  - Developer can create / change the layout as he wants.
  
React-Form handles form data, field validation of a form and exposes few hooks, so that developer can perform custom actions.

#### Installation

```shell
$ npm install --save react-state-form
```

#### Requirements

```
React: 15 and above
```

#### Usage

###### Import Components
The plugin exposes Form(the main HOC) and other form utils like Input, Submit etc. Import desired components like:

```js
import Form, { Input, Submit } from 'react-state-form'
```

###### Use in the compoennet
Just replace the HTML form tag with `Form` like:

```jsx
<Form {...formProps}>
  <div className="col-12 grid">
    <Input {...inputProps} />
    <Input {...anotherInputProps} />
    <Submit {...submitProps} /> // Please Refer Submit doc for props details.
  </div>
</Form>
```
Refer docs in component for prop details of respective component

#### Form Props
###### defaultClasses[Object]
Suppose you want class `input-container` on all the Inputs, there are two ways to do that, one is to pass the class name as props to each input(which will be very repeative), other way is to define `inputClass` property in `defaultClasses` prop in Form. In this way the default class will be added to each Input, you can opt not to add default class in each component, please refer components doc for more details.

```js
const defaultClasses = {
  contClass  : 'input-container', // Container class, will be added to each container.
  inputClass : 'input-field', // will be added to actual field.
  errorClass : 'error', // will be added to errors.
  label      : 'input-label' // will be added to all labels.
}

<Form defaultClasses={defaultClasses}>
...
</Form>
```

###### shouldValidateForm[Boolean]
If you don't want to validate form in starting, you can pass a flag through Form, `shouldValidateForm` as `false` to the `Form` component like this:

```js
<Form shouldValidateForm={false}>
...
</Form>
```

###### isDisabled[Boolean]
If you want to disable all inputs by default, pass a prop `isDisabled` as `true` to Form and all input fields will be disabled by default. This is how isDisabled can be passed to Form:

```js
<Form isDisabled={true}>
...
</Form>
```

#### API

Form exposes few functions through context to it's children:

###### addField[Function]
addField adds new field to formData, all data of a field stays in the field, commonly it contains: input validation rules, input value, input class names and other input related data passed through the Input as props. It will be handy if you are creating custom input that is not present in `react-form`. This should be called once per field. Best practice is to call this function in `componentDidMount`.

###### setFieldValue[Function]
The plugin stores all the data in `state`, if field value changes, data has to be udated, this is handled by `setFieldValue`, this called internally on `onChange` in `Input`. This will also be used when you are adding a custom input. The function accepts an object as argument, here are the object properties:

```js
{
  event, // event object,
  field, // context.formData[fieldId](respective input props)
  value, // this field is mandatory if you are not passing event. This can be used if you are setting value explicitly, the best usecae is when you want to set some other field value on change of current field.
  isMultipleValues, // Boolean value. This is false by default, make it true if you want to set multiple values in one shot. If isMultipleValue is true, then `value` property should be an object of field id and value.
  id // field id. if isMultipleValue is true then id is optional.
}
```

###### validateForm[Function]
Validates whole form
