export async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        return await response.json();
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}