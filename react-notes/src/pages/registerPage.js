import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils";

function RegisterPage() {

	const navigate = useNavigate();
	const [url, setUrl] = useState("");
	const [options, setOptions] = useState({
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({})
	})
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmRef = useRef(null);
 
	const {data} = useFetch(url, options);

	useEffect(() => {
		if(data && data?.ok === true)
			navigate("/home");
	}, [data]);

	const handleSubmit = e => {
		e.preventDefault();
		const body = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
			confirm: confirmRef.current.value
		};
		setOptions({...options, body: JSON.stringify(body)});
		if(!url)
			setUrl("/api/users/register");
	}

	return (
		<form onSubmit={handleSubmit}>
			<label for="email">Email</label> <br/>
			<input ref={emailRef} type="email" placeholder="email" id="email"/> <br/>
			<label for="password">Password</label> <br/>
			<input ref={passwordRef} type="password" placeholder="password" id="password"/> <br/>
			<label for="confirm">Confirm password</label> <br/>
			<input ref={confirmRef} type="password" placeholder="confirm password" id="confirm"/> <br/>
			<button id="register">Register</button>
		</form>
	);
}

export default RegisterPage;