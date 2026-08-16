import IncidentCheckBox from "../IncidentCheBox";

export default function IncidentStatus({ onChange, selected }) {
    const vars = ["Open", "Investigating", "Resolved"];

    const onClick = [
        onChange,
        onChange,
        onChange
    ];

    return (
        <IncidentCheckBox
            vars={vars}
            onClick={onClick}
            type="checkbox"
            selected={selected}
        />
    );
}