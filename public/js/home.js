const title = document.querySelector("#title");
const text = document.querySelector("#text");
const list = document.querySelector("#list");
const button = document.querySelector("#add")
const logout = document.querySelector("#logout")

button.onclick = add;
text.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) add();
});

logout.addEventListener("click", async () => {
	const URL = "/api/users/logout";
	try {
		const response = await fetch(URL);
		const data = await response.json();
		if(data.ok)
			location.href = "/";
	} catch (error) {
		console.error(error);
	}
})

getAll();

async function getAll(){
	
	const headers = {
		"Content-Type": "application/json"
	};
	const method = "GET";
	const config = {method, headers};

	const URL = "/api/notes";

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
		"Content-Type": "application/json"
	};
	const body = JSON.stringify({
		"title": newTitle,
		"text": newText
	})
	const method = "POST";
	const config = {method, headers, body};

	const URL = "/api/notes";

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