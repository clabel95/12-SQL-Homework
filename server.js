const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: "localhost",
    user: `root`,
    password: `root`,
    database: "cms_db"
});

connection.connect((err) => {
    if (err) throw err;
    User_input();
});

const User_input = () => {
    inquirer.prompt({
        name:'action',
        type:'rawlist',
        message:'Chose desired action.',
        choices:[
            'View all departments',
            'View all roles',
            'View all emplyees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ],
    })
    .then((answer) => {
        switch(answer.action){
            case 'View all departments':    ViewAllDepartments();   break;
            case 'View all roles':          ViewAllRoles();         break;
            case 'View all emplyees':       ViewAllEmplyees();      break;
            case 'Add a department':        AddDepartment();        break;
            case 'Add a role':              AddRole();              break;
            case 'Add an employee':         AddEmployee();          break;
            case 'Update an employee role': UpdateEmployeeRole();   break;

            default: console.log("Invalid action: ${answer.action}"); break;
        }
    });
};

const ViewAllDepartments = () => {
    const query = 'Select * FROM department';
    connection.query(query, function(err, res){
        if (err) throw err; 
        console.table("All Departments",res);   
    });
    User_input();
};

const ViewAllRoles = () => {
    const query = 'Select * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err; 
        console.table("All Roles",res);   
    });
    User_input();
}; 

const ViewAllEmplyees = () => {
    const query = 'Select * FROM employee';
    connection.query(query, function(err, data){
        if (err) throw err; 
        console.table("All Employees",data);   
    });
    User_input();
};

const AddDepartment = () => {
    inquirer
    .prompt({
        name:'department',
        type:'input',
        message:'What department would you like to add?'
    })
    .then(answer => {
        const query = 'INSERT INTO department (name) VALUES (?)';
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log(answer.department);
            User_input();
        })
    })
}; 

const AddRole = () => {


    //need to get an array with all the departments to be used to pick which department the role will go into.
    var departments = [];
    connection.query('SELECT * FROM department', (err, data) => {
        if (err) throw err;
        console.log(data);
        var departments = data.map(d => ({
            name: d.name,
            value: d.id
        }))

    inquirer
    .prompt([{
        name:'role',
        type:'input',
        message:'What role would you like to add?'
    },
    {
        name:'salary',
        type:'input',
        message:'What is the salary of this role?'
    },

    {
        name:'department',
        type:'choices',
        message:'What department is the role in?',
        choices: departments
    }])

    .then(answer => {
        const query = 'INSERT INTO role (title) VALUES (?)';
        connection.query(query, [answer.department], (err, res) => {
            if (err) throw err;
            console.log(answer.department);
            User_input();
        })
    })
    });

};

const AddEmployee = () => {
    inquirer
    .prompt([
    {
        name: `first_name`,
        type: `input`,
        message: `What is the employees first name?`
    },

    {
        name: `last_name`,
        type: `input`,
        message: `What is the employees last name?`
    },

    {
        name: `role_id`,
        type: `input`,
        message: `What role is the employees role?`,
    },

    {
        name: `manager_id`,
        type: `input`,
        message: `What is the manager ID of the employee?`,
    }])

    .then(answer => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) =>{
            if(err) throw err;
            console.log(answer.first_name, answer.last_name, answer.role_id, answer.manager_id +" has been added to the list of employees.");
            User_input();
        })
    })

};

const UpdateEmployeeRole = () => {

    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        var employees = data.map(e => ({
            name: `${e.first_name} ${e.last_name}`,
            value: `${e.id}`
        }));
    
    connection.query("SELECT * FROM roles", (err, data) => {
        if (err) throw err;
        var roles = data.map(r => ({
            name: `${r.title}`,
            value: `${r.id}`
        }));

        inquirer
        .prompt([
        {
            name: `updated_Id`,
            type: `list`,
            message: `Which employee's role needs to be updated?`,
            choices: employees
        }, 
        {
            name: `updated_Role`,
            type: `list`,
            message: `What is the new role?`,
            choices: roles
        }
    ])
    .then(function({updated_Id, updated_Role}) {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        connection.query(query, [updated_Id, updated_Role], function(err, res){
            if(err) throw err;
            console.log("update sucessful");
            User_input(); 
        })
    })
    });
});
};