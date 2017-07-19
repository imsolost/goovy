DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

\c moviesdb;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(150) NOT NULL
);

DROP TABLE IF EXISTS history;
CREATE TABLE history (
  id SERIAL PRIMARY KEY,
  movie VARCHAR(250) NOT NULL,
  user_id int,
  searchdate date NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (email, password)
  VALUES ('1', 'a'),
  ('2', 'b'),
  ('Or not', '2b'),
  ('user4', '4444')
