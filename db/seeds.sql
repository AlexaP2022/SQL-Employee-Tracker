INSERT INTO department (deptName)
VALUES  ("finance"),
        ("engineering"),
        ("sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("accountant", 120000, 1),
        ("financial analyst", 100000, 1),
        ("engineer", 130000, 2),
        ("project manager", 80000, 2),
        ("marketing lead", 900000, 3),
        ("sales representative", 70000, 3),
        ("marketing manager", 75000, 3);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jane", "Doe", 1, null),
        ("Ken", "Lam", 2, null),
        ("Jennifer", "Lawrence", 3, null),
        ("James", "Dean", 4, 3),
        ("Timothy", "Stern", 7, null),
        ("Sandy", "Kim", 5, 5),
        ("Shanta", "Locke", 6, 5);
       
