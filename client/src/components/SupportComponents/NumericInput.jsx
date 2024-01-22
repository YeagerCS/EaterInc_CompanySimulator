import React, { useState } from 'react'

export default function NumericInput({ placeholder, name, className }) {
    const [value, setValue] = useState("")

    const onChange = e => {
        const val = e.target.value;

        const numericValue = val.replace(/[^0-9]/g, '')
        setValue(numericValue)
    }

    return (
        <input 
            type="text" 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            name={name} 
            className={className}
        />
    )
}
