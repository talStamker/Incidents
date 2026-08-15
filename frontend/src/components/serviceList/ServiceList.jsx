import React from "react";
import "./services.css";
import Service from "./Service";
import AddButton from "../buttons/addButton/AddButton";

export default function ServiceList({
    services,
    onAdd,
    onEdit,
    onDelete,
    isError
}) {

    if (isError) {
        return <div>{isError}</div>;
    }

    return (
        <section className="service-list-section">
            <div className="service-list-container">

                <div >
                    <h2>Services</h2>

                    <AddButton onClick={onAdd} />
                </div>

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
        </section>
    );
}