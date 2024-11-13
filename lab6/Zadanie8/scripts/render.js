export function renderTable(countries, tableBody) {
    tableBody.innerHTML = '';

    countries.forEach(country => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.population}</td>
            <td>${country.area}</td>
        `;
        tableBody.appendChild(row);
    });
}
