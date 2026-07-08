const setItem = (name, value) => {
    try {
        localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting item in localStorage:', error);
    }
};

const getItem = (name) => {
    try {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error getting item from localStorage:', error);
        return null;
    }
};

const removeItem = (name) => {
    try {
        localStorage.removeItem(name);
    } catch (error) {
        console.error('Error removing item from localStorage:', error);
    }
};

export { setItem, getItem, removeItem };
