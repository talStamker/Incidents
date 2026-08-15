import "./AddButton.css";

export default function AddButton({ onAdd }) {
    return (
        <button
            type="button"
            className="add-button"
            onClick={onAdd}
        >
            <i className="bi bi-plus-lg"></i>
            <span>Add Service</span>
        </button>
    );
}