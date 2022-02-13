import NoteForm from "../components/noteForm";

function CreateNote() {
	return (
		<NoteForm onSaveUrl={`/api/notes`} onSaveMethod="POST"/>
	);
}

export default CreateNote;