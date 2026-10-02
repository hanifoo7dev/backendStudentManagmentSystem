Project: Course & Student Management API

You need to build a REST API to manage Students and Courses.

Requirements
1. Student Model
Student fields:

name — String, required

email — String, required, unique

phone — String, required

age — Number, required

isActive — Boolean, default true

enrolledCourses — Array of Course ObjectIds

2. Course Model
Course fields:

title — String, required

description — String

price — Number, required

category — String, required

duration — Number (in months)

isPublished — Boolean, default false

createdAt — Date

3. Student CRUD
Create the following endpoints:

POST /api/students

GET /api/students

GET /api/students/:id

PATCH /api/students/:id

DELETE /api/students/:id

Rules:

Two students cannot be created with the same email.

If age < 18, the student cannot be created.

Return a proper error message if an invalid MongoDB ObjectId is provided.

Before deleting a student, check whether they are currently enrolled in any course.

4. Course CRUD
Create the following endpoints:

POST /api/courses

GET /api/courses

GET /api/courses/:id

PATCH /api/courses/:id

DELETE /api/courses/:id

Rules when creating a course:

price must be greater than 0.

duration must be 1 month or more.

Duplicate combinations of the same title and category are not allowed.

5. Enrollment
New endpoint:

POST /api/students/:studentId/enroll/:courseId

When this API is called:

Check if the student exists.

Check if the course exists.

Check if the student is already enrolled in the course.

Do not allow enrollment if the course is not published (isPublished: false).

If all conditions are met, add the course ID to the student's enrolledCourses array.

The same course cannot be added a second time.

6. Populate
Modify the following endpoint to populate the course details:

GET /api/students/:id

Md. Hnaif
01813286277
