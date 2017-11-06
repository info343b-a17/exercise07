import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//solution classes
import {App, SenatorTable, TableHeader, Senator} from  '../problem-a/src/App';

//problem config
const JS_FILE_PATH_ROOT = 'problem-a/src/';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//test data
const TEST_SENATORS = [
  {name: 'Test Sen 1', state: 'AB',  party: 'Dem', phone: '123-456-789', twitter: '@test1'},
  {name: 'Test Sen 2', state: 'CD', party: 'Rep', phone: '234-567-980', twitter: '@test2'},
  {name: 'Test Sen 3', state: 'EF', party: 'Ind', phone: '555-555-5555', twitter: '@test3'}
];
const TEST_HEADINGS = ['Col A','Col B','Col C'];

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


describe('The Senator listing app', () => { 
  it('renders without crashing', () => {
    shallow(<App />); //quick test
  });

  describe('implements an `App` component', () => {
    let wrapper; //the "rendered" app

    beforeAll(() => {
      wrapper = render(<App senators={[]} />);
    })

    it('has the `container` CSS class', () => {
      expect(wrapper.hasClass('container')).toBe(true);
    })

    it('contains a heading', () => {
      let heading = wrapper.find('h1');
      expect(heading.text()).toBe('US Senators 2017');
    })

    it('renders a SenatorTable', () => {
      expect(wrapper.find('table').length).toBe(1); //ugh
    });
  })

  describe('implements a `SenatorTable` component', () => {
    let wrapper; //the "rendered" app
    let render; //full html render
    
    beforeAll(() => {
      wrapper = shallow(<SenatorTable senators={TEST_SENATORS}/>);
      render = wrapper.render();
    })

    it('renders a table', () => {
      expect(wrapper.find('table').length).toBe(1);
    })

    it('renders a TableHeader', () => {
      expect(render.find('thead').length).toBe(1); //ugh
    });

    it('renders rows for Senators', () => {
      expect(render.find('thead').length).toBe(1); //ugh
      expect(render.find('table > tr, tbody > tr').length).toBe(TEST_SENATORS.length); //includes Senators rows      
    });
  })

  describe('implements a `TableHeader` component', () => {
    let wrapper; //the "rendered" app
    
    beforeAll(() => {
      wrapper = shallow(<TableHeader cols={TEST_HEADINGS} />);
    })

    it('renders a table header element', () => {
      expect(wrapper.find('thead').length).toBe(1);
      expect(wrapper.find('thead > tr').length).toBe(1);
      expect(wrapper.find('tr > th').length).toBeGreaterThan(1);
    })

    it('renders header cells based on the props', () => {
      let headings = wrapper.find('th');
      for(let i=0; i<TEST_HEADINGS.length; i++){
        expect(headings.at(i).text()).toEqual(TEST_HEADINGS[i])        
      }
    })
  })


  describe('implements a `Senator` component', () => {
    let wrapper; //the "rendered" app
    
    beforeAll(() => {
      wrapper = shallow(<Senator senator={TEST_SENATORS[0]} />);
    })

    it('renders a table row', () => {
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find('tr > td').length).toBeGreaterThan(1);
    })

    it('renders the correct cells based on the props', () => {
      let cells = wrapper.find('td');

      expect(cells.at(0).text()).toEqual('Test Sen 1');
      expect(cells.at(1).text()).toEqual('D - AB');
      let phoneLink = 
      expect(cells.at(2).find('a').html()).toEqual('<a href="tel:123-456-789">123-456-789</a>'); //just hard-code it for now
      expect(cells.at(3).find('a').html()).toEqual('<a href="https://twitter.com/test1">@test1</a>');
    })
  })

  //these tests are not very robust; could improve
  describe('renders the correct component hierarchy', () => {
    let wrapper; //the "rendered" app
    
    beforeAll(() => {
      wrapper = render(<App senators={TEST_SENATORS} />);
    })

    it('passes in the correct props', () => {
      let rows = wrapper.find('table > tr, tbody > tr');

      for(let i=0; i<TEST_SENATORS.length; i++){
        //check that each name is correct
        expect(rows.eq(i).find('td').first().text()).toEqual(TEST_SENATORS[i].name);       
      }
    });
  })    
})
