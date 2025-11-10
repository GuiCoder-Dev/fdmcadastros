CREATE OR REPLACE VIEW view_monthly_value_per_year AS
SELECT
    YEAR(date_union) AS year,
    MONTH(date_union) AS month,
    SUM(total_value) AS total_value
FROM (
    SELECT
        p.payment_date AS date_union,
        p.monthly_payment AS total_value
    FROM payment p
    UNION ALL
    SELECT
        s.registration_date AS date_union,
        s.registration_fee AS total_value
    FROM student s
    ) AS combined
GROUP BY YEAR(date_union), MONTH(date_union)
ORDER BY YEAR(date_union), MONTH(date_union);


