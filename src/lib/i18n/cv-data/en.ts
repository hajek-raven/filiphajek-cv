import type { CvData } from "../types";

export const cvDataEn: CvData = {
  meta: {
    title: "Filip Hájek — AI Product Engineer",
    description:
      "AI Product Engineer · Agentic Systems · TypeScript. CV of Filip Hájek.",
    email: "hajek.raven@gmail.com",
    linkedIn: "https://www.linkedin.com/in/hajekfi",
    linkedInLabel: "linkedin.com/in/hajekfi",
    location: "Prague",
    eyebrow: "Prague · AI Product Engineering",
    subtitle: "AI Product Engineer  ·  Lead Fullstack  ·  Agentic Systems",
    footerYear: 2026,
  },
  stackGroups: [
    {
      label: "AI & Agents",
      tags: [
        { name: "Vercel AI SDK", primary: true },
        { name: "Agentic systems", primary: true },
        { name: "Tool calling" },
        { name: "LLM orchestration" },
        { name: "Streaming" },
        { name: "Voice AI" },
        { name: "Cursor" },
        { name: "Agentic coding" },
      ],
    },
    {
      label: "Core engineering",
      tags: [
        { name: "TypeScript", primary: true },
        { name: "Next.js", primary: true },
        { name: "React", primary: true },
        { name: "Node.js", primary: true },
      ],
    },
    {
      label: "Data & API",
      tags: [
        { name: "PostgreSQL" },
        { name: "Drizzle ORM" },
        { name: "GraphQL" },
        { name: "Hasura" },
        { name: "REST" },
      ],
    },
    {
      label: "Delivery",
      tags: [
        { name: "Docker" },
        { name: "Linux" },
        { name: "CI/CD" },
        { name: "Monitoring" },
        { name: "Product ownership" },
        { name: "Tailwind CSS" },
      ],
    },
  ],
  education: [
    {
      period: "2016 — 2018",
      school: "Czech Technical University in Prague",
      details: ["Software Engineering", "Incomplete"],
    },
    {
      period: "2012 — 2016",
      school: "SPŠSE and VOŠ Liberec",
      details: ["High school diploma"],
    },
  ],
  languages: [
    { name: "Czech", level: "Native" },
    { name: "English", level: "Professional working" },
  ],
  certifications: [{ name: "Kanban System Design" }],
  highlights: [
    {
      value: "8",
      unit: "+",
      label: "years building web applications",
    },
    {
      value: "Several",
      unit: "",
      label: "larger production systems delivered end to end",
    },
    {
      value: "4",
      unit: "y",
      label: "leading my own development team",
    },
  ],
  profileParagraphs: [
    {
      text: "",
      strong: "AI Product / Fullstack Engineer",
      textAfterStrong:
        " with 10+ years of experience in TypeScript, React, Next.js and Node.js. I build ",
      strong2: "production AI systems",
      textAfterStrong2:
        ": voice assistants, agentic workflows, tool calling, LLM orchestration, streaming and backend integrations.",
    },
    {
      text: "Over the past 4 years, I led my own software delivery company and shipped several larger production systems, including an AI hotline, data platforms, manufacturing software and internal business applications. ",
      strong3: "I work in Cursor daily",
      textEnd:
        " and use agentic coding for prototyping, refactoring, debugging, testing and review, while keeping architecture, security and code quality under my responsibility.",
    },
  ],
  experience: [
    {
      start: "01/2023",
      end: "04/2026",
      location: "Prague",
      company: "FIRE Systems",
      position: "Founder  ·  AI Product & Fullstack Engineer",
      bullets: [
        "Led a small development agency, delivering custom systems from design through production, with client accountability and technical decision-making.",
        "**AI development**: building production agentic systems and voice assistants on top of the **Vercel AI SDK** — LLM orchestration, tool calling, streaming, integrations, and wiring into a production backend.",
        "**AI hotline for a Prague ISP**: a voice assistant with backend logic orchestration, integrations, and real-world operation beyond a classic web app.",
        "**Agentic coding in Cursor**: daily development with AI assistants for faster prototyping, refactoring, debugging, testing and code review without losing engineering control.",
        "**Data platform scraping 50+ million records**, change detection, automation, monitoring, alerting, and fault tolerance.",
        "Several larger enterprise applications, manufacturing software, and internal tools with non-trivial data models and admin interfaces.",
      ],
      tech: [
        "TypeScript",
        "Next.js",
        "Node.js",
        "Vercel AI SDK",
        "Agentic systems",
        "Tool calling",
        "Voice AI",
        "Cursor",
        "Agentic coding",
        "PostgreSQL",
        "Drizzle ORM",
        "React",
        "Tailwind",
        "Docker",
        "Leadership",
      ],
    },
    {
      start: "01/2021",
      end: "04/2023",
      location: "Prague",
      company: "EPAM Systems",
      position: "Senior Software Engineer",
      bullets: [
        "**Wealth management application for a major Swiss bank**, development in a large engineering organization across multiple squads.",
        "Full development cycle from analysis through implementation, review, and release, with a focus on long-term sustainable solutions.",
      ],
      tech: [
        "React",
        "TypeScript",
        "Node.js",
        "REST",
        "CI/CD",
        "Git",
        "SAFe",
      ],
    },
    {
      start: "11/2019",
      end: "11/2020",
      location: "Prague",
      company: "Strafos",
      position: "Interim CTO  ·  Senior Software Engineer",
      bullets: [
        "Technology and architecture selection based on client requirements, technical oversight of product direction.",
        "Fullstack product development, data model design, API and backend infrastructure.",
      ],
      tech: [
        "React",
        "Node.js",
        "Apollo GraphQL",
        "Hasura",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      start: "05/2018",
      end: "12/2019",
      location: "Prague",
      company: "NEORIS",
      position: "Senior Frontend Developer",
      bullets: [
        "Complete **rewrite of a large codebase (250k+ lines)**, implementing complex user flows and frontend architecture.",
        "Collaboration across multiple Scrum teams, building demanding UI including Arabic right-to-left layout.",
      ],
      tech: ["TypeScript", "Angular 5+", "NgRx", "Stencil.js", "SASS"],
    },
  ],
  olderRoles: [
    {
      company: "DP Games",
      position: "Lead Full-stack Developer",
      period: "10/2017 - 11/2018",
      stack: "PHP, Nette, Laravel, Angular, DigitalOcean",
    },
    {
      company: "Gondola Graniti",
      position: "Full-stack Developer",
      period: "04/2017 - 04/2018",
      stack: "PHP7, Laravel, Angular, Docker, microservices",
    },
    {
      company: "V3Net.cz",
      position: "Full-stack Developer",
      period: "07/2014 - 07/2015",
      stack: "React, jQuery, PHP, Nette, Vagrant, server administration",
    },
  ],
  sections: {
    profile: "Profile",
    experience: "Work Experience",
    previously: "Previously",
    stack: "Stack",
    education: "Education",
    languages: "Languages",
    certifications: "Certifications",
    highlights: "At a glance",
  },
};
