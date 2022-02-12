import NotesListItem from "./notesListItem"

export default function NotesList({notes}) {
	return (
		<ul>
			{
				notes.map(note => {
					return (
						<NotesListItem key={note._id} note={note} />
					);
				})
			}
		</ul>
	);
}