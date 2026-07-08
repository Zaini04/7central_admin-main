const convertToFormData = (data) => {
    const formData = new FormData();

    const appendData = (key, value) => {
        if (Array.isArray(value)) {
            const isFileArray = value.every(item => item instanceof File);
            
            if (isFileArray) {
                value.forEach(file => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, JSON.stringify(value));
            }
        } else if (value instanceof File) {
            formData.append(key , value)
        }else if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                appendData(`${key}[${nestedKey}]`, nestedValue);
            });
        } else {
            formData.append(key, value);
        }
    };

    for (const [key, value] of Object.entries(data)) {
        appendData(key, value);
    }

    return formData;
};

export default convertToFormData;
