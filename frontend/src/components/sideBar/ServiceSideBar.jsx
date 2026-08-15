import { useState } from "react";
import "./ServiceSidebar.css";

export default function ServiceSidebar({ onFilterChange }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;

        setSearch(value);

        onFilterChange({
            search: value,
            status: status
        });
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;

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

                <label>Search</label>

                <div className="sidebar-search">
                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search services..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

            </div>

            <div className="sidebar-section">

                <label>Status</label>

                <select
                    value={status}
                    onChange={handleStatusChange}
                >
                    <option value="">All statuses</option>
                    <option value="healthy">Healthy</option>
                    <option value="degraded">Degraded</option>
                    <option value="down">Down</option>
                </select>

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