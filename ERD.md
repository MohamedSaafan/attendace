## Schemas

## Students

| Name      | Data Type |
| --------- | --------- |
| id        | INTEGER   |
| name      | VARCHAR   |
| image_url | VARCHAR   |
| password  | VARCHAR   |

## Attendance

| Name         | Data Type |
| ------------ | --------- |
| id           | SERIAL    |
| date         | TIMESTAMP |
| student_id   | INTEGER   |
| has_attended | BOOLEAN   |
