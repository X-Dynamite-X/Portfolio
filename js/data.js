/* =====================================================================
 *  PORTFOLIO DATA — Abd Al-Rahman Ahmad
 *  Source of truth for all content, projects, experience & skills.
 * ===================================================================== */

window.PORTFOLIO = {
  /* ---------------------------------------------------------------- */
  /*  Personal & Contact                                               */
  /* ---------------------------------------------------------------- */
  name: "Abd Al-Rahman Ahmad",
  shortName: "Abd Al-Rahman",
  initials: "AA",
  title: "Back-End Software Engineer & Technical Lead",
  location: "Amman, Jordan",
  languages: ["Arabic (Native)", "English (Fluent)"],
  cv: "assets/Abd_AlRahman_Ahmad_CV.pdf",
  available: true,

  roles: [
    "Back-End Software Engineer",
    "Technical Lead · 1M+ Users",
    "Laravel & Django Architect",
    "Flutter Mobile Developer",
    "AI Agents & DevOps Engineer",
  ],

  tagline:
    "Back-end-focused Software Engineer & Technical Lead shipping production systems across web, mobile, and security stacks (Laravel, Python/Django, Flutter, Vue/Nuxt) — from 1M+ user platforms to multi-tenant AI security SaaS and local developer tooling.",

  contact: {
    email: "abdarhamnahmad@gmail.com",
    phone: "+962 788 793 307",
    phoneHref: "tel:+962788793307",
    linkedin: "https://www.linkedin.com/in/abd-al-rahman-ahmed-996711245/",
    github: "https://github.com/X-Dynamite-X",
    cvUrl: "assets/Abd_AlRahman_Ahmad_CV.pdf",
  },

  /* ---------------------------------------------------------------- */
  /*  Impact Metrics (from CV)                                         */
  /* ---------------------------------------------------------------- */
  stats: [
    { value: 1, suffix: "M+", label: "Users on Scaled Platform Led" },
    { value: 40, suffix: "%", label: "Faster API Response Time" },
    { value: 15, suffix: "+", label: "Containerized Security Scanners" },
    { value: 89, suffix: "%", label: "InfoSec & Networks GPA" },
  ],

  /* ---------------------------------------------------------------- */
  /*  Professional Summary & Education                                 */
  /* ---------------------------------------------------------------- */
  about: [
    "Back-end-focused Software Engineer and Technical Lead with hands-on experience directing engineering teams and shipping production systems across Laravel, Python/Django, Flutter, and Vue/Nuxt.",
    "I have overseen the technical direction of a 4-developer team on a 1M+ user e-commerce platform—leading server consolidation, MariaDB read-write replication, and custom security tooling. I also designed OCR document-intelligence pipelines and autonomous AI agents powered by Google Gemini and OpenAI.",
  ],

  aboutTags: [
    "Amman, Jordan",
    "B.Sc. InfoSec & Networks (89%)",
    "Google Python (92.5%)",
    "Arabic & English",
  ],

  education: [
    {
      badge: "Degree · Feb 2023",
      title: "B.Sc. in Information Security & Networks",
      org: "Al-Balqa Applied University, Jordan",
      score: "GPA 89%",
    },
    {
      badge: "Certificate · Apr – Jun 2022",
      title: "Crash Course on Python",
      org: "Google",
      score: "Score 92.5%",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  Core Engineering Pillars                                         */
  /* ---------------------------------------------------------------- */
  services: [
    {
      icons: ["laravel", "django"],
      title: "Back-End Architecture",
      text: "Multi-tenant SaaS, RESTful APIs, RBAC, TOTP/MFA, JWT & Sanctum auth, Celery/Redis queues, and PSR-4 clean code.",
    },
    {
      icons: ["python", "docker"],
      title: "AI Agents & Security",
      text: "Autonomous Gemini/OpenAI agents, OCR validation pipelines, and sandboxed DAST/SAST scanning (Nmap, Nuclei, Semgrep, SQLMap).",
    },
    {
      icons: ["flutter", "nuxtjs"],
      title: "Mobile & Front-End",
      text: "Cross-platform Flutter apps alongside Nuxt.js, Vue.js, Tailwind CSS, and bilingual Arabic/English RTL interfaces.",
    },
    {
      icons: ["linux", "nginx"],
      title: "DevOps, Scale & Lead",
      text: "Linux admin, Nginx, Docker, CI/CD, MariaDB Master-Slave replication, Cloudflare Workers/Tunnels, and 4-dev team leadership.",
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  Flagship Open-Source Spotlight: Laravel Dev (from github-release)*/
  /* ---------------------------------------------------------------- */
  laravelDev: {
    name: "Laravel Dev",
    version: "v2.5.0",
    repoUrl: "https://github.com/X-Dynamite-X/laravelDevTool",
    releasesUrl: "https://github.com/X-Dynamite-X/laravelDevTool/releases",
    tagline:
      "A full-featured local development environment & DevOps cockpit for Linux (with portable mode on macOS & Windows) — built in the spirit of Laravel Herd, extended with a Navicat-style DB manager, live SQL profiler, SSH server panel, Cloudflare/GitHub hubs, and an AI MCP server.",
    platforms: [
      "Linux (apt · pacman · dnf · zypper)",
      "macOS Portable (WKWebView)",
      "Windows Portable (Edge WebView2)",
    ],
    tech: ["Python", "Bash CLI", "GTK3 / WebKit2", "pywebview", "Nginx", "PHP-FPM", "UDP/TCP", "JSON-RPC 2.0"],
    installCmds: [
      { os: "Linux", cmd: "chmod +x laravel-dev-installer.sh && ./laravel-dev-installer.sh" },
      { os: "macOS", cmd: "bash laravel-dev-installer-macos.command" },
      { os: "Windows", cmd: "laravel-dev-installer-windows.cmd" },
    ],
    modules: [
      {
        id: "sites",
        label: "Sites & Multi-Stack",
        icon: "🌐",
        summary:
          "Run Laravel, Next.js, Nuxt, Vite, Node, and Django projects side by side with isolated .test domains and zero manual nginx config.",
        features: [
          { name: "Create, Link, Adopt & Git-Clone", desc: "Scaffold new Laravel/Next/Nuxt/Django apps, move/copy/symlink existing folders, or clone private Git repos with auto DB + .env setup." },
          { name: "Nginx .test Domains & mkcert HTTPS", desc: "Automatic vhosts and /etc/hosts routing (e.g. https://shop.test) with trusted local SSL certificates." },
          { name: "Multi-PHP Manager", desc: "Auto-detects installed phpX.Y-fpm sockets, switches PHP per site, toggles Xdebug, edits php.ini values, and installs extensions." },
          { name: "Laravel Octane & Reverb", desc: "Start, stop, and stream logs for high-speed Octane workers and Laravel Reverb WebSocket servers." },
          { name: "Git Worktrees (Workspaces)", desc: "Run isolated parallel branch-specific virtual hosts without switching branches in your main working copy." },
          { name: "Team Sync (herd.yml) & Parked Folders", desc: "Standardize PHP/Node/services across teams with divergence detection, plus auto-discovery of parked site directories." },
          { name: "LAN Wi-Fi QR & Cloudflare Tunnels", desc: "Instant local QR code sharing over Wi-Fi and public HTTPS tunnels via cloudflared with an optional auth proxy." },
        ],
      },
      {
        id: "debug",
        label: "Live Profiler & Debug",
        icon: "🔍",
        summary:
          "Inspect every HTTP request, SQL query, dump(), email, outgoing call, webhook, and test run from one unified debug cockpit.",
        features: [
          { name: "Requests & Queries Inspector", desc: "Opt-in local profiler (laravel-dev/profiler over UDP) capturing headers, payload, JSON response, cookies, context, and a ready cURL command." },
          { name: "Timing Waterfall & N+1 Detector", desc: "Breaks down boot vs SQL vs app code vs nginx time, flags slow/repeated N+1 queries, shows caller file/line, and runs EXPLAIN plans." },
          { name: "Floating StudioBar & Xdebug JIT", desc: "In-browser floating profiler bar with live query summaries and one-click Xdebug JIT trigger cookies." },
          { name: "Live dump() TCP Server (:9912)", desc: "Catches Symfony VarDumper / dump() calls out-of-band with exact source file and line numbers without polluting page output." },
          { name: "Aggregated Logs & Click-to-Open", desc: "Parses storage/logs by severity, aggregates duplicate exceptions, and opens stack-trace lines directly in your IDE." },
          { name: "Mailpit, HTTP Mocks & Webhooks", desc: "HTML email previews, outgoing HTTP interception & mock rules, Notification Studio preview, and webhook capture/replay." },
          { name: "Test Runner (Pest / PHPUnit)", desc: "Discovers and executes test suites with per-test timing and jump-to-failure in your code editor." },
        ],
      },
      {
        id: "workspace",
        label: "Code, .env & Time Machine",
        icon: "⚡",
        summary:
          "Explore your Laravel internals, manage packages and translations, edit environments safely, and snapshot/restore project state.",
        features: [
          { name: "Models, Routes & Events", desc: "Browse Eloquent tables/relations/casts/fillable, search routes with live route testing, and inspect registered events & config." },
          { name: "Interactive Tinker & Artisan Make", desc: "Execute PHP inside your booted Laravel app with persistent history, plus quick artisan generator shortcuts." },
          { name: "Side-by-Side Translations", desc: "Compare lang/ keys across locales, edit JSON translations inline, and jump straight to PHP translation files." },
          { name: "Packages Hub & Security Audit", desc: "Lists Composer & npm dependencies, highlights outdated versions and security advisories, and updates with one click." },
          { name: "Smart .env Editor & Encryption", desc: "Masks secrets, preserves comments/order, syncs missing .env.example keys, compares local vs server .env, and encrypts/decrypts files." },
          { name: "Time Machine Checkpoints", desc: "Saves .env + database snapshot + storage/app/public together; restoring automatically snapshots current state first for undo." },
          { name: "Doctor, Cache & Storage Gallery", desc: "One-click fixes for permissions/APP_KEY/symlinks, Redis cache key/TTL browser, Vite watcher, and public storage media browser." },
        ],
      },
      {
        id: "database",
        label: "Navicat-Style DB Manager",
        icon: "🗄️",
        summary:
          "Full desktop database client built right into the app for MySQL, MariaDB, PostgreSQL, and SQLite — local or tunneled over SSH.",
        features: [
          { name: "Auto-Discovered Connections", desc: "Detects local servers, every site's .env (DB_* / DATABASE_URL / SQLite), custom connections, and remote DBs via SSH tunnels." },
          { name: "Transactional Grid Editing", desc: "Inline double-click edits, row add/delete, WHERE filtering, multi-column search, and atomic save (Ctrl+S)." },
          { name: "SQL Query Tabs & EXPLAIN", desc: "Multi-tab SQL editor (Ctrl+Enter), right-click JSON/INSERT copy, execution plan inspection, and table/DB CRUD." },
          { name: "Schema Diff, Sync & ER Hologram", desc: "Compare schemas between environments, sync differences, inspect DDL, and visualize table structures." },
          { name: "Laravel Code Generators", desc: "Generate Laravel Migrations, Eloquent Models, and Seeders directly from live database tables." },
          { name: "Snapshots, Import & Export", desc: "Create/restore local DB snapshots and export/import tables or full databases as SQL, CSV, or JSON." },
        ],
      },
      {
        id: "ssh",
        label: "Remote SSH, Forge & Workers",
        icon: "☁️",
        summary:
          "Manage remote VPS servers over standard SSH ControlMaster, run universal zero-downtime deploys, and automate workers & backups.",
        features: [
          { name: "Server Telemetry & Service Control", desc: "Monitor remote CPU, RAM, disk, and uptime; start/stop/restart nginx, DB, PHP-FPM, Redis, and Supervisor." },
          { name: "Universal Deploy Pipelines", desc: "Tailored deploy recipes for Laravel (pull, composer, migrate, optimize, queue:restart), Next/Nuxt (npm/pnpm/bun + pm2), and Django." },
          { name: "Remote File Manager & Live Edit", desc: "Browse, upload, download (.tar.gz folders), and edit remote files in your local editor with auto-upload on save." },
          { name: "Forge-Style Provisioning & DB Pull", desc: "Deploy key management, DNS setup, preflight checks, environment sync, release history, and one-click remote DB pull." },
          { name: "Queue Workers & Crontab Scheduler", desc: "Configures Supervisor (queue:work / Horizon) with live output, plus clean user-crontab schedule:run management." },
          { name: "Automated Backups (Local & SSH)", desc: "Manual or scheduled daily/weekly full, DB, or storage backups with retention pruning and SSH upload." },
        ],
      },
      {
        id: "cloud",
        label: "Cloudflare & GitHub Hubs",
        icon: "🛡️",
        summary:
          "Operate your entire Cloudflare edge stack and multi-account GitHub workflows without leaving the desktop console.",
        features: [
          { name: "Cloudflare DNS, Zones & Security", desc: "Multi-account zones, DNS records & proxy toggles, SSL/Universal certs, Analytics, IP rules, WAF rules, Bot Fight Mode, and cache purge." },
          { name: "Cloudflare Workers, KV, D1 & Pages", desc: "Manage Workers & routes, KV key/value namespaces, D1 SQL queries, Pages deploys/rollbacks, R2 buckets/CORS, Turnstile, Tunnels, and Email routing." },
          { name: "GitHub Repo & Code Explorer", desc: "Multi-account switcher, create/clone/fork repos, browse file trees/commits/diffs, and edit files or view READMEs inline." },
          { name: "PRs, Issues & Actions CI/CD", desc: "Create/review/merge Pull Requests, manage Issues & labels, inspect GitHub Actions workflows, stream job logs, and trigger/cancel runs." },
          { name: "Secrets, Releases & VPS Binding", desc: "Manage repo Secrets, Variables, Environments, Releases, Gists, SSH deploy keys, and bind repos to VPS servers." },
          { name: "One-Click Extra Services", desc: "Install Mailpit, Redis, Meilisearch, and MinIO, plus isolated multi-instance Redis/MySQL/PostgreSQL containers on custom ports." },
        ],
      },
      {
        id: "ai",
        label: "AI Auto-Healer & MCP Server",
        icon: "🤖",
        summary:
          "Connect Cursor, Claude Desktop, or local LLMs directly to your live Laravel environment for diagnosis and safe automated fixes.",
        features: [
          { name: "JSON-RPC 2.0 MCP Server", desc: "Run `laravel-dev mcp` over stdio to expose projects, routes, models, logs, doctor diagnostics, DB queries, and artisan to AI agents." },
          { name: "AI Assistant & Auto-Healer", desc: "Supports Ollama (local), OpenAI, Gemini, and Anthropic to diagnose bugs and generate unified code diffs." },
          { name: "Safe Apply & .ldbak Rollback", desc: "Preview diffs side-by-side, apply repairs in one click, and revert anytime from automatic .ldbak backups." },
          { name: "Studio Agent & Voice Input", desc: "Autonomous studio agent with conversation history, explicit permission controls, and voice-to-prompt transcription." },
        ],
      },
      {
        id: "ux",
        label: "CLI, Security Vault & UX",
        icon: "⌨️",
        summary:
          "Everything available from both a fast Bash CLI and a bilingual keyboard-driven desktop app with encrypted secret storage.",
        features: [
          { name: "29 Modular Core Managers & CLI", desc: "Full `laravel-dev` Bash CLI covering Nginx, PHP, Supervisor, Cron, Certs, Tunnels, Octane, Reverb, Backups, and SHIM management." },
          { name: "Universal Command Palette (Ctrl+K)", desc: "Instant fuzzy search across sites, pages, quick actions, and artisan commands, plus full keyboard navigation." },
          { name: "Encrypted Vault (Fernet + PBKDF2)", desc: "Protects SSH passwords, API tokens, and deployment credentials with unlock/lock timeout controls." },
          { name: "Arabic RTL & Bilingual Interface", desc: "Full English (LTR) and Arabic (RTL) localization, dark/light/system themes, tray resident mode, and portable config export/import." },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Projects & Hackathons (from CV)                                  */
  /* ---------------------------------------------------------------- */
  projects: [
    {
      id: "sadd",
      title: "SADD — AI Security & Vulnerability Platform",
      emoji: "🛡️",
      icon: "shield",
      category: ["security", "web"],
      featured: true,
      badge: "Production SaaS · roayat al mostaqbal",
      description:
        "Multi-tenant SaaS platform for automated vulnerability management and AI-driven security scanning, architected with Django 5, MariaDB, and isolated organization workspaces.",
      features: [
        "Asynchronous Celery + Redis engine orchestrating 15+ scanners (Nmap, Nuclei, Katana, HTTPX, TestSSL, TruffleHog, Semgrep, SQLMap) in sandboxed containers",
        "Autonomous Google Gemini LLM agent synthesizing artifacts, eliminating false positives, scoring CVSS, and generating remediation plans",
        "Real-time scan streaming via Server-Sent Events (SSE) & push triage with Firebase Cloud Messaging (FCM)",
        "5-tier RBAC, DNS TXT & HTTP domain verification, TOTP MFA, SHA-256 audit trails, and bilingual (EN/AR) PDF/Markdown executive reports",
      ],
      architecture: {
        role: "Lead Backend & Security Architect",
        challenge:
          "Orchestrate 15+ heterogeneous DAST/SAST scanners safely per tenant while streaming live progress and filtering raw noisy findings into verified CVSS-scored remediation plans.",
        solution:
          "Isolated organization workspaces enforced at the ORM/query boundary, Celery + Redis worker pools dispatching ephemeral sandboxed containers, an autonomous Gemini triage agent, and SSE + FCM real-time telemetry.",
        metrics: [
          "15+ Sandboxed Scanners",
          "5-Tier RBAC + TOTP MFA",
          "SHA-256 Verified Audit Log",
          "Bilingual EN / AR Reports",
        ],
        pipeline: [
          { stage: "01 · Verify", title: "DNS TXT & HTTP", detail: "5-tier RBAC & Domain Proof" },
          { stage: "02 · Queue", title: "Celery + Redis", detail: "Async Tenant Job Dispatch" },
          { stage: "03 · Scan", title: "15+ Containers", detail: "Nmap, Nuclei, Semgrep, SQLMap" },
          { stage: "04 · Triage", title: "Gemini LLM Agent", detail: "False-Positive Filter & CVSS" },
          { stage: "05 · Stream", title: "SSE + EN/AR PDF", detail: "Live Telemetry & FCM Alerts" },
        ],
      },
      tech: ["Python", "Django 5", "MariaDB", "Celery", "Redis", "Docker", "Gemini LLM", "SSE", "Tailwind CSS"],
      links: {
        demo: "https://sadd.roayatalmostaqbal.net",
        github: "",
      },
    },
    {
      id: "shopjo",
      title: "ShopJo — Multi-Vendor E-Commerce",
      emoji: "🛒",
      icon: "bag",
      category: ["web", "mobile"],
      badge: "Web + Mobile Marketplace",
      description:
        "Multi-vendor e-commerce marketplace featuring a Nuxt.js storefront deployed on Cloudflare Workers, a Laravel back-end API, and a companion Flutter mobile app.",
      features: [
        "Nuxt.js storefront running on Cloudflare Workers with Cloudflare Named Tunnels for stable custom domains",
        "Cross-platform Flutter mobile app backed by the shared Laravel REST API",
        "Real-time messaging powered by Laravel Reverb WebSockets, full i18n, and Google OAuth sign-in",
      ],
      architecture: {
        role: "Full-Stack & Mobile Engineer",
        challenge:
          "Serve a bilingual storefront at the edge on Cloudflare Workers while keeping a companion Flutter mobile app and real-time vendor-buyer chat synchronized over a single Laravel API.",
        solution:
          "Deployed Nuxt.js SSR on Cloudflare Workers linked via Cloudflare Named Tunnels, resolved OAuth/i18n parity across clients, and stabilized Laravel Reverb WebSocket channels.",
        metrics: [
          "Edge SSR via CF Workers",
          "Web + Flutter Shared API",
          "Real-Time Reverb WS",
          "Google OAuth & i18n",
        ],
        pipeline: [
          { stage: "01 · Edge", title: "Nuxt.js + Workers", detail: "SSR Storefront & i18n" },
          { stage: "02 · Mobile", title: "Flutter App", detail: "Cross-Platform Client" },
          { stage: "03 · Tunnel", title: "CF Named Tunnel", detail: "Zero-Trust Ingress" },
          { stage: "04 · Core", title: "Laravel API + Reverb", detail: "Auth, Orders & Live Chat" },
        ],
      },
      tech: ["Laravel", "Nuxt.js", "Flutter", "Laravel Reverb", "Cloudflare Workers", "OAuth"],
      links: { demo: "", github: "" },
    },
    {
      id: "psychai",
      title: "PsychAI — Mental Health AI Platform",
      emoji: "🧠",
      icon: "brain",
      category: ["security", "hackathon", "web"],
      badge: "Salam Hack 2025 · Team Lead",
      description:
        "Led a 3-developer team in a 48-hour hackathon sprint to design, build, and deploy an Arabic-language mental health AI chatbot powered by Google Gemini.",
      features: [
        "Laravel RESTful back-end with Multi-Factor Authentication (MFA) and AES encryption for sensitive data",
        "Sub-2-second AI response times with TailwindCSS UI and real-time performance monitoring",
        "Coordinated full-stack integration and Docker CI/CD deployment within 48 hours",
      ],
      architecture: {
        role: "Team Lead Developer (3-Dev Team)",
        challenge:
          "Ship a responsive, culturally attuned Arabic mental health conversational assistant under a strict 48-hour hackathon deadline without compromising sensitive user privacy.",
        solution:
          "Architected a security-first Laravel REST API with MFA and AES-encrypted records, tuned Google Gemini streaming prompts for <2s Arabic replies, and automated deployment via Docker CI/CD.",
        metrics: [
          "48-Hour MVP Delivery",
          "<2s AI Response Latency",
          "AES Encryption + MFA",
          "Docker CI/CD Pipeline",
        ],
        pipeline: [
          { stage: "01 · Client", title: "Tailwind Arabic UI", detail: "RTL Conversational UX" },
          { stage: "02 · Auth", title: "Laravel + MFA", detail: "Strict Session Guards" },
          { stage: "03 · Vault", title: "AES Data Layer", detail: "Encrypted Conversations" },
          { stage: "04 · Model", title: "Google Gemini AI", detail: "<2s Arabic Inference" },
        ],
      },
      tech: ["Laravel", "PHP", "MySQL", "Google Gemini AI", "TailwindCSS", "Docker", "AES / MFA"],
      links: {
        github: "https://github.com/X-DynamiteX/PsychAI",
        demo: "",
      },
    },
    {
      id: "talent-match",
      title: "Talent Match Hub",
      emoji: "🎯",
      icon: "target",
      category: ["security", "web"],
      badge: "AI Matching Platform",
      description:
        "Internal talent-matching platform built with Laravel and OpenAI GPT-4o to evaluate candidate fit with visual scoring.",
      features: [
        "AI candidate-to-role evaluation powered by OpenAI GPT-4o",
        "Full Arabic / English bilingual (RTL/LTR) UI with Tailwind CSS v4",
        'Custom interactive "Match Ring" SVG score visualization component',
      ],
      architecture: {
        role: "Full-Stack Laravel & AI Engineer",
        challenge:
          "Give hiring teams structured, explainable candidate-to-role matching across Arabic and English profiles with immediate visual clarity.",
        solution:
          "Built deterministic JSON evaluation schemas over OpenAI GPT-4o inside Laravel, paired with a Tailwind CSS v4 RTL/LTR interface and a custom interactive SVG Match Ring component.",
        metrics: [
          "Structured GPT-4o Scoring",
          "Full RTL / LTR Parity",
          "Custom SVG Match Ring",
          "Tailwind CSS v4 UI",
        ],
        pipeline: [
          { stage: "01 · Input", title: "Role & CV Specs", detail: "EN/AR Profile Ingestion" },
          { stage: "02 · Eval", title: "OpenAI GPT-4o", detail: "Structured Rubric Scoring" },
          { stage: "03 · Visual", title: "Match Ring SVG", detail: "Interactive Fit Breakdown" },
        ],
      },
      tech: ["Laravel", "OpenAI GPT-4o", "Tailwind CSS v4", "RTL / LTR", "SVG"],
      links: { demo: "", github: "" },
    },
    {
      id: "gov-ocr",
      title: "Gov Document OCR & Validation",
      emoji: "🪪",
      icon: "scan",
      category: ["security", "web"],
      badge: "Document Intelligence Pipeline",
      description:
        "Python OCR pipeline that extracts, validates, and cross-checks government-issued ID fields in real time with confidence-based human review routing.",
      features: [
        "Parses name, ID number, and expiry date from government documents via OCR",
        "Cross-validates extracted records against a database and flags expired IDs immediately",
        "Automatically routes low-confidence scans to a human-review queue",
      ],
      architecture: {
        role: "Systems & AI Pipeline Engineer",
        challenge:
          "Automate identity verification from noisy real-world document scans while preventing silent misreads or expired-ID acceptance.",
        solution:
          "Engineered a staged Python OCR extraction and normalization pipeline with deterministic expiry/database checks and confidence thresholds routing uncertain cases to human reviewers.",
        metrics: [
          "Real-Time Field Parsing",
          "Auto Expiry Flagging",
          "DB Cross-Validation",
          "Human-in-the-Loop Queue",
        ],
        pipeline: [
          { stage: "01 · Extract", title: "Python OCR", detail: "Name, ID #, Expiry" },
          { stage: "02 · Verify", title: "Rules & DB Check", detail: "Validity & Expiry Guard" },
          { stage: "03 · Route", title: "Confidence Gate", detail: "Auto-Approve or Review" },
        ],
      },
      tech: ["Python", "OCR", "Validation Pipeline", "Human-in-the-Loop"],
      links: { demo: "", github: "" },
    },
    {
      id: "enterprise-suite",
      title: "Enterprise Web Systems Suite",
      emoji: "🧩",
      icon: "layers",
      category: ["web"],
      badge: "GitHub Portfolio Projects",
      description:
        "Three focused full-stack systems demonstrating clean Laravel architecture, Filament admin tooling, and real-time communication.",
      features: [
        "Interactive Blog Platform — Decoupled Laravel API + Vue.js SPA with auth, threaded comments & full-text search",
        "Employee & Department HR System — Filament-powered Laravel admin panel with role-based permissions",
        "School Management System — Laravel + Pusher real-time private chat secured with Sanctum & granular RBAC",
      ],
      architecture: {
        role: "Full-Stack Laravel Architect",
        challenge:
          "Demonstrate maintainable, domain-clean patterns across SPA publishing, enterprise HR administration, and real-time educational messaging.",
        solution:
          "Applied PSR-4 modular architecture, Sanctum token scoping, Filament administrative workflows, Vue.js decoupled front-ends, and Pusher WebSocket channels.",
        metrics: [
          "Decoupled Laravel + Vue SPA",
          "Filament RBAC Admin",
          "Pusher Private Channels",
          "Sanctum Token Security",
        ],
        pipeline: [
          { stage: "01 · Blog", title: "Laravel + Vue SPA", detail: "Threaded Search & Auth" },
          { stage: "02 · HR", title: "Filament Admin", detail: "Dept & Role Controls" },
          { stage: "03 · School", title: "Sanctum + Pusher", detail: "Real-Time Private Chat" },
        ],
      },
      tech: ["Laravel", "Vue.js", "Filament", "Pusher", "Sanctum", "MySQL"],
      links: {
        github: "https://github.com/X-Dynamite-X",
        demo: "",
      },
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  Work Experience (from CV)                                        */
  /* ---------------------------------------------------------------- */
  experience: [
    {
      role: "Backend & Security Software Engineer (Full-Time)",
      company: "roayat al mostaqbal",
      location: "UAE (Remote)",
      period: "Sep 2026 – Present",
      highlight: "SADD AI Security SaaS",
      points: [
        "Architected & built SADD, a multi-tenant vulnerability management SaaS in Django 5 & MariaDB with isolated org workspaces, 5-tier RBAC, and DNS TXT/HTTP domain verification.",
        "Engineered an asynchronous Celery & Redis engine orchestrating 15+ security tools (Nmap, Nuclei, Katana, HTTPX, TestSSL, TruffleHog, Semgrep, SQLMap) inside sandboxed containers.",
        "Built & trained an autonomous Google Gemini LLM agent to synthesize artifacts, eliminate false positives, score CVSS, and write remediation plans.",
        "Implemented real-time SSE scan streaming, FCM triage alerts, TOTP MFA, SHA-256 verified audit trails, and bilingual (EN/AR) PDF/Markdown reports.",
      ],
      tech: ["Django 5", "Celery", "Redis", "MariaDB", "Docker", "Gemini LLM", "SSE", "FCM"],
    },
    {
      role: "Full-Stack Software Engineer (Part-Time)",
      company: "roayat al mostaqbal",
      location: "UAE (Remote)",
      period: "Oct 2025 – Aug 2026",
      highlight: "Cross-Domain Engineering",
      points: [
        "Delivered back-end and front-end engineering across Laravel and Python/Django, alongside DevOps automation, AI agents, and platform cybersecurity.",
      ],
      tech: ["Laravel", "Python", "Django", "DevOps", "AI Agents", "Cybersecurity"],
    },
    {
      role: "Full-Stack Software Engineer (Back-End Focus)",
      company: "CSC Beyond",
      location: "On-site / Hybrid",
      period: "May 2025 – Aug 2026",
      highlight: "~40% Faster APIs · <1s Live Alerts",
      points: [
        "Migrated 3+ legacy Laravel codebases to modern PSR-4, Eloquent, and RESTful API standards, cutting technical debt.",
        "Deployed & maintained production Linux apps (Nginx, SSL, queues, cron) for zero-downtime operation.",
        "Built multi-tenant Sanctum & JWT auth (5+ roles) and real-time dashboards with Pusher & FCM under 1-second latency.",
        "Integrated payment gateways with zero post-launch critical bugs and cut MySQL API response times by ~40% via indexing and eager loading.",
      ],
      tech: ["Laravel", "MySQL", "Sanctum / JWT", "Pusher", "FCM", "Nginx", "Linux", "Agile"],
    },
    {
      role: "Freelance Software Engineer — Maintenance & Support",
      company: "Independent (Part-Time)",
      location: "Remote",
      period: "May 2025 – Present",
      highlight: "Zero-Downtime Maintenance",
      points: [
        "Provided daily part-time support (~4 hrs/day) covering code reviews, merge-conflict resolution, and live production bug fixes via systematic root-cause tracing.",
        "Managed client server uptime and extended legacy systems safely using regression testing.",
      ],
      tech: ["PHP / Laravel", "Linux Servers", "Git", "Root-Cause Tracing", "Regression Testing"],
    },
    {
      role: "Freelance Software Engineer & Technical Consultant",
      company: "Technical Lead · E-Commerce",
      location: "Remote",
      period: "Feb 2023 – May 2025",
      highlight: "1M+ Users · 4-Dev Team Lead",
      points: [
        "Served as Technical Lead overseeing architecture and code quality for a 4-person engineering team on a 1M+ registered-user e-commerce platform.",
        "Consolidated multi-service infrastructure onto a unified server stack, cutting monthly hosting costs, and implemented MariaDB Master-Slave read/write replication.",
        "Built a custom server activity logging system and a proprietary vulnerability & open-port scanner paired with an LLM summarization layer for executive alerts.",
      ],
      tech: ["MariaDB Replication", "Server Consolidation", "Security Scanner", "LLM Alerts", "Team Lead"],
    },
  ],

  /* ---------------------------------------------------------------- */
  /*  Technical Skills (All 7 CV groups)                               */
  /* ---------------------------------------------------------------- */
  skills: {
    "Back-End": [
      { name: "PHP", icon: "php" },
      { name: "Laravel", icon: "laravel" },
      { name: "CodeIgniter", tag: "PHP" },
      { name: "Python", icon: "python" },
      { name: "Django 5", icon: "django" },
      { name: "Celery", tag: "Async" },
      { name: "Redis", icon: "redis" },
      { name: "REST APIs & SSE", tag: "API" },
      { name: "Multi-Tenancy & RBAC", tag: "Arch" },
      { name: "JWT / Sanctum / TOTP", tag: "Auth" },
    ],
    "Front-End & Mobile": [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
      { name: "Vue.js", icon: "vue" },
      { name: "Nuxt.js", icon: "nuxtjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Laravel Blade", icon: "laravel" },
    ],
    "AI & Automation": [
      { name: "Google Gemini LLM", tag: "LLM" },
      { name: "OpenAI GPT-4o", tag: "LLM" },
      { name: "AI Agents & MCP", tag: "Agents" },
      { name: "Prompt Engineering", tag: "LLM" },
      { name: "OCR Pipelines", tag: "Vision" },
    ],
    Cybersecurity: [
      { name: "DAST / SAST & OWASP", tag: "AppSec" },
      { name: "Nmap & Nuclei", tag: "Scanner" },
      { name: "Katana & HTTPX", tag: "Recon" },
      { name: "Semgrep & TruffleHog", tag: "SAST" },
      { name: "SQLMap & TestSSL", tag: "Audit" },
      { name: "CVSS & Secret Scanning", tag: "Triage" },
    ],
    "DevOps & Cloud": [
      { name: "Linux Admin", icon: "linux" },
      { name: "Nginx", icon: "nginx" },
      { name: "Docker", icon: "docker" },
      { name: "Bash", icon: "bash" },
      { name: "GitHub Actions CI/CD", icon: "githubactions" },
      { name: "Cloudflare Workers/Tunnels", icon: "cloudflare" },
      { name: "Firebase (FCM)", icon: "firebase" },
      { name: "Laravel Reverb & Pusher", tag: "WS" },
    ],
    "Databases & Systems": [
      { name: "MySQL", icon: "mysql" },
      { name: "MariaDB", tag: "RDBMS" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "SQLite", icon: "sqlite" },
      { name: "Master-Slave Replication", tag: "Scale" },
      { name: "Indexing & Optimization", tag: "Perf" },
      { name: "Server Consolidation", tag: "Infra" },
    ],
    Leadership: [
      { name: "Technical Leadership", tag: "Lead" },
      { name: "Code Review Ownership", tag: "Quality" },
      { name: "Agile / Scrum", tag: "Process" },
      { name: "Arabic & English", tag: "Bilingual" },
    ],
  },
};
