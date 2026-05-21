import type { Locale } from "@/lib/i18n/config";
import { getCvData } from "@/lib/i18n/cv-data";
import { Tag } from "./tag";

type CvSidebarProps = {
  locale: Locale;
};

export function CvSidebar({ locale }: CvSidebarProps) {
  const {
    stackGroups,
    education,
    languages,
    certifications,
    highlights,
    sections,
  } = getCvData(locale);

  return (
    <aside className="sidebar">
      <div className="sidebar-section sidebar-section--stack">
        <div className="sidebar-title">{sections.stack}</div>
        {stackGroups.map((group) => (
          <div className="stack-group" key={group.label}>
            <div className="stack-group-label">{group.label}</div>
            <div className="stack-tags">
              {group.tags.map((tag) => (
                <Tag key={tag.name} primary={"primary" in tag && tag.primary}>
                  {tag.name}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-meta">
        <div className="sidebar-section sidebar-section--education">
          <div className="sidebar-title">{sections.education}</div>
          <ul className="meta-list">
            {education.map((item) => (
              <li key={item.period}>
                <div className="meta-label">{item.period}</div>
                <div className="meta-value">{item.school}</div>
                {item.details.map((detail) => (
                  <div className="meta-sub" key={detail}>
                    {detail}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section sidebar-section--languages">
          <div className="sidebar-title">{sections.languages}</div>
          <ul className="meta-list">
            {languages.map((lang) => (
              <li key={lang.name}>
                <div className="meta-value">{lang.name}</div>
                <div className="meta-sub">{lang.level}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section sidebar-section--certs">
          <div className="sidebar-title">{sections.certifications}</div>
          <ul className="meta-list">
            {certifications.map((cert) => (
              <li key={cert.name}>
                <div className="meta-value">{cert.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sidebar-section highlights sidebar-section--highlights">
        <div className="sidebar-title">{sections.highlights}</div>
        <div className="stats-grid">
          {highlights.map((item) => (
            <div className="highlight-item" key={item.label}>
              <div className="highlight-num">
                {item.value}
                <span className="unit">{item.unit}</span>
              </div>
              <div className="highlight-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
