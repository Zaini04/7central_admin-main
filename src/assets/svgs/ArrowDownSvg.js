const ArrowDownSvg = ({ rotated }) => {
  return (
  <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${
        rotated ? "rotate-180" : "rotate-0"
      }`}
    >
      <path
        d="M10.4534 4.77161H6.81926H3.54676C2.98676 4.77161 2.70676 5.44827 3.10343 5.84494L6.1251 8.86661C6.60926 9.35077 7.39676 9.35077 7.88093 8.86661L9.0301 7.71744L10.9026 5.84494C11.2934 5.44827 11.0134 4.77161 10.4534 4.77161Z"
        fill="#6C7278"
      />
    </svg>
  );
};

export default ArrowDownSvg;
