/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE instructors (
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        password VARCHAR
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE instructors;`);
};
