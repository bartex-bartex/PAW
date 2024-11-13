export function sortCountries(countries, sortKey, isAscending) {
    if (sortKey === "name") {
        countries.sort((a, b) => {
            return isAscending
                ? a.name.common.localeCompare(b.name.common)
                : b.name.common.localeCompare(a.name.common);
        });
    } else if (sortKey === "capital") {
        countries.sort((a, b) => {
            const capitalA = a.capital && a.capital[0] ? a.capital[0] : "";
            const capitalB = b.capital && b.capital[0] ? b.capital[0] : "";

            return isAscending
                ? capitalA.localeCompare(capitalB)
                : capitalB.localeCompare(capitalA);
        });
    } else if (sortKey === "population" || sortKey === "area") {
        countries.sort((a, b) => {
            return isAscending
                ? a[sortKey] - b[sortKey]
                : b[sortKey] - a[sortKey];
        });
    }
}
