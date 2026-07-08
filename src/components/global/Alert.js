import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearErrors } from 'redux/slices/authSlice';

const Alert = ({ type = 'error', message }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    let bgColor;
    let textColor;
    let borderColor;
    let icon;

    switch (type) {
        case 'warning':
            bgColor = 'bg-yellow-100';
            textColor = 'text-yellow-700';
            borderColor = 'border-l-yellow-600';
            icon = '⚠️';
            break;
        case 'error':
        default:
            bgColor = 'bg-red-200';
            textColor = 'text-red-700';
            borderColor = 'border-l-red-600';
            icon = '❌';
            break;
    }

    const closeHandler = () => {
        setVisible(false);
        dispatch(clearErrors())
    }



    return (
        <div className={`${bgColor} border-l-4 ${borderColor} ${textColor} px-4 py-3  relative flex items-center justify-between gap-3`} role="alert">
            <p className="flex items-center">
                {/* <span className="mr-2">{icon}</span> */}
                <span className="block sm:inline">{message}</span>
            </p>
            <p
                className={`${textColor} -mr-1.5 `}
                onClick={closeHandler}
                style={{ cursor: 'pointer' }}
            >
                ❌
            </p>
        </div>
    );
};

export default Alert;
