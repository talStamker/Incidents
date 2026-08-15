import { useState } from "react";
import "./ServiceModal.css";

export default function ServiceView({
    mode,
    service,
    onClose,
    onSubmit
}) {
    const [name, setName] = useState(service?.name || "");
    const [status, setStatus] = useState(service?.status || "healthy");
    const [responseTime, setResponseTime] = useState(
        service?.responseTime ?? ""
    );
    const [errors, setErrors] = useState(service?.errors ?? "");

    const isEdit = mode === "edit";
    const [error, setError] = useState("");

    const handleSubmit = () => {

    if (!name.trim() || responseTime === "" || errors === "") {
        setError("Please fill in all fields");
        return;
    }

    setError("");

    const serviceData = {
        name: name.trim(),
        status,
        responseTime: Number(responseTime),
        errors: Number(errors)
    };

    onSubmit(serviceData);
};

    return (
        <div className="modal-overlay">
            <div className="service-modal">

                <div className="modal-header">
                    <h2>{isEdit ? "Edit Service" : "Add Service"}</h2>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter service name"
                            required
                        />
                        
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="healthy">Healthy</option>
                            <option value="degraded">Degraded</option>
                            <option value="down">Down</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Response Time</label>

                        <input
                            type="number"
                            min="0"
                            value={responseTime}
                            onChange={(e) =>
                                setResponseTime(e.target.value)
                            }
                        />
                        
                    </div>

                    <div className="form-group">
                        <label>Errors</label>

                        <input
                            type="number"
                            min="0"
                            value={errors}
                            onChange={(e) =>
                                setErrors(e.target.value)
                            }
                        />
                    </div>
                            {error && <p className="error-message">{error}</p>}
                </div>

                <div className="modal-footer">

                    <button
                        type="button"
                        className="modal-button close-button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        className={`modal-button ${
                            isEdit
                                ? "edit-modal-button"
                                : "add-modal-button"
                        }`}
                        onClick={handleSubmit}
                    >
                        {isEdit ? "Edit" : "Add"}
                    </button>

                </div>

            </div>
        </div>
    );
}
