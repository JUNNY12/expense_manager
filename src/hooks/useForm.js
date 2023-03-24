import { useState } from "react";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleValueChange = (e) => {
        setValues(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    return [
        values,
        handleValueChange,
    ];
}