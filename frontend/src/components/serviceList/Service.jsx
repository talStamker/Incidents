import EditButton from "../buttons/editButton/EditButton";
import DeleteButton from "../buttons/deleteButton/DeleteButton";
import "./Service.css";

export default function Service({ service, onEdit, onDelete }) {
    return (
        <div className="service-card">

            <div className="service-info">
                <h3>{service.name}</h3>

                <p>Status: {service.status}</p>

                <p>Response Time: {service.responseTime} ms</p>

                <p>Errors: {service.errors}</p>
            </div>

            <div className="service-actions">

                <EditButton
                    onClick={() => onEdit(service)}
                />

                <DeleteButton
                    handleDelete={() => onDelete(service.id)}
                />

            </div>

        </div>
    );
}