import type { CvData } from "../types";

export const cvDataCs: CvData = {
  meta: {
    title: "Filip Hájek — AI Product Engineer",
    description:
      "AI Product Engineer · Agentic Systems · TypeScript. CV Filipa Hájka.",
    email: "hajek.raven@gmail.com",
    linkedIn: "https://www.linkedin.com/in/hajekfi",
    linkedInLabel: "linkedin.com/in/hajekfi",
    location: "Praha",
    eyebrow: "Praha · AI Product Engineering",
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
        { name: "LLM orchestrace" },
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
      school: "ČVUT v Praze",
      details: ["Softwarové inženýrství", "Nedokončeno"],
    },
    {
      period: "2012 — 2016",
      school: "SPŠSE a VOŠ Liberec",
      details: ["Maturita"],
    },
  ],
  languages: [
    { name: "Čeština", level: "Rodilý mluvčí" },
    { name: "Angličtina", level: "Professional working" },
  ],
  certifications: [{ name: "Kanban System Design" }],
  highlights: [
    {
      value: "8",
      unit: "+",
      label: "let praxe ve vývoji webových aplikací",
    },
    {
      value: "Několik",
      unit: "",
      label: "větších produkčních systémů od návrhu po provoz",
    },
    {
      value: "4",
      unit: "y",
      label: "vedení vlastního vývojového týmu",
    },
  ],
  profileParagraphs: [
    {
      text: "",
      strong: "AI Product / Fullstack Engineer",
      textAfterStrong:
        " s 10+ lety zkušeností v TypeScriptu, Reactu, Next.js a Node.js. Stavím ",
      strong2: "produkční AI systémy",
      textAfterStrong2:
        ": voice asistenty, agentní workflow, tool calling, LLM orchestraci, streaming a integrace do backendů.",
    },
    {
      text: "Poslední 4 roky jsem vedl vlastní vývojovou agenturu a dodal několik větších produkčních systémů včetně AI hotline, datových platforem, výrobního softwaru a interních podnikových aplikací. ",
      strong3: "V Cursoru pracuji denně",
      textEnd:
        " a používám agentic coding pro prototypování, refactoring, debugging, testy a review, zatímco architektura, bezpečnost a kvalita výsledku zůstávají moje odpovědnost.",
    },
  ],
  experience: [
    {
      start: "01/2023",
      end: "04/2026",
      location: "Praha",
      company: "FIRE Systems",
      position: "Zakladatel  ·  AI Product & Fullstack Engineer",
      bullets: [
        "Vedení menší vývojové agentury, dodávka zakázkových systémů od návrhu po produkční provoz, klientská odpovědnost a technická rozhodování.",
        "**AI development**: stavba produkčních agentních systémů a voice asistentů nad **Vercel AI SDK** — LLM orchestrace, tool calling, streaming, integrace a napojení na produkční backend.",
        "**AI hotline pro pražského ISP**: voice asistent s backendovou orchestrací logiky, integracemi a reálným provozem mimo klasický web.",
        "**Agentic coding v Cursoru**: každodenní vývoj s AI asistenty pro rychlejší prototypování, refactoring, debugging, testy a code review bez ztráty engineering kontroly.",
        "**Datová platforma se scrapingem 50+ mil. záznamů**, detekce změn, automatizace, monitoring, alerting, odolnost vůči chybám.",
        "Několik větších podnikových aplikací, výrobní software a interní nástroje s netriviálními datovými modely a admin rozhraním.",
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
      location: "Praha",
      company: "EPAM Systems",
      position: "Senior Software Engineer",
      bullets: [
        "**Wealth management aplikace pro velkou švýcarskou banku**, vývoj ve velkém technologickém týmu napříč více squadami.",
        "Celý vývojový cyklus od analýzy přes implementaci po review a release, s důrazem na dlouhodobě udržitelné řešení.",
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
      location: "Praha",
      company: "Strafos",
      position: "Interim CTO  ·  Senior Software Engineer",
      bullets: [
        "Výběr technologií a architektury podle požadavků klientů, technický dohled nad směrem produktu.",
        "Fullstack vývoj produktu, návrh datových modelů, API a backendové infrastruktury.",
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
      location: "Praha",
      company: "NEORIS",
      position: "Senior Frontend Developer",
      bullets: [
        "Kompletní **rewrite rozsáhlé codebase (250k+ řádků)**, implementace komplexních user flow a architektury frontendu.",
        "Spolupráce více Scrum týmů, vývoj náročného UI včetně Arabic right-to-left layoutu.",
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
    profile: "Profil",
    experience: "Pracovní zkušenosti",
    previously: "Dříve",
    stack: "Stack",
    education: "Vzdělání",
    languages: "Jazyky",
    certifications: "Certifikace",
    highlights: "V kostce",
  },
};
