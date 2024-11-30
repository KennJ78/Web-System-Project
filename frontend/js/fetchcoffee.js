const menu = document.querySelector('tbody');

// Fetch all coffee data from the server

const getData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/coffee");  
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to fetch data:", err);
    }
};

// Create a row for each coffee ingredient entry
const createRow = (coffee, index) => { 

    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const stockTd = document.createElement('td');
    const actionTd = document.createElement('td');

    // Use the index for the "No." column

    noTd.innerText = index + 1; 


    codeTd.innerText = coffee.ccode;
    nameTd.innerText = coffee.coffeename;
    stockTd.innerText = coffee.stocks;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    const restockButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-box-arrow-down');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editCoffeeModal');
    editButton.onclick = () => populateEditForm(coffee);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deleteCoffeeModal');

    deleteButton.onclick = () => confirmDelete(coffee.ccode);  

    restockButton.classList.add('btn', 'btn-warning', 'bi', 'bi-arrow-up-square');
    restockButton.setAttribute('data-bs-toggle', 'modal');
    restockButton.setAttribute('data-bs-target', '#restockModal');
    restockButton.onclick = () => setRestockData(coffee.ccode, coffee.coffeename);

    actionTd.append(editButton, deleteButton, restockButton);


    tr.append(noTd, codeTd, nameTd, stockTd, actionTd);
    return tr;
};

// Populate the form with data to edit

const populateEditForm = (coffee) => {

    document.getElementById('editCoffeeCode').value = coffee.ccode;
    document.getElementById('editCoffeeName').value = coffee.coffeename;
    document.getElementById('editCoffeeStock').value = coffee.stocks;
};

// Handle restock functionality
const setRestockData = (ccode, coffeename) => {
    document.getElementById('restockCoffeeCode').value = ccode;
    document.getElementById('restockCoffeeName').value = coffeename;
};

// Handle restocking coffee
document.getElementById('restockCoffeeForm').onsubmit = async (e) => {
    e.preventDefault();

    const ccode = document.getElementById('restockCoffeeCode').value;
    const restockAmount = document.getElementById('restockAmount').value;

    if (!ccode || !restockAmount) {
        alert("Both Coffee Code and Restock Amount are required.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5050/api/coffee/${ccode}/restock`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restockAmount }),
        });

        if (response.ok) {
            alert("Coffee ingredient restocked successfully.");
            window.location.reload();
        } else {
            const errorText = await response.json();
            console.error("Failed to restock coffee:", errorText);
            alert(`Error: ${errorText.error}`);
        }
    } catch (err) {
        console.error("Error restocking coffee:", err);
        alert("An error occurred while restocking the coffee.");
    }
};

// Handle deletion confirmation
const confirmDelete = (ccode) => {
    const deleteButton = document.querySelector('#deleteCoffeeModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/coffee/${ccode}`, { method: 'DELETE' });
            if (response.ok) {
                alert("Coffee ingredient deleted successfully.");

                window.location.reload();
            } else {
                console.error("Failed to delete coffee:", await response.text());
            }
        } catch (err) {
            console.error("Error deleting coffee:", err);
        }
    };
};


// Add new coffee ingredient functionality

document.getElementById('addCoffeeForm').onsubmit = async (e) => {
    e.preventDefault();

    const newCoffee = {
        ccode: document.getElementById('coffeeCode').value,
        coffeename: document.getElementById('coffeeName').value,
        stocks: document.getElementById('coffeeStock').value,
    };

    try {

        const response = await fetch("http://localhost:5050/api/coffee", {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCoffee),
        });

        if (response.ok) {

            alert("Coffee ingredient added successfully.");

            window.location.reload();
        } else {
            console.error("Failed to add coffee:", await response.text());
        }
    } catch (err) {
        console.error("Error adding coffee:", err);
    }
};


// Edit coffee ingredient functionality

document.getElementById('editCoffeeForm').onsubmit = async (e) => {
    e.preventDefault();

    const updatedCoffee = {
        ccode: document.getElementById('editCoffeeCode').value,
        coffeename: document.getElementById('editCoffeeName').value,
        stocks: document.getElementById('editCoffeeStock').value,
    };


    const ccode = updatedCoffee.ccode;

    try {
        const response = await fetch(`http://localhost:5050/api/coffee/${ccode}`, {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCoffee),
        });

        if (response.ok) {

            alert("Coffee ingredient updated successfully.");

            window.location.reload();
        } else {
            console.error("Failed to update coffee:", await response.text());
        }
    } catch (err) {
        console.error("Error updating coffee:", err);
    }
};

// Load coffee data and display it

getData()
    .then((coffees) => {
        if (coffees) {
            coffees.forEach((coffee, index) => {
                menu.append(createRow(coffee, index));

            });
        }
    })
    .catch((err) => {

        console.error("Error loading coffee ingredients:", err);
    });
