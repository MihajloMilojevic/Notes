const text = document.querySelector("#text");
const list = document.querySelector("#list");
const button = document.querySelector("#add")

button.onclick = add;
text.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) add();
});

function add() {
	const newText = text.value;
	if(!newText) return;
	const li = document.createElement("li");
	li.innerHTML =  newText;
	list.appendChild(li);
	text.value = "";
}