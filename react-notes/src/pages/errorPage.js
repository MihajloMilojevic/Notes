function ErrorPage({message}){
	return (<h1>{message || "404! Page not found"}</h1>);
}

export default ErrorPage;