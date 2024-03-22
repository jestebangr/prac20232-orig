DROP TABLE IF EXISTS books;
CREATE TABLE books (
    asin VARCHAR(15),
    title TEXT,
    author VARCHAR(100),
    imgUrl VARCHAR(250),
    productURL VARCHAR(250),
    stars REAL,
    reviews INT,
    price REAL,
    publishedDate DATE,
    category_name VARCHAR(200)
);

COPY books
FROM '/docker-entrypoint-initdb.d/books-data.csv'
DELIMITER ';'
CSV HEADER;