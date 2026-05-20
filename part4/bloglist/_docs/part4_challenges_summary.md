# Full Stack Open Part 4 - Challenges Summary

This document provides a short summary of all the exercises/challenges in Part 4 of the Full Stack Open course.

## 4.1 - 4.2: Application Structure and Routing
* **4.1 Blog list, step 1:** Initialize the project as an npm project, set up Express, start the server, and use `node --watch` for a better development experience.
* **4.2 Blog list, step 2:** Refactor the application into separate modules. Move routes to controllers, database schema to models, and extract configuration/logging to utils.

## 4.3 - 4.7: Helper Functions and Unit Tests
* **4.3 step 1:** Set up testing environments with `node:test` (or Jest) and implement a `dummy` test function that always returns 1.
* **4.4 step 2:** Implement a `totalLikes` helper function that calculates the total amount of likes in a list of blog posts.
* **4.5 step 3:** Implement a `favoriteBlog` helper function to find the blog post with the most likes.
* **4.6 step 4:** Implement a `mostBlogs` helper function to find the author who has the largest amount of blogs.
* **4.7 step 5:** Implement a `mostLikes` helper function to find the author whose blog posts have the largest amount of total likes.

## 4.8 - 4.12: Integration Testing (API Tests)
* **4.8 step 1:** Write a test that makes an HTTP GET request to `/api/blogs` using `supertest` to verify that the correct amount of blog posts are returned as JSON.
* **4.9 step 2:** Write a test verifying that the unique identifier property of the blog posts is named `id` (instead of `_id`).
* **4.10 step 3:** Write a test that verifies that making an HTTP POST request to the `/api/blogs` URL successfully creates a new blog post.
* **4.11 step 4:** Write a test that verifies that if the `likes` property is missing from the request, it will default to the value 0.
* **4.12 step 5:** Write a test that verifies that if the `title` or `url` properties are missing, the backend responds with a `400 Bad Request`.

## 4.13 - 4.14: Expanding the API
* **4.13 step 1:** Implement functionality for deleting a single blog post resource (`DELETE /api/blogs/:id`) and add tests for it.
* **4.14 step 2:** Implement functionality for updating the information of an individual blog post (`PUT /api/blogs/:id`)—mostly used for updating the number of likes. Add tests.

## 4.15 - 4.23: User Administration & Token Authentication
* **4.15 step 3:** Implement a way to create new users by doing an HTTP POST request to `/api/users`. Ensure usernames are unique.
* **4.16 step 4:** Add constraints to user creation: both `username` and `password` must be given and be at least 3 characters long.
* **4.17 step 5:** Expand the application so that a blog is linked to a user, and a user is linked to multiple blogs using Mongoose's `populate`.
* **4.18 step 6:** Implement token-based authentication (login) using `jsonwebtoken`.
* **4.19 step 7:** Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request.
* **4.20 step 8:** Refactor the token extraction process into its own custom middleware (`tokenExtractor`).
* **4.21 step 9:** Change the delete operation so that a blog can be deleted ONLY by the user who added it (verifying the token matches the creator).
* **4.22 step 10:** Create a `userExtractor` middleware that extracts the user from the token and sets it on the request object.
* **4.23 step 11:** Write tests ensuring that adding a blog fails with status code `401 Unauthorized` if a token is not provided.
