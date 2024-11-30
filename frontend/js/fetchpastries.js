const menu = document.querySelector('tbody');

// Fetch all pastry data from the server

const getData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/pastry");  
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to fetch data:", err);

    }
};

// Create a row for each pastry entry

const createRow = (pastry, index) => { 

    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const stockTd = document.createElement('td');
    const actionTd = document.createElement('td');

    // Use the index for the "No." column

    noTd.innerText = index + 1; 
    codeTd.innerText = pastry.pcode;
    nameTd.innerText = pastry.pastryname;
    stockTd.innerText = pastry.stocks;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const restockButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-box-arrow-down');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editPastryModal');
    editButton.onclick = () => populateEditForm(pastry);

    deleteButton.classList.add('btn', 'bg-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deletePastryModal');
    deleteButton.onclick = () => confirmDelete(pastry.pcode);  

    restockButton.classList.add('btn', 'btn-warning', 'bi', 'bi-arrow-up-square');
    restockButton.setAttribute('data-bs-toggle', 'modal');
    restockButton.setAttribute('data-bs-target', '#restockPastryModal');
    restockButton.onclick = () => setRestockData(pastry.pcode, pastry.pastryname);

    actionTd.append(editButton, deleteButton, restockButton);


    tr.append(noTd, codeTd, nameTd, stockTd, actionTd);
    return tr;
};

// Populate the form with data to edit

const populateEditForm = (pastry) => {

    document.getElementById('editPastryCode').value = pastry.pcode;
    document.getElementById('editPastryName').value = pastry.pastryname;
    document.getElementById('editPastryStock').value = pastry.stocks;
};

// Handle restock functionality
const setRestockData = (pcode, pastryname) => {
    document.getElementById('restockPastryCode').value = pcode;
    document.getElementById('restockPastryName').value = pastryname;
};

// Handle restocking pastry
document.getElementById('restockPastryForm').onsubmit = async (e) => {
    e.preventDefault();

    const pcode = document.getElementById('restockPastryCode').value;
    const restockAmount = document.getElementById('restockAmount').value;

    if (!pcode || !restockAmount) {
        alert("Both Pastry Code and Restock Amount are required.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5050/api/pastry/${pcode}/restock`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restockAmount }),
        });

        if (response.ok) {
            alert("Pastry restocked successfully.");
            window.location.reload();
        } else {
            const errorText = await response.json();
            console.error("Failed to restock pastry:", errorText);
            alert(`Error: ${errorText.error}`);
        }
    } catch (err) {
        console.error("Error restocking pastry:", err);
        alert("An error occurred while restocking the pastry.");
    }
};

// Handle deletion confirmation
const confirmDelete = (pcode) => {
    const deleteButton = document.querySelector('#deletePastryModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/pastry/${pcode}`, { method: 'DELETE' });
            if (response.ok) {
                alert("Pastry deleted successfully.");
                window.location.reload();
            } else {
                console.error("Failed to delete pastry:", await response.text());
            }
        } catch (err) {
            console.error("Error deleting pastry:", err);
        }
    };
};

// Add new pastry functionality
document.getElementById('addPastryForm').onsubmit = async (e) => {
    e.preventDefault();

    const newPastry = {
        pcode: document.getElementById('pastryCode').value,
        pastryname: document.getElementById('pastryName').value,
        stocks: document.getElementById('pastryStock').value,
    };

    try {

        const response = await fetch("http://localhost:5050/api/pastry", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPastry),
        });

        if (response.ok) {
            alert("Pastry added successfully.");

            window.location.reload();

        } else {
            console.error("Failed to add pastry:", await response.text());
        }
    } catch (err) {
        console.error("Error adding pastry:", err);
    }
};

// Edit pastry functionality
document.getElementById('editPastryForm').onsubmit = async (e) => {
    e.preventDefault();

    const updatedPastry = {
        pcode: document.getElementById('editPastryCode').value,
        pastryname: document.getElementById('editPastryName').value,
        stocks: document.getElementById('editPastryStock').value,
    };

    const pcode = updatedPastry.pcode;

    try {
        const response = await fetch(`http://localhost:5050/api/pastry/${pcode}`, {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPastry),
        });

        if (response.ok) {
            alert("Pastry updated successfully.");
            window.location.reload();
        } else {
            console.error("Failed to update pastry:", await response.text());
        }
    } catch (err) {
        console.error("Error updating pastry:", err);
    }
};

// Load pastry data and display it

getData()
    .then((pastries) => {
        if (pastries) {
            pastries.forEach((pastry, index) => {
                menu.append(createRow(pastry, index));

            });
        }
    })
    .catch((err) => {
        console.error("Error loading pastries:", err);
    });
