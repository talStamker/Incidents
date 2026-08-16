import "./IncidentFilter.css";
import IncidentSeverty from "./checkBox/severty/IncidentSeverty";
import IncidentStatus from "./checkBox/status/IncidentStatus";
import IncidentDate from "./date/IncidentDate";
import IncidentSort from "./radioButton/IncidentSort";
export default function IncidentFilter({
  status,
  onChangeStatus,
  severity,
  onChangeSeverity,
  onChangeForm,
  onChangeTo,
  onChangeSort,
  sort,
}) {
  return (
    <div>
      <div className="service-filter">
        <label htmlFor="status-filter">Form</label>
        <IncidentDate onChange={onChangeForm}></IncidentDate>
      </div>
      <div className="service-filter">
        <label htmlFor="status-filter">To</label>
        <IncidentDate onChange={onChangeTo}></IncidentDate>
      </div>
      <div className="service-filter">
        <label htmlFor="status-filter">Status</label>
        <IncidentStatus
          onChange={onChangeStatus}
          selected={status}
        ></IncidentStatus>
      </div>
      <div className="service-filter">
        <label htmlFor="status-filter">Severity</label>
        <IncidentSeverty
          onChange={onChangeSeverity}
          selected={severity}
        ></IncidentSeverty>
      </div>
      <div className="service-filter">
        <label htmlFor="status-filter">Sort</label>
        <IncidentSort onChange={onChangeSort} selected={sort} />{" "}
      </div>
    </div>
  );
}
