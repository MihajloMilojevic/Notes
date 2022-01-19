/********** DOM ELEMENTS **********/
const emailElement = document.querySelector("#email")
const passwordElement = document.querySelector("#password")
const confirmElement = document.querySelector("#confirm")
const registerElement = document.querySelector("#register")

/********** EVENTS **********/
registerElement.addEventListener("click", register);

/**********  **********/
async function register() {
	/********** VALUES **********/
	const email = emailElement.value;
	const password = passwordElement.value;
	const confirm = confirmElement.value;

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
	if(!confirm)
	{
		alert("Confirmation is required") // change to dom message
		valid = false;
	}
	if(password !== confirm)
	{
		alert("Passwords must match") // change to dom message
		valid = false;
	}
	if(!valid) return;

	/********** FETCH CONFIG **********/
	const URL="http://localhost:3000/api/users/register"

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
		window.location.href = "/";
	} catch (error) {
		console.error(error);
		alert(error.message);
	}
}