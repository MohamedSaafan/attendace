/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.query(`CREATE TABLE courses (
        s
        course_id VARCHAR PRIMARY KEY,
        name VARCHAR,
        instructor_id VARCHAR,
        start_date TIMESTAMP,
        end_date TIMESTAMP
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROPT TABLE courses`);
};
