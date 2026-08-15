import "./EditButton.css";

export default function EditButton({ onEdit }) {
    return (
        <button
            type="button"
            className="edit-button"
            onClick={onEdit}
        >
            <i className="bi bi-pencil-fill"></i>
            <span>Edit</span>
        </button>
    );
}