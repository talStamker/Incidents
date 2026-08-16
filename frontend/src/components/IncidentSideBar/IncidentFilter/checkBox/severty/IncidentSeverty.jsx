import IncidentCheckBox from "../IncidentCheBox";

export default function IncidentSeverty({ onChange, selected }) {
    const vars = ["Low", "Medium", "High", "Critical"];

    const onClick = [
        onChange,
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