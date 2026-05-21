import Image from "next/image";
import { cvMeta } from "@/lib/cv-data";

export function CvHeader() {
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
        <p className="eyebrow">{cvMeta.eyebrow}</p>
        <h1 className="name">
          Filip <span className="last">Hájek</span>
        </h1>
        <div className="subtitle">{cvMeta.subtitle}</div>
        <div className="header-meta">
          <span className="header-meta-item">{cvMeta.email}</span>
          <span className="header-meta-item">
            <a href={cvMeta.linkedIn}>{cvMeta.linkedInLabel}</a>
          </span>
          <span className="header-meta-item">{cvMeta.location}</span>
        </div>
      </div>
    </header>
  );
}
