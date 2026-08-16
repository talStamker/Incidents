import EditButton from "../buttons/editButton/EditButton";
import DeleteButton from "../buttons/deleteButton/DeleteButton";
import "./Incident.css";

export default function Incident({ incident, onEdit, onDelete }) {
    return (
        <div className="incident-card">

            <div className="incident-info">
                <h3>{incident.title}</h3>

                <p>Description: {incident.description}</p>

                <p>Severity: {incident.severity}</p>

                <p>Status: {incident.status}</p>
                <p>Service: {incident.service}</p>

                <p>Created At: {incident.createdAt}</p>

                <p>Updated At: {incident.updatedAt}</p>
            </div>

            <div className="incident-actions">

                <EditButton
                    onClick={() => onEdit(incident)}
                />

                <DeleteButton
                    handleDelete={() => onDelete(incident.id)}
                />

            </div>

        </div>
    );
}