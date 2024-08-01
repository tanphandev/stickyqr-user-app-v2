import type { Country } from '@/configs/country';
import { countryList } from '@/configs/country';

export const findCountry = (
  isoCode?: string,
  phoneCode?: string
): Country | null => {
  return (
    countryList.find(
      (country) =>
        country?.isoCode === isoCode && country?.phoneCode === phoneCode
    ) || null
  );
};
