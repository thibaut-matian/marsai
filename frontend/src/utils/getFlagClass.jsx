import { countryCodes } from '../constants/countryCodes';

export function getFlagClass(countryName) {
  const code = countryCodes[countryName];
  return code ? `fi fi-${code}` : '';
}