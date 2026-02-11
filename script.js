document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('productTableBody');
    const searchInput = document.getElementById('searchInput');

    // Function to highlight text
    function highlightText(text, term) {
        if (!term) return text;
        // Escape special regex characters in the search term
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        return text.toString().replace(regex, '<span class="highlight">$1</span>');
    }

    // Helper to format currency (assuming INR based on data context)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Function to render the table rows
    function renderTable(data, searchTerm = '') {
        tableBody.innerHTML = '';

        data.forEach(product => {
            const row = document.createElement('tr');

            // Calculate Profit
            const profit = product.mrp - product.dp;

            // Highlight name and ID if they match
            const highlightedName = highlightText(product.name, searchTerm);
            const highlightedId = highlightText(product.id, searchTerm);

            row.innerHTML = `
                <td class="col-id">${highlightedId}</td>
                <td class="col-name">${highlightedName}</td>
                <td class="col-price">${formatCurrency(product.dp)}</td>
                <td class="col-price">${formatCurrency(product.mrp)}</td>
                <td class="col-profit"><span class="badge badge-profit">+${formatCurrency(profit)}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Initial render
    renderTable(products);

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Search functionality with Debounce
    const handleSearch = debounce((e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        const filteredProducts = products.filter(product => {
            const idMatch = product.id.toString().includes(searchTerm);
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            return idMatch || nameMatch;
        });

        renderTable(filteredProducts, searchTerm);
    }, 300); // 300ms delay

    searchInput.addEventListener('input', handleSearch);
});
