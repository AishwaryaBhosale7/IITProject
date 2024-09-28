let data = [
    {"id": 1, "ChemicalName": "Ammonium Persulfate", "Vendor": "LG Chem", "Density": 3525.92, "Viscosity": 60.63, "Packaging": "Bag", "PackSize": 100.00, "Unit": "kg", "Quantity": 6495.18},
    {"id": 2, "ChemicalName": "Caustic Potash", "Vendor": "Formosa", "Density": 3172.15, "Viscosity": 48.22, "Packaging": "Bag", "PackSize": 100.00, "Unit": "kg", "Quantity": 8751.90},
    {"id": 3, "ChemicalName": "Dimethylaminoprapylamino", "Vendor": "LG Chem", "Density": 8435.37, "Viscosity": 12.62, "Packaging": "Barrel", "PackSize": 75.00, "Unit": "L", "Quantity": 5964.61},
    {"id": 4, "ChemicalName": "Mono Ammonium Phosphate", "Vendor": "Sinopec", "Density": 1597.65, "Viscosity": 76.51, "Packaging": "Bag", "PackSize": 105.00, "Unit": "kg", "Quantity": 8183.73},
    {"id": 5, "ChemicalName": "Ferric Nitrate", "Vendor": "DowDuPont", "Density": 364.04, "Viscosity": 14.90, "Packaging": "Bag", "PackSize": 105.00, "Unit": "kg", "Quantity": 4154.33},
    {"id": 6, "ChemicalName": "n-Pentane", "Vendor": "Sinopec", "Density": 4535.26, "Viscosity": 66.76, "Packaging": "N/A", "PackSize": "N/A", "Unit": "t", "Quantity": 6272.34},
    {"id": 7, "ChemicalName": "Glycol Ether PM", "Vendor": "LG Chem", "Density": 6495.18, "Viscosity": 72.12, "Packaging": "Bag", "PackSize": 250.00, "Unit": "kg", "Quantity": 8749.54},
    {"id": 8, "ChemicalName": "Methanol", "Vendor": "ChemCorp", "Density": 0.79, "Viscosity": 0.59, "Packaging": "Bottle", "PackSize": 500, "Unit": "ml", "Quantity": 28},
    {"id": 9, "ChemicalName": "Nitric Acid", "Vendor": "LabSupplies", "Density": 1.51, "Viscosity": 1.0, "Packaging": "Can", "PackSize": 1000, "Unit": "ml", "Quantity": 12},
    {"id": 10, "ChemicalName": "Phenol", "Vendor": "ChemCorp", "Density": 1.07, "Viscosity": 0.95, "Packaging": "Bottle", "PackSize": 500, "Unit": "ml", "Quantity": 16},
    {"id": 11, "ChemicalName": "Sulfuric Acid", "Vendor": "LabSupplies", "Density": 1.84, "Viscosity": 1.84, "Packaging": "Can", "PackSize": 1000, "Unit": "ml", "Quantity": 14},
    {"id": 12, "ChemicalName": "Toluene", "Vendor": "ChemCorp", "Density": 0.87, "Viscosity": 0.59, "Packaging": "Bottle", "PackSize": 500, "Unit": "ml", "Quantity": 20},
    {"id": 13, "ChemicalName": "Urea", "Vendor": "LabSupplies", "Density": 1.32, "Viscosity": 1.1, "Packaging": "Bag", "PackSize": 1000, "Unit": "g", "Quantity": 25},
    {"id": 14, "ChemicalName": "Water", "Vendor": "ChemCorp", "Density": 1.0, "Viscosity": 1.0, "Packaging": "Bottle", "PackSize": 1000, "Unit": "ml", "Quantity": 50},
    {"id": 15, "ChemicalName": "Xylene", "Vendor": "LabSupplies", "Density": 0.86, "Viscosity": 0.6, "Packaging": "Can", "PackSize": 1000, "Unit": "ml", "Quantity": 17}
];
    
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; 
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.onclick = () => {
            const previouslySelected = document.querySelector('tr.selected');
            if (previouslySelected) previouslySelected.classList.remove('selected');
            row.classList.add('selected');
        };
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.ChemicalName}</td>
            <td>${item.Vendor}</td>
            <td>${item.Density}</td>
            <td>${item.Viscosity}</td>
            <td>${item.Packaging}</td>
            <td>${item.PackSize}</td>
            <td>${item.Unit}</td>
            <td>${item.Quantity}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editRow(${index})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
    
function sortTable(columnIndex) {
    const isAscending = document.querySelector(`th:nth-child(${columnIndex + 1})`).classList.toggle('asc');
    
    data.sort((a, b) => {
        const keyA = a[Object.keys(a)[columnIndex]];
        const keyB = b[Object.keys(b)[columnIndex]];

        if (columnIndex === 0) { 
            return isAscending ? keyA - keyB : keyB - keyA; 
        }

        if (columnIndex === 3 || columnIndex === 4 || columnIndex === 6 || columnIndex === 8) {
            return isAscending ? keyA - keyB : keyB - keyA; 
        } else {
            return isAscending ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA); 
        }
    });
    
    populateTable();
}
    
    
    
function addRow() {
    const emptyFields = data.some(item => {
        return item.ChemicalName === '' || item.Vendor === ''; // Example: adjust based on your requirements
    });

    if (emptyFields) {
        alert("Please fill out all required fields before adding a new row.");
        return; 
    }
    const newRow = {
        id: data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1,
        ChemicalName: '',
        Vendor: '',
        Density: '',
        Viscosity: '',
        Packaging: '',
        PackSize: '',
        Unit: '',
        Quantity: ''
    };
    data.push(newRow);
    populateTable();
    editRow(data.length - 1); 
}
    
function moveRowUp() {
    const selectedRow = document.querySelector('tr.selected');
    if (selectedRow && selectedRow.rowIndex > 1) {
        const index = selectedRow.rowIndex - 1;
        [data[index], data[index - 1]] = [data[index - 1], data[index]]; 
        selectedRow.parentNode.insertBefore(selectedRow, selectedRow.previousElementSibling);
        populateTable();
    }
}

function moveRowDown() {
    const selectedRow = document.querySelector('tr.selected');
    if (selectedRow && selectedRow.rowIndex < data.length) {
        const index = selectedRow.rowIndex - 1;
        [data[index], data[index + 1]] = [data[index + 1], data[index]]; 
        selectedRow.parentNode.insertBefore(selectedRow.nextElementSibling, selectedRow);
        populateTable();
    }
}
    
function deleteRow() {
    const selectedRow = document.querySelector('tr.selected');
    if (selectedRow) {
        const index = selectedRow.rowIndex - 1;
        data.splice(index, 1);
        populateTable();
    }
}
    
function refreshData() {
    const uniqueIds = new Set(data.map(item => item.id));
    if (uniqueIds.size !== data.length) {
        data = data.filter((item, index, self) =>
            index === self.findIndex((t) => (t.id === item.id))
        );
    }

    data.sort((a, b) => a.id - b.id); 
    populateTable();
}
    
function saveData() {
    console.log('Data saved:', JSON.stringify(data, null, 2));
}

function editRow(index) {
    const tableBody = document.getElementById('tableBody');
    const row = tableBody.rows[index];
    if (!row) return;
    const cells = row.cells;
    for (let i = 1; i < cells.length - 1; i++) {
        const cell = cells[i];
        const input = document.createElement('input');
        input.type = 'text';
        input.value = cell.innerText;
        cell.innerHTML = '';
        cell.appendChild(input);
    }
    cells[cells.length - 1].innerHTML = `
        <button class="btn btn-success btn-sm" onclick="saveRow(${index})">Save</button>
        <button class="btn btn-secondary btn-sm" onclick="cancelEdit(${index})">Cancel</button>
    `;
}
    
function saveRow(index) {
    const tableBody = document.getElementById('tableBody');
    const row = tableBody.rows[index];
    if (!row) return;
    const cells = row.cells;
    for (let i = 0; i < cells.length - 1; i++) {
        const cell = cells[i];
        const input = cell.firstChild;
        if (input && input.tagName === 'INPUT') {
            cell.innerHTML = input.value;
            data[index][Object.keys(data[index])[i]] = input.value; 
        }
    }
    cells[cells.length - 1].innerHTML = `
        <button class="btn btn-warning btn-sm" onclick="editRow(${index})">Edit</button>
    `;
}

function cancelEdit(index) {
    populateTable();
}

document.addEventListener('DOMContentLoaded', populateTable);
    