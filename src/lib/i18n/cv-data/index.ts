import type { Locale } from "../config";
import { cvDataCs } from "./cs";
import { cvDataEn } from "./en";
import type { CvData } from "../types";

const cvDataByLocale: Record<Locale, CvData> = {
  cs: cvDataCs,
  en: cvDataEn,
};

export function getCvData(locale: Locale): CvData {
  return cvDataByLocale[locale];
}
