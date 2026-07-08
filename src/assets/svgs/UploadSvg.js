import * as React from "react";

const SvgIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 16 16"
    >
        <path
            d="M7 12V3.85l-2.6 2.6L3 5l5-5 5 5-1.4 1.45L9 3.85V12zm-5 4q-.824 0-1.412-.588A1.93 1.93 0 0 1 0 14v-3h2v3h12v-3h2v3q0 .825-.588 1.412A1.93 1.93 0 0 1 14 16z"
        ></path>
    </svg>
);

export default SvgIcon;
