import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils";
import NotesList from "../components/notesList";

function HomePage(){
	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const navigate = useNavigate();
	const {data: showme} = useFetch("/api/users/showme");
	const {data: notesFetched} = useFetch("/api/notes/");
	
		
	useEffect(() => {
		if(showme?.ok === false)
			navigate("/");
		 else 
		 	setIsLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showme]);

	useEffect(() => {
		if(notesFetched && notesFetched.ok)
			setNotes(notesFetched.notes);
	}, [notesFetched])
	
	if(isLoading)
	 	return <h1>Loading...</h1>
	return (
		<>
			<h1>home page</h1>
			<NotesList notes={notes} />
		</>
	);
}

export default HomePage;