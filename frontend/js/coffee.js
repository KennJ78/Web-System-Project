// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Coffee Ingredient
const addCoffeeForm = document.querySelector("#addCoffeeForm");
addCoffeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = document.getElementById("coffeeCode").value.trim();
    const name = document.getElementById("coffeeName").value.trim();
    const stock = document.getElementById("coffeeStock").value.trim();

    if (code && name && stock) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${String(rowCount).padStart(2, '0')}</td>
            <td>${code}</td>
            <td>${name}</td>
            <td>${stock}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editCoffeeModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deleteCoffeeModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);

        // Reset the form and close the modal
        addCoffeeForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addCoffeeModal")).hide();
    } else {
        alert("All fields are required.");
    }
});

// Edit Coffee Ingredient
let editRow = null;
const editCoffeeModal = document.getElementById("editCoffeeModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");

        if (editRow) {
            document.getElementById("editCoffeeCode").value = editRow.children[1].textContent.trim();
            document.getElementById("editCoffeeName").value = editRow.children[2].textContent.trim();
            document.getElementById("editCoffeeStock").value = editRow.children[3].textContent.trim();
        }
    }
});

const editCoffeeForm = document.querySelector("#editCoffeeForm");
editCoffeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = document.getElementById("editCoffeeCode").value.trim();
    const name = document.getElementById("editCoffeeName").value.trim();
    const stock = document.getElementById("editCoffeeStock").value.trim();

    if (editRow && code && name && stock) {
        editRow.children[1].textContent = code;
        editRow.children[2].textContent = name;
        editRow.children[3].textContent = stock;

        bootstrap.Modal.getInstance(editCoffeeModal).hide();
    } else {
        alert("All fields are required, or no row is selected.");
    }
});

// Delete Coffee Ingredient
let deleteRow = null;
const deleteCoffeeModal = document.getElementById("deleteCoffeeModal");

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deleteCoffeeModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deleteCoffeeModal).hide();
    } else {
        alert("No row selected for deletion.");
    }
});
