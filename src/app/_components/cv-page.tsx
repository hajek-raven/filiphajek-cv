import { cvMeta } from "@/lib/cv-data";
import { CvContent } from "./cv-content";
import { CvHeader } from "./cv-header";
import { CvSidebar } from "./cv-sidebar";

export function CvPage() {
  return (
    <div className="page">
      <div className="page-deco" aria-hidden="true">
        <div className="page-deco__dots" />
        <div className="page-deco__glow page-deco__glow--1" />
        <div className="page-deco__glow page-deco__glow--2" />
      </div>

      <CvHeader />

      <div className="main">
        <CvSidebar />
        <CvContent />
      </div>

      <footer className="footer">
        <div className="signature">
          Filip Hájek · {cvMeta.footerYear}
        </div>
      </footer>
    </div>
  );
}
