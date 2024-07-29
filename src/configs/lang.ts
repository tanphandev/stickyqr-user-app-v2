export enum LANG {
  VI = 'vi',
  EN = 'en',
}

export interface SiteLanguage {
  code: LANG;
  name: string;
}

export const LANGUAGES_SUPPORTED: SiteLanguage[] = [
  { code: LANG.EN, name: 'English' },
  { code: LANG.VI, name: 'Việt Nam' },
];

export const DEFAULT_LANGUAGE_KEY = LANGUAGES_SUPPORTED[0].code;
export const DEFAULT_LANGUAGE_NAME = LANGUAGES_SUPPORTED[0].name;

export const LANGUAGES_SUPPORTED_KEYS = LANGUAGES_SUPPORTED.map(
  (lang) => lang.code
);

export function isLanguageSupported(lang: LANG) {
  return LANGUAGES_SUPPORTED_KEYS.includes(lang);
}
