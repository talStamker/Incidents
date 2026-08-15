import "./AddButton.css";

export default function AddButton({ onClick }) {
    return (
        <button
            type="button"
            className="add-button"
            onClick={onClick}
        >
            <i className="bi bi-plus-lg"></i>
            <span>Add Service</span>
        </button>
    );
}