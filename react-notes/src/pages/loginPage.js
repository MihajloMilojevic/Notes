import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils";

function LoginPage() {
	const [url, setUrl] = useState("");
	const [options, setOptions] = useState({
			method: "POST", 
			headers: {"Content-Type": "application/json"}, 
			body: JSON.stringify({})}
		);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();
	const {data, error} = useFetch(url, options);

	useEffect(() => {
		if(!data) return;
		if(data?.ok)
		 	navigate("/home");
		else if(data?.message)
			console.error(data?.message);
		if(error)
			console.error(error.message);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, error])

	const submitForm = e => {
		e.preventDefault();
		setUrl("/api/users/login");
		setOptions({...options, body: JSON.stringify({
				email: emailRef.current.value,
				password: passwordRef.current.value
			})
		});
	}

	return (
		<form onSubmit={submitForm}>
			<label>Email: </label>
			<input ref={emailRef} type="text" placeholder="email"/> <br/>
			<label>Password: </label>
			<input ref={passwordRef} type="password" placeholder="password"/> <br/>
			<button type="submit">Login</button>
		</form>
	);
}

export default LoginPage;