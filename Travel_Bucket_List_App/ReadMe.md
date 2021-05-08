# Some Basic Steps/Tutorial to setup backend

> ### Some fun & Important facts/bugs/error I found While Developing
>> - [x] object id in mongo has timestamp in it. ObjectId.getTimestamp refer https://docs.mongodb.com/manual/reference/method/ObjectId.getTimestamp/

>> - [x] mongoose timestamps schema options will automatically add created_at & updated_at fields for every document so that if someone make a update to the document the updatedAt will automatically updated to the date and time the update to that document was made in future. refer timestamps section refer https://mongoosejs.com/docs/guide.html#definition

>> - [x] mongoose do not by default apply validators on the update() queries hence need to specify runValidator:true option while passing such update() queries in mongoose.

>> - [x] mongoose can interpret ISO string so you can pass date as var date=new Date() and then date.toISOString() // "yyyy-mm-ddThh-mm-ss.Z".

>> - [x] npx vs npm , npx allows to execute something without installing it globally.

>> - [x] Different options for Maps Mapbox with npm react-map-gl refer https://visgl.github.io/react-map-gl/docs/get-started/get-started,deck.gl etc.

>> - [x] U can design your own custom style map go to dashboard in mapbox and design in mapbox studio and then copy that style url and pass it to React-gl component as prop mapStyle="url", For map styling go to https://visgl.github.io/react-map-gl/docs/get-started/get-started ->API reference->Interactive Map->cntrl+f style

>> - [x] IMPORTANT When fetching data from backend and using useEffect it cannot use the async await approach as useEffect do this to avoid race condition i.e in simple terms useEffect expects that its callback is returning a function not promise, so an alternative is to Define a IIFE immediately invoked  function expression inside the useEffect body refer App.js useEffect Section in src client side.

>> - [x] Icons for your project https://feathericons.com/

>> - [x] API reference->popup at https://visgl.github.io/react-map-gl/docs/api-reference/popup for pop up message u will also find marker related react code in the same docs
***
>> - [x] To avoid the path.split is not a function in react error while using react-hook-form note react-hook-form updated to 7.0.0 from 6.X.X and has breaking changes:
You have to replace all ref={register} with {...register('value_name')}

> ## eslint setup

- add a lint script in the package.json and point to the src folder or where your express server is located.

- setup the eslint by redirecting to your server folder and npx eslint --init

- √ How would you like to use ESLint? · style
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · node
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1
√ Would you like to install them now with npm? · No / Yes - yes

> ## Database Schema Blueprint
Travel Entry

- title -text
- description - text
- comments - text
- rating - scale of 1-5
- image - text -url
- latitude - number
- longitude - number
- createdAt - datetime
- updatedAt - datetime
