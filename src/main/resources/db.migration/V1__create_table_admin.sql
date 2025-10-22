CREATE TABLE admin(
    id int auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null
);

