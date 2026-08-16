import { useState } from "react";
import "./IncidentModal.css";

export default function IncidentModal({ mode, incident, onClose, onSubmit }) {
  const [title, setTitle] = useState(incident?.title || "");
  const [status, setStatus] = useState(incident?.status || "open");
  const [description, setDescription] = useState(incident?.description ?? "");
  const [severity, setSeverity] = useState(incident?.severity ?? "low");
  const [service, setService] = useState(incident?.service ?? "");

  const isEdit = mode === "edit";
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    const incidentData = {
      title: title.trim(),
      description: description.trim(),
      severity: severity,
      status: status,
      service: service.trim(),
    };

    onSubmit(incidentData);
  };

  return (
    <div className="modal-overlay">
      <div className="incident-modal">
        <div className="modal-header">
          <h2>{isEdit ? "Edit Incident" : "Add Incident"}</h2>

          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter incident title"
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter incident description"
            />
          </div>
          <div className="form-group">
            <label>Service</label>

            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Enter incident service"
            />
          </div>

          <div className="form-group">
            <label>Severity</label>
            <label>
              <input
                type="radio"
                name="severity"
                value="low"
                checked={severity === "low"}
                onChange={(e) => setSeverity(e.target.value)}
              />
              Low
            </label>

            <label>
              <input
                type="radio"
                name="severity"
                value="high"
                checked={severity === "high"}
                onChange={(e) => setSeverity(e.target.value)}
              />
              High
            </label>
            <label>
              <input
                type="radio"
                name="severity"
                value="medium"
                checked={severity === "medium"}
                onChange={(e) => setSeverity(e.target.value)}
              />
              Medium
            </label>

            <label>
              <input
                type="radio"
                name="severity"
                value="critical"
                checked={severity === "critical"}
                onChange={(e) => setSeverity(e.target.value)}
              />
              Critical
            </label>
          </div>
          <div className="form-group">
            <label>Status</label>
            <label>
              <input
                type="radio"
                name="status"
                value="open"
                checked={status === "open"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Open
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="resolved"
                checked={status === "resolved"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Resolved
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="investigating"
                checked={status === "investigating"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Investigating
            </label>
          </div>
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
              isEdit ? "edit-modal-button" : "add-modal-button"
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
