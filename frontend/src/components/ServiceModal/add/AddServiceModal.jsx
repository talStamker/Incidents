
import ServiceModal from "../ServiceModal";

export default function AddServiceModal({ onClose, onAdd }) {

    const handleAdd = (newService) => {
        onAdd(newService);
    };

    return (
        <ServiceModal
            mode="add"
            onClose={onClose}
            onSubmit={handleAdd}
        />
    );
}