> ## Lappy-StoreFinder (PERN)


****V1.0.0 🎉🎉****



> ### Features

- [x] CRUD 
- [x] Reviews & Ratings


=====================================================================

> ### Developer Section

=====================================================================

> ### Tech Stack/Core dependencies

- [x] React
- [x] Node
- [x] Express
- [x] Postgres (SQL)



> ### Database Schema
- [x] lappy
  - [x] Table lappystores
    - [x] Id - BIGSERIAL NOT NULL PRIMARY KEY
    - [x] Name - VARCHAR(50) NOT NULL
    - [x] Location - VARCHAR(50) NOT NULL
    - [x] Contact - BIGINT
    - [x] Price Range - INT NOT NULL CHECK(price_range>=1 and price_range<=5)
  - [x] Review Table
    - [x] id - BIGSERIAL NOT NULL PRIMARY KEY
    - [x] shop_id BIGINT NOT NULL REFERENCES lappystores(id) on delete cascade (Foreign Key - Table lappystores(id) this way we can have 1-many relation i.e 1 shop can have 100's/1000's of reviews) 
    - [x] name - VARCHAR(50) NOT NULL
    - [x] review/comment - TEXT NOT NULL
    - [x] rating - INT NOT NULL CHECK(rating>=1 and rating<=5>)
  - [x] **IMPORTANT remember to add on delete cascade constraint**
    - refer https://stackoverflow.com/questions/14182079/delete-rows-with-foreign-key-in-postgresql#:~:text=To%20automate%20this%2C%20you%20could,be%20automatically%20deleted%20as%20well.

> ### Blueprint

****refer for examples https://www.justdial.com/Delhi/Laptop-Dealers/nct-10935592****

- [x] Create local DB for testing with appropriate Schema.
- [x] Basic API Boilerplate
- [x] Connect express to postgres and complete CRUD routes. https://node-postgres.com/
  - [x] structuring express app with postgres https://node-postgres.com/guides/async-express
- [ ] Client Setup
  - [x] bootstrap create-react-app
  - [x] React Router Setup
      - [x] '/' Homepage with list of lappy shops
      - [x] '/shops/:id' specific shop detail page
      - [x] '/shops/:id/update' update a specific shop 
  - [x] React Context API Setup 
  - [x] Fetch data from backend to frontend
    - [x] axios API setup
    - [x] useEffect,useContext setup to list shops
    - [x] render retreived data from backend
  - [x] Add new shops functionality
  - [x] Delete functionality
  - [x] Update functionality
  - [x] Shopdetail Page skelton  
  - [ ] Review and Rating Component
    - [x] postgres new table with foreign key as lappystores id
    - [x] Star rating component
    - [x] AddReviews Component
- [x] Server side modifications
  - [x] modify the get shop by id to get data regarding review table also i.e two calls to the DB with single endpoint.
  - [x] Add review backend route
- [x] Modification Add review
  - [x] render new created review by making call to backend api
    - [x] useLocation or useParams hook helps to access the url & params of the current page url.
- [x] postgres Detour (for help-https://www.postgresqltutorial.com/)
   - [x] aggregation in postgres for number of reviews
   - [x] **Important SQL joins are always helpful to avoid multiple db query instead making a single query with join to get related data when two or more tables are involved.** 
   - [x] nested subquery to get avg and count for each shop prevents 1 additional api call cost.

> # Some facts/important info that I came across while development

- [x] \? helps in postgres use it often or just google it.🐱‍🚀
- [x] \c database to connect to any database
- [x] best practices are to captilize the SQL part like CREATE DATABASE mydatabase and not create database mydatabase.
- [x] https://www.postgresqltutorial.com/ comes in handy while using postgres.
- [x] \d tablename to see data type and attributes details of the table.
- [x] Never use string literals or any type of string concatination for querying databases as it makes the app vulnerable to sql injections instead use parameterized queries refer https://node-postgres.com/features/queries
- [x] Setting Up Routing in React
- [x] **Use of Switch in react-router-dom helps in preventing multiple components to load on screen i.e when it founds a specific path route it only loads that hence best practice is to wrap the Router inside of Switch.**

- [x] **Advantages of using react context api to store data over the local storage is that all the components have access to react context api can easily retrieve the data i.e no hassle in passing props and messy stuff**

- [x] **to only allow the useEffect code to run when components mount use empty dependancy array [] if empty array is not mentioned then the useEffect code executes everytime the component re-renders or is mounted.**

- [x] **if passing argument to the function while onClick or onChange events make sure to return as  a arrow function like
() => handleDelete(shop.id) in case of delete button onClick, as do not want to execute it directly instead pass refference to the function that is handling the logic**

- [x] **used useHistory to navigate to different route for updating shop details.(useHistory will remember the browser history we embeded the updated shop id in the url and push to the history stack so that I can use the useParam hook then to grab that id and make the update request to backend)**
    - [x] **used controlled form i.e useState to handle input forms both for update and add functionality**
    - [x] **used direct api call to get specific id shop old details to act as placeholder for update form rather than useContext as if user bookmarks the page and then returns to this page then it will result in error.**
  
  - [x] **ShopDetails when handling click for a row the update and delete brokes,the reason is that when update or delete are clicked the event click is propagated upwards to the parent i.e the row so technically the row onclick takes us to the detail page to tackle this we pass  the event object while calling the onupdate & ondelete refer ShopList.jsx**

  - [x] **useLocation hook helps to access the url, better to use the useParams hooks to grab the params in the url of the current page**
