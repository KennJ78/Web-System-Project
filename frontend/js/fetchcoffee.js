const menu = document.querySelector('tbody');

// Fetch all coffee data from the server
const getCoffeeData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/coffee");  // Correct endpoint
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to fetch coffee data:", err);
    }
};

// Create a row for each coffee entry
const createCoffeeRow = (coffee, index) => { // Add index parameter
    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const stockTd = document.createElement('td');
    const actionTd = document.createElement('td');

    // Use the index for the "No." column
    noTd.innerText = index + 1; // Add 1 to make it 1-based

    codeTd.innerText = coffee.ccode;
    nameTd.innerText = coffee.coffeename;
    stockTd.innerText = coffee.stocks;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-pen');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editCoffeeModal');
    editButton.onclick = () => populateEditCoffeeForm(coffee);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deleteCoffeeModal');
    deleteButton.onclick = () => confirmCoffeeDelete(coffee.ccode);  // Use ccode for deletion

    actionTd.append(editButton, deleteButton);

    tr.append(noTd, codeTd, nameTd, stockTd, actionTd);
    return tr;
};

// Populate the form with data to edit
const populateEditCoffeeForm = (coffee) => {
    document.getElementById('editCoffeeCode').value = coffee.ccode;
    document.getElementById('editCoffeeName').value = coffee.coffeename;
    document.getElementById('editCoffeeStock').value = coffee.stocks;
};

// Handle deletion confirmation
const confirmCoffeeDelete = (ccode) => {
    const deleteButton = document.querySelector('#deleteCoffeeModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/coffee/${ccode}`, { method: 'DELETE' }); // Correct endpoint
            if (response.ok) {
                alert("Coffee deleted successfully.");
                window.location.reload();
            } else {
                console.error("Failed to delete coffee:", await response.text());
            }
        } catch (err) {
            console.error("Error deleting coffee:", err);
        }
    };
};

// Add new coffee functionality
document.getElementById('addCoffeeForm').onsubmit = async (e) => {
    e.preventDefault();

    const newCoffee = {
        ccode: document.getElementById('coffeeCode').value,
        coffeename: document.getElementById('coffeeName').value,
        stocks: document.getElementById('coffeeStock').value,
    };

    try {
        const response = await fetch("http://localhost:5050/api/coffee", {  // Correct endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCoffee),
        });

        if (response.ok) {
            alert("Coffee added successfully.");
            window.location.reload();
        } else {
            console.error("Failed to add coffee:", await response.text());
        }
    } catch (err) {
        console.error("Error adding coffee:", err);
    }
};

// Edit coffee functionality
document.getElementById('editCoffeeForm').onsubmit = async (e) => {
    e.preventDefault();

    const updatedCoffee = {
        ccode: document.getElementById('editCoffeeCode').value,
        coffeename: document.getElementById('editCoffeeName').value,
        stocks: document.getElementById('editCoffeeStock').value,
    };

    const ccode = updatedCoffee.ccode; // Using ccode as unique identifier

    try {
        const response = await fetch(`http://localhost:5050/api/coffee/${ccode}`, {  // Correct endpoint
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCoffee),
        });

        if (response.ok) {
            alert("Coffee updated successfully.");
            window.location.reload();
        } else {
            console.error("Failed to update coffee:", await response.text());
        }
    } catch (err) {
        console.error("Error updating coffee:", err);
    }
};

// Load coffee data and display it
getCoffeeData()
    .then((coffees) => {
        if (coffees) {
            coffees.forEach((coffee, index) => { // Pass index
                menu.append(createCoffeeRow(coffee, index));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading coffee data:", err);
    });
    