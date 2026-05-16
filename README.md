# Full Stack Open 2026 - Submissions

This repository contains my exercises for the [Full Stack Open](https://fullstackopen.com/en) course from the University of Helsinki.

---

## Progress Tracking & Key Notes

### Part 0: Fundamentals of Web Apps
*   **Concepts Covered:** HTTP Requests (GET/POST), Document Object Model (DOM), traditional vs. Single Page Applications (SPA), and sequence diagrams.
*   **Key Deliverables:**
    *   **Exercise 0.4:** New note diagram (Traditional web app logic via full page reload on `POST /notes`).
    *   **Exercise 0.5:** Single Page App diagram (Initial HTML/CSS/JS load via `GET /spa`).
    *   **Exercise 0.6:** New note in SPA diagram (Dynamic DOM manipulation via `POST /new_note_spa` without reloading the page).

### Part 1: Introduction to React
*   **Concepts Covered:** Component-based architectures, JSX syntax, passing data via `props`, application state management using the `useState` hook, event handling, and functional programming patterns in JavaScript (map, filter, reduce).
*   **Key Deliverables:**
    *   **Course Information application:** Component breakdown and passing complex objects.
    *   **Unicafe:** State handling, conditional rendering of statistics, and tracking feedback metrics.
    *   **Anecdotes:** Managing complex state arrays and finding max values in state object properties.

### Part 2: Communicating with Server
*   **Concepts Covered:** Rendering collections from arrays, HTML forms, fetching data using `axios` and the `useEffect` hook, extracting data operations into separate frontend services (JSON Server integration), and custom CSS styling/notifications.
*   **Key Deliverables:**
    *   **Course Information Extended:** Utilizing declarative array methods for dynamic lists.
    *   **Phonebook Frontend:** Implementing CRUD operations against a mock backend server, building real-time search filters, and handling success/error notification banners.
    *   **Data for Countries:** Managing multi-step asynchronous API calls and integrating third-party weather data APIs.

### Part 3: Programming a Server with NodeJS and Express
*   **Concepts Covered:** Building RESTful APIs using Node.js and Express, middleware integration (logging with Morgan, handling CORS via `cors`), static file serving, and production deployment strategies.
*   **Current Progress:** Completed up to **Exercise 3.10** (Deploying the backend to production).
*   **Live Deployment:** The production API for the phonebook application is hosted at: [https://phonebook-backend-fso-2026-part3.onrender.com/](https://phonebook-backend-fso-2026-part3.onrender.com/)


## Project Structure

The workspace is organized into directory structures corresponding to each part of the curriculum:

```text
├── part0/          # Mermaid.js sequence diagrams and web architecture notes
├── part1/          # Core React fundamentals applications (CourseInfo, Unicafe, Anecdotes)
├── part2/          # Frontend phonebook application and country data projects
└── part3/          # Node.js + Express backend API for the phonebook application
```

---

## Technologies & Tools Used

* **Frontend:** React, JavaScript (ES6+), Axios, HTML5/CSS3
* **Backend:** Node.js, Express
* **Tooling & Architecture:** REST Client (VS Code), Morgan (Logging Middleware), CORS Middleware
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

### For Backend Applications (Part 3)

1. Navigate to the backend server root:
```bash
cd part3
```

2. Install the dependencies:
```bash
npm install
```

3. Launch the development server with automatic file hot-reloading:
```bash
npm run dev
```
