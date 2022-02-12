import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../utils";

function LandingPage(){
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const {data} = useFetch("/api/users/showme");
		
	useEffect(() => {
		if(data?.ok)
			navigate("/home");
		 else 
		 	setIsLoading(false);
	}, [data]);

	if(isLoading)
	 	return <h1>Loading...</h1>
	return (
		<>
			<h1>landing page</h1>
			<Link to="/register">Register</Link> <br/>
			<Link to="/login">Login</Link>
		</>
	);
}

export default LandingPage;