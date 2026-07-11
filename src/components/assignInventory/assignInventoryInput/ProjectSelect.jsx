import React, { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import TextError from "components/global/form/TextError";

import ArrowSVG from "assets/svgs/ArrowSVG";
import useClickOutside from "utils/clickOutside";
import Axios from "config/api";
import { setStats } from "redux/slices/projectSlice";
import { BeatLoader } from "react-spinners";

const ProjectSelect = ({ label, name, value, onChange, error, ...rest }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { docs: projectOptions } = useSelector((state) => state.project);




  // Fetch project list
  const queryKey = ["fetch-all-project",];
  const { isLoading } = useQuery(queryKey, () => Axios(`/project`), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {
        data: {
          data: { docs, pages, docsCount, page },
        },
      } = data;

      dispatch(setStats({ docs, pages, docsCount, page }));
    },
  });

  useClickOutside(dropdownRef, () => setShowMenu(false));

  const isActive = focused || value;

  // Memo selected project name
  const selectedLabel = useMemo(() => {
    return projectOptions.find((p) => p._id === value)?.title || "";
  }, [projectOptions, value]);

  const handleSelect = (val) => {
    onChange(val);
    setShowMenu(false);
  };

  return (
    <div className="relative form-row" ref={dropdownRef}>
      {/* Input Field */}
     <div
  className={`relative w-full transition-all duration-300 rounded-lg border ${
    error ? "border-red-500" : "border-lighter"
  }`}
>

        <input
          id={name}
          name={name}
          type="text"
          readOnly
          value={selectedLabel}
          onFocus={() => {
            setFocused(true);
            setShowMenu(true);
          }}
          className="w-full bg-transparent py-2 h-[32px] px-4 text-sm text-primary rounded-lg outline-none cursor-pointer"
          {...rest}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
        className={`absolute left-0 px-1 transition-all duration-300 pointer-events-none ${
    isActive
      ? `top-[-10px] text-[12px] ${error ? "text-red-500" : "text-gray3"}`
      : "top-3 text-gray3"
  }`}
>
          {label}
        </label>

        {/* Arrow icon */}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <ArrowSVG />
        </div>
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-[250px] overflow-y-auto">
          {isLoading ? (
            <div className="py-4 flex justify-center">
                            <div className=" flex  flex-col gap-1">
                       <BeatLoader size={13} color="#2D3748" />
                       <span className="text-gray-400  text-xs sm:text-sm">Loading...</span>
                     </div>
                     </div>
          ) : projectOptions?.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No Projects Found</div>
          ) : (
            projectOptions.map((option) => (
              <div
                key={option._id}
                onClick={() => handleSelect(option?._id)}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                  value === option?._id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {option?.title}
              </div>
            ))
          )}
        </div>
      )}

   {error && <TextError>{error}</TextError>}
    </div>
  );
};

export default ProjectSelect;
