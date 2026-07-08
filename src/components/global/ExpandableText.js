import React, { memo, useState } from 'react';

const ExpandableText = ({ text, startLength = 6, endLength = 4 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const start = text.slice(0, startLength);
    const end = text.slice(-endLength);

    return (
        <span
            onClick={toggleExpansion}
            className={`cursor-pointer text-blue-500 whitespace-normal break-all `}
            style={{ display: 'inline-block', maxWidth: '100%' }}
        >
            {isExpanded ? text : `${start}...${end}`}
        </span>
    );
};

export default memo(ExpandableText)