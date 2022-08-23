import { useState } from 'react'

export const useField = (type) => {
    const name = type;
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        name,
        onChange,
    }
}