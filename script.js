document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('productTableBody');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    // Function to render the table rows
    function renderTable(data) {
        tableBody.innerHTML = '';

        if (data.length === 0) {
            noResults.classList.remove('hidden');
            return;
        } else {
            noResults.classList.add('hidden');
        }

        data.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="col-id">${product.id}</td>
                <td class="col-name">${product.name}</td>
                <td class="col-price">${formatCurrency(product.dp)}</td>
                <td class="col-price">${formatCurrency(product.mrp)}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Helper to format currency (assuming INR based on data context)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Initial render
    renderTable(products);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        const filteredProducts = products.filter(product => {
            const idMatch = product.id.toString().includes(searchTerm);
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            return idMatch || nameMatch;
        });

        renderTable(filteredProducts);
    });
});
