
async function checker() {
	const token = localStorage.getItem("token");
	const headers = {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	};
	const method = "POST";
	const config = {method, headers};
	
	const URL = "http://localhost:3000/auth";

	try {
		const response = await fetch(URL, config);
		const data = await response.json();
		if(!data.ok) 
			window.location.href = "/";
	} catch (error) {
		window.location.href = "/";
	}
}

checker();