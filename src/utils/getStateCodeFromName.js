import { State } from "country-state-city";


export const getStateCodeFromName = (countryCode, stateName) => {
  if (!countryCode || !stateName) return "";

  const states = State.getStatesOfCountry(countryCode);
  const found = states.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );
  return found?.isoCode || "";
};