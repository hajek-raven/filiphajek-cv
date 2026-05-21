import type { Locale } from "@/lib/i18n/config";
import { getCvData } from "@/lib/i18n/cv-data";
import Image from "next/image";

type CvHeaderProps = {
  locale: Locale;
};

export function CvHeader({ locale }: CvHeaderProps) {
  const { meta } = getCvData(locale);

  return (
    <header className="header">
      <div className="photo-frame">
        <Image
          src="/photo.jpg"
          alt="Filip Hájek"
          width={212}
          height={212}
          className="photo"
          priority
        />
      </div>
      <div className="header-content">
        <p className="eyebrow">{meta.eyebrow}</p>
        <h1 className="name">
          Filip <span className="last">Hájek</span>
        </h1>
        <div className="subtitle">{meta.subtitle}</div>
        <div className="header-meta">
          <span className="header-meta-item">{meta.email}</span>
          <span className="header-meta-item">
            <a href={meta.linkedIn}>{meta.linkedInLabel}</a>
          </span>
          <span className="header-meta-item">{meta.location}</span>
        </div>
      </div>
    </header>
  );
}
