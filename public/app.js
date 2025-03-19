document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
    
    // Add event listeners
    addEventListeners();
});

// Initialize the application
function initApp() {
    // Render categories
    renderCategories();
    
    // Initialize search functionality
    initSearch();
}

// Add event listeners
function addEventListeners() {
    // Tab navigation
    document.querySelectorAll('nav a').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Close modal
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('tableModal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target == document.getElementById('tableModal')) {
            document.getElementById('tableModal').style.display = 'none';
        }
    });
    
    // Search button
    document.getElementById('searchButton').addEventListener('click', function() {
        performSearch();
    });
    
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Switch between tabs
function switchTab(tabId) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('nav a').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to selected tab
    document.querySelector(`nav a[data-tab="${tabId}"]`).classList.add('active');
    
    // Render content based on selected tab
    if (tabId === 'categories') {
        renderCategories();
    } else if (tabId === 'schema') {
        renderSchema();
    } else if (tabId === 'dictionary') {
        renderDictionary();
    }
}

// Render categories
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';
    
    schemaData.categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('data-category', category.id);
        
        const tables = category.tables.map(tableId => {
            const table = schemaData.tables.find(t => t.id === tableId);
            return table ? table.name : tableId;
        });
        
        categoryCard.innerHTML = `
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="tables-count">${tables.length} جداول</div>
            <ul class="tables-list">
                ${tables.map(tableName => `<li>${tableName}</li>`).join('')}
            </ul>
        `;
        
        categoryCard.addEventListener('click', function() {
            showCategoryDetails(category);
        });
        
        container.appendChild(categoryCard);
    });
}

// Show category details in modal
function showCategoryDetails(category) {
    const modal = document.getElementById('tableModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = category.name;
    
    let content = `<p>${category.description}</p>`;
    content += '<h3>الجداول</h3>';
    content += '<ul class="modal-tables-list">';
    
    category.tables.forEach(tableId => {
        const table = schemaData.tables.find(t => t.id === tableId);
        if (table) {
            content += `<li>
                <div class="table-name">${table.name}</div>
                <div class="table-description">${table.description}</div>
                <button class="view-table-btn" data-table="${table.id}">عرض التفاصيل</button>
            </li>`;
        }
    });
    
    content += '</ul>';
    modalContent.innerHTML = content;
    
    // Add event listeners to view table buttons
    modalContent.querySelectorAll('.view-table-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tableId = this.getAttribute('data-table');
            const table = schemaData.tables.find(t => t.id === tableId);
            showTableDetails(table);
        });
    });
    
    modal.style.display = 'block';
}

// Show table details in modal
function showTableDetails(table) {
    const modal = document.getElementById('tableModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = table.name;
    
    let content = `<p>${table.description}</p>`;
    content += '<h3>الأعمدة</h3>';
    content += '<table class="schema-table">';
    content += '<thead><tr><th>الاسم</th><th>النوع</th><th>المفتاح الرئيسي</th><th>المفتاح الخارجي</th></tr></thead>';
    content += '<tbody>';
    
    table.columns.forEach(column => {
        content += `<tr>
            <td>${column.name}</td>
            <td>${column.type}</td>
            <td>${column.primaryKey ? '✓' : ''}</td>
            <td>${column.foreignKey || ''}</td>
        </tr>`;
    });
    
    content += '</tbody></table>';
    modalContent.innerHTML = content;
    
    modal.style.display = 'block';
}

// Render schema
function renderSchema() {
    const container = document.getElementById('schemaContainer');
    container.innerHTML = '';
    
    schemaData.categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'schema-category';
        
        categorySection.innerHTML = `<h3>${category.name}</h3>`;
        
        const tables = schemaData.tables.filter(table => table.category === category.id);
        
        tables.forEach(table => {
            const tableElement = document.createElement('div');
            tableElement.className = 'schema-table-container';
            
            let tableHtml = `<h4>${table.name}</h4>`;
            tableHtml += '<table class="schema-table">';
            tableHtml += '<thead><tr><th>الاسم</th><th>النوع</th><th>المفتاح الرئيسي</th><th>المفتاح الخارجي</th></tr></thead>';
            tableHtml += '<tbody>';
            
            table.columns.forEach(column => {
                tableHtml += `<tr>
                    <td>${column.name}</td>
                    <td>${column.type}</td>
                    <td>${column.primaryKey ? '✓' : ''}</td>
                    <td>${column.foreignKey || ''}</td>
                </tr>`;
            });
            
            tableHtml += '</tbody></table>';
            tableElement.innerHTML = tableHtml;
            
            categorySection.appendChild(tableElement);
        });
        
        container.appendChild(categorySection);
    });
}

// Render dictionary
function renderDictionary() {
    const container = document.getElementById('dictionaryContainer');
    container.innerHTML = '';
    
    const allTables = schemaData.tables;
    
    let dictionaryHtml = '<table class="dictionary-table">';
    dictionaryHtml += '<thead><tr><th>الجدول</th><th>العمود</th><th>النوع</th><th>الوصف</th></tr></thead>';
    dictionaryHtml += '<tbody>';
    
    allTables.forEach(table => {
        table.columns.forEach(column => {
            dictionaryHtml += `<tr>
                <td>${table.name}</td>
                <td>${column.name}</td>
                <td>${column.type}</td>
                <td>${column.description || ''}</td>
            </tr>`;
        });
    });
    
    dictionaryHtml += '</tbody></table>';
    container.innerHTML = dictionaryHtml;
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            renderCategories();
        }
    });
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (searchTerm === '') {
        renderCategories();
        return;
    }
    
    const results = [];
    
    // Search in tables
    schemaData.tables.forEach(table => {
        if (
            table.name.toLowerCase().includes(searchTerm) ||
            table.name_en.toLowerCase().includes(searchTerm) ||
            table.description.toLowerCase().includes(searchTerm)
        ) {
            results.push({
                type: 'table',
                id: table.id,
                name: table.name,
                table_id: table.id,
                category: table.category
            });
        }
        
        // Search in columns
        table.columns.forEach(column => {
            if (
                column.name.toLowerCase().includes(searchTerm) ||
                column.name_en.toLowerCase().includes(searchTerm) ||
                (column.description && column.description.toLowerCase().includes(searchTerm))
            ) {
                results.push({
                    type: 'column',
                    id: `${table.id}.${column.name}`,
                    name: column.name,
                    table_id: table.id,
                    table_name: table.name
                });
            }
        });
    });
    
    // Display search results
    displaySearchResults(results);
}

// Display search results
function displaySearchResults(results) {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">لا توجد نتائج للبحث</div>';
        return;
    }
    
    const resultsElement = document.createElement('div');
    resultsElement.className = 'search-results';
    
    resultsElement.innerHTML = `<h3>نتائج البحث (${results.length})</h3>`;
    
    const resultsList = document.createElement('ul');
    resultsList.className = 'results-list';
    
    results.forEach(result => {
        const resultItem = document.createElement('li');
        
        if (result.type === 'table') {
            resultItem.innerHTML = `
                <div class="result-item">
                    <div class="result-type">جدول</div>
                    <div class="result-name">${result.name}</div>
                    <button class="view-result-btn" data-table="${result.table_id}">عرض التفاصيل</button>
                </div>
            `;
        } else if (result.type === 'column') {
            resultItem.innerHTML = `
                <div class="result-item">
                    <div class="result-type">عمود</div>
                    <div class="result-name">${result.name}</div>
                    <div class="result-table">في جدول: ${result.table_name}</div>
                    <button class="view-result-btn" data-table="${result.table_id}">عرض التفاصيل</button>
                </div>
            `;
        }
        
        resultsList.appendChild(resultItem);
    });
    
    resultsElement.appendChild(resultsList);
    container.appendChild(resultsElement);
    
    // Add event listeners to view result buttons
    container.querySelectorAll('.view-result-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tableId = this.getAttribute('data-table');
            const table = schemaData.tables.find(t => t.id === tableId);
            showTableDetails(table);
        });
    });
}
