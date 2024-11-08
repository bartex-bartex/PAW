const display = document.getElementById("time");
const buttonTest = document.getElementById("btn-test");
const buttonState = document.getElementById("btn-state");

buttonTest.addEventListener("click", () => {
    display.textContent = Number(display.textContent) + 1;
});

buttonState.addEventListener("click", () => {
    if (buttonTest.disabled) {
        buttonTest.disabled = false;
    } else {
        buttonTest.disabled = true;
    }

    display.textContent = "0";
});