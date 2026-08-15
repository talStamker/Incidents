import "./EditButton.css";

export default function EditButton({ onClick }) {
    return (
        <button
            type="button"
            className="edit-button"
            onClick={onClick}
        >
            <i className="bi bi-pencil-fill"></i>
            <span>Edit</span>
        </button>
    );
}