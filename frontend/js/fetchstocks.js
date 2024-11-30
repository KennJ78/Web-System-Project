const allStocksTable = document.querySelector('#allStocksTable tbody');

// Helper function to create a row for any category
const createStockRow = (item, index, category) => {
    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const codeTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const categoryTd = document.createElement('td');
    const stockTd = document.createElement('td');

    noTd.innerText = index + 1;
    codeTd.innerText = item.code || item.bcode || item.ccode || item.pcode; 
    nameTd.innerText = item.name || item.breadname || item.coffeename || item.pastryname;
    categoryTd.innerText = category;
    stockTd.innerText = item.stocks;

    tr.append(noTd, codeTd, nameTd, categoryTd, stockTd);

    return tr;
};

// Fetch data and populate the table
const fetchAndDisplayStocks = async () => {
    try {
        const [breads, coffees, pastries] = await Promise.all([
            fetch("http://localhost:5050/api/bread").then((res) => res.json()),
            fetch("http://localhost:5050/api/coffee").then((res) => res.json()),
            fetch("http://localhost:5050/api/pastry").then((res) => res.json())
        ]);

        let index = 0;

        // Append bread stocks
        breads.forEach((bread) => {
            allStocksTable.append(createStockRow(bread, index++, "Bread"));
        });

        // Append coffee stocks
        coffees.forEach((coffee) => {
            allStocksTable.append(createStockRow(coffee, index++, "Coffee"));
        });

        // Append pastry stocks
        pastries.forEach((pastry) => {
            allStocksTable.append(createStockRow(pastry, index++, "Pastry"));
        });
    } catch (err) {
        console.error("Failed to fetch stock data:", err);
    }
};

// Load stocks on page load
fetchAndDisplayStocks();
