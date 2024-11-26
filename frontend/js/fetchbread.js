const menu = document.querySelector('tbody');

// Fetch all bread data from the server
const getData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/bread");  // Adjusted endpoint
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to fetch data:", err);
    }
};

// Create a row for each bread entry
const createRow = (bread, index) => { // Add index parameter
    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const stockTd = document.createElement('td');
    const actionTd = document.createElement('td');

    // Use the index for the "No." column
    noTd.innerText = index + 1; // Add 1 to make it 1-based

    codeTd.innerText = bread.bcode;
    nameTd.innerText = bread.breadname;
    stockTd.innerText = bread.stocks;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-pen');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editBreadModal');
    editButton.onclick = () => populateEditForm(bread);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deleteBreadModal');
    deleteButton.onclick = () => confirmDelete(bread.bcode);  // Use bcode for deletion

    actionTd.append(editButton, deleteButton);

    tr.append(noTd, codeTd, nameTd, stockTd, actionTd);
    return tr;
};

// Populate the form with data to edit
const populateEditForm = (bread) => {
    document.getElementById('editBreadCode').value = bread.bcode;
    document.getElementById('editBreadName').value = bread.breadname;
    document.getElementById('editBreadStock').value = bread.stocks;
};

// Handle deletion confirmation
const confirmDelete = (bcode) => {
    const deleteButton = document.querySelector('#deleteBreadModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/bread/${bcode}`, { method: 'DELETE' }); // Correct endpoint
            if (response.ok) {
                alert("Bread deleted successfully.");
                window.location.reload();
            } else {
                console.error("Failed to delete bread:", await response.text());
            }
        } catch (err) {
            console.error("Error deleting bread:", err);
        }
    };
};

// Add new bread functionality
document.getElementById('addBreadForm').onsubmit = async (e) => {
    e.preventDefault();

    const newBread = {
        bcode: document.getElementById('breadCode').value,
        breadname: document.getElementById('breadName').value,
        stocks: document.getElementById('breadStock').value,
    };

    try {
        const response = await fetch("http://localhost:5050/api/bread", {  // Correct endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBread),
        });

        if (response.ok) {
            alert("Bread added successfully.");
            window.location.reload();
        } else {
            console.error("Failed to add bread:", await response.text());
        }
    } catch (err) {
        console.error("Error adding bread:", err);
    }
};

// Edit bread functionality
document.getElementById('editBreadForm').onsubmit = async (e) => {
    e.preventDefault();

    const updatedBread = {
        bcode: document.getElementById('editBreadCode').value,
        breadname: document.getElementById('editBreadName').value,
        stocks: document.getElementById('editBreadStock').value,
    };

    const bcode = updatedBread.bcode; // Using bcode as unique identifier

    try {
        const response = await fetch(`http://localhost:5050/api/bread/${bcode}`, {  // Correct endpoint
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBread),
        });

        if (response.ok) {
            alert("Bread updated successfully.");
            window.location.reload();
        } else {
            console.error("Failed to update bread:", await response.text());
        }
    } catch (err) {
        console.error("Error updating bread:", err);
    }
};

// Load bread data and display it
getData()
    .then((breads) => {
        if (breads) {
            breads.forEach((bread, index) => { // Pass index
                menu.append(createRow(bread, index));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading breads:", err);
    });
