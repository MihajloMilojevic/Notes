import {useNavigate} from "react-router-dom";

function NotesListItem({note}) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/note/${note._id}`);
	}
	return (
		<li onClick={handleClick}>
			<h2>{note.title}</h2>
			<p>{note.text}</p>
		</li>
	);
}

export default NotesListItem;