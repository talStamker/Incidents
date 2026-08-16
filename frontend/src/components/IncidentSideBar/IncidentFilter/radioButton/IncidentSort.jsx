import IncidentCheckBox from "../checkBox/IncidentCheBox";

export default function IncidentSort({ onChange, selected }) {
    const vars = ["Newest", "Oldest"];

    const onClick = [
        onChange,
        onChange
    ];

    return (
        <IncidentCheckBox
            vars={vars}
            onClick={onClick}
            type="radio"
            selected={selected}
        />
    );
}