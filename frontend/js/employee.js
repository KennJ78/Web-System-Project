// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Employee
const addEmployeeForm = document.querySelector("#addEmployeeForm");
addEmployeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = document.getElementById("employeeCode").value.trim();
    const name = document.getElementById("employeeName").value.trim();
    const position = document.getElementById("employeePosition").value.trim();

    if (code && name && position) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${String(rowCount).padStart(2, '0')}</td>
            <td>${code}</td>
            <td>${name}</td>
            <td>${position}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editEmployeeModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);

        // Reset the form and close the modal
        addEmployeeForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addEmployeeModal")).hide();
    } else {
        alert("All fields are required.");
    }
});

// Edit Employee
let editRow = null;
const editEmployeeModal = document.getElementById("editEmployeeModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");

        if (editRow) {
            document.getElementById("editEmployeeCode").value = editRow.children[1].textContent.trim();
            document.getElementById("editEmployeeName").value = editRow.children[2].textContent.trim();
            document.getElementById("editEmployeePosition").value = editRow.children[3].textContent.trim();
        }
    }
});

const editEmployeeForm = document.querySelector("#editEmployeeForm");
editEmployeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = document.getElementById("editEmployeeCode").value.trim();
    const name = document.getElementById("editEmployeeName").value.trim();
    const position = document.getElementById("editEmployeePosition").value.trim();

    if (editRow && code && name && position) {
        editRow.children[1].textContent = code;
        editRow.children[2].textContent = name;
        editRow.children[3].textContent = position;

        bootstrap.Modal.getInstance(editEmployeeModal).hide();
    } else {
        alert("All fields are required, or no row is selected.");
    }
});

// Delete Employee
let deleteRow = null;
const deleteEmployeeModal = document.getElementById("deleteEmployeeModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deleteEmployeeModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deleteEmployeeModal).hide();
    } else {
        alert("No row selected for deletion.");
    }
});
