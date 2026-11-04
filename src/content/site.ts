// All editable content lives here. Anything still marked TODO needs your input.
// Source: Profile.pdf (LinkedIn export). Wording marked DRAFT is mine, please edit.
export const site = {
  name: "Mithil Rajapakse",
  // DRAFT
  pitch: "Electrical engineering student building AI and automation tools that stop engineers repeating themselves.",
  location: "Colombo, Sri Lanka",
  email: "rajapaksemithil@gmail.com",
  github: "https://github.com/mithilyr",
  linkedin: "https://lk.linkedin.com/in/mithilrajapakse",
  resume: "/resume.pdf", // phone number removed; the button hides if this is empty
  // from your earlier portfolio's footer
  tagline: "Building systems that move, think, and, occasionally, get designed a poster.",
  // DRAFT, condensed from your LinkedIn summary
  photo: "/photo.png",
  about: [
    "Math is where it all started for me, and electrical engineering was the natural extension: a field where math actually builds things. I'm a final-year Electrical and Electronics Engineering student at Curtin University Colombo, working across applied AI, solar PV and embedded systems.",
    "I get bored doing the same task twice, so I build tools that stop me repeating myself. At Hayleys Fentons I built a Python tool to automate solar Bill of Materials calculations and another to optimise panel string layouts, on my own initiative. My final-year research is on explainable AI, and I'm increasingly drawn to moving my career toward AI.",
  ],
};

export type Experience = { role: string; org: string; year: string; detail: string };
export const experience: Experience[] = [
  {
    role: "Head of Public Relations",
    org: "IEEE Student Branch, Curtin Colombo",
    year: "Nov 2025 - now",
    detail:
      "Founding committee member. I lead a public relations team of 16+ members and own publicity end to end for every chapter event, from concept to execution. I run the branch's presence on Instagram, LinkedIn, YouTube and Facebook, and design posters and sponsorship proposals on Canva.",
  },
  {
    role: "Engineer Intern",
    org: "Hayleys Fentons",
    year: "Nov 2025 - Feb 2026",
    detail:
      "Worked across utility-scale and industrial rooftop solar PV projects from 300 kW to 1.5 MW, at sites including Alumex Ekala, Captain Steel, Waguruwela Oil Mills and Femstar Packaging. Spotted a manual, error-prone Bill of Materials process and built a Python tool (Tkinter GUI and CLI) to automate it, with Excel export. On my own initiative I also built a combinatorial optimisation tool for solar panel string configurations that ranks layouts by installation practicality and inverter load balance.",
  },
  {
    role: "President",
    org: "Curtin Colombo Student Guild",
    year: "Nov 2024 - Nov 2025",
    detail:
      "Elected head of the university's official student representative body, leading a team of over 150 students. I took on and solved multiple student welfare issues, created the Houses system for the university, and organised its first Sports Meet, Eclipse '25, from planning through execution.",
  },
  {
    role: "Assistant Treasurer",
    org: "Curtin Colombo Student Guild",
    year: "Nov 2023 - Nov 2024",
    detail:
      "Oversaw finances across the Guild's major campus events. Head of Finance for Unplugged 2024, the university's largest event, a concert, where I secured over LKR 1 million in sponsorships.",
  },
];

export const education = [
  { what: "BEng, Electrical and Electronics Engineering", where: "Curtin University Colombo", year: "2023 - present" },
  { what: "Combined Mathematics, GCE A/L and O/L", where: "Royal College Colombo", year: "2011 - 2023" },
];
export const certifications = [
  "AI Fundamentals with Claude",
  "StudIEAust",
  "Curtin Extra Tier 2",
  "Letter of Commendation",
  "Edexcel Advanced Subsidiary & Advanced Level",
];

// Real images for the project pages (files live in /public/projects/<slug>/).
// They are screenshots and figures from your public repositories, and from the public live pages.
// Projects with a private repository have none yet: drop files into public/projects/<slug>/ and list them here.
export type Shot = { src: string; alt: string; caption: string; w: number; h: number };
const shot = (slug: string, name: string, w: number, h: number, caption: string): Shot => ({
  src: `/projects/${slug}/${name}.webp`, alt: caption, caption, w, h,
});
const shot2 = (name: string, w: number, h: number, caption: string): Shot => ({ src: `/highlights/${name}.webp`, alt: caption, caption, w, h });
export const gallery: Record<string, { title: string; items: Shot[] }> = {
  "solar-pv-designer": {
    title: "Screenshots",
    items: [
      shot("solar-pv-designer", "banner", 1280, 640, "The project banner: a free Windows app with the PUCSL guideline checks built in."),
      shot("solar-pv-designer", "roofs", 1200, 720, "Roofs tab: a panel grid you can import (CSV, Excel, AutoCAD DXF), build from dimensions, or edit cell by cell."),
      shot("solar-pv-designer", "google-earth", 1200, 720, "Roof from dimensions: enter the roof face measured in Google Earth and the panel size, and the grid is built for you."),
      shot("solar-pv-designer", "panels-inverters", 1200, 716, "Panels and inverters: pick a module and the app suggests string lengths and inverter combinations."),
      shot("solar-pv-designer", "strings", 1200, 720, "String design: strings per inverter and MPPT, with a colour-coded string layout across the roof."),
      shot("solar-pv-designer", "bom", 1200, 720, "Bill of materials with quantities you can edit, ready for Excel export."),
      shot("solar-pv-designer", "bom-rules", 1200, 716, "BOM rules: the variables and formulas behind every quantity, editable so a company can use its own."),
      shot("solar-pv-designer", "checks", 1200, 720, "Design checks against the PUCSL guideline, each shown as passed, warning or failed with its clause."),
      shot("solar-pv-designer", "linkedin-post", 800, 1000, "The announcement post on LinkedIn."),
    ],
  },
  "laya-lk-bench": {
    title: "Figures from the study",
    items: [
      shot("laya-lk-bench", "macro-f1", 1600, 941, "Macro-F1 by language: English 0.72 against Sinhala 0.46."),
      shot("laya-lk-bench", "confidently-wrong", 1600, 863, "Confidently wrong answers at 90%+ confidence: 0.3% of English posts against 24.5% of Sinhala."),
      shot("laya-lk-bench", "reliability", 1594, 1015, "Reliability curves: how the model's confidence compares with its accuracy."),
      shot("laya-lk-bench", "selective", 1482, 912, "Selective prediction: accuracy when the model is allowed to abstain."),
      shot("laya-lk-bench", "fertility", 1548, 942, "Tokenizer fertility: how many tokens each language needs per word."),
      shot("laya-lk-bench", "attribution", 1600, 870, "Explanation attribution: which tokens the model's explanations point to."),
    ],
  },
  "graph-rag": {
    title: "From the competition",
    items: [
      shot2("codefest-team", 575, 431, "Team Praxis with the trophy and certificates."),
      shot2("codefest-cheque", 575, 431, "The 2nd place cheque for the AI Innovation Challenge."),
      shot2("codefest-stage", 601, 401, "The 2nd place presentation on stage at SLIIT CodeFest 2026."),
      shot2("ifs-workshop", 575, 767, "At the IFS workshop for the CodeFest top 10 teams."),
    ],
  },
  "waypoint-delivery": {
    title: "From the live demo",
    items: [shot("waypoint-delivery", "sign-in", 1440, 900, "The sign-in page: one system, four roles (dispatcher, loader, driver, store manager).")],
  },
  ember: {
    title: "From the live prototype",
    items: [shot("ember", "hero", 1440, 900, "The Ember landing page for IEEE Day 2026.")],
  },
};

// The "Design & Publicity" division: four collections of your Canva work (files in /public/design/<slug>/).
// Wording is built from what the designs show and from your CV. Please read the captions and correct anything.
export type DesignWork = { slug: string; tag: string; title: string; blurb: string; skills: string[]; items: Shot[] };
const dshot = (slug: string, name: string, w: number, h: number, caption: string): Shot => ({
  src: `/design/${slug}/${name}.webp`, alt: caption, caption, w, h,
});
export const design: DesignWork[] = [
  {
    slug: "ieee-publicity",
    tag: "Technical and symposium publicity",
    title: "IEEE chapter publicity",
    blurb:
      "Carousels, decks and announcements for the IEEE Student Branch of Curtin University Colombo, as founding Head of Public Relations: a guide to the IEEE societies, the membership presentation, and the branch's presence on Instagram, LinkedIn, YouTube and Facebook.",
    skills: ["Canva", "Instagram", "YouTube", "Facebook"],
    items: [
      dshot("ieee-publicity", "ieee-societies-1", 1080, 1350, "Find Your IEEE Community: a swipe carousel introducing the six societies and affinity groups."),
      dshot("ieee-publicity", "ieee-societies-2", 1080, 1350, "Society spotlight: the IEEE Technology and Engineering Management Society."),
      dshot("ieee-publicity", "ieee-societies-3", 1080, 1350, "Society spotlight: the IEEE Robotics and Automation Society."),
      dshot("ieee-publicity", "ieee-societies-4", 1080, 1350, "Society spotlight: the IEEE Aerospace and Electronic Systems Society."),
      dshot("ieee-publicity", "ieee-deck-1", 1280, 720, "Cover of the introduction session for the IEEE Student Branch of Curtin University Colombo."),
      dshot("ieee-publicity", "ieee-deck-2", 1280, 720, "From the membership presentation: where IEEE began (1884, 1912, 1963)."),
    ],
  },
  {
    slug: "student-guild",
    tag: "Event and sponsorship design",
    title: "Student Guild events and decks",
    blurb:
      "Decks, posters and applications for Curtin Colombo Student Guild events, including Eclipse 2025, the university's first Sports Meet, and the 2026 Executive Board application booklet. Part of the work around Unplugged 2024, which raised over LKR 1 million in sponsorships.",
    skills: ["Canva", "Sponsorship proposals", "Event posters"],
    items: [
      dshot("student-guild", "eclipse-1", 1280, 720, "Eclipse 2025: the cover of the event deck for the university's first Sports Meet."),
      dshot("student-guild", "eclipse-2", 1280, 720, "Eclipse 2025: the event overview (20 September 2025, Torrington Grounds, Colombo)."),
      dshot("student-guild", "eclipse-3", 1280, 720, "Eclipse 2025: the target audience and the institutions taking part."),
      dshot("student-guild", "ccsg-1", 1280, 720, "Curtin Colombo Student Guild 25/26: the cover slide."),
      dshot("student-guild", "guild-1", 1280, 720, "The Executive Board 2026 application booklet: the cover."),
      dshot("student-guild", "guild-2", 1280, 720, "The application booklet: the welcome letter to applicants."),
    ],
  },
  {
    slug: "cv-boost-booklet",
    tag: "Event booklet",
    title: "CV Boost delegate booklet",
    blurb:
      "The delegate booklet for CV Boost 2026, the IEEE Student Branch's career-readiness programme at Curtin University Colombo: welcome, event snapshot and outcomes in a clean programme guide. The same event the Route and Scan system was built for.",
    skills: ["Canva", "Layout", "Event branding"],
    items: [
      dshot("cv-boost-booklet", "cvboost-1", 1280, 905, "The booklet cover: a three-phase career development programme."),
      dshot("cv-boost-booklet", "cvboost-2", 1280, 905, "The welcome page: why CV Boost exists and who hosts it."),
      dshot("cv-boost-booklet", "cvboost-3", 1280, 905, "The event snapshot: participants, phases, CVs submitted and reviewed, and industry partners."),
      dshot("cv-boost-booklet", "cvboost-4", 1280, 905, "Five outcomes for delegates, from better CVs to stronger industry links."),
    ],
  },
  {
    slug: "clubs-and-merch",
    tag: "Clubs, awards and house identity",
    title: "Clubs, awards and house identity",
    blurb:
      "Award graphics for the Student Guild's Clubs Awards 2025, a teaser for a campus event, and the four House emblems (Ignis, Terra, Ventus and Nereus) for the Houses system created during the Guild presidency.",
    skills: ["Canva", "Brand identity", "Social graphics"],
    items: [
      dshot("clubs-and-merch", "anime-1", 1080, 1350, "CCSG Clubs Awards 2025 Sem 01: the trophy graphic."),
      dshot("clubs-and-merch", "anime-2", 1080, 1350, "CCSG Clubs Awards: the Best Club Award runners-up slide."),
      dshot("clubs-and-merch", "halloween-1", 1080, 1080, "A teaser graphic for a Curtin Colombo campus event."),
      dshot("clubs-and-merch", "housemerch-2", 1280, 720, "The four House emblems: Ignis, Terra, Ventus and Nereus."),
    ],
  },
];

// The "Highlights" section: things from your LinkedIn that aren't projects in a repo.
// Photos are from your posts and the IEEE Student Branch's posts (files in /public/highlights/).
const hshot = (name: string, w: number, h: number, caption: string): Shot => ({ src: `/highlights/${name}.webp`, alt: caption, caption, w, h });
export type Highlight = { id: string; tag: string; title: string; blurb: string; points?: string[]; team?: string; href?: string; hrefLabel?: string; images?: Shot[] };
export const highlights: Highlight[] = [
  {
    id: "codefest",
    tag: "Competition · 2026",
    title: "SLIIT CodeFest 2026: 2nd place",
    blurb:
      "Team Praxis finished as first runner-up in the AI Innovation Challenge, powered by IFS, among 58 teams from 13 universities. A team of four engineering students, up against many computing teams, and my first hackathon.",
    points: [
      "Build 1: cross-document knowledge retrieval, using OCR, a knowledge graph and deterministic breadth-first search that keeps every retrieval path.",
      "Build 2: technician dispatch, using fuzzy request parsing, optimisation algorithms, recall-based rescheduling and LLM guardrails.",
      "The rule behind both: use LLMs where language is messy, and deterministic algorithms where decisions matter.",
    ],
    team: "With Yasiru Fernando, Kenolee Wickramasuriya and Tatiana Armstrong",
    href: "/work/graph-rag",
    hrefLabel: "The graph-first RAG build",
    images: [
      hshot("codefest-team", 575, 431, "Team Praxis with the trophy and certificates."),
      hshot("codefest-cheque", 575, 431, "The 2nd place cheque for the AI Innovation Challenge."),
      hshot("codefest-stage", 601, 401, "The 2nd place presentation on stage at SLIIT CodeFest 2026."),
      hshot("ifs-workshop", 575, 767, "At the IFS workshop for the CodeFest top 10 teams."),
    ],
  },
  {
    id: "sports-meet",
    tag: "Student Guild · President 2024/25",
    title: "The first Sports Meet, and the House logos",
    blurb:
      "My sign-off post as Student Guild President called this \"Curtin Colombo's biggest student project yet\": the official university House logos and titles, and Eclipse 2025, the first-ever Curtin University Sports Meet, with its house branding, structure and points systems.",
    points: [
      "Designed the official House logos and titles (Ignis, Terra, Ventus and Nereus).",
      "Conceptualised and executed Eclipse 2025, the university's first Sports Meet, with house branding, structure and points systems.",
      "Created the Curtin Colombo Sports Committee, plus the first Sports Tier List and a Sports-Man of the Month criteria.",
      "Launched the first CCSG merch and sports merch, the first Clubs Awards and the first Guild magazine, and grew the Guild's Instagram by 200%+ since November 2024.",
      "Reached out to Curtin Perth, Malaysia, Dubai and Singapore, and coordinated a grant from Curtin University Perth towards student clubs and sports.",
    ],
    team: "CCSG President 2024/25",
    href: "/design/student-guild",
    hrefLabel: "The Guild design work",
    images: [
      { src: "/design/student-guild/eclipse-1.webp", alt: "", caption: "Eclipse 2025: the cover of the event deck.", w: 1280, h: 720 },
      { src: "/design/clubs-and-merch/housemerch-2.webp", alt: "", caption: "The four House emblems: Ignis, Terra, Ventus and Nereus.", w: 1280, h: 720 },
      hshot("guild-flags", 575, 382, "The Guild team on the road, flags up."),
      hshot("guild-team-evening", 959, 719, "The Guild team at an evening event."),
      hshot("guild-team-campus", 575, 431, "The Guild team on campus."),
      hshot("guild-laptops", 575, 392, "Members of the Guild at work on laptops."),
    ].map((s) => ({ ...s, alt: s.alt || s.caption })),
  },
  {
    id: "avera",
    tag: "Hackathon · IEEE AI Driven Sri Lanka",
    title: "Avera: a one-weekend Firefox extension",
    blurb:
      "Built in one weekend for the AI Challenge by IEEE AI Driven Sri Lanka: a browser extension that shows the environmental impact of a product before you buy it. Team of four, certificate of participation.",
    team: "With Yasiru Fernando, Tatiana Armstrong and Sanindu Talwatte",
    href: "/work/avera",
    hrefLabel: "About Avera",
  },
  {
    id: "gear-up",
    tag: "IEEE Student Branch · Series",
    title: "Gear Up: industry visits",
    blurb:
      "A series of industry visits for members of the IEEE Student Branch of Curtin University Colombo, including Atlas Labs, Colombo Dockyard PLC and IFS: step inside the workplace, meet the engineers, and see the work first-hand.",
    images: [
      hshot("gearup-ifs", 959, 719, "Gear Up Episode 05: the visit to IFS."),
      hshot("gearup-dockyard", 575, 430, "Gear Up Episode 02: in the dry dock at Colombo Dockyard PLC."),
      hshot("gearup-dockyard-talk", 575, 767, "Gear Up Episode 02: a session with the Colombo Dockyard PLC team."),
      hshot("gearup-atlas", 575, 767, "Gear Up Episode 01: inside the Atlas Labs workspace."),
    ],
  },
];

// From your CV and the repos above. (The old all-in-one Skills section is gone: skills now sit under each project.)
export const skills: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "C", "Assembly"],
  "AI & data": [
    "RAG", "Graph retrieval", "Vector search", "LLM integration", "Explainable AI", "pandas", "NumPy",
    "scikit-learn", "Hugging Face", "Ollama", "Gemini", "OpenRouter", "Claude Code", "n8n", "MCP",
  ],
  "Backend & DevOps": [
    "FastAPI", "PostgreSQL", "Supabase", "REST APIs", "Docker", "Git", "GitHub Actions",
    "Linux", "pytest", "Ruff", "Jinja2", "Cloudflare", "Render", "uv",
  ],
  Web: ["Next.js", "Three.js", "WordPress"],
  "Electrical & embedded": [
    "Arduino", "TI MSP430", "Embedded C", "MATLAB", "Quartus II", "Multisim", "LTspice", "AutoCAD",
    "Circuit design", "Control systems",
  ],
  "Desktop & design": ["Tkinter", "Excel reporting", "Solar PV design", "Canva", "Penpot"],
  Leadership: ["Team leadership", "Sponsorship & finance", "Public relations"],
};

export type Domain = "solar" | "ai" | "web" | "data";
export const domainLabel: Record<Domain, string> = { solar: "Solar PV", ai: "AI & NLP", web: "Web & systems", data: "Data science" };

export type Project = {
  slug: string;
  domain: Domain;
  title: string;
  blurb: string;
  stats: { value: string; label: string }[]; // exactly 3, real numbers only
  tags: string[];
  repo?: string; // omit for a private repository
  live?: string;
  // case-study page
  problem: string;
  built: string[];
  notes: string[];
};
// Facts below come from each repo's README. Nothing here is estimated.
export const projects: Project[] = [
  {
    slug: "solar-pv-designer",
    domain: "solar",
    title: "Solar PV Designer",
    blurb:
      "A free Windows app for rooftop solar engineers: give it the roof layout and inverters, and it produces the bill of materials, the string design and guideline checks in one Excel workbook.",
    stats: [
      { value: "9", label: "design checks" },
      { value: "5", label: "roof types" },
      { value: "6", label: "inverter families built in" },
    ],
    tags: ["Python", "PySide6", "Excel", "GitHub Actions"],
    repo: "https://github.com/mithilyr/solar-pv-designer",
    problem:
      "At Hayleys Fentons, engineers redid the same Bill of Materials calculations project after project, and string configurations were worked out by spreadsheet trial and error. I started with two small tools in my own time, then combined them into one app anyone on the team can install.",
    built: [
      "Roof layouts from measured dimensions, AutoCAD DXF, or CSV/Excel grids, with manual cell editing.",
      "Bill of materials per roof type (trapezoidal sheet, standing seam, corrugated, concrete flat, clay tile) driven by editable formulas.",
      "String design from panel and inverter datasheets: string lengths, strings per MPPT, DC/AC overload and a labelled string schedule.",
      "Nine design checks tied to the PUCSL rooftop solar guideline, each shown as passed, warning or failed with the clause it comes from.",
      "A Windows installer built automatically by GitHub Actions; tests run on Windows and Linux on every push.",
    ],
    notes: [
      "Every BOM quantity is a formula the user can change, so a company can use its own item codes and rules.",
      "Where the guideline and the more cautious reading differ (the surge-protection exponent), the tool uses the cautious one and says so.",
      "It helps with design but does not replace an engineer's review.",
    ],
  },
  {
    slug: "laya-lk-bench",
    domain: "ai",
    title: "Does Laya read Sinhala and Tamil?",
    blurb:
      "A pre-registered, reproducible stress test of the open Laya decision model on Sinhala and Tamil offensive-language data, with an English control.",
    stats: [
      { value: "0.46 vs 0.72", label: "Sinhala vs English macro-F1" },
      { value: "24.5%", label: "Sinhala wrong at 90%+ confidence" },
      { value: "0%", label: "Sinhala posts answerable at 90% accuracy" },
    ],
    tags: ["Python", "NLP", "Evaluation", "uv"],
    repo: "https://github.com/mithilyr/laya-lk-bench",
    problem:
      "Open models are often used on low-resource languages with no one checking whether they work. I tested whether Laya, zero-shot, can be trusted on Sinhala and romanised Tamil, and how its confidence behaves when it is wrong.",
    built: [
      "A pre-registered protocol, written before running the model, so results can't be tuned after the fact.",
      "An English (TweetEval) control against Sinhala (SOLD) and romanised Tamil data.",
      "Measures of accuracy, calibration, abstention, tokenizer effects, routing and explanation plausibility, with 95% bootstrap confidence intervals.",
      "A fully pinned, reproducible pipeline: package version, model weights revision, dataset revisions and lockfile.",
      "No dataset text in the repo; data is loaded from its source at run time because it contains offensive language.",
    ],
    notes: [
      "Out of the box, Laya is confidently wrong on 24.5% of Sinhala posts and 14.7% of romanised Tamil, against 0.3% for English.",
      "After calibration, English can still answer 72.7% of posts at 90% accuracy. Sinhala and Tamil can answer none.",
      "Fine-tuning is deferred and documented as future work.",
    ],
  },
  {
    slug: "waypoint-delivery",
    domain: "web",
    title: "Waypoint Delivery System",
    blurb:
      "A hackathon system connecting order, plan, load, deliver and receipt for four roles: dispatcher, loader, driver and store manager. Works offline for drivers.",
    stats: [
      { value: "4", label: "roles, one system" },
      { value: "151", label: "orders in the seeded demo day" },
      { value: "9", label: "steps in one automated walkthrough test" },
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "PWA"],
    repo: "https://github.com/mithilyr/GitGud_Waypoint",
    live: "https://waypoint-web-5ssl.onrender.com",
    problem:
      "Tech-Triathlon 2026 (theme: The Intelligent Enterprise) ran as three events: a designathon, a hackathon and a datathon. I took part in all three with Team Git Gud. Waypoint is the hackathon system: one product that carries a delivery from the store's order to the store's confirmed receipt, built on the design we submitted in the designathon.",
    built: [
      "A dispatcher plan engine that assigns every order to a vehicle and trip and defers what doesn't fit, each with a reason.",
      "Loader tablet flow: reverse-stop load lists, flags for shortages, and a release that needs reefer temperature and a seal number.",
      "A driver phone app that keeps working offline and syncs when signal returns, keeping the phone's own timestamps.",
      "Store ordering and tracking, with a dispute flow when the driver's and the store's counts differ; neither count is overwritten.",
      "One automated test that walks the whole nine-step demo through the API.",
    ],
    notes: [
      "The designathon file (Penpot) is the base; every departure from it is documented in the repo.",
      "This page covers the hackathon system. The datathon entry has its own page.",
      "Hosted on Render's free tier, so the first load can take 30 to 60 seconds.",
    ],
  },
  {
    slug: "waypoint-datathon",
    domain: "data",
    title: "Waypoint Datathon",
    blurb:
      "The data science stage of Tech-Triathlon 2026 for Waypoint Group: predict delivery service times and lateness, forecast weekly demand, and allocate a fleet on the busiest day.",
    stats: [
      { value: "3.85 vs 5.28", label: "min service-time error vs baseline" },
      { value: "4.9% vs 5.9%", label: "weekly demand error vs best baseline" },
      { value: "75 of 85", label: "peak-day orders allocated" },
    ],
    tags: ["Python", "LightGBM", "scikit-learn", "Integer programming"],
    problem:
      "Waypoint Group's delivery data was confidential, so the work had to be reproducible without ever committing it. The challenge had three tasks: predict how long each delivery stop takes and whether it will be late, forecast weekly demand, and decide which orders to serve when the fleet can't carry them all.",
    built: [
      "A data layer that cleans the raw tables and builds the labels itself: service time is departure minus the later of arrival and window open, and lateness is arrival after the window closes.",
      "Task 1: LightGBM for service time and a calibrated classifier for lateness, trained on 5,014 deliveries and validated on the newest 42 days rather than random folds.",
      "Task 2A: a Ridge and LightGBM blend forecasting weekly total and chilled volume per depot and brand, checked with rolling-origin validation.",
      "Task 2B: an exact integer-programming packing of chilled orders onto reefer trucks, which served 10 of 10 orders deferred the day before and passed the organisers' checker.",
      "A one-page prioritisation policy and a full notebook that runs the whole pipeline top to bottom.",
    ],
    notes: [
      "Time-based validation only. Features use planned times, so nothing from the future leaks into a prediction.",
      "Rules followed: no pre-trained models, no LLM or cloud APIs, no AutoML. The AI-assistance disclosure is written up in the repo.",
      "Team project with Team Git Gud. My part was the data layer, the preprocessing write-up, the Task 2B policy and the submission.",
      "The competition data is confidential, so the repository is private and the page shows only results.",
    ],
  },
  {
    slug: "cv-boost-route",
    domain: "web",
    title: "CV Boost 2026: Route and Scan",
    blurb:
      "Digital route cards and event-day QR check-in for the CV Boost 2026 career fair at Curtin University Colombo: three small web pages on a Supabase backend.",
    stats: [
      { value: "3", label: "standalone pages, no build step" },
      { value: "8", label: "scan outcomes handled" },
      { value: "50-bit", label: "random, non-sequential QR tokens" },
    ],
    tags: ["JavaScript", "Supabase", "Postgres RLS", "QR codes"],
    repo: "https://github.com/mithilyr/cvboost-route",
    problem:
      "A career fair needs every delegate to visit the right company booth at the right time, and the committee needs proof they did. We needed that working on phones, over a shaky venue network, without building a whole app.",
    built: [
      "A delegate page with their schedule, a QR code, live status and a floor plan, with no sign-in.",
      "A booth scanner for committee members that reads the QR token, queues scans in the browser when offline, and retries safely.",
      "An organiser console with a live board, delegate search, a drag-and-drop floor-plan editor and CSV export.",
      "Postgres row-level security with every write going through a database function, so a booth station can only ever act for its own company.",
      "Scan results (valid, early, late, wrong company, duplicate and more) that record what happened instead of blocking a real conversation.",
    ],
    notes: [
      "A unique constraint on delegate and company makes duplicate attendance impossible, and every scan carries an idempotency key so a replay is harmless.",
      "The Supabase key in the pages is a publishable one, meant to be public. Anonymous callers can't read attendance data or record scans.",
      "Each file is self-contained, so they can be dropped into the branch website's public folder.",
    ],
  },
  {
    slug: "ieee-sponsorship-companion",
    domain: "web",
    title: "IEEE Sponsorship Companion",
    blurb:
      "A free tool that helps the IEEE student branch chase sponsors for its 20+ events a year, so a new committee inherits the history instead of losing track of who was asked.",
    stats: [
      { value: "266", label: "unit tests passing" },
      { value: "33", label: "design decisions recorded" },
      { value: "$0", label: "hosting and tooling cost" },
    ],
    tags: ["Python", "Supabase", "Postgres RLS", "GitHub Actions", "Cloudflare"],
    problem:
      "Committees change every term, and with them the memory of which companies were asked, what they said and who owes a follow-up. The branch needed one shared sponsor memory and follow-ups that happen on schedule, without risking an embarrassing email to a real company.",
    built: [
      "A shared sponsor database where each event is a campaign that borrows from the branch's history.",
      "A Python engine on GitHub Actions that sends follow-ups on a schedule, reads replies, stops follow-ups when a sponsor responds, and creates a task for a person.",
      "A dashboard with Google sign-in where access rules are enforced in the database itself, not in the web page.",
      "Safety by design: nothing is emailed without a person's approval or a rule a person switched on, dry run is the default, and each send is claimed in the database first so it happens at most once.",
      "AI can draft text but never approves or sends.",
    ],
    notes: [
      "Everything runs on free tiers, and each decision is written up as a design record (33 accepted).",
      "Every change to sending or access logic comes with tests, and important guards are proven by deliberately breaking them and confirming a test fails.",
      "As of the project README dated 9 Oct 2026, the core flow is proven live on a test campaign; real sponsors are not being emailed yet.",
      "The repository is private because it holds the branch's sponsor data and operations.",
    ],
  },
];

// Words that rotate in the hero typing line and scroll in the ticker. DRAFT.
export const roles = [
  "building tools that stop repetition",
  "applied AI and explainable AI",
  "solar PV and embedded systems",
];
export const ticker = [
  "Python", "RAG", "Explainable AI", "Solar PV", "Embedded Systems", "FastAPI", "Claude Code", "Arduino",
];

// Smaller projects from your CV. No numbers yet, so they get a line each instead of a case study.
export const otherProjects = [
  {
    slug: "xai-research",
    title: "Solar PV explainable-AI research",
    domain: "solar" as Domain,
    line: "An explainable AI framework for solar PV fault diagnosis: a Python pipeline that classifies and interprets faults, so operations and maintenance teams can see why a decision was made. In progress.",
    tags: ["Python", "pandas", "scikit-learn", "Explainability"],
  },
  {
    slug: "graph-rag",
    title: "Graph-first RAG system",
    domain: "ai" as Domain,
    line: "Built for the IFS challenge at SLIIT CODEFEST 2026: retrieval-augmented generation that tries graph retrieval first and falls back to vector search, with evidence-grounded answers and traceable provenance.",
    tags: ["Python", "Embeddings", "Graph retrieval", "LLM orchestration"],
    stats: [
      { value: "2nd", label: "place, SLIIT CodeFest 2026 AI Innovation Challenge" },
      { value: "58", label: "teams from 13 universities" },
      { value: "2", label: "systems built: retrieval and dispatch" },
    ],
    problem:
      "IFS set the CodeFest AI challenge: build an assistant that understands a huge pile of documents, not one that only searches them. The questions need facts from different documents that share no wording. One document names a character's faction, a completely different one names the winner of an accord, and neither mentions the other. The answer only exists if you can connect the two.",
    built: [
      "A first baseline on purpose: semantic search that finds the most relevant-sounding passages and lets a model piece together the answer. It showed that similarity alone can't connect facts that share no words.",
      "A graph-first retriever: OCR extracts the text, facts are structured into a knowledge graph, and deterministic breadth-first search follows the trail from fact to fact until it reaches an answer.",
      "Provenance on every hop, so each answer shows where each piece of information came from.",
      "A refusal path: when the trail runs out, the system says it doesn't know instead of guessing.",
      "A second build for the dispatch phase: fuzzy request parsing, optimisation algorithms, recall-based rescheduling and LLM guardrails, so AI handles the ambiguity and deterministic algorithms make the decisions.",
    ],
    notes: [
      "Team Praxis: Yasiru Fernando, Kenolee Wickramasuriya, Tatiana Armstrong and me. Four engineering students, my first hackathon.",
      "Made the top 10 after the first phase, then took a physical workshop at IFS before the finals.",
      "The principle that guided both builds: use LLMs where language is messy, and deterministic algorithms where decisions matter. We would rather say \"I don't know\" than hand over a confident, wrong answer.",
    ],
  },
  {
    slug: "checkpoint",
    title: "CheckPoint",
    domain: "web" as Domain,
    line: "A full NFC and QR attendance system for university use: backend APIs, authentication, role-based access, and a data model for sessions, attendance, audits and room tracking.",
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "Jinja2"],
    built: [
      "Attendance in one tap: students tap an NFC sticker by the door and the server verifies the rest. No app, no paper.",
      "Live attendance for lecturers.",
      "Clash-free rescheduling for admins.",
      "A timetable that updates itself for students.",
    ],
    notes: [
      "The pilot build is ready. Built with Tatiana Armstrong and Yasiru Fernando.",
      "Looking for a lecturer or a university that wants to try it.",
    ],
  },
  {
    slug: "avera",
    title: "Avera",
    domain: "web" as Domain,
    line: "A Firefox extension built in one weekend for the AI Challenge by IEEE AI Driven Sri Lanka: it shows the environmental impact of a product before you buy it, scoring the product page on parameters such as where it comes from, what it is made of and how long it lasts.",
    tags: ["WXT", "React", "TypeScript", "Tailwind CSS", "LLM scoring"],
    built: [
      "A browser extension that reads product details from the e-commerce page you are on and scores them on five environmental parameters.",
      "A hybrid engine: a fast, deterministic rules scorer, plus an LLM scorer meant to judge products when a page doesn't give enough information.",
    ],
    notes: [
      "Built in one weekend by a team of four: Yasiru Fernando, Tatiana Armstrong, Sanindu Talwatte and me.",
      "A submission to the AI Challenge organised by IEEE AI Driven Sri Lanka, with a certificate of participation. Built with the UN Sustainable Development Goals in mind.",
      "It is a weekend build, so the scoring parameters are rough.",
    ],
  },
  {
    slug: "ember",
    title: "IEEE Day 2026: The Ember",
    domain: "web" as Domain,
    line: "An interactive prototype of the IEEE Day 2026 experience for the branch: a narrative page with nomination, recognition wall, memory vault, time capsule and a build-your-idea flow, each reachable from a QR code. Built to show the Executive Committee.",
    tags: ["Next.js", "TypeScript", "Vercel"],
    href: "https://ieee-day-2026.vercel.app",
  },
];

export const universityProjects: Record<string, string[]> = {
  "2026": ["Line follower robot: an autonomous Arduino-based robot with sensor input, motor control and embedded logic"],
  "2025": [
    "Terminal-based Snake game in C on Ubuntu",
    "Eco-Play Tiles: a proposed low-carbon, oxygen-generating tile",
    "8-bit CPU designed and tested with Quartus II logic gates",
    "Op-amp circuits simulated in Multisim",
    "Microcontroller LED control programmed in C and Assembly on a PCB",
  ],
  "2024": [
    "Garden lifecycle simulator in Python on Linux",
    "Arduino circuits designed and tested in LTspice",
    "Statistical analysis of human reaction times in Excel",
    "Sustainable garden for Saibai Island: a 3D design pitched as a food-sustainability solution",
  ],
};
