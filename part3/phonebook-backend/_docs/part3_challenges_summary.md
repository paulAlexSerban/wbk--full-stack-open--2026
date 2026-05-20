# Full Stack Open Part 3 - Challenges Summary

This document provides a short summary of all the exercises/challenges in Part 3 of the Full Stack Open course.

## 3.1 - 3.6: Node.js and Express
* **3.1 Phonebook backend step 1:** Implement a Node application that returns a hardcoded list of phonebook entries from the address `http://localhost:3001/api/persons`.
* **3.2 Phonebook backend step 2:** Implement a page at the address `http://localhost:3001/info` that returns info about the number of entries and time of the request.
* **3.3 Phonebook backend step 3:** Implement the functionality for displaying the information for a single phonebook entry using `/api/persons/:id`.
* **3.4 Phonebook backend step 4:** Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request.
* **3.5 Phonebook backend step 5:** Expand the backend so that new phonebook entries can be added by making HTTP POST requests to `/api/persons`. Generate random IDs.
* **3.6 Phonebook backend step 6:** Implement error handling for creating new entries. The request is not allowed to succeed if the name or number is missing, or if the name already exists in the phonebook.

## 3.7 - 3.8: Morgan Middleware
* **3.7 Phonebook backend step 7:** Add the morgan middleware to your application for logging HTTP requests.
* **3.8 Phonebook backend step 8:** Configure morgan so that it also shows the data sent in HTTP POST requests.

## 3.9 - 3.11: Deploying to the internet
* **3.9 phonebook backend step 9:** Make the backend work with the frontend from part 2. Ensure CORS is enabled.
* **3.10 phonebook backend step 10:** Deploy the backend to the internet, for example to Render or Fly.io.
* **3.11 phonebook full stack:** Generate a production build of the frontend, and add it to the internet application using Express static middleware.

## 3.12: Command-line database
* **3.12 Command-line database:** Create a `mongo.js` script for adding entries to MongoDB via the command line and fetching all entries.

## 3.13 - 3.14: Node.js and Express with MongoDB
* **3.13 Phonebook database, step 1:** Change the fetching of all phonebook entries so that the data is fetched from the database.
* **3.14 Phonebook database, step 2:** Change the backend so that new numbers are saved to the database. Verify the frontend still works.

## 3.15 - 3.18: Database configuration and error handling
* **3.15 Phonebook database, step 3:** Change the backend so that deleting phonebook entries is reflected in the database.
* **3.16 Phonebook database, step 4:** Move the error handling of the application to a new error handler middleware.
* **3.17 Phonebook database, step 5:** If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request. Implement the backend for updating.
* **3.18 Phonebook database step 6:** Also update the handling of the `api/persons/:id` and `info` routes to use the database.

## 3.19 - 3.21: Validation and ESLint
* **3.19 Phonebook database, step 7:** Expand the validation so that the name stored in the database has to be at least 3 characters long and unique using Mongoose validation.
* **3.20 Phonebook database, step 8:** Add validation to your phone numbers. Ensure it has length of 8 or more, and follows the `DD-DDDDDD` or `DDD-DDDDD` format.
* **3.21 Deploying the database backend to production:** Generate a new production build with the updated frontend and deploy the final version to the internet.

## 3.22: Linting
* **3.22 Linting configuration:** Add ESLint to your application and fix all the warnings.
