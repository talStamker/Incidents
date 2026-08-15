import "./ServiceSearch.css";

export default function ServiceSearch({ value, onChange }) {
    return (
        <div className="service-search">
            <i className="bi bi-search"></i>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search services..."
            />
        </div>
    );
}