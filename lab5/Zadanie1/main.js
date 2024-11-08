const button = document.getElementById('show-prompt')
const inputText = document.getElementById('name-input');

button.addEventListener('click', () => {
    const name = prompt('Button clicked!');

    if (name === null) {
        return;
    }

    inputText.value = name;
});