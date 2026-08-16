export default function IncidentCheckBox({
    onClick,
    vars,
    type,
    selected
}) {
    return (
        <>
            {vars.map((value, index) => (
                <label key={value}>
                    <input
                        type={type}
                        value={value}
                        checked={
                            type === "radio"
                                ? selected === value
                                : selected.includes(value)
                        }
                        onChange={() => onClick[index](value)}
                    />
                    {value}
                </label>
            ))}
        </>
    );
}