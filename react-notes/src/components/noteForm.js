import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useFetch } from "../utils";

function NoteForm({note, onSaveUrl, onSaveMethod}) {
	const navigate = useNavigate();
	const [url, setUrl] = useState("");
	const [options, setOptions] = useState({
		method: onSaveMethod,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({})
	});
	const [body, setBody] = useState({});
	const {data, error} = useFetch(url, options)

	useEffect(() => {
		if(data && data.ok === true)
			navigate("/home");
	}, [data]);

	const onSave = e => {
		e.preventDefault();
		setUrl(onSaveUrl);
		setOptions({...options, body: JSON.stringify(body)});
	}
	const handleCancel = () => {
		navigate("/home");
	}
	
	const handleChange = e => {
		setBody({...body, [e.target.name]: e.target.value});
	}

	return (
		<form onSubmit={onSave}>
			<label>Title: </label> <br/>
			<input 
				type="text" 
				name="title" 
				onChange={handleChange}
				placeholder="title" 
				defaultValue={note?.title || ""} 
			/> <br/>
			<label>Text: </label> <br/>
			<textarea 
				name="text" 
				onChange={handleChange}
				placeholder="Text" 
				defaultValue={note?.text || ""}
			></textarea> <br/>
			<button type="submit">Save</button>
			<button onClick={handleCancel}>Cancel</button>
		</form>
	);
}

export default NoteForm;