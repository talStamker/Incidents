import { useState } from "react";
import "./ServiceSidebar.css";
import ServiceSearch from "./ServiceSearch/ServiceSearch";
import ServiceFilter from "./ServiceFilter/ServiceFilter";

export default function ServiceSidebar({ onFilterChange }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const handleSearchChange = (value) => {
        setSearch(value);

        onFilterChange({
            search: value,
            status: status
        });
    };

    const handleStatusChange = (value) => {
        setStatus(value);

        onFilterChange({
            search: search,
            status: value
        });
    };

    const clearFilters = () => {
        setSearch("");
        setStatus("");

        onFilterChange({
            search: "",
            status: ""
        });
    };

    return (
        <aside className="service-sidebar">

            <h3>Filters</h3>

            <div className="sidebar-section">
                <ServiceSearch
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="sidebar-section">
                <ServiceFilter
                    value={status}
                    onChange={handleStatusChange}
                />
            </div>

            <button
                type="button"
                className="clear-filters-button"
                onClick={clearFilters}
            >
                Clear Filters
            </button>

        </aside>
    );
}