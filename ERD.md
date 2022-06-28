## Schemas

## Students

| Name      | Data Type |
| --------- | --------- |
| id        | INTEGER   |
| name      | VARCHAR   |
| image_url | VARCHAR   |
| password  | VARCHAR   |

## Attendance

| Name       | Data Type |
| ---------- | --------- |
| id         | SERIAL    |
| date       | TIMESTAMP |
| student_id | INTEGER   |
| course_id  | BOOLEAN   |

## Courses

| Name          | Data Type |
| ------------- | --------- |
| course_id     | VARCHAR   |
| name          | VARCHAR   |
| instructor_id | VARCHAR   |
| start_date    | TIMESTAMP |
| end_date      | TIMESTAMP |

## Instructors

| Name     | Data Type |
| -------- | --------- |
| id       | SERIAL    |
| name     | VARCHAR   |
| password | VARCHAR   |

## Enrollements

| Name       | Data Type |
| ---------- | --------- |
| id         | SERIAL    |
| course_id  | VARCHAR   |
| student_id | INTEGER   |

## Student Images

| Name          | Data Type |
| ------------- | --------- |
| id            | SERIAL    |
| image_url     | VARCHAR   |
| student_id    | INTEGER   |
| time_uploaded | TIMESTAMP |
| course_id     | VARCHAR   |
