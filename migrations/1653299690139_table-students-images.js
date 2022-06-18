/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE students_images (
        id SERIAL PRIMARY KEY,
        image_url VARCHAR,
        student_id INTEGER,
        time_uploaded TIMESTAMP,
        course_id VARCHAR
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE students_images`);
};
