> ## Blockchain cryptocurrency exchange App

> ### Some Facts/basicSetup/bugs/solution I came across while development
- [x] truffle-config.js main entry point for the application
   - [x] Specify connection to blockchain
   - [x] Developement network that is connected to ganache
   - [x] specify which compiler we will use to compile the Smart Contracts
   - [x] and tells where the smart contract live inside our Project
- [x] migrations.sol in contracts dir
   - [x] migration config file that handles deploying Smart Contracts to the blockchain no need to edit or change it.
- [x] migrations directory
   - [x] migrations to put the smart contract on the blockchain that we edit a/c to requirement.
- [x] Components directory
   - [x] All the application code for the client side resides(React)
- [x] Migrations
  - [x] are used to change the state of the blockchain and migrating Smart contract to the blockchain.
  - [x] each migrations have artifacts these artifacts are basically javascript version of the smart contract.
- [x] Ethereum allows to create our own cryptocurrency without creating blockchain i.e we can write a SC to govern our own cryptocurrency via ERC 20 token. https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
- [x] Sources for cryptocurrency https://coinmarketcap.com/ , https://etherscan.io/
- [x] the blockchain and solidity their are two type of variables state variables(defined as public) which are technically stored on the blockchain and gives us a automatic caller function to access them and local variable _ starting with underscore that does not get stored on the blockchain.
- [x] constructor is automatically called when we migrate contract.
- [x] require() in solidity makes sure that the function keeps on executing if and only if the value inside require is evaluated to true otherwise stop the execution of the current function.
- [x] note that approve() has to be called upon token before executing the sellToken function a/c  to ERC-20 Token Standards.
- [x] Invalid opcode go to truffle-config.js and add evmVersion:"petersburg"
- [x] make sure to truffle migrate --reset before proceeding with the frontend part of the application.
***
- [x] to make use componentWillMount and other class based methods react hooks provide a way to do this via ComponentOne()
refer https://www.geeksforgeeks.org/how-to-use-componentwillmount-in-react-hooks/#:~:text=in%20a%20hook%20based%20component,in%20the%20official%20React%20Docs.
- [x] Note the state is only managed for a single component it  cannot presist between different component on its own we have to pass down the state of one component like <Nav account={this.state.account}/> and in Nav component we can use this.props.account to access the state of App.js inside Nav.js.

> ### NOTE'S FROM DEVELOPER END's Here
***


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
