const TableData = require('./TableData');
const TableObjectData = require('./TableObjectData');
const States = require('./USStateList');

const api = {
    TableData,
    TableObjectData,
    States
};

const converted = [];

api.TableData.data.map((cell) => {
    const emp = {};
    emp.name = cell[0];
    emp.title = cell[1];
    emp.city = cell[2];
    emp.id = cell[3];
    emp.dateHired = cell[4];
    emp.dateHiredTicks = new Date(emp.dateHired.replace(/\//g, '-'));
    emp.salary = cell[5];
    emp.salaryNum = parseFloat(emp.salary.substring(1));
    converted.push(emp);
});
api.TableDataConverted = { data: converted };
module.exports = api;
