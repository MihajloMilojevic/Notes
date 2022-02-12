import NoteForm from "../components/noteForm";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../utils";

function Note() {
	const navigate = useNavigate();
	const {id} = useParams();
	const [note, setNote] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const {data, error} = useFetch(`/api/notes/${id}`);

	useEffect(() => {
		if(data && data.ok === true)
		{
			setIsLoading(false);
			setNote(data.note);
		}
		else if(error || data?.ok === false)
		{
			console.error(error?.message || data?.message);
			navigate("/home");
		}
	}, [data])

	if(isLoading)
		return (<h1>Loading...</h1>)
	return (
		<NoteForm note={note} onSaveUrl={`/api/notes/${id}`} onSaveMethod="PATCH"/>
	);
}

export default Note;