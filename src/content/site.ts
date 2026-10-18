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

// From your CV and the repos above.
export const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "C", "PHP", "Assembly"],
  "AI & data": [
    "RAG", "Graph retrieval", "Vector search", "LLM integration", "Explainable AI", "pandas", "NumPy",
    "scikit-learn", "Hugging Face", "Ollama", "Gemini", "OpenRouter", "Claude Code", "n8n", "MCP",
  ],
  "Backend & DevOps": [
    "FastAPI", "SQLAlchemy", "PostgreSQL", "Supabase", "REST APIs", "Docker", "Git", "GitHub Actions",
    "Linux", "pytest", "Ruff", "Jinja2", "Cloudflare", "Render", "uv",
  ],
  Web: ["Next.js", "Three.js", "WordPress", "WooCommerce"],
  "Electrical & embedded": [
    "Arduino", "TI MSP430", "Embedded C", "MATLAB", "Quartus II", "Multisim", "LTspice", "AutoCAD",
    "Circuit design", "Control systems",
  ],
  "Desktop & design": ["PySide6", "Tkinter", "Excel reporting", "Solar PV design", "Canva", "Penpot"],
  Leadership: ["Team leadership", "Sponsorship & finance", "Public relations"],
};

export type Project = {
  slug: string;
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
    title: "Solar PV explainable-AI research",
    line: "An explainable AI framework for solar PV fault diagnosis: a Python pipeline that classifies and interprets faults, so operations and maintenance teams can see why a decision was made. In progress.",
    tags: ["Python", "pandas", "scikit-learn", "Explainability"],
  },
  {
    title: "Graph-first RAG system",
    line: "Built for the IFS challenge at SLIIT CODEFEST 2026: retrieval-augmented generation that tries graph retrieval first and falls back to vector search, with evidence-grounded answers and traceable provenance.",
    tags: ["Python", "Embeddings", "Graph retrieval", "LLM orchestration"],
  },
  {
    title: "CheckPoint",
    line: "A full NFC and QR attendance system for university use: backend APIs, authentication, role-based access, and a data model for sessions, attendance, audits and room tracking.",
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "Jinja2"],
  },
  {
    title: "IEEE Day 2026: The Ember",
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
