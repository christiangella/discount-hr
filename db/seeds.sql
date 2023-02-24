use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Operations'),
    ('Administrative'),
    ('Instructional'),
    ('Support');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Data Manager', 60000, 1),
    ('Director of Operations', 100000, 1),
    ('School Leader', 150000, 2),
    ('Assistant Principal', 120000, 2),
    ('Teacher', 80000, 3),
    ('Paraeducator', 55000, 4),
    ('Meal Server', 30000, 4);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Red', 'Woods', 1, NULL),
    (2, 'Orange', 'Hernandez', 2, 1),
    (3, 'Yellow', 'Munoz', 3, NULL),
    (4, 'Green', 'Nagasaki', 4, 3),
    (5, 'Blue', 'Del Mar', 5, NULL),
    (6, 'Indigo', 'Vinsmoke', 6, 5),
    (7, 'Purple', 'Smith', 7, NULL),
    (8, 'Gray', 'Yang', 8, 7);
