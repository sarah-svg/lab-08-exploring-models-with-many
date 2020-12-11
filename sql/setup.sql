DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE If EXISTS author_books;




CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL
   


);


CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author TEXT NOT NULL
  
);

CREATE TABLE author_books (
    author_id BIGINT REFERENCES authors(id),
    books_id BIGINT REFERENCES books(id),
    PRIMARY KEY(author_id, books_id)
);