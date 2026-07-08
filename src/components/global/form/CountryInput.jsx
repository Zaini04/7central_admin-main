import { useState, useEffect, useRef } from "react";
import { Country } from "country-state-city";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "./TextError";

const CountryInput = ({ name, formik, label = "Country" }) => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);

  const value = formik.values[name] || "";
  const isError = formik.touched[name] && formik.errors[name];
  const isActive = focused || value !== "";

  useClickOutside(dropdownRef, () => setShowMenu(false));

  useEffect(() => {
    const allCountries = Country.getAllCountries().map((c) => ({
      name: c.name,
      code: c.isoCode,
    }));
    setCountries(allCountries);
  }, []);

  const handleSelect = (option) => {
    // when country changes, reset dependent fields
    formik.setFieldValue(name, option.name);
    formik.setFieldValue("countryCode", option.code);
    formik.setFieldValue("province", "");
    formik.setFieldValue("stateCode", "");
    formik.setFieldValue("city", "");
    setSearchTerm("");
    setShowMenu(false);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          onFocus={() => {
            setFocused(true);
            setShowMenu(true);
          }}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
          placeholder="Select Country"
          className="w-full bg-transparent py-3 px-4 text-base text-pure rounded-lg outline-none cursor-pointer"
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
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <ArrowSVG />
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country..."
              className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none"
            />
          </div>

          {filteredCountries.length > 0 ? (
            filteredCountries.map((option) => (
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
              No matching countries
            </div>
          )}
        </div>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default CountryInput;
