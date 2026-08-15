
import ServiceView from "../ServiceModal";

export default function EditServiceModal({
    service,
    onClose,
    onEdit
}) {
    return (
        <ServiceView
            mode="edit"
            service={service}
            onClose={onClose}
            onSubmit={onEdit}
        />
    );
}