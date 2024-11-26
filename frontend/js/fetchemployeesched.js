const scheduleTable = document.querySelector('tbody');

// Fetch all employee schedule data
const getScheduleData = async () => {
    try {
        const response = await fetch("http://localhost:5050/api/employeeschedule/");
        if (!response.ok) throw new Error("Failed to fetch employee schedule data.");
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch employee schedule data:", err);
    }
};

// Create a table row for each employee schedule
const createScheduleRow = (schedule, index) => {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    const positionTd = document.createElement('td');
    const shiftTd = document.createElement('td');
    const actionTd = document.createElement('td');

    nameTd.innerText = schedule.employeename;
    positionTd.innerText = schedule.position;
    shiftTd.innerText = `${schedule.shiftfrom} - ${schedule.shiftto}`;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-pen');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editEmployeeschdModal');
    editButton.onclick = () => populateEditScheduleForm(schedule);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.setAttribute('data-bs-toggle', 'modal');
    deleteButton.setAttribute('data-bs-target', '#deleteEmployeeschedModal');
    deleteButton.onclick = () => confirmScheduleDelete(schedule.employeename);  // Passing employeename for deletion

    actionTd.append(editButton, deleteButton);

    tr.append(nameTd, positionTd, shiftTd, actionTd);
    return tr;
};

// Populate the edit schedule form
const populateEditScheduleForm = (schedule) => {
    document.getElementById('editEmployeeName').value = schedule.employeename;
    document.getElementById('editEmployeePosition').value = schedule.position;
    document.getElementById('editEmployeeShiftFrom').value = schedule.shiftfrom;
    document.getElementById('editEmployeeShiftTo').value = schedule.shiftto;
};

// Confirm and handle schedule deletion
const confirmScheduleDelete = (employeename) => {
    const deleteButton = document.querySelector('#deleteEmployeeschedModal .btn-danger');
    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/employeeschedule/${employeename}`, { method: 'DELETE' });
            if (response.ok) {
                alert("Schedule deleted successfully.");
                window.location.reload();  // Refresh the page to reflect the changes
            } else {
                const errorData = await response.json();
                console.error("Failed to delete schedule:", errorData.error);
            }
        } catch (err) {
            console.error("Error deleting schedule:", err);
        }
    };
};

// Add a new employee schedule
document.getElementById('addEmployeeScheduleForm').onsubmit = async (e) => {
    e.preventDefault();

    const newSchedule = {
        employeename: document.getElementById('addEmployeeName').value,
        position: document.getElementById('addEmployeePosition').value,
        shiftfrom: document.getElementById('addEmployeeShiftFrom').value,
        shiftto: document.getElementById('addEmployeeShiftTo').value,
    };

    try {
        const response = await fetch("http://localhost:5050/api/employeeschedule/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSchedule),
        });

        if (response.ok) {
            alert("Schedule added successfully.");
            window.location.reload();
        } else {
            console.error("Failed to add schedule:", await response.text());
        }
    } catch (err) {
        console.error("Error adding schedule:", err);
    }
};

// Edit an existing employee schedule
document.getElementById('editEmployeeScheduleForm').onsubmit = async (e) => {
    e.preventDefault();

    const updatedSchedule = {
        employeename: document.getElementById('editEmployeeName').value,
        position: document.getElementById('editEmployeePosition').value,
        shiftfrom: document.getElementById('editEmployeeShiftFrom').value,
        shiftto: document.getElementById('editEmployeeShiftTo').value,
    };

    try {
        const response = await fetch(`http://localhost:5050/api/employeeschedule/${updatedSchedule.employeename}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSchedule),
        });

        if (response.ok) {
            alert("Schedule updated successfully.");
            window.location.reload();
        } else {
            console.error("Failed to update schedule:", await response.text());
        }
    } catch (err) {
        console.error("Error updating schedule:", err);
    }
};

// Load schedule data and populate the table
getScheduleData()
    .then((schedules) => {
        if (schedules) {
            schedules.forEach((schedule, index) => {
                scheduleTable.append(createScheduleRow(schedule, index));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading schedules:", err);
    });
