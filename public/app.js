// Main application JavaScript for WMS Interactive Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize the application
function initApp() {
    // Load categories
    loadCategories();
    
    // Load schema viewer options
    loadSchemaViewerOptions();
    
    // Load dictionary data
    loadDictionaryData();
    
    // Load initial workflow (inbound)
    loadWorkflow('inbound');
    
    // Set up search functionality
    setupSearch();
}

// Set up event listeners
function setupEventListeners() {
    // Navigation tabs
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active tab
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Category filter for schema viewer
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const category = this.value;
            renderSchemaViewer(category);
        });
    }
    
    // Workflow tabs
    const workflowTabs = document.querySelectorAll('.workflow-tab');
    workflowTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const workflow = this.getAttribute('data-workflow');
            loadWorkflow(workflow);
            
            // Update active tab
            workflowTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Dictionary search
    const dictionarySearch = document.getElementById('dictionarySearch');
    if (dictionarySearch) {
        dictionarySearch.addEventListener('input', function() {
            filterDictionary(this.value);
        });
    }
    
    // Schema viewer controls
    document.getElementById('zoomIn').addEventListener('click', function() {
        zoomSchemaViewer(1.2);
    });
    
    document.getElementById('zoomOut').addEventListener('click', function() {
        zoomSchemaViewer(0.8);
    });
    
    document.getElementById('resetView').addEventListener('click', function() {
        resetSchemaViewer();
    });
    
    // Close modal
    const closeModal = document.querySelector('.close');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('tableDetailsModal').style.display = 'none';
        });
    }
    
    // Modal tabs
    const modalTabs = document.querySelectorAll('.modal-tab');
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showModalTab(tabName);
            
            // Update active tab
            modalTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('tableDetailsModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active-section');
    }
}

// Load categories
function loadCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = '';
    
    schemaData.categories.forEach(category => {
        const categoryTables = schemaData.tables.filter(table => table.category === category.id);
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-header">
                <h3>${category.name}</h3>
                <p>${category.name_en}</p>
            </div>
            <div class="category-body">
                <p>${category.description}</p>
                <div class="tables-list">
                    <h4>الجداول:</h4>
                    <ul>
                        ${categoryTables.map(table => `
                            <li><a href="#" data-table-id="${table.id}">${table.name}</a></li>
                        `).join('')}
                    </ul>
                </div>
                <a href="#" class="view-details" data-category-id="${category.id}">عرض التفاصيل &larr;</a>
            </div>
        `;
        
        categoriesGrid.appendChild(categoryCard);
        
        // Add event listeners for table links
        const tableLinks = categoryCard.querySelectorAll('.tables-list a');
        tableLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tableId = this.getAttribute('data-table-id');
                showTableDetails(tableId);
            });
        });
        
        // Add event listener for view details link
        const viewDetailsLink = categoryCard.querySelector('.view-details');
        viewDetailsLink.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryId = this.getAttribute('data-category-id');
            showSection('schema');
            document.getElementById('categoryFilter').value = categoryId;
            renderSchemaViewer(categoryId);
            
            // Update active tab in navigation
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('nav a[data-section="schema"]').classList.add('active');
        });
    });
    
    // Also populate category filter dropdown
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">جميع الفئات</option>';
        
        schemaData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
    }
}

// Load schema viewer options
function loadSchemaViewerOptions() {
    // This function populates the category filter dropdown for the schema viewer
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    categoryFilter.innerHTML = '<option value="">جميع الفئات</option>';
    
    schemaData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
    
    // Initial render of schema viewer
    renderSchemaViewer();
}

// Render schema viewer
function renderSchemaViewer(categoryFilter = '') {
    const schemaViewer = document.getElementById('schemaViewer');
    if (!schemaViewer) return;
    
    schemaViewer.innerHTML = '';
    
    // Filter tables based on category
    let tables = schemaData.tables;
    if (categoryFilter) {
        tables = tables.filter(table => table.category === categoryFilter);
    }
    
    // Calculate positions for tables
    const tableWidth = 180;
    const tableHeight = 100;
    const horizontalSpacing = 250;
    const verticalSpacing = 150;
    const tablesPerRow = 4;
    
    tables.forEach((table, index) => {
        const row = Math.floor(index / tablesPerRow);
        const col = index % tablesPerRow;
        
        const left = col * horizontalSpacing + 50;
        const top = row * verticalSpacing + 50;
        
        const tableNode = document.createElement('div');
        tableNode.className = 'table-node';
        tableNode.style.left = `${left}px`;
        tableNode.style.top = `${top}px`;
        tableNode.setAttribute('data-table-id', table.id);
        tableNode.innerHTML = `
            <h4>${table.name}</h4>
            <p>${table.name_en}</p>
        `;
        
        tableNode.addEventListener('click', function() {
            const tableId = this.getAttribute('data-table-id');
            showTableDetails(tableId);
        });
        
        schemaViewer.appendChild(tableNode);
    });
    
    // Draw relationships
    drawRelationships(schemaViewer, tables, categoryFilter);
}

// Draw relationships between tables
function drawRelationships(container, tables, categoryFilter) {
    // This is a simplified version - in a real implementation, we would use SVG or Canvas
    // to draw actual lines between tables. For this simplified version, we'll skip the
    // visual representation of relationships.
    
    // In a complete implementation, we would:
    // 1. Filter relationships based on visible tables
    // 2. Calculate start and end points for each relationship
    // 3. Draw SVG paths or Canvas lines between tables
    // 4. Add labels for relationship types
}

// Zoom schema viewer
function zoomSchemaViewer(factor) {
    const schemaViewer = document.getElementById('schemaViewer');
    if (!schemaViewer) return;
    
    // Get current scale
    let currentScale = 1;
    const transform = schemaViewer.style.transform;
    if (transform) {
        const match = transform.match(/scale\(([0-9.]+)\)/);
        if (match && match[1]) {
            currentScale = parseFloat(match[1]);
        }
    }
    
    // Calculate new scale
    const newScale = currentScale * factor;
    
    // Apply new scale
    schemaViewer.style.transform = `scale(${newScale})`;
}

// Reset schema viewer
function resetSchemaViewer() {
    const schemaViewer = document.getElementById('schemaViewer');
    if (!schemaViewer) return;
    
    schemaViewer.style.transform = 'scale(1)';
    
    // Re-render with current filter
    const categoryFilter = document.getElementById('categoryFilter');
    renderSchemaViewer(categoryFilter ? categoryFilter.value : '');
}

// Load workflow
function loadWorkflow(workflowType) {
    const workflowContent = document.querySelector('.workflow-content');
    if (!workflowContent) return;
    
    const workflow = schemaData.workflows[workflowType];
    if (!workflow) {
        workflowContent.innerHTML = '<p>لا توجد بيانات لهذا التدفق</p>';
        return;
    }
    
    const workflowHtml = `
        <div class="workflow-timeline">
            ${workflow.map(step => `
                <div class="workflow-step">
                    <div class="workflow-step-content">
                        <h4>${step.title}</h4>
                        <p>${step.description}</p>
                        <span class="status">${step.status}</span>
                        <div class="related-tables">
                            ${step.tables.map(table => `
                                <span data-table="${table}">${table}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    workflowContent.innerHTML = workflowHtml;
    
    // Add event listeners for table references
    const tableSpans = workflowContent.querySelectorAll('.related-tables span');
    tableSpans.forEach(span => {
        span.addEventListener('click', function() {
            const tableId = this.getAttribute('data-table');
            showTableDetails(tableId);
        });
    });
}

// Load dictionary data
function loadDictionaryData() {
    const dictionaryTable = document.getElementById('dictionaryTable');
    if (!dictionaryTable) return;
    
    const tbody = dictionaryTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Create a flat list of all columns from all tables
    const dictionaryData = [];
    
    schemaData.tables.forEach(table => {
        table.columns.forEach(column => {
            dictionaryData.push({
                table_id: table.id,
                table_name: table.name,
                table_name_en: table.name_en,
                column_name: column.name,
                data_type: column.type,
                description: column.description,
                constraints: [
                    column.primary_key ? 'PRIMARY KEY' : null,
                    column.foreign_key ? `FOREIGN KEY (${column.foreign_key})` : null,
                    column.not_null ? 'NOT NULL' : null,
                    column.unique ? 'UNIQUE' : null,
                    column.default ? `DEFAULT ${column.default}` : null,
                ].filter(Boolean)
            });
        });
    });
    
    // Render dictionary data
    dictionaryData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="font-medium">${item.table_name}</div>
                <div class="text-xs text-gray-500">${item.table_name_en}</div>
            </td>
            <td class="font-medium">${item.column_name}</td>
            <td>
                <span class="data-type">${item.data_type}</span>
            </td>
            <td>
                <div class="constraints">
                    ${item.constraints.map(constraint => `
                        <span class="constraint">${constraint}</span>
                    `).join('')}
                </div>
            </td>
            <td>${item.description}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Filter dictionary
function filterDictionary(searchTerm) {
    const dictionaryTable = document.getElementById('dictionaryTable');
    if (!dictionaryTable) return;
    
    const rows = dictionaryTable.querySelectorAll('tbody tr');
    
    searchTerm = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Set up search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length < 2) return;
        
        const results = [];
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
                    category: table.category
                });
            }
            
            table.columns.forEach(column => {
                if (
                    column.name.toLowerCase().includes(searchTerm) ||
                    column.description.toLowerCase().includes(searchTerm)
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
    });
