# React-Form
The inspiration to build this plugin is:
  - The developer doesn't have to worry about the basic input-change and data management of form.
  - Form syntax should be as close as possible to HTML native forms.
  - The form should provide basic validation rules by default. The developer can also add custom validation rules.
  - The developer can create/change the layout as he wants.
  
React-Form handles form data, field validation of a form. It exposes few hooks for the developer to perform custom actions like custom events, form data change events, etc.


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
The plugin exposes Form(the main HOC) and other essential form components such as Input, Select, Options and Submit, etc. Import  the desired components like:

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
Refer to each component doc in the wiki for prop details.

#### Form Props
###### defaultClasses[Object]
Suppose you want class `input-container` on all the input fields. There are two ways to do that, either pass the class name as a prop to each input(which will be very repetitive) or define `fieldClass` property in `defaultClasses` prop in Form. This adds default classes to each input field. You can opt not to add default classes at the component level(checkout components doc for more details). Here is the default value of `defaultClasses` prop:

```js
const defaultClasses = {
  label      : 'input-label'      // will be added to all labels.
  contClass  : 'input-container', // Container class, will be added to each container.
  fieldClass : 'input-field',     // will be added to actual field.
  errorClass : 'error',           // will be added to errors.
}
```

Here is how to pass `defaultClasses` to Form:

```js
<Form defaultClasses={defaultClasses}>
...
</Form>
```

###### shouldValidateForm[Boolean]
If you don't want to validate any field in Form. You can pass a flag through Form, `shouldValidateForm` as `false` to the `Form` component like this:

```js
<Form shouldValidateForm={false}>
...
</Form>
```

Default value is `true`


#### API

Form exposes few functions through context to it's children:

###### setFieldValue[Function]
The plugin stores all the data in the `state` of the `Form` component and exposes it through context. If field value changes, data has to be updated, `setFieldValue` handles this. `setFieldValue` is called internally on the `onChange` event. Custom inputs will also use `setFieldValue` to set field value. The function accepts an object as an argument. Here are the object properties:

```js
{
  id,
  event,
  field,
  value,
  isMultipleValues
}
```
Here are the details:
  - **id**[string]: field id. If `isMultipleValue` is `true` then id is not required.
  - **event**[object]: Native event object. This is basically to get field latest value througth `evet.currentTarget.value`.
  - **field**[object]: Current field object as stored in Form. Can be accessed through context - `context.formData[fieldId]`.
  - **value**[string/object/boolean]: This field mandatory if the `event` object is not passed. Please use `value` if:
    - You are setting value explicitly. The best use-case is when you want to change other field value on change of the current field.
    - You are using custom, non-native input fields. And there is no way to get value through the `event` object( `event.currentTarget.value`).
  - **isMultipleValues**[boolean]: This is set to `false` by default, make it `true` if you want to set multiple values in one shot. Note that if `isMultipleValue` is true, then `value` property should be an object of field id and value.

**Returns** the form state.

###### addField[Function]
`addField` is basically to tell Form to add and track the field for value change, events, and validations. This function is useful when you want to add a custom field(default field components also uses the same function), call this function in `componentDidMount` function with all the props you want to store at `formData` object. `addField` should be called once per field. Here is how to use it:

```jsx
...component code
Class Input extends Component {
  render(){...}
  
  componentWillMount() {
    this.context.addField(this.props)
  }

  static contextTypes = {
    addField      : PropTypes.func.isRequired,
    // ... other context props
  }
}
```

__`id` mandatory fields in the `this.props` in custom components.__


###### validateForm[Function]
`validateForm` is used to validate the form. You can either validate the whole form or validate a single field through this function. In order to validate a single field, pass the field id as an argument to `validateForm`.

###### formData[Object]
`formData` is single source of truth for the field values and other field related data. `formData` consists all form data, such as field values, other field props, errors, fields events, etc. Here is the shape of `formData` object:

```json
{
  shouldValidateForm : Boolean,
  defaultClasses     : Object,
  errors             : {
    [id] : String
  },
  fields : {
    [id] : Object
  }
}
````
