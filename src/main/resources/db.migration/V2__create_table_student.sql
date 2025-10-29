CREATE TABLE student(
    id int auto_increment primary key,
    admin_id int not null,
    student_name varchar(255) not null,
    responsible_adult varchar(255) not null,
    monthly_payment decimal(10, 2) not null,
    registration_fee decimal(10, 2) not null,
    registration_date date not null,
    birthday_date date not null,
    class_name varchar(255) not null,
    modality varchar(255) not null,
    status varchar(255) not null,
    FOREIGN KEY (admin_id) REFERENCES admin(id)
);

