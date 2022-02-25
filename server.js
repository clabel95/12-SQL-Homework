const mysql = require('mysql');
const inquirer = require('inquirer');

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

}
const ViewAllRoles = () => {

}     
const ViewAllEmplyees = () => {

} 
const AddDepartment = () => {

}    
const AddRole = () => {

}          
const AddEmployee = () => {

}     
const UpdateEmployeeRole = () => {

}