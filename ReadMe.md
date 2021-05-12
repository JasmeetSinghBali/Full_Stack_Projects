# Full Stack Projects Collection

****Status: Completed With Travel Bucket-List App Version - 1 Not Deployed Yet!****

***

> ### Project-1 : Travel Bucket-list App ‍🧳 ✈️ 🪂 🧗‍♀️ 🎎 🥂

> #### Version-1 First Look
‍💜🚀------‍💜‍----->🚀

<img src="./project_images/ui_first_look_v1_travelBucketList.png">


> #### Features
- GET,POST Entries in the travel bucket list via backend(api).
- Create New Travel Entry via double click on map via Front-end UI Form on the custom map from mapbox.
***

> #### Tech Stack

- [x] Node.js
- [x] Express
- [x] MongoDB
- [x] React & React Hooks
- [x] Mapbox

> #### Core dependancies

- [x] express
- [x] cors( Integrate frontend-backend)
- [x] morgan( logger that logs all the incoming requests Debugging purposes)
- [x] helmet (to configure what headers will be sent back as response by our server Security purposes)
- [x] mongoose( object modelling tool for MongoDB)
- [x] body-parser (middleware to parse the request body)
- [x] react-map-gl (to use mapbox maps via accesstoken in react)
- [x] react-hook-form https://react-hook-form.com/

> #### Dev dependancies

- [x] eslint ( identifying and reporting on patterns found in ECMAScript/JavaScript code.) https://www.npmjs.com/package/eslint
- [x] nodemon (restart the server after we make changes)


> #### Blueprint

- [x] Setup server
  -  install dependancies
  -  install /setup linter
  -  setup Express App
  -  setup not found and error middlewares
- [x] model DB
  - what data to store
- [x] setup mongoose
- [x] POST /journey/logs
  -  create a new log entry
- [x] GET /journey/logs
  -  list all log entry
- [x] Setup client
- [x] list all log entries on map
- [x] Setup Double click on any location on map to pop up marker with different color(so that when we actually submit that form that marker changes to normal color) and a form with it in UI for User to just add that log entry instead of specifying latitude & longitude manually via API.
- [x] create form to add a new entry
- [x] setup map sdk
- [ ] Deploy


> ### For Future Versions
> #### Not Implemented Yet , For Version 2 & Extra's that can be added
refer-https://react-hook-form.com/
react-hook form + material ui- https://www.youtube.com/watch?v=PquWexbGcVc


- [ ] UI Improvements
    - [x] set dropdown with stars for rating refer react-hook-form docs.
    - [x] red alert div message set up if error occurs while new log entry in the DB.
    - [ ] automatic title fill(make it readonly prop) with location corresponding to latitude and longitude Coordinates.https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocode-to-city-api
    - [ ] style the form with bootstrap
    - [ ] flash messages for the UI/UX Logging in ,Signing Up,Log entry created success or error occured. refer books api
    - [ ] introduce image uploading , validating image, preview feature.https://www.youtube.com/watch?v=XlAs-Lid-TA, https://www.youtube.com/watch?v=tYGTjxhzrqY
    - [ ] set up proper validation with JOI for inputs and all routes edit,delete,signup,login to avoid dummy data,foul language data.https://www.youtube.com/watch?v=LIkIM5u1mCk




***
- [ ] Backend Improvements
   - [ ] Add New User Signup/Login and Email verification.(via backend)
   - [ ] Protect the map displaying routes only show it to the logged in user and only allow the user to make a marker if he/sheverifies email.
   - [ ] save the morgan generated logs in database or local storage to know who visited kinda security/debugging.
 refer https://www.npmjs.com/package/morgan dual logging in apache format and uuid to each request section.
***

> #### Refactoring  Options

- [ ] mongoose geojson https://mongoosejs.com/docs/geojson.html
& can also refer timestamp 121 geomaps area.

> #### Issue
- [ ] Getting Default lat long cordinates details via reverse geocoding even after providing the cordinates of the double click location by the user.
- [ ] when user types long string without spaces in textbox the textbox overflows when we view it in pop up.
https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
- [ ] Need to address the situation where user type space, tabs etc in the textbox https://stackoverflow.com/questions/1172206/how-to-check-if-a-text-is-all-white-space-characters-in-client-side/1173854
