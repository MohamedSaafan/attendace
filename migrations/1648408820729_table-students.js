/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE students (
        id INTEGER PRIMARY KEY,
        name VARCHAR,
        image_url VARCHAR,
        password VARCHAR

    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE students;`);
};
