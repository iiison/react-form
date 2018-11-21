!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define("reactStateForm",["React"],t):"object"==typeof exports?exports.reactStateForm=t(require("react")):e.reactStateForm=t(e.React)}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){e.exports=n(2)()},function(t,n){t.exports=e},function(e,t,n){"use strict";var r=n(3);function o(){}e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(0),i=n.n(a),l={email:{rule:function(){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i},formatter:function(e){return"".concat(e," is not valid email")}},required:{rule:function(){return/\S/},formatter:function(e){return"".concat(e," is required.")}},numeric:{rule:function(){return/^\d+$/},formatter:function(e){return"".concat(e," should contain only numbers.")}},alphaNumeric:{rule:function(){return/^[a-z0-9]+$/i},formatter:function(e){return"".concat(e," should not contain special characters, please use only alphabets and numbers.")}},alphabetic:{rule:function(){return/^[a-z]+$/i},formatter:function(e){return"".concat(e," should contain only alphabets.")}},maxLength:{rule:function(e){return{test:function(t){return t.length<=e}}},formatter:function(e,t){return t?"".concat(e," can contain maximum ").concat(t," characters."):"".concat(e," contains more characters than expected.")}},minLength:{rule:function(e){return{test:function(t){return t.length>=e}}},formatter:function(e,t){return t?"".concat(e," should contain minimum ").concat(t," characters."):"".concat(e," contains less characters than expected.")}}};function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){v(e,t,n[t])})}return e}function u(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||p(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(e){return function(e){if(Array.isArray(e))return e}(e)||p(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function p(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(e){function t(e){var n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),v(m(m(n=function(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?m(e):t}(this,y(t).call(this,e)))),"validateField",function(e){var t=e.id,r=(e.label,e.value),o=e.validate,a=e.displayName,i=e.customRules,s=void 0===i?{}:i,p=o?o.split("|"):"";if(p.length)for(var d in p){var y=f(p[d].split("-")),b=y[0],m=y.slice(1),h=l[b]||s[b];if(!h)throw"invalid validation rule: ".concat(b,", please use an existing validation rule name or pass a custom function with same name through 'customRules' prop in Input: ").concat(e.id,". Rule value should be an object with keys: 'rule' as an Regex and 'formatter' as a function, that formats the value.");if("break"===function(){var e=r.toString(),o="";if("required"!==b&&!e||h.rule.apply(null,m).test(r.toString())||(o=h.formatter.apply(null,[a||t].concat(u(m)))),n.setState(function(e){return c({},e,{errors:c({},e.errors,v({},t,o))})}),o)return"break"}())break}return""});var r=n.props,o=r.isDisabled,a=void 0!==o&&o,i=r.shouldValidateForm,p=r.defaultClasses;return n.state={shouldValidateForm:i,defaultClasses:p,isDisabled:a,errors:{},isFetching:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,r["Component"]),function(e,t,n){t&&d(e.prototype,t),n&&d(e,n)}(t,[{key:"getChildContext",value:function(){var e=this;return{setFieldValue:function(t,n){var r=t.event,o=t.field,a=t.value,i=t.isMultipleValues,l=t.id,s=void 0===l?"value":l,u=o.id,f=function(t,r){e.setState(function(e){return c({},e,{fields:c({},e.fields,v({},u,c({},e.fields[t],v({shouldValidateField:!0},s,r))))})},n)};if(a||""===a)if(i){var p=c({},e.state);for(var d in a)p.fields[d].shouldValidateField=!0,p.fields[d][s]=a[d];e.setState(function(e){return c({},e,p)})}else f(u,a);else f(u,r.currentTarget.value);return e.state},addField:function(t){e.setState(function(e){return c({},e,{errors:c({},e.errors,v({},t.id,"")),fields:c({},e.fields,v({},t.id,c({},t)))})})},setFormData:function(t){e.setState(function(e){return c({},e,t)})},validateForm:function(t){var n=e.state,r=n.shouldValidateForm,o=n.fields,a=o[t];if(r){if(a)return void(a.shouldValidateField&&e.validateField(a));for(var i in o){var l=o[i];l&&e.validateField(l)}}},formData:this.state}}},{key:"render",value:function(){return o.a.createElement("form",{action:""},this.props.children)}}]),t}();function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){x(e,t,n[t])})}return e}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t){return!t||"object"!==g(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}v(h,"defaultProps",{errors:{},children:o.a.createElement("div",null),isDisabled:!1,shouldValidateForm:!0,defaultClasses:{contClass:"",fieldClass:"",errorClass:"",labelClass:""}}),v(h,"propTypes",{children:i.a.node.isRequired,isDisabled:i.a.bool,shouldValidateForm:i.a.bool,defaultClasses:i.a.object}),v(h,"childContextTypes",{addField:i.a.func,setFieldValue:i.a.func,validateForm:i.a.func,formData:i.a.object,setFormData:i.a.func});var F=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),j(this,w(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(t,r["Component"]),function(e,t,n){t&&C(e.prototype,t),n&&C(e,n)}(t,[{key:"render",value:function(){var e=this.props,t=e.id,n=e.type,r=e.rows,a=e.label,i=e.events,l=e.placeholder,s=e.onFieldChange,c=(e.shouldValidateField,e.shouldUseDefaultClasses),u=e.classes,f=u.contClass,p=void 0===f?"":f,d=u.fieldClass,y=void 0===d?"":d,b=u.errorClass,m=void 0===b?"":b,v=u.labelClass,h=void 0===v?"":v,C=this.context,j=C.setFieldValue,w=C.validateForm,S=C.formData,x=void 0===S?{}:S,F=x.fields,P=x.defaultClasses,_=x.errors,E=P.contClass,D=P.fieldClass,R=P.errorClass,k=P.labelClass,T=F?F[t]:{},V=_&&_[t],q=O({},i,{type:n,placeholder:l,value:T.value||"",className:"".concat(y," ").concat(c&&D," col-12"),onBlur:function(e){var t=O({},e);e.persist(),T.shouldValidateField?w(T.id):j({event:t,field:T,value:T.value.toString().length>0,id:"shouldValidateField"}),i.onBlur&&g(i.onBlur)&&i.onBlur(T)},onChange:function(e){var t=O({},e);e.persist(),j({event:t,field:T}),s&&"function"==typeof s&&s(t,T,j)}});"textarea"===n.toLowerCase()&&(delete q.type,delete q.value,q.defaultValue=T.value||"",q.rows=r||2);var N="textarea"===n?o.a.createElement("textarea",q):o.a.createElement("input",q);return o.a.createElement("div",{className:"".concat(p,"  ").concat(c&&E," input-cont col-12 grid")},a?o.a.createElement("div",{className:"col-12 ".concat(h," ").concat(c&&k," label")},a):"",N,V?o.a.createElement("div",{className:"col-12 error ".concat(m," ").concat(c&&R)},V):"")}},{key:"componentDidMount",value:function(){this.context.addField(this.props)}}]),t}();function P(e){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function E(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return!t||"object"!==P(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}x(F,"contextTypes",{addField:i.a.func.isRequired,setFieldValue:i.a.func.isRequired,validateForm:i.a.func.isRequired,formData:i.a.object.isRequired}),x(F,"propTypes",{id:i.a.string.isRequired,value:i.a.string,label:i.a.string,classes:i.a.object,validate:i.a.string,placeholder:i.a.string,displayName:i.a.string,onFieldChange:i.a.func,shouldUseDefaultClasses:i.a.bool,type:i.a.oneOf(["email","text","number","tel","password","textarea"])}),x(F,"defaultProps",{type:"text",value:"",events:{},classes:{},validate:"",displayName:"",onFieldChange:null,shouldValidateField:!1,shouldUseDefaultClasses:!0});var q=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),R(this,k(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(t,r["Component"]),function(e,t,n){t&&D(e.prototype,t),n&&D(e,n)}(t,[{key:"render",value:function(){var e=this.props,t=e.displayName,n=e.events,r=e.classes,a=e.loadingClass,i=e.loadingText,l=e.shouldUseDefaultClasses,s=this.context,c=s.validateForm,u=s.formData,f=void 0===u?{}:u,p=s.setFormData,d=n.onClick,y=E(n,["onClick"]),b=f.defaultClasses,m=f.isFetching,v=f.errors,h=b.contClass,g=r.buttonClass,O=r.contClass,C=function(){p({isFetching:!1})};return o.a.createElement("div",{className:"col-12 grid input-cont ".concat(l&&h," ").concat(O)},o.a.createElement("input",_({className:"".concat(g," submit ").concat(m&&a)},y,{type:"submit",value:"".concat(m?i||"loading...":t),onClick:function(e){e.preventDefault(),m||(c(),v&&0===Object.values(v).join("").length&&(p({isFetching:!0}),d({formData:f,finishRequest:C})))}})))}}]),t}();function N(e){return(N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function M(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function z(e){var t=e.props,n=e.context,r=t.id;return n.formData.fields[r]}V(q,"propTypes",{displayName:i.a.string.isRequired,events:i.a.object,classes:i.a.object,loadingClass:i.a.string,shouldUseDefaultClasses:i.a.bool}),V(q,"defaultProps",{events:{},classes:{buttonClass:"",contClass:""},loadingClass:"",shouldUseDefaultClasses:!0}),V(q,"contextTypes",{formData:i.a.object.isRequired,validateForm:i.a.func.isRequired,setFormData:i.a.func.isRequired});var $=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return B(M(M(n=function(e,t){return!t||"object"!==N(t)&&"function"!=typeof t?M(e):t}(this,(e=I(t)).call.apply(e,[this].concat(a))))),"drawSelectedValue",function(){var e=z({props:n.props,context:n.context}),t=e.placeholder,r=e.options,a=e.value,i=e.classes.displayValueClass,l=a?function(e,t,n){return e.filter(function(e){return e[t]===n})[0]}(r,"value",a).displayName:t;return o.a.createElement("div",{className:"col-12 field-value ".concat(i," select-value")},l)}),B(M(M(n)),"drawOptions",function(e){var t=e.optionClass,r=(n.props.id,n.context.fields,z({props:n.props,context:n.context})),a=r.options,i=r.value,l=r.placeholder,s=r.classes,c=o.a.createElement("div",{key:"default",role:"button",onClick:function(){n.updateSelect()},className:"".concat(t," option default")},l),u=a.map(function(e){var r=e.id,a=e.displayName,l=e.isDisabled,c=void 0!==l&&l,u=e.value;return o.a.createElement("div",{key:r,role:"button",onClick:function(){n.updateSelect(e)},className:"".concat(t," option ").concat(i===u&&s.selectedOptionClass," ").concat(c?"disabled-option":"")},a)});return[c].concat(A(u))}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(t,r["Component"]),function(e,t,n){t&&U(e.prototype,t),n&&U(e,n)}(t,[{key:"updateSelect",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{value:""}).value,t=z({props:this.props,context:this.context}),n=t.id,r=(t.options,t.events),o=this.context,a=o.setFieldValue,i=o.validateForm,l=o.formData,s=void 0===l?{}:l;a({field:t,event:{},value:e},function(){i(n)}),r&&r.onChange&&!s.errors[n].length&&r.onChange({formData:s,setFieldValue:a})}},{key:"render",value:function(){var e=this.context.formData,t=void 0===e?{}:e,n=t.fields,r=t.defaultClasses,a=t.errors,i=this.props.id;if(n&&n[i]){var l=n[i],s=l.label,c=l.classes,u=l.shouldUseDefaultClasses,f=c.contClass,p=c.labelClass,d=c.errorClass,y=c.optionsContClass,b=c.optionClass,m=r.contClass,v=r.errorClass,h=r.labelClass,g=a[i];return o.a.createElement("div",{className:"select-box ".concat(f," ").concat(u&&m," grid col-12 input-cont")},s?o.a.createElement("div",{className:"col-12 ".concat(p," ").concat(u&&h," label")},s):"",o.a.createElement("div",{className:"select"},this.drawSelectedValue(),o.a.createElement("div",{className:"grid options ".concat(y)},this.drawOptions({optionClass:b}))),g?o.a.createElement("div",{className:"col-12 error ".concat(d," ").concat(u&&v)},g):"")}return o.a.createElement("div",null)}},{key:"componentDidMount",value:function(){this.context.addField(this.props)}}]),t}();function H(e){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function W(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function Y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function J(e,t){return(J=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function K(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}B($,"defaultProps",{value:"",label:"",events:{},validate:"",placeholder:"Select",shouldValidateField:!0,shouldUseDefaultClasses:!0,classes:{contClass:"",labelClass:"",fieldClass:"",errorClass:"",optionClass:"",selectedOptionClass:""}}),B($,"propTypes",{id:i.a.string.isRequired,value:i.a.string,events:i.a.object,classes:i.a.object,label:i.a.string,validate:i.a.string,shouldValidateField:i.a.bool,shouldUseDefaultClasses:i.a.bool,placeholder:i.a.string,displayName:i.a.string.isRequired,options:i.a.array.isRequired}),B($,"contextTypes",{addField:i.a.func.isRequired,setFieldValue:i.a.func.isRequired,validateForm:i.a.func.isRequired,formData:i.a.object.isRequired});var X=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return Q(K(K(n=function(e,t){return!t||"object"!==H(t)&&"function"!=typeof t?K(e):t}(this,(e=G(t)).call.apply(e,[this].concat(o))))),"getChecboxNewValue",function(e){var t=e.event,n=e.field,r=e.isChecked,o=n.value||[],a=t.currentTarget.value;return!0===r?W(o).concat([a]):function(){var e=W(o),t=e.indexOf(a);return e.splice(t,1),e}()}),Q(K(K(n)),"handleInputChange",function(e){var t=e.event,r=n.props.id,o=n.context,a=o.formData,i=a.fields,l=(a.errors,o.setFieldValue),s=o.validateForm,c=i[r],u=(c.options,c.events,c.type),f=t.currentTarget.value,p=t.currentTarget.checked,d="checkbox"===u?n.getChecboxNewValue({event:t,field:c,isChecked:p}):f;l({event:t,field:c,value:d},function(){if(s(r),c.events.onChange&&"function"==typeof c.events.onChange){var e=n.context.formData;c.events.onChange({formData:e,setFieldValue:l})}})}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&J(e,t)}(t,r["Component"]),function(e,t,n){t&&Y(e.prototype,t),n&&Y(e,n)}(t,[{key:"drawOptions",value:function(e){var t=this,n=(e.optionClass,e.optionContClass,e.optionLabelClass,this.props),r=n.options,a=n.id,i=n.type,l=this.context.formData.fields[a];return r.map(function(e){var n=e.id,r=e.value,s=e.displayName;return o.a.createElement("div",{key:n},o.a.createElement("input",{id:n,value:r,name:a,type:i,defaultChecked:-1!==l.value.indexOf(r),onChange:function(e){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){Q(e,t,n[t])})}return e}({},e);e.persist(),t.handleInputChange({event:n})}}),o.a.createElement("label",{htmlFor:n},s))})}},{key:"render",value:function(){var e=this.props,t=e.id,n=e.label,r=e.classes,a=e.shouldUseDefaultClasses,i=r.contClass,l=r.labelClass,s=r.errorClass,c=r.optionClass,u=r.optionContClass,f=r.optionLabelClass,p=this.context.formData,d=void 0===p?{}:p,y=d.defaultClasses,b=d.errors,m=y.contClass,v=y.errorClass,h=y.labelClass,g=b[t];return o.a.createElement("div",{className:"input-cont ".concat(a&&m," ").concat(i)},n?o.a.createElement("div",{className:"col-12 ".concat(l," ").concat(a&&h," label")},n):"",d.fields&&d.fields[t]?this.drawOptions({optionClass:c,optionContClass:u,optionLabelClass:f}):"",g?o.a.createElement("div",{className:"col-12 error ".concat(s," ").concat(a&&v)},g):"")}},{key:"componentDidMount",value:function(){this.context.addField(this.props)}}]),t}();Q(X,"defaultProps",{value:[],label:"",events:{},validate:"",shouldValidateField:!0,shouldUseDefaultClasses:!0,classes:{contClass:"",labelClass:"",fieldClass:"",errorClass:"",optionClass:"",selectedOptionClass:""}}),Q(X,"propTypes",{id:i.a.string.isRequired,events:i.a.object,classes:i.a.object,label:i.a.string,validate:i.a.string,shouldValidateField:i.a.bool,shouldUseDefaultClasses:i.a.bool,displayName:i.a.string.isRequired,options:i.a.array.isRequired,type:i.a.oneOf(["checkbox","radio"]).isRequired,value:i.a.oneOfType([i.a.array,i.a.string]).isRequired}),Q(X,"contextTypes",{addField:i.a.func.isRequired,setFieldValue:i.a.func.isRequired,validateForm:i.a.func.isRequired,formData:i.a.object.isRequired}),n.d(t,"Input",function(){return F}),n.d(t,"Select",function(){return $}),n.d(t,"Submit",function(){return q}),n.d(t,"Option",function(){return X});var Z=h;t.default=Z}])});