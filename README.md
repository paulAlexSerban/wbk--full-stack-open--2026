# Full Stack Open 2026 - Submissions

This repository contains my exercises for the [Full Stack Open](https://fullstackopen.com/en) course from the University of Helsinki.

---

## Progress Tracking & Key Notes

### Part 0: Fundamentals of Web Apps
*   **Subjects Covered:** Web architectures and HTTP protocols.
*   **Concepts Covered:** HTTP Requests (GET/POST), Document Object Model (DOM), traditional vs. Single Page Applications (SPA), sequence diagrams.
*   **Tasks Scope:** Mermaid.js sequence diagrams detailing traditional web app routing, SPA initial load, and SPA dynamic DOM manipulation.

### Part 1: Introduction to React
*   **Subjects Covered:** Core React fundamentals and state management.
*   **Concepts Covered:** Component-based architectures, JSX syntax, passing data via `props`, `useState` hook, event handling, JavaScript array methods.
*   **Tasks Scope:** Built the Course Information application, Unicafe feedback tracker, and Anecdotes voting app to practice state arrays and conditional rendering.

### Part 2: Communicating with Server
*   **Subjects Covered:** Data fetching and frontend architecture.
*   **Concepts Covered:** Rendering collections, forms, data fetching with `axios` and `useEffect`, extracting operations into separate services.
*   **Tasks Scope:** Phonebook frontend with CRUD operations against a JSON Server, real-time search filters, notification banners, and a Data for Countries app integrating third-party APIs.

### Part 3: Programming a Server with NodeJS and Express
*   **Subjects Covered:** Backend development and database integration.
*   **Concepts Covered:** RESTful APIs, Node.js, Express, middleware (Morgan, CORS), MongoDB integration with Mongoose, production deployment.
*   **Tasks Scope:** Developed the Phonebook backend API with database connection, error handling, and deployed it to production.

### Part 4: Testing Express Servers, User Administration
*   **Subjects Covered:** Automated backend testing and security.
*   **Concepts Covered:** Structure of backend applications, automated testing (Jest, Supertest), user administration, token authentication (JWT).
*   **Tasks Scope:** Created the Bloglist backend API, implementing robust integration tests and secure user creation/login flows.

### Part 5: Testing React Apps
*   **Subjects Covered:** Frontend testing and authentication.
*   **Concepts Covered:** Login in frontend, `props.children`, testing React components (Jest/React Testing Library), End-to-End (E2E) testing (Cypress/Playwright).
*   **Tasks Scope:** Built the Bloglist frontend application to interact with the authenticated API, ensuring reliability through extensive unit and E2E testing.

### Live Deployments
*   **Phonebook API (Part 3):** [https://phonebook-backend-fso-2026-part3.onrender.com/](https://phonebook-backend-fso-2026-part3.onrender.com/)


## Project Structure

The workspace is organized into directory structures corresponding to each part of the curriculum:

```text
├── part0/          # Mermaid.js sequence diagrams and web architecture notes
├── part1/          # Core React fundamentals applications (CourseInfo, Unicafe, Anecdotes)
├── part2/          # Frontend phonebook application and country data projects
├── part3/          # Node.js + Express backend API for the phonebook application
├── part4/          # Bloglist backend API with user authentication and automated testing
└── part5/          # Bloglist frontend application and testing
```

---

## Technologies & Tools Used

* **Frontend:** React, JavaScript (ES6+), Axios, HTML5/CSS3
* **Backend:** Node.js, Express, MongoDB, Mongoose
* **Testing:** Jest, Supertest, React Testing Library, E2E Testing (Cypress/Playwright)
* **Tooling & Architecture:** REST Client (VS Code), Morgan (Logging Middleware), CORS Middleware, JWT Authentication
* **DevOps & Deployment:** Render, Static File Hosting
* **Documentation:** Mermaid.js (Sequence Diagrams)

---

## How to Run Locally

### For Frontend Applications (Parts 1 & 2)

1. Navigate to the specific project directory:
```bash
cd part2/phonebook
```


2. Install the necessary dependencies:
```bash
npm install
```

3. Boot up the local development environment:
```bash
npm run dev
```

### For Backend Applications (Part 3, 4 & 5)

1. Navigate to the backend server directory (e.g., `part3/phonebook-backend` or `part4/bloglist`):
```bash
cd part4/bloglist
```

2. Install the dependencies:
```bash
npm install
```

3. Configure Environment Variables:
Copy the `.env.example` file to `.env` and fill in your MongoDB credentials and secret keys.
```bash
cp .env.example .env
```

4. Launch the development server with automatic file hot-reloading:
```bash
npm run dev
```

---

## Running Tests

To run the automated tests for applications in Part 4 and Part 5:

### Backend Tests (Jest & Supertest)
Navigate to the backend directory and run:
```bash
npm test
```
