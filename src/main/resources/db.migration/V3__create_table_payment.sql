CREATE TABLE payment(
    id int auto_increment primary key,
    student_id int not null,
    monthly_payment decimal(10, 2) not null,
    payment_date date not null
);

