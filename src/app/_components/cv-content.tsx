import { experience, olderRoles, profileParagraphs } from "@/lib/cv-data";
import { RichText } from "./rich-text";
import { Tag } from "./tag";

export function CvContent() {
  const profile = profileParagraphs[0];

  return (
    <main className="content">
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Profil</h2>
        </div>
        <div className="profile-text">
          {profile.text}
          <strong>{profile.strong}</strong>
          {profile.textAfterStrong}
          <strong>{profile.strong2}</strong>
          {profile.textAfterStrong2}
          <strong>{profile.strong3}</strong>
          {profile.textEnd}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Pracovní zkušenosti</h2>
        </div>

        {experience.map((role) => (
          <div className="role" key={role.company}>
            <div className="role-date">
              <div>{role.start}</div>
              <div className="date-end">{role.end}</div>
              <div className="date-loc">{role.location}</div>
            </div>
            <div className="role-body">
              <div className="role-title">
                <span className="role-company">{role.company}</span>
              </div>
              <div className="role-position">{role.position}</div>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>
                    <RichText text={bullet} />
                  </li>
                ))}
              </ul>
              <div className="role-tech">
                <span className="tech-label">Stack</span>
                {role.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="older">
          <div className="older-title">Dříve</div>
          {olderRoles.map((role) => (
            <div className="older-item" key={role.company}>
              <strong>{role.company}</strong> · {role.position} ·{" "}
              {role.period} · {role.stack}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
