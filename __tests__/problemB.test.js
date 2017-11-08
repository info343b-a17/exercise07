import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//solution classes
import App from  '../problem-b/src/App';

//problem config
const JS_FILE_PATH_ROOT = 'problem-b/src/';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//test data
const TEST_PETS = [
  {"name":"Pet A", "sex":"Male", "breed":"Breed A", "img":"imgA"},
  {"name":"Pet B", "sex":"Male", "breed":"Breed B", "img":"imgB"},
  {"name":"Pet C", "sex":"Male", "breed":"Breed A", "img":"imgC"},
];

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

describe('The pet adoption app', () => { 
  let wrapper; //the "rendered" app

  it('renders without crashing', () => {
    wrapper = mount(<App pets={TEST_PETS} />); //mount for further tests
  });

  it('renders the App page structure', () => {
    let mini = shallow(<App />); //shallow render; only this component (exclusive tests)

    //header
    expect(mini.find('.jumbotron.jumbotron-fluid').length).toBe(1);
    expect(mini.find('h1').text()).toEqual("Adopt a Pet");

    //main (includes columns)
    expect(mini.find('.col-3').length).toBe(1);
    expect(mini.find('.col-9').length).toBe(1);

    //footer
    expect(mini.find('footer').text()).toEqual("Images from Seattle Humane Society");

    //doesn't include sub-components
    expect(mini.find('nav').length).toBe(0);
    expect(mini.find('h2').length).toBe(0);
    expect(mini.find('.card').length).toBe(0);
  });

  // it('imports the custom css file', () => {
  //   //not sure how to test
  // });

  it('renders the AboutNav component', () => {
    expect(wrapper.find('AboutLinks').length).toBe(1);
    expect(wrapper.find('#aboutLinks > h2').text()).toEqual("About");
    expect(wrapper.find('#aboutLinks a').length).toBe(5); //includes all the links
  });

  it('renders the BreedLinks component', () => {
    expect(wrapper.find('BreedLinks').length).toBe(1);
    expect(wrapper.find('#breedLinks > h2').text()).toEqual("Breeds");
    expect(wrapper.find('#breedLinks a').length).toBeGreaterThan(0); //includes links (some)
  })

  it('renders BreedLinks with correct props', () => {
    expect(wrapper.find('BreedLinks').props()).toMatchObject({ breeds: [ 'Breed A', 'Breed B' ] })
    expect(wrapper.find('#breedLinks a').length).toBe(2); //actually count
    expect(wrapper.find('#breedLinks a').at(0).text()).toEqual('Breed A'); //check entries
    expect(wrapper.find('#breedLinks a').at(1).text()).toEqual('Breed B'); //check entries
  })

  it('renders the PetCard components', () => {
    expect(wrapper.find('PetCard').length).toBe(3); //has 3 cards

    let card = wrapper.find('PetCard').at(0).render(); //static render of first card
    let pet = TEST_PETS[0]; //which pet
    let img = card.find('img');
    expect(img.attr('src')).toEqual(pet.img);
    expect(img.attr('alt')).toEqual(pet.name);
    let title = card.find('.card-title');
    expect(title.text().trim()).toEqual(pet.name)
    let text = card.find('.card-text');
    expect(text.text().trim()).toEqual(`${pet.sex}/${pet.breed}`);
  })

  it('renders the PetList component', () => {
    let petList = wrapper.find('PetList');
    expect(petList.length).toBe(1);
    expect(petList.render().find('h2').text()).toEqual('Dogs for Adoption'); //check heading
    expect(Object.values( petList.props() )).toContainEqual(TEST_PETS); //has the prop (regardless of key name)
  })

  it('App tracks `pets` in the state', () => {
    expect(wrapper.state('pets')).toMatchObject(TEST_PETS); //should be there!
  })

  it('has an `App#adopt()` callback', () => {
    let instance = wrapper.instance();
    expect(instance.adopt).toBeDefined(); //has function
    instance.adopt('Pet A'); //call method!
    expect(wrapper.state('pets')[0].adopted).toBe(true); //should now be adopted!
  })

  it('cards respond to click events', () => {
    //spy on function!
    let instance = wrapper.instance();
    let spy = jest.spyOn(instance, 'adopt');
    instance.forceUpdate(); //refresh to actually attach the spy function

    let pet = TEST_PETS[1];
    let card = wrapper.find('PetCard').at(1); //card[1]
    card.simulate('click'); //click the card!

    expect(spy).toHaveBeenCalledWith(pet.name); //should have executed callback

    expect(wrapper.state('pets')[1].adopted).toBe(true); //is now adopted (in state)
  })

  it('cards show whether adopted', () => {
    let card1 = wrapper.find('PetCard').at(1).render(); //who is adopted
    expect(card1.find('.card-title').text().trim()).toEqual(TEST_PETS[1].name+' (Adopted)');

    let card2 = wrapper.find('PetCard').at(2).render(); //who is NOT adopted
    expect(card2.find('.card-title').text().trim()).toEqual(TEST_PETS[2].name);
  })
})
