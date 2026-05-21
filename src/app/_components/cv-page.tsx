import type { Locale } from "@/lib/i18n/config";
import { getCvData } from "@/lib/i18n/cv-data";
import { CvContent } from "./cv-content";
import { CvHeader } from "./cv-header";
import { CvSidebar } from "./cv-sidebar";

type CvPageProps = {
  locale: Locale;
};

export function CvPage({ locale }: CvPageProps) {
  const { meta } = getCvData(locale);

  return (
    <div className="page">
      <div className="page-deco" aria-hidden="true">
        <div className="page-deco__dots" />
        <div className="page-deco__glow page-deco__glow--1" />
        <div className="page-deco__glow page-deco__glow--2" />
      </div>

      <CvHeader locale={locale} />

      <div className="main">
        <CvSidebar locale={locale} />
        <CvContent locale={locale} />
      </div>

      <footer className="footer">
        <div className="signature">
          Filip Hájek · {meta.footerYear}
        </div>
      </footer>
    </div>
  );
}
