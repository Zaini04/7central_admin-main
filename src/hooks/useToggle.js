

import  { useState } from 'react'
const useToggle = (defaultValue) => {
    const [value,setValue]=useState(defaultValue)
    const toggleValue = (value) => {
        setValue(currentVal => (
            typeof value === 'boolean' ? value : !currentVal
        ))
    }
    return [value , toggleValue]
}
export default useToggle;
