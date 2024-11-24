// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Pastry
const addPastryForm = document.querySelector("#addPastryForm");
addPastryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = document.getElementById("pastryCode").value.trim();
    const name = document.getElementById("pastryName").value.trim();
    const stock = document.getElementById("pastryStock").value.trim();

    if (code && name && stock) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${String(rowCount).padStart(2, '0')}</td>
            <td>${code}</td>
            <td>${name}</td>
            <td>${stock}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editPastryModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deletePastryModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);

        // Reset the form and close the modal
        addPastryForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addPastryModal")).hide();
    } else {
        alert("All fields are required.");
    }
});

// Edit Pastry
let editRow = null;
const editPastryModal = document.getElementById("editPastryModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");

        if (editRow) {
            document.getElementById("editPastryCode").value = editRow.children[1].textContent.trim();
            document.getElementById("editPastryName").value = editRow.children[2].textContent.trim();
            document.getElementById("editPastryStock").value = editRow.children[3].textContent.trim();
        }
    }
});

const editPastryForm = document.querySelector("#editPastryForm");
editPastryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = document.getElementById("editPastryCode").value.trim();
    const name = document.getElementById("editPastryName").value.trim();
    const stock = document.getElementById("editPastryStock").value.trim();

    if (editRow && code && name && stock) {
        editRow.children[1].textContent = code;
        editRow.children[2].textContent = name;
        editRow.children[3].textContent = stock;

        bootstrap.Modal.getInstance(editPastryModal).hide();
    } else {
        alert("All fields are required, or no row is selected.");
    }
});

// Delete Pastry
let deleteRow = null;
const deletePastryModal = document.getElementById("deletePastryModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deletePastryModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deletePastryModal).hide();
    } else {
        alert("No row selected for deletion.");
    }
});
