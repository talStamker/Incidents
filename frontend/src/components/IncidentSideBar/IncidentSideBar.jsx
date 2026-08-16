import { useState } from "react";
import "./IncidentSideBar.css";
import IncidentFilter from "./IncidentFilter/IncidentFilter";

export default function IncidentSideBar({ onFilterChange }) {
  const [severity, setSeverity] = useState([
    "Low",
    "Medium",
    "High",
    "Critical",
  ]);

  const [status, setStatus] = useState(["Open", "Investigating", "Resolved"]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("");

  const handleSeverityChange = (value) => {
    setSeverity((prev) => {
      const newSeverity = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      onFilterChange({
        severity: newSeverity,
        status: status,
        from: from,
        to: to,
        sort: sort,
      });

      return newSeverity;
    });
  };
  const handleStatusChange = (value) => {
    setStatus((prev) => {
      const newStatus = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      onFilterChange({
        severity: severity,
        status: newStatus,
        from: from,
        to: to,
        sort: sort,
      });

      return newStatus;
    });
  };
  const handleSortChange = (value) => {
    setSort(value);

    onFilterChange({
      sort: value,
      status: status,
      from: from,
      to: to,
      severity: severity,
    });
  };

  const handleFromChange = (value) => {
    setFrom(value);

    onFilterChange({
      severity: severity,
      status: status,
      from: value,
      to: to,
      sort: sort,
    });
  };

  const handleToChange = (value) => {
    setTo(value);

    onFilterChange({
      severity: severity,
      status: status,
      from: from,
      to: value,
      sort: sort,
    });
  };

  const clearFilters = () => {
    const allSeverity = ["Low", "Medium", "High", "Critical"];
    const allStatus = ["Open", "Investigating", "Resolved"];

    setSeverity(allSeverity);
    setStatus(allStatus);
    setFrom("");
    setTo("");
    setSort("");

    onFilterChange({
      severity: allSeverity,
      status: allStatus,
      from: "",
      to: "",
      sort: "",
    });
  };

  return (
    <aside className="service-sidebar">
      <h3>Filters</h3>
      <div className="sidebar-section">
        <IncidentFilter
          status={status}
          onChangeStatus={handleStatusChange}
          severity={severity}
          onChangeSeverity={handleSeverityChange}
          onChangeForm={handleFromChange}
          onChangeTo={handleToChange}
          onChangeSort={handleSortChange}
          sort = {sort}
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
