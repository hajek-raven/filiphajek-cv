export type ProfileParagraph = {
  text: string;
  strong?: string;
  textAfterStrong?: string;
  strong2?: string;
  textAfterStrong2?: string;
  strong3?: string;
  textEnd?: string;
  strong4?: string;
  textAfterStrong4?: string;
};

export type ExperienceRole = {
  start: string;
  end: string;
  location: string;
  company: string;
  position: string;
  bullets: string[];
  tech: string[];
};

export type CvData = {
  meta: {
    title: string;
    description: string;
    email: string;
    linkedIn: string;
    linkedInLabel: string;
    location: string;
    eyebrow: string;
    subtitle: string;
    footerYear: number;
  };
  stackGroups: readonly {
    label: string;
    tags: readonly ({ name: string; primary?: true } | { name: string })[];
  }[];
  education: readonly {
    period: string;
    school: string;
    details: readonly string[];
  }[];
  languages: readonly { name: string; level: string }[];
  certifications: readonly { name: string }[];
  highlights: readonly { value: string; unit: string; label: string }[];
  profileParagraphs: readonly ProfileParagraph[];
  experience: ExperienceRole[];
  olderRoles: readonly {
    company: string;
    position: string;
    period: string;
    stack: string;
  }[];
  sections: {
    profile: string;
    experience: string;
    previously: string;
    stack: string;
    education: string;
    languages: string;
    certifications: string;
    highlights: string;
  };
};
