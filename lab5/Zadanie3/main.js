buttonAdd = document.getElementById("btn-add");
inputeText = document.getElementById("new-item");
buttonRemove = document.getElementById("btn-remove");


buttonAdd.addEventListener("click", () => {
    var ul = document.getElementById("user-items");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(inputeText.value));
    ul.appendChild(li); 
});

buttonRemove.addEventListener("click", () => {
    var ul = document.getElementById("user-items");
    ul.removeChild(ul.firstElementChild);
});