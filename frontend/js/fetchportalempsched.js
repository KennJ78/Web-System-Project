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
const createScheduleRow = (schedule) => {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    const positionTd = document.createElement('td');
    const shiftTd = document.createElement('td');

    nameTd.innerText = schedule.employeename;
    positionTd.innerText = schedule.position;
    shiftTd.innerText = `${schedule.shiftfrom} - ${schedule.shiftto}`;

    // Append cells to the row
    tr.append(nameTd, positionTd, shiftTd);

    return tr;
};

// Load schedule data and populate the table
getScheduleData()
    .then((schedules) => {
        if (schedules) {
            schedules.forEach((schedule) => {
                scheduleTable.append(createScheduleRow(schedule));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading schedules:", err);
    });
