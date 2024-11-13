export class CountryList{
    constructor(countries){
        this.countries = [];

        for(let i = 0; i < countries.length; i++){
            this.countries.push(new Country(countries[i]));
        }
    }

    getCountries(options = {}){

        if (Object.keys(options).length === 0){
            return this.countries;
        }

        let countriesCopy = this.countries.slice();

        // filtering
        if (options.hasOwnProperty('filter')){
            const filters = options.filter;

            for (let i = 0; i < filters.length; i++){
                const filter = filters[i];

                countriesCopy = countriesCopy.filter(country => {
                    const countryPropertyValue = String(country[filter.key]).toLowerCase();
                    const filterValue = filter.value.toLowerCase();

                    return countryPropertyValue.includes(filterValue);
                });
            }
        }

        // sorting
        if (options.hasOwnProperty('sort')){
            const sortKey = options.sort.key;
            const isAscending = options.sort.isAscending;

            countriesCopy.sort((a, b) => {
                if(a[sortKey] < b[sortKey]){
                    return isAscending ? -1 : 1;
                }
                if(a[sortKey] > b[sortKey]){
                    return isAscending ? 1 : -1;
                }
                return 0;
            });
        }

        console.log(this.countries)
        console.log(countriesCopy);

        return countriesCopy;
    }

    getSize(){
        return this.countries.length;
    }
}

export class Country {
    constructor(country){
        this.name = country.name.common;
        this.capital = (country.capital !== undefined) ? country.capital : 'N/A';
        this.population = country.population;
        this.area = country.area;
        this.subregion = country.subregion;
    }
}