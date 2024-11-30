const menu = document.querySelector('tbody');

// Fetch all bread data from the server
const getData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/bread");  
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to fetch data:", err);
    }
};

// Create a row for each bread entry
const createRow = (bread, index) => {
    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const stockTd = document.createElement('td');
    const actionTd = document.createElement('td');

    // Use the index for the "No." column
    noTd.innerText = index + 1; 

    codeTd.innerText = bread.bcode;
    nameTd.innerText = bread.breadname;
    stockTd.innerText = bread.stocks;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const restockButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-box-arrow-down');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editBreadModal');
    editButton.onclick = () => populateEditForm(bread);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deleteBreadModal');
    deleteButton.onclick = () => confirmDelete(bread.bcode);  

    restockButton.classList.add('btn', 'btn-warning', 'bi', 'bi-arrow-up-square');
    restockButton.setAttribute('data-bs-toggle', 'modal');
    restockButton.setAttribute('data-bs-target', '#restockModal');
    restockButton.onclick = () => setRestockData(bread.bcode, bread.breadname);

    actionTd.append(editButton, deleteButton, restockButton);

    tr.append(noTd, codeTd, nameTd, stockTd, actionTd);
    return tr;
};

// Populate the form with data to edit
const populateEditForm = (bread) => {
    document.getElementById('editBreadCode').value = bread.bcode;
    document.getElementById('editBreadName').value = bread.breadname;
    document.getElementById('editBreadStock').value = bread.stocks;
};

// Handle restock functionality
const setRestockData = (bcode, breadname) => {
    document.getElementById('restockBreadCode').value = bcode;
    document.getElementById('restockBreadName').value = breadname;
};

// Handle restocking bread
document.getElementById('restockForm').onsubmit = async (e) => {
    e.preventDefault();

    const bcode = document.getElementById('restockBreadCode').value;
    const restockAmount = document.getElementById('restockAmount').value;

    if (!bcode || !restockAmount) {
        alert("Both bcode and restock amount are required.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5050/api/bread/${bcode}/restock`, { // Include bcode in URL
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restockAmount }),
        });

        if (response.ok) {
            alert("Bread restocked successfully.");
            window.location.reload();
        } else {
            const errorText = await response.json();
            console.error("Failed to restock bread:", errorText);
            alert(`Error: ${errorText.error}`);
        }
    } catch (err) {
        console.error("Error restocking bread:", err);
        alert("An error occurred while restocking the bread.");
    }
};


// Handle deletion confirmation
const confirmDelete = (bcode) => {
    const deleteButton = document.querySelector('#deleteBreadModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/bread/${bcode}`, { method: 'DELETE' });
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
        const response = await fetch("http://localhost:5050/api/bread", {
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

    const bcode = updatedBread.bcode;

    try {
        const response = await fetch(`http://localhost:5050/api/bread/${bcode}`, {
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
            breads.forEach((bread, index) => {
                menu.append(createRow(bread, index));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading breads:", err);
    });
