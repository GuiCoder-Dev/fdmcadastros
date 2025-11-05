CREATE OR REPLACE VIEW view_total_value_per_student AS
Select
    s.id AS student_id,
    s.student_name,
    s.registration_fee,
    IFNULL(SUM(p.monthly_payment), 0) AS total_monthly_payments,
    (IFNULL(SUM(p.monthly_payment), 0) + s.registration_fee) AS total_paid
FROM student s
LEFT JOIN payment p ON s.id = p.student_id
GROUP BY s.id, s.student_name, s.registration_fee;