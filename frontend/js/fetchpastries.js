const menu = document.querySelector('tbody');

// Fetch all pastry data from the server
const getPastryData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/pastry");  // Correct API endpoint for pastries
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to fetch pastry data:", err);
    }
};

// Create a row for each pastry entry
const createPastryRow = (pastry, index) => { // Add index parameter
    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const stockTd = document.createElement('td');
    const actionTd = document.createElement('td');

    // Use the index for the "No." column
    noTd.innerText = index + 1; // Add 1 to make it 1-based

    codeTd.innerText = pastry.pcode;
    nameTd.innerText = pastry.pastryname;
    stockTd.innerText = pastry.stocks;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-pen');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editPastryModal');
    editButton.onclick = () => populateEditPastryForm(pastry);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deletePastryModal');
    deleteButton.onclick = () => confirmPastryDelete(pastry.pcode); // Use pcode for deletion

    actionTd.append(editButton, deleteButton);

    tr.append(noTd, codeTd, nameTd, stockTd, actionTd);
    return tr;
};

// Populate the form with data to edit
const populateEditPastryForm = (pastry) => {
    document.getElementById('editPastryCode').value = pastry.pcode;
    document.getElementById('editPastryName').value = pastry.pastryname;
    document.getElementById('editPastryStock').value = pastry.stocks;
};

// Handle deletion confirmation
const confirmPastryDelete = (pcode) => {
    const deleteButton = document.querySelector('#deletePastryModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/pastry/${pcode}`, { method: 'DELETE' }); // Correct endpoint for deletion
            if (response.ok) {
                alert("Pastry deleted successfully.");
                window.location.reload(); // Reload page to refresh the list
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
        const response = await fetch("http://localhost:5050/api/pastry", {  // Correct API endpoint for adding pastry
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPastry),
        });

        if (response.ok) {
            alert("Pastry added successfully.");
            window.location.reload(); // Reload the page to show the updated list
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

    const pcode = updatedPastry.pcode; // Using pcode as unique identifier

    try {
        const response = await fetch(`http://localhost:5050/api/pastry/${pcode}`, {  // Correct API endpoint for updating
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPastry),
        });

        if (response.ok) {
            alert("Pastry updated successfully.");
            window.location.reload(); // Reload the page to show the updated list
        } else {
            console.error("Failed to update pastry:", await response.text());
        }
    } catch (err) {
        console.error("Error updating pastry:", err);
    }
};

// Load pastry data and display it
getPastryData()
    .then((pastries) => {
        if (pastries) {
            pastries.forEach((pastry, index) => { // Pass index to create rows
                menu.append(createPastryRow(pastry, index));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading pastries:", err);
    });
