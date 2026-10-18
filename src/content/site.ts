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
  resume: "", // set to "/resume.pdf" once the PDF is in public/ (button hides while empty)
  // DRAFT, condensed from your LinkedIn summary
  photo: "/photo.png",
  about: [
    "Math is where it all started for me, and electrical engineering was the natural extension: a field where math actually builds things. I'm a Curtin University student studying Electrical and Electronics Engineering, with a focus on applied AI, solar PV and embedded systems.",
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
    year: "Nov 2025 - Mar 2026",
    detail:
      "Worked across utility-scale and industrial rooftop solar PV projects from 300 kW to 1.5 MW, at sites including Alumex Ekala, Captain Steel, Waguruwela Oil Mills and Femstar Packaging. Spotted a manual, error-prone Bill of Materials process and built a Python tool (Tkinter GUI and CLI) to automate it, with Excel export. On my own initiative I also built a combinatorial optimisation tool for solar panel string configurations that ranks layouts by installation practicality and inverter load balance.",
  },
  {
    role: "President",
    org: "Curtin Colombo Student Guild",
    year: "2024 - 2025",
    detail:
      "Elected head of the university's official student representative body, leading a team of over 150 students. I took on and solved multiple student welfare issues, created the Houses system for the university, and organised its first Sports Meet, Eclipse '25, from planning through execution.",
  },
  {
    role: "Assistant Treasurer",
    org: "Curtin Colombo Student Guild",
    year: "2024",
    detail:
      "Oversaw finances across the Guild's major campus events. Head of Finance for Unplugged 2024, the university's largest event, a concert, where I secured over LKR 1 million in sponsorships.",
  },
];

export const education = [
  { what: "BEng, Electrical and Electronics Engineering", where: "Curtin University", year: "2023 - 2027" },
  { what: "Advanced Level, Mathematics", where: "Royal College Colombo", year: "2010 - 2023" },
];
export const certifications = [
  "AI Fundamentals with Claude",
  "StudIEAust",
  "Curtin Extra Tier 2",
  "Letter of Commendation",
  "Edexcel Advanced Subsidiary & Advanced Level",
];

// Everything here is used in a repo above or listed on your profile.
export const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript"],
  Frameworks: ["Next.js", "FastAPI", "PySide6", "Three.js"],
  "Data & backend": ["PostgreSQL", "Supabase", "SQLAlchemy"],
  "Cloud & DevOps": ["Docker", "GitHub Actions", "Cloudflare", "Render", "uv"],
  "AI / ML": ["Hugging Face", "Ollama", "Claude Code", "Gemini"],
  "Testing & quality": ["pytest", "Ruff"],
  Design: ["Canva", "Penpot"],
  Engineering: ["Solar PV design", "Embedded systems", "Excel reporting"],
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
      "This page covers the hackathon system. The datathon entry is a separate piece of work.",
      "Hosted on Render's free tier, so the first load can take 30 to 60 seconds.",
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
  "Python", "Applied AI", "Explainable AI", "Solar PV", "Embedded Systems", "Claude Code", "Tkinter",
];
