// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Employee Schedule
const addEmployeeScheduleForm = document.querySelector("#addEmployeeScheduleForm");
addEmployeeScheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("addEmployeeName").value.trim();
    const position = document.getElementById("addEmployeePosition").value.trim();
    const shiftFrom = document.getElementById("addEmployeeShiftFrom").value.trim();
    const shiftTo = document.getElementById("addEmployeeShiftTo").value.trim();

    if (name && position && shiftFrom && shiftTo) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${name}</td>
            <td>${position}</td>
            <td>${shiftFrom} - ${shiftTo}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editEmployeeschdModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deleteEmployeeschedModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);

        // Reset the form and close the modal
        addEmployeeScheduleForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addEmployeeschedModal")).hide();
    } else {
        alert("All fields are required.");
    }
});

// Edit Employee Schedule
let editRow = null;
const editEmployeeScheduleModal = document.getElementById("editEmployeeschdModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");

        if (editRow) {
            document.getElementById("editEmployeeName").value = editRow.children[0].textContent.trim();
            document.getElementById("editEmployeePosition").value = editRow.children[1].textContent.trim();
            document.getElementById("editEmployeeShiftFrom").value = editRow.children[2].textContent.trim().split(" - ")[0];
            document.getElementById("editEmployeeShiftTo").value = editRow.children[2].textContent.trim().split(" - ")[1];
        }
    }
});

const editEmployeeScheduleForm = document.querySelector("#editEmployeeScheduleForm");
editEmployeeScheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("editEmployeeName").value.trim();
    const position = document.getElementById("editEmployeePosition").value.trim();
    const shiftFrom = document.getElementById("editEmployeeShiftFrom").value.trim();
    const shiftTo = document.getElementById("editEmployeeShiftTo").value.trim();

    if (editRow && name && position && shiftFrom && shiftTo) {
        editRow.children[0].textContent = name;
        editRow.children[1].textContent = position;
        editRow.children[2].textContent = `${shiftFrom} - ${shiftTo}`;

        bootstrap.Modal.getInstance(editEmployeeScheduleModal).hide();
    } else {
        alert("All fields are required, or no row is selected.");
    }
});

// Delete Employee Schedule
let deleteRow = null;
const deleteEmployeeScheduleModal = document.getElementById("deleteEmployeeschedModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deleteEmployeeschedModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deleteEmployeeScheduleModal).hide();
    } else {
        alert("No row selected for deletion.");
    }
});
