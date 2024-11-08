
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];


const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];

namesList = document.getElementById('names');

// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)
for (let i = 0; i < names.length; i++) {
    if (names[i].includes('r')) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(names[i]));
        namesList.appendChild(li);
    }
}

// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
    //   sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
    //   inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
    //   Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2

document.getElementById('num-array').textContent = numbers.join(', ');

if (numbers.every(num => num < 9)) {
    document.getElementById('is-small').textContent = 'Is small: YES';
}
else {
    document.getElementById('is-small').textContent = 'Is small: NO';
}

// 3. Na stronach internetowych wyświetlają się kraje z Europy
europe = document.getElementById('europe');
for (let i = 0; i < countries.length; i++) {
    if(countries[i].continent === 'Europe') {
        europe.textContent += countries[i].name + ', ';
    }
}

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.
emails = document.getElementById('emails');
for (let i = 0; i< people.length; i++){
    if (people[i].email.includes('replicant.io')) {
        emails.textContent += people[i].name + ', ';
    }
}

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu
uniq = [...new Set(duplicateName)];