
import IncidentModal from "../IncidentModal";

export default function EditIncidentModal({
    incident,
    onClose,
    onEdit
}) {
    return (
        <IncidentModal
            mode="edit"
            incident={incident}
            onClose={onClose}
            onSubmit={onEdit}
        />
    );
}