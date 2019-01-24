let Base = {
  extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true
    }
  },
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  settings: {
    'import/resolver': 'webpack',
    react: {
      pragma: 'React',
      version: '15.6.1'
    }
  }
};

const baseRules = {
  /////////////////////
  // Possible Errors //
  /////////////////////
  'no-cond-assign': 2,
  'no-constant-condition': 2,
  'no-dupe-args': 2,
  'no-dupe-keys': 2,
  'no-duplicate-case': 2,
  'no-empty': 2,
  'no-ex-assign': 2,
  'no-extra-boolean-cast': 2,
  'no-extra-semi': 2,
  'no-func-assign': 2,
  'no-inner-declarations': 2,
  'no-invalid-regexp': 2,
  'no-irregular-whitespace': [
    2,
    {
      skipComments: true,
      skipTemplates: true
    }
  ],
  'no-obj-calls': 2,
  'no-sparse-arrays': 2,
  'no-unreachable': 2,
  'use-isnan': 2,
  'valid-typeof': 2,
  ////////////////////
  // Best Practices //
  ////////////////////
  'accessor-pairs': 1,
  'array-callback-return': 2,
  'block-scoped-var': 2,
  complexity: [1, 7],
  curly: 2,
  'default-case': [2, { commentPattern: '^skip\\sdefault' }],
  'dot-location': [2, 'property'],
  'dot-notation': 2,
  eqeqeq: [2, 'allow-null'],
  'no-case-declarations': 0,
  'no-empty-function': 2,
  'no-extra-bind': 2,
  'no-fallthrough': 2,
  'no-floating-decimal': 2,
  'no-native-reassign': 2,
  'no-implied-eval': 2,
  'no-loop-func': 2,
  'no-magic-numbers': [
    2,
    {
      ignore: [0, 1, -1, 2, 3],
      ignoreArrayIndexes: true,
      enforceConst: false
    }
  ],
  'no-multi-spaces': [
    2,
    {
      exceptions: {
        VariableDeclarator: true,
        ImportDeclaration: true
      }
    }
  ],
  'no-new-wrappers': 2,
  'no-new': 2,
  'no-param-reassign': [2, { props: false }],
  'no-proto': 2,
  'no-redeclare': 2,
  'no-return-assign': 2,
  'no-script-url': 2,
  'no-self-assign': 2,
  'no-self-compare': 2,
  'no-unmodified-loop-condition': 2,
  'no-useless-concat': 2,
  'no-warning-comments': 1,
  'vars-on-top': 2,
  'wrap-iife': 2,
  yoda: [
    2,
    'never',
    {
      exceptRange: true
    }
  ],
  strict: [2, 'global'],
  'no-undef-init': 2,
  'no-shadow': 2,
  'no-undef': 2,
  'no-unused-vars': [2, { varsIgnorePattern: '[iI]gnored' }],
  'no-use-before-define': 2,
  'array-bracket-spacing': [2, 'never'],
  'global-require': 2,
  'handle-callback-err': 2,
  'no-mixed-requires': 2,
  'no-new-require': 2,
  camelcase: 2,
  'block-spacing': 2,
  'brace-style': 2,
  // "comma-dangle": [2, "never"],
  'comma-dangle': 0,
  'comma-spacing': [
    2,
    {
      before: false,
      after: true
    }
  ],
  'comma-style': 2,
  'consistent-this': [2, 'ref'],
  'eol-last': 2,
  'no-spaced-func': 2,
  indent: [2, 2],
  'func-style': [2, 'declaration', { allowArrowFunctions: true }],
  'id-blacklist': [2, 'err', 'e', 'cb'],
  'id-length': [2, { min: 2, max: 30 }],
  'jsx-quotes': [2, 'prefer-single'],
  'key-spacing': [
    2,
    {
      multiLine: {
        beforeColon: true,
        afterColon: true,
        align: 'colon',
        mode: 'minimum'
      },
      singleLine: {
        beforeColon: true,
        afterColon: true,
        mode: 'minimum'
      }
    }
  ],
  'keyword-spacing': [
    2,
    {
      before: true,
      after: true
    }
  ],
  'lines-around-comment': [
    2,
    {
      beforeBlockComment: true,
      afterLineComment: false,
      allowBlockStart: true
    }
  ],
  'max-depth': [2, 4],
  'max-lines': [
    2,
    {
      max: 300,
      skipBlankLines: true,
      skipComments: true
    }
  ],
  'max-nested-callbacks': [2, 4],
  'max-params': [2, 4],
  'max-statements-per-line': [2, { max: 1 }],
  'max-statements': [2, 20],
  'newline-after-var': [2, 'always'],
  'newline-before-return': 2,
  'newline-per-chained-call': [2, { ignoreChainWithDepth: 2 }],
  'no-array-constructor': 2,
  'no-inline-comments': 2,
  'no-lonely-if': 2,
  'no-mixed-operators': 2,
  'no-mixed-operators': [
    2,
    {
      allowSamePrecedence: true
    }
  ],
  'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
  'no-multiple-empty-lines': [
    2,
    {
      max: 2,
      maxEOF: 1
    }
  ],
  'no-nested-ternary': 0,
  'no-unneeded-ternary': 2,
  'no-whitespace-before-property': 2,
  'object-property-newline': 2,
  /*"object-curly-newline": [ 2,
    {
      "ObjectExpression": "always",
      "ObjectPattern": { "multiline": true}
      // "ObjectPattern": { "multiline": true, "minProperties": 2 }
    }
  ],*/
  'one-var-declaration-per-line': [2, 'initializations'],
  'one-var': [
    2,
    {
      var: 'always',
      let: 'always',
      const: 'never'
      /*"uninitialized": "always",
    initialized: "never"*/
    }
  ],
  'operator-assignment': [1, 'always'],
  'padded-blocks': [2, 'never'],
  quotes: [2, 'single', { allowTemplateLiterals: true }],
  semi: [2, 'never'], // http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding
  'space-infix-ops': 2,
  'spaced-comment': [2, 'always', { block: { exceptions: ['-', '+', '*'] } }],
  // "arrow-body-style": [2, "as-needed", { requireReturnForObjectLiteral: true }],
  'arrow-body-style': 0,
  'arrow-parens': [2, 'always'],
  'arrow-spacing': 2,
  'constructor-super': 2,
  'no-const-assign': 2,
  'no-duplicate-imports': 2,
  'no-useless-computed-key': 2,
  'no-useless-constructor': 2,
  'no-useless-rename': 2,
  'object-shorthand': 2,
  'prefer-const': 2,
  'prefer-arrow-callback': 2,
  'prefer-template': 2,
  'template-curly-spacing': 2,
  'no-confusing-arrow': [1, { allowParens: false }],
  'max-len': [2, 150],
  'no-restricted-syntax': [0, 'WithStatement'],
  'new-cap': 0,
  'guard-for-in': 0,
  'import/prefer-default-export': 0,
  'import/extensions': 0,

  ////////////////////
  //   React Rules  //
  ////////////////////
  'react/jsx-boolean-value': [2, 'always'],
  'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
  'react/jsx-curly-spacing': [2, 'never', { allowMultiline: false }],
  'react/jsx-max-props-per-line': [2, { maximum: 3 }],
  'react/jsx-no-literals': 2,
  'react/self-closing-comp': 2,
  'react/sort-comp': 2,
  'react/jsx-indent': [2, 2],
  'react/jsx-indent-props': [2, 2],
  'react/prop-types': [2, { ignore: ['children'] }],
  'react/sort-comp': 0,
  'import/prefer-default-export': 0,
  'react/prefer-stateless-function': 0,
  // 'react/jsx-curly-brace-presence': 0, 

  ////////////////////
  // jsx-a11y Rules //
  ////////////////////
  'jsx-a11y/interactive-supports-focus': 0,
  'jsx-a11y/no-noninteractive-element-interactions': 0
};

const PROD = {
  'no-console': 0,
  'no-debugger': 2,
  'no-alert': 0,
  'no-unused-vars': [2, { varsIgnorePattern: '[iI]gnored' }],
  'react/prop-types': 0
};

const DEV = {
  'no-console': 1,
  'no-debugger': 1,
  'no-alert': 1,
  'no-unused-vars': [1, { varsIgnorePattern: '[iI]gnored' }],
  'react/prop-types': 0
};

const environment =
  process.env.isProd == 'true'
    ? '--=--=--=-- Production --=--=--=--'
    : '--=--=--=-- Development --=--=--=--';

const rules =
  process.env.isProd == 'true'
    ? Object.assign({}, baseRules, PROD)
    : Object.assign({}, baseRules, DEV);

Base.rules = rules;

module.exports = Base;
