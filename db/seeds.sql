INSERT INTO departments(departments_name)
VALUES 
("Human Resources"),
("Finance"),
("IT");

INSERT INTO roles(title, salary, departments_id)
VALUES
("HR Director", 220573.00, 1),
("Senior Director Finance", 133162.00, 2),
("Service Desk Agent", 60000.00, 3);

INSERT INTO employees(first_name, last_name, role_id, Manager_id)
VALUES
("Helen", "Keller", 1, 1),
("Bill", "Cosby", 2, 2),
("Provolone", "Cheese", 3, 3);
