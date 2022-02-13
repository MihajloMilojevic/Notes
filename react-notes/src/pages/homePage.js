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
	
	const logout = async () => {
		try {
			const response = await fetch("/api/users/logout");
			const data = await response.json();
			if(data.ok)
				navigate("/login");
		} catch (error) {
			
		}
	}

	const createNote = () => {
		navigate("/note/create")
	}

	if(isLoading)
	 	return <h1>Loading...</h1>
	return (
		<>
			<h1>home page</h1>
			<button onClick={logout}>LOGOUT</button> <br/>
			<button onClick={createNote}>Create</button> <br/>
			{
				notes.length > 0 ?
				<NotesList notes={notes} />
				:
				<h3>No notes yet</h3>
			}
		</>
	);
}

export default HomePage;