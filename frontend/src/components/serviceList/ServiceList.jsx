import React from "react";
import "./ServiceList.css";
import Service from "./Service";
import AddButton from "../buttons/addButton/AddButton";

export default function ServiceList({
  services,
  onAdd,
  onEdit,
  onDelete,
  isError,
}) {
  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <section className="service-list-section">
      <div className="service-list-container">
        <div>
          <h2>Services</h2>

          <AddButton onClick={onAdd} />
        </div>
        <div className="service-list-scroll">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <Service
                key={service.id}
                service={service}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <h3>No services</h3>
          )}
        </div>
        <div className="service-summary">
          <span>Total: {services.length}</span>
          <span>
            Healthy:{" "}
            {services.filter((service) => service.status === "healthy").length}
          </span>
          <span>
            Degraded:{" "}
            {services.filter((service) => service.status === "degraded").length}
          </span>
          <span>
            Down:{" "}
            {services.filter((service) => service.status === "down").length}
          </span>
        </div>
      </div>
    </section>
  );
}
