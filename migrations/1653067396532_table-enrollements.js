/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE enrollements (
        id SERIAL PRIMARY KEY,
        course_id VARCHAR,
        student_id INTEGER
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE enrollements;`);
};
