
import IncidentModal from "../IncidentModal";

export default function AddServiceModal({ onClose, onAdd }) {

    const handleAdd = (newService) => {
        onAdd(newService);
    };

    return (
        <IncidentModal
            mode="add"
            onClose={onClose}
            onSubmit={handleAdd}
        />
    );
}