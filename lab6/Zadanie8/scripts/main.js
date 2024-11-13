import { fetchCountries } from './api.js';
import { renderTable } from './render.js';
import { sortCountries } from './sorting.js';
import { Pagination } from './pagination.js';
import { CountryList, Country } from './country.js';

const tableContainer = document.querySelector('.main-table');
const tableBody = document.getElementById('mainTableBody');
const tableHead = document.getElementById('mainTableHead');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let prevLength = 0;
let options = {};
let countryList;
let pagination;

function display() {
    const countriesToRender = countryList.getCountries(options);
    
    if (prevLength !== countriesToRender.length) {
        pagination.updatePagination(countriesToRender.length);
        prevLength = countriesToRender.length;
    }

    const indexes = pagination.getCurrentPageIndexes();
    const countriesToRenderCurrPage = countriesToRender.slice(indexes.startIdx, indexes.endIdx);

    renderTable(countriesToRenderCurrPage, tableBody);
}

async function init() {
    const countries = await fetchCountries();

    countryList = new CountryList(countries);
    pagination = new Pagination(countryList.getSize());
    prevLength = countryList.getSize();

    display();
}

tableHead.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const sortKey = e.target.dataset.sort;

        // <i class="bi bi-arrow-down"></i>
        const icon = e.target.querySelector('i');
        if (icon.classList.contains('bi-arrow-down')) {
            options['sort'] = {
                key: sortKey,
                isAscending: true
            }

            icon.classList.remove('bi-arrow-down');
            icon.classList.add('bi-arrow-up');
        } else {
            options['sort'] = {
                key: sortKey,
                isAscending: false
            }

            icon.classList.remove('bi-arrow-up');
            icon.classList.add('bi-arrow-down');
        }

        display();
    }
});

tableHead.addEventListener('keyup', (e) => {
    if (e.target.tagName === 'INPUT'){
        const filters = [];

        tableHead.querySelectorAll('.search').forEach(search => {
            if (search.value === '') {
                return;
            }

            filters.push({
                key: search.dataset.search,
                value: search.value
            });
        });

        options['filter'] = filters;

        display();
    }
});

prevButton.addEventListener('click', () => {
    pagination.goToPreviousPage();

    display();
});

nextButton.addEventListener('click', () => {
    pagination.goToNextPage();

    display();
});

init();
