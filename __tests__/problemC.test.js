import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//solution classes
//import {} from  '../problem-c/src/App';

//problem config
const JS_FILE_PATH_ROOT = 'problem-c/src/';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['index.js','App.js'].map((src) => JS_FILE_PATH_ROOT+src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

test('Assignment is implemented', () => {
  throw new Error('Assignment not implemented');
})