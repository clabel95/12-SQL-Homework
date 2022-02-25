USE cms_db;
INSERT INTO department(name)
VALUES ("Sales");
INSERT INTO department(name)
VALUES ("Engineering");
INSERT INTO department(name)
VALUES ("Finance");
INSERT INTO department(name)
VALUES ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("", 50, 1), ("",142,2),("",451,3),("",999,4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Joe","Bob",1,3),("Mike","Joe",2,3),("Big","Boss",3,3);
