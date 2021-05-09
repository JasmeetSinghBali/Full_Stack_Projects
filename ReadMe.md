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
    - [ ] emoji selector in comments. https://allegra9.medium.com/add-emoji-picker-to-your-react-chat-app-30d8cbe8d9a6,youtube.com/watch?v=4-e-EVsFo4A,https://codepen.io/g6khan/pen/rqwWVJ
    - [ ] automatic title fill with location corresponding to latitude and longitude Coordinates. https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocode-to-city-api?gclid=EAIaIQobChMIpKy4qKy68AIVlQ4rCh3Zrw7jEAAYASAAEgIFk_D_BwE
    - [ ] introduce image uploading , validating image, preview feature.https://www.youtube.com/watch?v=XlAs-Lid-TA, https://www.youtube.com/watch?v=tYGTjxhzrqY
    - [ ] set up proper validation for inputs to avoid dummy data,foul language data.https://www.youtube.com/watch?v=LIkIM5u1mCk
    - [ ] sliding form
    - [ ] Style Everything Properly the tags and boxes


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
