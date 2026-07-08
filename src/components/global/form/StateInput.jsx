import { useState, useEffect, useRef } from "react";
import { State } from "country-state-city";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "./TextError";

const StateInput = ({ countryCode, name, formik, label = "State" }) => {
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);

  const value = formik.values[name] || "";
  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || value !== "";

  useClickOutside(dropdownRef, () => setShowMenu(false));

  useEffect(() => {
    if (countryCode) {
      const fetchedStates = State.getStatesOfCountry(countryCode).map((s) => ({
        name: s.name,
        code: s.isoCode,
      }));
      setStates(fetchedStates);
    } else {
      setStates([]);
      formik.setFieldValue(name, "");
      formik.setFieldValue("province", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, name]);

  const handleSelect = (option) => {
 formik.setFieldValue("province", option.name);
    formik.setFieldValue("stateCode", option.code); 
    formik.setFieldValue("city", "");
    setSearchTerm("");
    setShowMenu(false);
  };

  const filteredStates = states.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative form-row" ref={dropdownRef}>
      <div
        className={`relative w-full rounded-lg border transition-all duration-300 ${
          isError
            ? "border-red-500"
            : focused
            ? "border-primary"
            : "border-[#9A9A9A]"
        }`}
      >
        <input
          id={name}
          name={name}
          type="text"
          readOnly
          value={value}
          disabled={!countryCode}
          onFocus={() => {
            if (countryCode) {
              setFocused(true);
              setShowMenu(true);
            }
          }}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
          placeholder="Select State"
          className={`w-full bg-transparent py-3 px-4 text-base text-pure rounded-lg outline-none ${
            !countryCode ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          }`}
        />

        <label
          htmlFor={name}
          className={`absolute -top-8 left-0 px-1 transition-all duration-300  pointer-events-none ${
            isActive
              ? `top-[-10px] text-[13px] ${
                  isError
                    ? "text-red-500"
                    : focused
                    ? "text-primary"
                    : "text-gray3"
                }`
              : "top-[-10px] text-[#1F2020]"
          }`}
        >
          {label}
        </label>

        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
          onClick={() => countryCode && setShowMenu((prev) => !prev)}
        >
          <ArrowSVG />
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-[70px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search state..."
              className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none"
            />
          </div>

          {filteredStates.length > 0 ? (
            filteredStates.map((option) => (
              <div
                key={option.code}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  value === option.name
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 italic">
              {countryCode ? "No matching states" : "Select a country first"}
            </div>
          )}
        </div>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default StateInput;
