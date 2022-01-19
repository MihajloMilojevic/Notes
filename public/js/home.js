const token = localStorage.getItem("token");

const title = document.querySelector("#title");
const text = document.querySelector("#text");
const list = document.querySelector("#list");
const button = document.querySelector("#add")

button.onclick = add;
text.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) add();
});

getAll();

async function getAll(){
	
	const headers = {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	};
	const method = "GET";
	const config = {method, headers};

	const URL = "http://localhost:3000/api/notes";

	try {
		const response = await fetch(URL, config);
		const data = await response.json();
		if(!data.ok) throw new Error(data.message);
		const notes = data.notes;
		notes.forEach(note => {
			const li = document.createElement("li");
			li.innerHTML = element(note.title, note.text)
			list.appendChild(li);
		});
	} catch (error) {
		console.error(error);
		alert(error.message)
	}
}

async function add() {
	const newTitle = title.value;
	const newText = text.value;
	if(!newText || !newTitle) return;
	const headers = {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	};
	const body = JSON.stringify({
		"title": newTitle,
		"text": newText
	})
	const method = "POST";
	const config = {method, headers, body};

	const URL = "http://localhost:3000/api/notes";

	try {
		const response = await fetch(URL, config);
		const data = await response.json();
		if(!data.ok) throw new Error(data.message);
		const li = document.createElement("li");
		li.innerHTML = element(data.note.title, data.note.text)
		list.insertBefore(li, list.firstChild);
		text.value = "";
	} catch (error) {
		console.error(error);
		alert(error.message)
	}
}


function element(title, text) {
	return (
	`<div>
		<h2>${title}</h2>
		<p>${text}</p>
	</div>`);
}