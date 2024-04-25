
CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(28) PRIMARY KEY,
    description VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO categories (category_id, name)
VALUES
    (0, 'Fantasy'),
    (1, 'Mystery'),
    (2, 'Romance'),
    (3, 'Science Fiction'),
    (4, 'Horror'),
    (5, 'Historical Fiction'),
    (6, 'Biography/Autobiography'),
    (7, 'Self-Help/Personal Development'),
    (8, 'Poetry'),
    (9, 'Adventure'),
    (10, 'Humor/Comedy'),
    (11, 'Science and Technology'),
    (12, 'Non-fiction'),
    (13, 'Crime'),
    (14, 'Psychological Thriller');

CREATE TABLE IF NOT EXISTS books (
    book_id INT PRIMARY KEY,
    uid VARCHAR(28) NOT NULL REFERENCES users(uid),
    title VARCHAR(70) NOT NULL,
    description VARCHAR(400) NOT NULL,
    pages INT NOT NULL,
    category1_id INT NOT NULL REFERENCES categories(category_id),
    category2_id INT NOT NULL REFERENCES categories(category_id),
    category3_id INT NOT NULL REFERENCES categories(category_id),
    cover_link VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS list_elements (
    element_id INT PRIMARY KEY,
    book_id INT NOT NULL REFERENCES books(book_id),
    uid VARCHAR(28) NOT NULL REFERENCES users(uid),
    progress varchar(10) NOT NULL CHECK(progress in ('dnf', 'wtr', 'read', 'cr')),
    current_pages INT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT PRIMARY KEY,
    book_id INT NOT NULL REFERENCES books(book_id),
    uid VARCHAR(28) NOT NULL REFERENCES users(uid),
    rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5), 
    comment VARCHAR(300) NOT NULL,
    date_modified DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS feedbacks (
    feedback_id INT PRIMARY KEY,
    uid VARCHAR(28) REFERENCES users(uid),
    new_feature VARCHAR(300),
    date_submitted DATE NOT NULL,
    degree_imp INT NOT NULL CHECK(degree_imp >= 1 AND degree_imp <= 5),
    problems_pw BOOLEAN NOT NULL,
    issue VARCHAR(300) NOT NULL,
    issue_type1 BOOLEAN,
    issue_type2 BOOLEAN,
    issue_type3 BOOLEAN 
);
