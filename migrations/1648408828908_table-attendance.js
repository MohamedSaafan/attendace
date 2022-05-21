/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER,
    date TIMESTAMP DEFAULT now(),
    couse_id INTEGER
)`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE attendance;`);
};
