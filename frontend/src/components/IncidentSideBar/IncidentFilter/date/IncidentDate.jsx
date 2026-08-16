import { useState } from "react";

export default function IncidentDate({ onChange }) {
    const [date, setDate] = useState("");

    return (
        <input
            type="date"
            value={date}
            onChange={(e) => {
                setDate(e.target.value);
                onChange(e.target.value);
            }}
        />
    );
}