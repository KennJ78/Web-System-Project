const employeeTable = document.querySelector('tbody');

// Fetch all employee position data
const getEmployeeData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/employeeposition/");
        if (!response.ok) throw new Error("Failed to fetch employee data.");
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch employee data:", err);
    }
};

// Create a table row for each employee
const createEmployeeRow = (employee, index) => {
    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const positionTd = document.createElement('td');
    const actionTd = document.createElement('td');

    noTd.innerText = index + 1;
    codeTd.innerText = employee.ecode;
    nameTd.innerText = employee.employeename;
    positionTd.innerText = employee.position;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-pen');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editEmployeeModal');
    editButton.onclick = () => populateEditEmployeeForm(employee);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deleteEmployeeModal');

    deleteButton.onclick = () => confirmEmployeeDelete(employee.ecode);  

    actionTd.append(editButton, deleteButton);

    tr.append(noTd, codeTd, nameTd, positionTd, actionTd);
    return tr;
};

// Populate the edit employee form
const populateEditEmployeeForm = (employee) => {
    document.getElementById('editEmployeeCode').value = employee.ecode;
    document.getElementById('editEmployeeName').value = employee.employeename;
    document.getElementById('editEmployeePosition').value = employee.position;
};

// Confirm and handle employee deletion
const confirmEmployeeDelete = (ecode) => {
    const deleteButton = document.querySelector('#deleteEmployeeModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/employeeposition/${ecode}`, { method: 'DELETE' });
            if (response.ok) {
                alert("Employee deleted successfully.");

                window.location.reload();  

            } else {
                console.error("Failed to delete employee:", await response.text());
            }
        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    };
};

// Add a new employee
document.getElementById('addEmployeeForm').onsubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
        ecode: document.getElementById('employeeCode').value,
        employeename: document.getElementById('employeeName').value,
        position: document.getElementById('employeePosition').value,
    };

    try {
        const response = await fetch("http://localhost:5050/api/employeeposition/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee),
        });

        if (response.ok) {
            alert("Employee added successfully.");
            window.location.reload();
        } else {
            console.error("Failed to add employee:", await response.text());
        }
    } catch (err) {
        console.error("Error adding employee:", err);
    }
};

// Edit an existing employee
document.getElementById('editEmployeeForm').onsubmit = async (e) => {
    e.preventDefault();

    const updatedEmployee = {
        ecode: document.getElementById('editEmployeeCode').value,
        employeename: document.getElementById('editEmployeeName').value,
        position: document.getElementById('editEmployeePosition').value,
    };


    const ecode = updatedEmployee.ecode; 


    try {
        const response = await fetch(`http://localhost:5050/api/employeeposition/${ecode}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmployee),
        });

        if (response.ok) {
            alert("Employee updated successfully.");
            window.location.reload();
        } else {
            console.error("Failed to update employee:", await response.text());
        }
    } catch (err) {
        console.error("Error updating employee:", err);
    }
};

// Load employee data and populate the table
getEmployeeData()
    .then((employees) => {
        if (employees) {
            employees.forEach((employee, index) => {
                employeeTable.append(createEmployeeRow(employee, index));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading employees:", err);
    });
