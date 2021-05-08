# Full Stack Projects Collection
timestamp - 332 pop up form for log entry
***

> ### Project-1 : Travel Bucket-list App

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
- [ ] Setup Double click on any location on map to pop up marker with different color(so that we know it was not added via api) and a form with it in UI for User to just add that log entry instead of specifying latitude & longitude manually via API.
- [ ] create form to add a new entry
- [ ] setup map sdk

> #### Extra's

- [ ] save the morgan generated logs in database or local storage.
 refer https://www.npmjs.com/package/morgan dual logging in apache format and uuid to each request section.


> #### Tech Stack

- [x] Node.js
- [x] Express
- [x] MongoDB
- [x] React & React Hooks
- [x] Mapbox

> #### Core dependancies

- [x] express
- [x] cors( Integrate frontend -backend)
- [x] morgan( logger that logs all the incoming requests Debugging purposes)
- [x] helmet (to configure what headers will be sent back as response by our server Security purposes)
- [x] mongoose( object modelling tool for MongoDB)
- [x] body-parser (middleware to parse the request body)
- [x] react-map-gl (to use mapbox maps via accesstoken in react)

> #### Dev dependancies

- [x] eslint ( identifying and reporting on patterns found in ECMAScript/JavaScript code.) https://www.npmjs.com/package/eslint
- [x] nodemon (restart the server after we make changes)

> #### Refactoring  Options if You want!

- [ ] mongoose geojson https://mongoosejs.com/docs/geojson.html
& can also refer timestamp 121 geomaps area.
