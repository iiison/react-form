const validations = {
  email() {
    return {
      rule    : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      formatter (fieldName) {
        const message = '%c is not valid'

        return message.replace('%c', fieldName)
      }
    }
  },
  required() {
    return {
      rule    : /\S/,
      formatter (fieldName) {
        const message = '%c is required'

        return message.replace('%c', fieldName)
      }
    }
  }
}

export default validations
