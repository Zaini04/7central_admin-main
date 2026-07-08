const ToggleSwitch = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
        enabled ? "bg-green-600" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          enabled ? "translate-x-8" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;