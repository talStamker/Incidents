import React from "react";
import "./IncidentList.css";
import Incident from "./Incident";
import AddButton from "../buttons/addButton/AddButton";

export default function IncidentList({
  incidents,
  onAdd,
  onEdit,
  onDelete,
  isError,
}) {
  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <section className="incident-list-section">
      <div className="incident-list-container">
        <div>
          <h2>Incidents </h2>

          <AddButton onClick={onAdd} />
        </div>
        <div className="incident-list-scroll">
          {Array.isArray(incidents ) && incidents.length > 0 ? (
            incidents .map((incident) => (
              <Incident
                key={incident.id}
                incident={incident}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <h3>No incidents </h3>
          )}
        </div>
        <div className="incident-summary">
          <span>Total: {incidents.length}</span>
          <span>
            Healthy:{" "}
            {incidents .filter((incident) => incident.status === "healthy").length}
          </span>
          <span>
            Degraded:{" "}
            {incidents .filter((incident) => incident.status === "degraded").length}
          </span>
          <span>
            Down:{" "}
            {incidents .filter((incident) => incident.status === "down").length}
          </span>
        </div>
      </div>
    </section>
  );
}
