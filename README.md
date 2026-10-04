# Mini LMS API

A minimal REST API for a Learning Management System (LMS) built with Node.js, Express, MongoDB, and Mongoose.

The API manages Courses, Modules, and Resources.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- nodemon

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file at the root of the project.

Example:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/mini_lms
```

A `.env.example` file is also available as a reference.

## MongoDB

MongoDB must be running locally before starting the API.

Default connection used by the project:

```text
mongodb://127.0.0.1:27017/mini_lms
```

On Windows, if MongoDB is installed as a service, you can check its status with PowerShell:

```powershell
Get-Service MongoDB
```

If the service is stopped:

```powershell
Start-Service MongoDB
```

MongoDB Compass can also be used to inspect the database.

## Run the Project

### Development mode

Runs the server with nodemon:

```bash
npm run dev
```

### Production mode

Runs the server with Node.js:

```bash
npm start
```

The API runs by default on:

```text
http://localhost:3000
```

## Seed the Database

The seed script clears the existing seed data and creates:

- 4 Courses
- 8 Modules
- 12 Resources

Run:

```bash
npm run seed
```

The data is stored in MongoDB using Mongoose models.

## Data Relationships

The LMS follows this structure:

```text
Course
  └── Module
        └── Resource
```

A Module stores the ObjectId of its Course.

A Resource stores the ObjectId of its Module.

## API Routes

### Health Check

```http
GET /health
```

Example:

```text
http://localhost:3000/health
```

Example response:

```json
{
  "status": "ok",
  "service": "mini-lms-api"
}
```

---

### Get All Courses

```http
GET /api/courses
```

Example:

```text
http://localhost:3000/api/courses
```

Returns all courses stored in MongoDB.

---

### Filter Courses by Category

```http
GET /api/courses?category=backend
```

Example:

```text
http://localhost:3000/api/courses?category=backend
```

Returns only courses whose category is `backend`.

If no course matches the filter, the API returns an empty array:

```json
[]
```

---

### Get One Course

```http
GET /api/courses/:id
```

Example:

```text
http://localhost:3000/api/courses/COURSE_ID
```

Replace `COURSE_ID` with a valid Course ObjectId.

If the course does not exist:

```json
{
  "message": "Course not found"
}
```

Status:

```text
404 Not Found
```

---

### Get Modules of a Course

```http
GET /api/courses/:id/modules
```

Example:

```text
http://localhost:3000/api/courses/COURSE_ID/modules
```

Returns all modules linked to the selected course.

---

### Get One Module

```http
GET /api/modules/:id
```

Example:

```text
http://localhost:3000/api/modules/MODULE_ID
```

If the module does not exist:

```json
{
  "message": "Module not found"
}
```

Status:

```text
404 Not Found
```

## Error Handling

If a requested route does not exist, the API returns:

```json
{
  "message": "Route not found"
}
```

with status:

```text
404 Not Found
```

Unexpected application errors are handled by a centralized error middleware.

## Manual Tests

The API can be tested with Postman.

### Test 1 — Health route

```http
GET /health
```

Expected result:

```text
200 OK
```

### Test 2 — Get all courses

```http
GET /api/courses
```

Expected result:

```text
200 OK
```

and an array of courses.

### Test 3 — Get an existing course

```http
GET /api/courses/:id
```

Use an existing Course ObjectId.

Expected result:

```text
200 OK
```

### Test 4 — Course not found

```http
GET /api/courses/000000000000000000000000
```

Expected result:

```text
404 Not Found
```

```json
{
  "message": "Course not found"
}
```

### Test 5 — Get modules of a course

```http
GET /api/courses/:id/modules
```

Use an existing Course ObjectId.

Expected result:

```text
200 OK
```

and an array of modules linked to the course.

### Test 6 — Get one module

```http
GET /api/modules/:id
```

Use an existing Module ObjectId.

Expected result:

```text
200 OK
```

### Test 7 — Filter courses

```http
GET /api/courses?category=backend
```

Expected result:

```text
200 OK
```

and only courses with the `backend` category.

### Test 8 — Unknown route

```http
GET /api/unknown
```

Expected result:

```text
404 Not Found
```

```json
{
  "message": "Route not found"
}
```

## Available Scripts

```bash
npm run dev
```

Starts the development server with nodemon.

```bash
npm start
```

Starts the server with Node.js.

```bash
npm run seed
```

Resets and populates the MongoDB database with sample data.

## Known Limitations

This is a minimal LMS API created for a catch-up project.

Current limitations:

- Only GET endpoints required by the brief are implemented.
- Only one course filter (`category`) is implemented.
- No authentication or JWT.
- No advanced role management.
- No learner progress management.
- No file upload.
- Resources are stored in MongoDB but do not have a dedicated API route.
- No Docker configuration.
- No Swagger documentation.

## Request Flow

The main API flow is:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Mongoose Model
   ↓
MongoDB
   ↓
JSON Response
```

## Project Structure

```text
src/
├── app.js
├── config/
│   └── database.js
├── controllers/
│   ├── courses.controller.js
│   └── modules.controller.js
├── middlewares/
│   ├── errorHandler.js
│   └── notFound.js
├── models/
│   ├── Course.js
│   ├── Module.js
│   └── Resource.js
├── routes/
│   ├── courses.routes.js
│   └── modules.routes.js
└── seeds/
    └── seed.js
```