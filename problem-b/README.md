# Problem B

In this exercise you will practice developing a React application, converting an existing "static" website into a dynamic one. You will practice with components, props, state, and events.

Specifically, you will be implementing a dynamic website supporting pet adoption (like at an animal shelter). You can see what the website will look like by opening up the **`pets-mockup/index.html`** file in a browser: you will produce a dynamic, interactive version of this site in React.

## Running the Program
Because this app is created with React (and scaffolded through Create React App), you will need to install dependencies and run a developer web server in order to transpile and view the application. You can run this server by using the command:

```bash
# from inside the `problem-a/` folder
cd path/to/problem-b

# install dependencies
npm install  # only once per problem

# run the server
npm start
```

You can then view the rendered page _in a web browser_. Remember to check the Developer console for any errors!


## Exercise Instructions
To complete the exercise, edit the included **`src/App.js`** file and add in the required code. Note that you should ___not___ need to edit any of the other provided files (including `index.js` or `index.html`).

**Background**: The first step to creating a React app is determining what components your page will need. One good way to do this is to start with a _static_ (e.g., pure HTML/CSS) version of the page and try and break it up into different "sections". These will often correspond to semantic sectioning or `<div>` elements. 

- Think about what "boxes" you would break the page up into!

You can then convert each of these parts into a React Component, as detailed below:


1. First, implement a component **`App`** that will represent the "overall" application. This component will be responsible for representing the _outline_ of the page: think everything inside the `<body>` (but other major sections will be defined by other components)

    Give the `App` component a `render()` function that will output the main "page structure" found in the `pets-mockup/index.html` file (you can and should copy-and-paste from that html file into JSX!). This should include the `<header>`, `<main>`, and `<footer>` sections, but leave out the individual `<nav>` elements and the _contents_ of the `.col-*` grid columns&mdash;those will be defined by separate components.

    - Remember to change the `class` attributes into `className` attributes.

2. You should now be able to see the header and footer of the page. While the Bootstrap framework is imported in the `public/index.html` file from a CDN, the custom CSS file will also need to be included in your app. Luckily, Create React App's webpack configuration supports the ability to `import` CSS files directly into the app.

    Copy the `style.css` file into the app's `src/` folder, and then `import` the file. You will need to include the full filename (with `.css` extension). This import will not be assigned a name (since it isn't a variable you want to reference later).

    This should cause the header to become the correct shade of blue.

3. The next component of your app you should add is the "About" navigation links. Implement a component **`AboutNav`** that will `render()` the contents of that `<nav>` element (again, copy-and-paste from the `pets-mockup/index.html` file).

    Modify the `App` component's `render()` function so that it renders an instance of the `<AboutNav>` in the appropriate spot in the DOM structure.

4. The remainder of the application will be dynamically generated based on the pets currently available for adoption&mdash;for example the "Breeds" navigation will only include links to breeds that are currently in the shelter.

    The provided `index.js` file has imported a JSON file containing some sample pets, and passes this data to the `<App>` as a **`pets`** prop.

    (Normally you would want to load the data dynamically with from the `componentDidMount()` callback, but it is being passed in as a prop for testing).

5. Implement a **`BreedsNav`** component that will represent the "Breeds" navigation links. This component should accept a **`breeds`** prop that is an _array of strings_, and then render a link for each element in the array.

    - You can copy the `<nav>` element, heading, and structure from the mockup `index.html`.
    - Use the `.map()` function to map the `breeds` prop to an array of `<li>` elements, each showing the name of the breed (they can link to `""`). Remember to give each `<li>` element a `key` attribute.

    Modify the `App` component so that it renders the `<BreedNav>` element in the correct place in the DOM hierarchy. You will need to pass it an array of breeds as a prop.

    - In order to easily extract the list of breeds from the `this.props.pets` array, you can use the Lodash [`.groupBy()`](https://lodash.com/docs/4.17.4#groupBy) function. You will need to `import` the Lodash library (it has been downloaded as a dependency).

6. The next step is to fill in the cards representing the different pets to adopt. Because you want to repeat the same "card" structure multiple times, it makes sense to make a Component class that can be instantiated multiple times. Implement a **`PetCard`** component that will represent a single pet (which should be passed in as a _prop_, whose value is an Object like those in the `dogs.json` array).

    - You can copy-and-paste the HTML for a card from the mockup `index.html` file. Each card in the example has the same structure, just different content values.

    - Be sure and give the `<img>` an `alt` attribute that is the pet's name!

    - **Note** You will need to copy the `img/` directory from the `pets-mockup` into your app's `public/` folder in order to make the images referenced available to display.

7. In order to organize the cards into a single group, you should implement a new component **`PetList`** (this helps keep your program organized, so you can reuse the card grid elsewhere if desired). This component should take as a prop an _array_ of pet objects (similar to the `dogs.json` array), `.map()` that array to an array of `PetCard` components, and then render those elements. 

    - You will need to pass in a pet object as prop to each `PetCard` as you instantiate it.

    - Again, copy-and-paste the "heading" for the card list from the mockup `index.html` file.

    Modify the `App` component so that it renders the `PetList` at the appropriate place in the DOM hierarchy.

8. The last part of the exercise is to make the page _interactive_. In particular, you will add the ability to click on a pet card to mark it as "adopted"&mdash;this will change the data stored in the model (the array of objects), and cause the page to "re-render" the associated card to also display `(Adopted)` after the pet's name.

    Because this data will now need to change over the life of the application, it should be stored in the [**state**](https://reactjs.org/docs/state-and-lifecycle.html) of the `App` Component, instead of left as a prop. Add a **constructor** to the `App` component which will assign the `pets` prop to a **`pets`** property in the `this.state` object. You will also need to modify the `render()` function to refers to property in the state (rather than in the props).

9. Add a new method **`adopt()`** to the `App` component that takes in _name_ of a pet, and modifies the Object representing that pet in the `pets` state variable so that the pet's `adopted` property becomes true.

    - In order to modify a complex object in the state, first assign `this.state.pets` to a local variable (e.g., `currentPets`). Then locate the correct pet Object inside that array (the lodash [`.find()`](https://lodash.com/docs/4.17.4#find) function can help), and assign a new value to that object's `adopted` property. Then call the **`setState()`** function and assign the now-modified local variable to the `pets` key!

    Also modify the `PetCard` component so that _if_ the pet has been adopted, the text `(Adopted)` is shown next to the pet's name. You can include this by creating a local variable for the `displayedName` (and using an if/else to set that), or by using an inline [ternary operator](https://reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator).

    (You can test this modification by _temporarily_ adding a `<button>` to the `App` that will call the method with a hard-coded pet name when clicked, or proceed to the next step to complete the app).

10. The last step is to give each `PetCard` an `onClick` event handler which will (eventually) call the `adopt()` method you created in `App` as a callback. But in order for the `PetCard` to have access to this callback function, it will need to be given a reference to it as a _prop_.

    Modify the `PetCard` class so that takes in an **`adoptCallback`** prop. When the Component is clicked, it should execute this callback passing it the name of the pet (which was also given it as a prop)

    - Because you will need access to the `this` to refer to `this.props`, pass the `onClick` handler an _arrow function_ that will call the `this.props.adoptCallback()` function. See [here](https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers) for an example.

    Since the `PetCard` component now needs an `adoptCallback` prop, that will need to be provided by the `PetList` component. But since that too will need to know what function to pass to the `<PetCard>`, you will **also** need to modify the `PetList` component so it takes an **`adoptCallback`** prop (which will then be passed down to the `PetCard`).

    Finally, you can have the `App` component pass in its `adopt` method to the `<PetList>` (which will then pass it down to to the `<PetCard>`). But again, since the `adopt()` function will need access to the `this` (referring to the `App`), you should instead pass in an _arrow function_ that takes in a `petName` as a parameter and calls the `this.adopt()` method, passing in that name.

With all this in place, you should be able to click on a `PetCard` to mark that pet as adopted (at least locally until the page reloads)!


## Testing
This exercise includes a test suite to verify that modified DOM is correct and responds to events as expected. Note that this test is simply to help you verify your results; it will not ensure that your code follows the required syntactical approach or Component structure.

You can run the test suite using

```bash
# make sure you're in the root `exercise07` repo
cd path/to/exercise07

jest problemB
```

**Important** You will need to be in the repository's root folder for the tests to run!