const button = document.getElementById('btn');
const img = document.getElementById('img');

const path = 'images/';
const images = ['forest.jpg', 'mountain.jpg' , 'sea.jif'];
const colors = ['green', 'red', 'blue'];
let currentIndex = 0;

button.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;

    img.src = path + images[currentIndex]
    img.style.borderColor = colors[currentIndex];
});