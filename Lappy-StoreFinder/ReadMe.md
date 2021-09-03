> ## Lappy-StoreFinder (PERN)


> # Live Project ->>>🎉🎉 <a href="">here</a>

> ### Project Screenshots

****V1.0.0 🎉🎉****


<img src="">


<img src="">

> ### Features



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
  - [ ] React Context API Setup 3:14:26


> # Some facts/important info that I came across while development

- [x] \? helps in postgres use it often or just google it.🐱‍🚀
- [x] \c database to connect to any database
- [x] best practices are to captilize the SQL part like CREATE DATABASE mydatabase and not create database mydatabase.
- [x] https://www.postgresqltutorial.com/ comes in handy while using postgres.
- [x] \d tablename to see data type and attributes details of the table.
- [x] Never use string literals or any type of string concatination for querying databases as it makes the app vulnerable to sql injections instead use parameterized queries refer https://node-postgres.com/features/queries
- [x] Setting Up Routing in React
- [x] Switch in react-router-dom helps in preventing multiple components to load on screen i.e when it founds a specific path route it only loads that hence best practice is to wrap the Router inside of Switch.