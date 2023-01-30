-- department seeds
INSERT INTO department (name)
VALUES
    ('Operations'),
    ('Academics'),
    ('Support');

-- role seeds
INSERT INTO role (title, salary, department_id)
VALUES
    ('Operations Associate', 50000, 1),
    ('Data Manager', 650000, 1),
    ('Assistant Principal', 90000, 2),
    ('Teacher (Tenure)', 75000, 2),
    ('Social Worker', 70000, 3);

-- employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Arle', 'Nadja', 2, 1),
    ('Schezo', 'Wedgy', 1, NULL),
    ('Witch', 'Mist', 4, NULL),
    ('Rulue', 'Fujin', 5, NULL );