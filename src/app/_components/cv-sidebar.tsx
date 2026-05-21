import {
  certifications,
  education,
  highlights,
  languages,
  stackGroups,
} from "@/lib/cv-data";
import { Tag } from "./tag";

export function CvSidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section sidebar-section--stack">
        <div className="sidebar-title">Stack</div>
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
          <div className="sidebar-title">Vzdělání</div>
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
          <div className="sidebar-title">Jazyky</div>
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
          <div className="sidebar-title">Certifikace</div>
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
        <div className="sidebar-title">V kostce</div>
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
