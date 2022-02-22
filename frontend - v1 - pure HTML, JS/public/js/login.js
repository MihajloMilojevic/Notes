/********** DOM ELEMENTS **********/
const emailElement = document.querySelector("#email")
const passwordElement = document.querySelector("#password")
const loginElement = document.querySelector("#login")

/********** EVENTS **********/
loginElement.addEventListener("click", login);
emailElement.addEventListener("keyup", (event) => {
	if (event.keyCode === 13) login();
})
passwordElement.addEventListener("keyup", (event) => {
	if (event.keyCode === 13) login();
})

async function login()
{
	/********** VALUES **********/
	const email = emailElement.value;
	const password = passwordElement.value;

	/********** VALIDATION **********/
	let valid = true
	if(!email)
	{
		alert("Email is required") // change to dom message
		valid = false;
	}
	if(!password)
	{
		alert("Password is required") // change to dom message
		valid = false;
	}
	if(!valid) return;

	/********** FETCH CONFIG **********/
	const URL="/api/users/login"

	const method = "POST";
	const headers = {"Content-Type": "application/json"};
	const body = JSON.stringify({email, password});
	const config = {method, headers, body};

	/********** API CALL **********/
	try {
		const response = await fetch(URL, config);
		const data = await response.json();
		/********** ERROR RETURNED FROM SERVER **********/
		if(!data.ok)
		{
			console.error(data.error);
			alert(data.message);
			return;
		}
		/********** SETTING USER INFO IN LOCALSTORAGE **********/
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		window.location.href = "/home";
	} catch (error) {
		console.error(error);
		alert(error.message);
	}
}