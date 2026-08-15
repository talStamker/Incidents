import { useState } from "react";
import ServiceView from "../serviceView";

export default function AddServiceModal({ onClose, onAdd }) {

    const [name, setName] = useState("");
    const [status, setStatus] = useState("healthy");
    const [responseTime, setResponseTime] = useState("");
    const [errors, setErrors] = useState("");

    const handleAdd = () => {

        const newService = {
            name: name.trim(),
            status,
            responseTime: Number(responseTime),
            errors: Number(errors)
        };

        onAdd(newService);
    };

    return (
        <ServiceView
            title="Add Service"
            onClose={onClose}
            onSubmit={handleAdd}
            submitText="Add"
            submitClass="add-modal-button"
        >

            <div className="form-group">
                <label>Name</label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter service name"
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
                    onChange={(e) => setResponseTime(e.target.value)}
                    placeholder="Enter response time"
                />
            </div>

            <div className="form-group">
                <label>Errors</label>

                <input
                    type="number"
                    min="0"
                    value={errors}
                    onChange={(e) => setErrors(e.target.value)}
                    placeholder="Enter number of errors"
                />
            </div>

        </ServiceView>
    );
}