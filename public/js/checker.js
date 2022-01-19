
async function checker() {
	const token = localStorage.getItem("token");
	const headers = {Authorization: `Bearer ${token}`};
	const method = "POST";
	const config = {method, headers};
	
	const URL = "http://localhost:3000/auth";

	try {
		const response = await fetch(URL, config);
		const data = response.json();
		if(!data.ok) throw new Error("");
	} catch (error) {
		window.location.href = "/";
	}
}

checker();