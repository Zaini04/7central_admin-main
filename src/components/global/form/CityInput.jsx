import { useState, useEffect, useRef } from "react";
import { City } from "country-state-city";
import { ErrorMessage } from "formik";
import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import TextError from "./TextError";


const CityInput = ({ countryCode, stateCode, name, formik, label = "City" }) => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);

  const value = formik.values[name] || "";
  const isError = formik.touched[name] && Boolean(formik.errors[name]);
  const isActive = focused || value !== "";

  useClickOutside(dropdownRef, () => setShowMenu(false));

  useEffect(() => {
    if (countryCode && stateCode) {
      const rawCities = City.getCitiesOfState(countryCode, stateCode) || [];
      const fetchedCities = rawCities.map((c) => c.name);
      setCities(fetchedCities);

      if (!fetchedCities.includes(formik.values[name])) {
        formik.setFieldValue(name, "");
      }
    } else {
      setCities([]);
      formik.setFieldValue(name, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, stateCode, name]);

  const handleSelect = (cityName) => {
    formik.setFieldValue(name, cityName);
    setSearchTerm("");
    setShowMenu(false);
  };

  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
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
          disabled={!stateCode}
          onFocus={() => {
            if (stateCode) {
              setFocused(true);
              setShowMenu(true);
            }
          }}
          onBlur={() => {
            setFocused(false);
            formik.setFieldTouched(name, true);
          }}
          placeholder="Select City"
          className={`w-full bg-transparent py-2 px-4  rounded-lg outline-none ${
            !stateCode ? "cursor-not-allowed opacity-60" : "cursor-pointer"
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
          onClick={() => stateCode && setShowMenu((prev) => !prev)}
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
              placeholder="Search city..."
              className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none"
            />
          </div>

          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city}
                onClick={() => handleSelect(city)}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  value === city
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {city}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 italic">
              {stateCode ? "No matching cities" : "Select a state first"}
            </div>
          )}
        </div>
      )}

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default CityInput;
