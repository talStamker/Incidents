import "./ServiceFilter.css";

export default function ServiceFilter({ value, onChange }) {
    return (
        <div className="service-filter">
            <label htmlFor="status-filter">Status</label>

            <select
                id="status-filter"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">All</option>
                <option value="healthy">Healthy</option>
                <option value="degraded">Degraded</option>
                <option value="down">Down</option>
            </select>
        </div>
    );
}