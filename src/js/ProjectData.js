/**
 * projectsData.js
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for all project data.
 * Used by Project.jsx (cards), ProjectDetail.jsx (case study page),
 * and any future pages.
 */

export const projectsData = [
  {
    id: "turf",
    title: "Royal Turf Booking Platform",
    tagline: "A production-grade slot booking system built for a real client.",
    category: "Client-Based · Full Stack",
    year: "2023 – Present",
    type: "FEATURED",
    status: "Live",
    statusColor: "text-emerald-300",
    gradient: "from-cyan-400/20 via-teal-300/10 to-transparent",
    accentColor: "text-cyan-300",
    accentBorder: "border-cyan-300/35",
    accentBg: "bg-cyan-300/[0.07]",
    headerGradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    github: "https://github.com/Mdfaijan2003/the-royal-turf",
    live: "https://the-royal-turf.onrender.com/",
    stack: [
      "HTML",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Flutter",
      "Razorpay",
      "JWT",
      "Tailwind CSS",
    ],
    impact: "Live client deployment",
    summary:
      "A production-grade turf booking system with real-time slot availability, role-based access control, and seamless booking management built for real clients.",
    overview: `Royal Turf is a client project built for a sports turf facility owner who needed a 
complete digital presence — from slot discovery to booking confirmation and payment. 
Before this system, the owner managed bookings through phone calls and a whiteboard. 
The goal was to replace that chaos with a seamless, self-service platform that both customers and admins could use without friction.

The project spanned over 3 months and went through multiple iterations based on real user feedback from the client and their customers.`,

    whyBuilt: `The client was losing bookings because there was no way for customers to see slot availability in real time. 
They'd call, find out the slot was taken, and go elsewhere. We needed a system that showed live availability, 
let users book instantly, and gave the admin full control without needing tech knowledge.`,

    techChoices: [
      {
        tech: "HTML + CSS + JavaScript",
        why: "Chosen for the customer-facing frontend to keep things lightweight and dependency-free. Every booking card, time slot picker, and confirmation flow is built with vanilla JS and structured HTML, which kept the bundle small and load times fast — important for users on mobile data.",
        tradeoff:
          "Without a component framework, reusing UI patterns required discipline with template functions and DOM helpers. As the UI grew more dynamic, managing state manually became more error-prone than it would have been with a framework.",
      },
      {
        tech: "Node.js + Express.js",
        why: "JavaScript on both ends meant the same developer (me) could move between frontend and backend without context switching. Express gave minimal overhead while still being structured enough for clean routing.",
        tradeoff:
          "Considered using NestJS for stricter architecture but it was over-engineered for the project's scope. Raw Express with a service-layer pattern was sufficient.",
      },
      {
        tech: "MongoDB",
        why: "Slot availability data is inherently flexible — different turfs have different schedules, pricing, and rules. A document model fit this variability better than a rigid SQL schema.",
        tradeoff:
          "The downside is that complex queries (like 'show all bookings for admin this week with user details') required careful aggregation pipeline design. In hindsight, PostgreSQL with JSONB could have worked equally well.",
      },
      {
        tech: "Flutter (Mobile)",
        why: "The client wanted a mobile app for customers. Flutter let us share business logic and build for Android and iOS from a single codebase, which was crucial given the timeline.",
        tradeoff:
          "Flutter's learning curve for someone primarily working in React was steep. We deferred some mobile features (push notifications, offline mode) to a later phase.",
      },
      {
        tech: "JWT Authentication",
        why: "Stateless auth was needed because we had both a web app and a Flutter mobile app hitting the same API. JWTs allowed both clients to authenticate without server-side session management.",
        tradeoff:
          "Token invalidation (e.g., force logout) is harder with JWTs vs sessions. We mitigated this with short-lived access tokens and refresh token rotation.",
      },
    ],

    whatWorked: [
      "Real-time slot availability using polling with a 10-second interval — simple but reliable for the client's traffic volume",
      "Role-based dashboard for admin vs customer gave the client full visibility without exposing sensitive data to end users",
      "Modular API design meant adding new turf locations later required zero backend changes beyond a config entry",
      "Mobile-first responsive design — 78% of client's customers booked via phone",
    ],

    whatNotOptimized: [
      "WebSockets would be better than polling for real-time updates at scale, but the client's concurrent user count didn't justify the complexity",
      "No automated testing suite was built — relied on manual QA. This is something I would do differently now",
      "Payment integration (Razorpay) went through multiple revisions because we didn't mock the webhook flow properly in development",
      "No CDN for images — turf photos load directly from the server. This is a known performance gap to fix in next iteration",
    ],

    keyLearnings: [
      "Client communication is as important as code quality — half the technical decisions were shaped by feedback sessions",
      "Build the admin panel first, not last. The client's ability to self-manage content removes your dependency completely",
      "Real-world data is messier than mock data — edge cases in booking (overlaps, cancellations, partial refunds) took more time than the happy path",
    ],

    bullets: [
      "Developed a full-stack turf booking system with real-time slot availability and booking management",
      "Built RESTful APIs using Node.js and Express.js with MongoDB for persistent data",
      "Implemented authentication and role-based access control for admin and users",
      "Designed responsive UI for seamless cross-platform experience",
    ],
  },

  {
    id: "railways",
    title: "Indian Railways MCP Server",
    tagline:
      "An open-source MCP server giving AI models access to live train data.",
    category: "Open Source · Backend",
    year: "2024",
    type: "OPEN SOURCE",
    status: "Published",
    statusColor: "text-emerald-300",
    gradient: "from-emerald-400/18 via-teal-400/8 to-transparent",
    accentColor: "text-emerald-300",
    accentBorder: "border-emerald-300/35",
    accentBg: "bg-emerald-300/[0.07]",
    headerGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    github: "https://github.com/Mdfaijan2003/indian-railways-mcp-server",
    live: null,
    stack: [
      "Node.js",
      "MCP Protocol",
      "STDIO Transport",
      "REST APIs",
      "JavaScript",
      "JSON Schema",
    ],
    impact: "Open source · GitHub published",
    summary:
      "An open-source MCP server on Node.js that provides train info, PNR status, and route queries — exposing structured tool handlers for AI model consumption via the Model Context Protocol.",

    overview: `This project was born out of a personal frustration. I was building an AI assistant and wanted it to 
answer questions about Indian Railways — PNR status, train schedules, live running status — but there was no 
clean way to plug this data into an LLM. 

The Model Context Protocol (MCP) is Anthropic's open standard for connecting AI models to external data sources 
and tools. I built an MCP server that wraps the Indian Railways API and exposes it as a set of structured tools 
that any MCP-compatible AI client can call.`,

    whyBuilt: `I'd been exploring MCP deeply — specifically the difference between how servers expose tools vs resources vs prompts. 
Most MCP examples were toy demos. I wanted to build something genuinely useful that other developers 
in India could drop into their own AI projects. Indian Railways is something every Indian uses, 
and real-time train data is surprisingly hard to access cleanly.`,

    techChoices: [
      {
        tech: "Node.js",
        why: "The MCP SDK has first-class JavaScript support. Node's async I/O model handles concurrent tool requests well, and the ecosystem for HTTP clients (axios/fetch) made wrapping the railways API straightforward.",
        tradeoff:
          "Python would have been equally valid given the official MCP Python SDK. I chose Node because I wanted to share the server as an npm package.",
      },
      {
        tech: "STDIO Transport",
        why: "MCP supports multiple transport layers. STDIO was chosen because it's the simplest to set up for local development and works directly with Claude Desktop and other local MCP clients without any network configuration.",
        tradeoff:
          "HTTP/SSE transport would be needed for a hosted, multi-user deployment. STDIO limits the server to single-process, local use — which is fine for the target audience (developers running their own AI stacks).",
      },
      {
        tech: "JSON Schema for tool definitions",
        why: "MCP requires tool inputs to be described with JSON Schema so the AI model knows exactly what parameters each tool expects. Precise schemas reduce hallucinated parameters and improve tool call accuracy.",
        tradeoff:
          "Verbose to write by hand. A future improvement would be using Zod and auto-generating the JSON Schema from TypeScript types.",
      },
      {
        tech: "Modular tool handlers",
        why: "Each tool (PNR status, live running, seat availability, fare check) is a separate module. This means adding a new railway data endpoint requires only adding one new file and registering it — zero changes to the core server.",
        tradeoff:
          "More files to navigate initially, but the structure scales cleanly. Each handler is independently testable.",
      },
    ],

    whatWorked: [
      "The tool abstraction pattern — clean separation between MCP plumbing and actual railway API calls",
      "Structured error responses that the AI model can reason about (e.g., 'train not found' vs 'API rate limited')",
      "Documentation-first approach — README written before code helped clarify the API surface",
      "Publishing to GitHub with a clear setup guide got the server picked up by other developers",
    ],

    whatNotOptimized: [
      "No caching layer — every tool call hits the railway API fresh. Adding Redis TTL caching for static data (station list, train schedules) would dramatically reduce latency",
      "Rate limiting not implemented — in a production deployment, multiple AI agents hitting this could exhaust the upstream API quota",
      "No automated tests for tool handlers — changes to the railways API would silently break tools",
      "Error messages are developer-friendly but not always AI-friendly — some failure modes confuse the model",
    ],

    keyLearnings: [
      "MCP tool design is its own discipline — the quality of your JSON Schema descriptions directly affects how accurately the AI calls your tools",
      "Open source documentation is a product, not an afterthought. The README is the first thing developers judge",
      "Wrapping third-party APIs requires defensive programming — external APIs change, go down, and rate-limit without warning",
    ],

    bullets: [
      "Built an open-source MCP server providing train info, PNR status, and route queries",
      "Implemented STDIO-based communication for seamless MCP client-server interaction",
      "Designed modular tool handlers for multiple railway query operations",
      "Integrated external APIs and structured responses for consistent output",
      "Published on GitHub with documentation for developer usage",
    ],
  },

  {
    id: "clipboard",
    title: "Clipboard Aggregator",
    tagline: "A C++ desktop tool for intelligent clipboard history management.",
    category: "System-Level · Desktop App",
    year: "2024",
    type: "DESKTOP",
    status: "Completed",
    statusColor: "text-violet-300",
    gradient: "from-violet-400/18 via-purple-300/8 to-transparent",
    accentColor: "text-violet-300",
    accentBorder: "border-violet-300/35",
    accentBg: "bg-violet-300/[0.07]",
    headerGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    github:
      "https://github.com/Mdfaijan2003/ClipboardAggregator/releases/tag/v1.0.0",
    live: null,
    stack: ["C++", "Windows API", "Win32", "STL", "OOP", "System Hooks"],
    impact: "System-level · Performance-first",
    summary:
      "A C++ desktop tool to capture and manage copied content efficiently — built for power users who need fast clipboard history access and copy-paste tracking across sessions.",

    overview: `Clipboard Aggregator started as a personal tool. I found myself constantly re-copying things I'd already copied — 
code snippets, URLs, error messages during debugging. The Windows clipboard only holds one item at a time. 
Every clipboard manager I found was either bloated, required a subscription, or had a terrible UI.

I decided to build exactly what I needed: lightweight, fast, runs in the system tray, stores history, 
and retrieves it with a hotkey. This project was also a deliberate exercise in C++ and the Windows API — 
areas I wanted to strengthen beyond competitive programming.`,

    whyBuilt: `Three motivations: solve a real personal problem, go deep on C++ beyond data structures, 
and understand how Windows handles system-level hooks. Most of my other projects were web-based. 
This was intentionally different — a chance to work closer to the metal.`,

    techChoices: [
      {
        tech: "C++",
        why: "The project needed to be fast, memory-efficient, and able to interface with Windows APIs directly. C++ was the natural choice. It also gave me a chance to practice STL containers (deque for history, unordered_map for deduplication) in a real context rather than just competitive programming.",
        tradeoff:
          "C++ means manual memory management and more verbose code. The same tool could have been built in C# with WinForms far faster. But the learning objective was C++ systems programming, not just shipping a clipboard manager.",
      },
      {
        tech: "Windows API (Win32)",
        why: "To monitor clipboard changes, you need to register a clipboard format listener using Win32's AddClipboardFormatListener. There's no abstraction for this in standard C++ — you have to go through Win32 directly.",
        tradeoff:
          "Win32 is notoriously verbose and error-prone. A single missed DestroyWindow call or unregistered listener can cause ghost processes. Careful resource management was essential.",
      },
      {
        tech: "System Tray (Shell_NotifyIcon)",
        why: "A clipboard tool needs to run silently in the background. The system tray is the standard Windows pattern for background utilities. Users can open the history panel, clear the clipboard, or quit from the tray icon.",
        tradeoff:
          "System tray applications have limited UI surface area. The history panel is a simple popup window — nothing fancy. A proper settings screen would require a full dialog implementation.",
      },
      {
        tech: "STL deque for history",
        why: "Clipboard history is a fixed-size sliding window — new items are pushed to the front, old items drop off the back when the limit (50 items) is reached. A deque gives O(1) insertion at both ends which is exactly the access pattern needed.",
        tradeoff:
          "Could have used a circular buffer for even lower overhead, but deque's simplicity and STL interoperability made it the right call for this scale.",
      },
    ],

    whatWorked: [
      "The clipboard listener using AddClipboardFormatListener is event-driven — no polling, zero CPU overhead when idle",
      "Deduplication: consecutive identical copies are deduplicated so the history stays clean",
      "Fast retrieval — pressing the hotkey instantly renders the last 10 items without perceptible delay",
      "Single executable, no installer needed — drop it in Startup and it just works",
    ],

    whatNotOptimized: [
      "No persistence across reboots — history is stored in memory only and resets when the process exits. Adding SQLite for on-disk storage would fix this",
      "No support for rich content (images, files) — only text clipboard content is captured",
      "The UI is functional but minimal — a proper history panel with search would be valuable",
      "No cross-platform support — the entire implementation is Windows-specific. A cross-platform version would need a complete rewrite using a framework like Qt",
    ],

    keyLearnings: [
      "Windows message loops are different from any web or backend event loop — understanding WM_CLIPBOARDUPDATE and the message pump was a genuine learning curve",
      "C++ resource management — every Win32 handle, every allocated pointer, every registered listener needs explicit cleanup. RAII patterns (smart pointers, scope guards) are not optional, they're survival",
      "System-level programming demands a different debugging mindset — printf debugging is often more reliable than a debugger when dealing with message loops and hooks",
    ],

    bullets: [
      "Built to store and retrieve clipboard history for improved productivity",
      "Developed using C++ with focus on system-level interaction and lightweight performance",
      "Designed simple workflow for seamless copy-paste tracking across usage sessions",
    ],
  },

  {
    id: "learnsaathi",
    title: "LearnSaathi",
    tagline: "An AI-powered learning platform for curated academic content.",
    category: "EdTech · Full Stack",
    year: "2024 – Present",
    type: "LIVE",
    status: "In Development",
    statusColor: "text-sky-300",
    gradient: "from-sky-400/18 via-blue-300/8 to-transparent",
    accentColor: "text-sky-300",
    accentBorder: "border-sky-300/35",
    accentBg: "bg-sky-300/[0.07]",
    headerGradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    github: "https://github.com/Mdfaijan2003/LearnSaathi",
    live: null,
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "OpenAI API",
      "JWT",
      "Vercel",
    ],
    impact: "Actively in development",
    summary:
      "A comprehensive learning platform where students access curated information with an AI-powered Q&A system and personal note-saving feature — built to make self-study more structured and intelligent.",

    overview: `LearnSaathi (learn companion in Hindi/Bengali) is a platform I'm building for students who 
find it hard to get quick, reliable answers to academic questions. Think of it as a structured study 
companion — not just a chatbot, but a platform where subjects are organized, content is curated, 
and students can ask questions and get AI-powered answers in context.

The core insight: students don't want to wade through 10 Google results to understand one concept. 
They want a direct, trustworthy answer with the ability to ask follow-up questions and save what they learn.`,

    whyBuilt: `As an engineering student, I found myself constantly looking up the same concepts — sometimes 
from DBMS, sometimes from OS, sometimes from DSA. There was no single place that was organized by subject, 
trustworthy, and interactive. ChatGPT is great but has no structure. YouTube takes too long. 
Notes apps don't interact. LearnSaathi is the intersection of all three.`,

    techChoices: [
      {
        tech: "React.js + Tailwind CSS",
        why: "The frontend needs to be fast, component-rich, and easy to iterate. React's virtual DOM handles the dynamic question-answer UI well. Tailwind lets us build a consistent, responsive interface quickly without fighting CSS specificity.",
        tradeoff:
          "For a content-heavy platform, Next.js with SSR/SSG would be better for SEO and initial load performance. Migrating to Next.js is on the roadmap.",
      },
      {
        tech: "OpenAI API (AI Q&A)",
        why: "The Q&A system uses GPT-4 with a system prompt that constrains answers to the subject context. This makes answers more accurate and relevant than open-ended ChatGPT, because we're telling the model 'you're a DBMS tutor' not 'you're a general assistant'.",
        tradeoff:
          "API costs scale with usage — not a problem in early development, but at scale we'd need to implement caching for common questions and consider fine-tuning a smaller model on our content.",
      },
      {
        tech: "MongoDB",
        why: "Notes, subjects, questions, and user data all have varying schemas. A document store lets us iterate on data models quickly as the product evolves. Nested documents fit the 'note contains AI response + user annotation' structure naturally.",
        tradeoff:
          "As the platform matures, the relationships between users, notes, subjects, and questions will become complex enough to warrant a relational model. This is a known architectural debt.",
      },
      {
        tech: "Node.js + Express.js",
        why: "Backend needs to handle API calls, user authentication, and proxying OpenAI requests (to keep API keys server-side). Express with JWT middleware handles all of this cleanly.",
        tradeoff:
          "No rate limiting on the AI endpoint yet — a user could spam questions and rack up API costs. Rate limiting with Redis is the next backend task.",
      },
      {
        tech: "Vercel deployment",
        why: "Zero-config React deployment with automatic preview URLs for every commit. The instant deploy feedback loop is invaluable when iterating fast.",
        tradeoff:
          "Vercel's free tier has function timeout limits that can cause issues with long AI responses. Long-running queries need to be streamed or chunked.",
      },
    ],

    whatWorked: [
      "Context-scoped AI answers — telling the model which subject it's tutoring makes answers dramatically more accurate",
      "Personal note-saving — users can save AI responses with their own annotations, creating a personalized study bank",
      "Subject categorization — organized content by engineering subjects (DBMS, OS, DSA, Networks) gives structure to the experience",
      "Clean, distraction-free UI — students praised the focused interface compared to typical ed-tech platforms",
    ],

    whatNotOptimized: [
      "No streaming for AI responses — the response appears all at once after the full API call completes. Streaming would make it feel much more responsive",
      "No offline support — the platform requires internet for everything, including previously saved notes",
      "Content moderation not implemented — user-generated notes and questions aren't filtered",
      "Mobile experience needs work — responsive but not mobile-native in feel",
      "No collaborative features yet — sharing notes or study groups are planned but unbuilt",
    ],

    keyLearnings: [
      "Prompt engineering is a real skill — the quality of the system prompt determines 80% of the AI answer quality",
      "Build the note-saving feature early, not late — it's the stickiest feature and drives return usage",
      "EdTech is hard because users (students) have low patience. If the answer takes more than 3 seconds, they leave",
    ],

    bullets: [
      "Building a comprehensive learning platform with curated information on various subjects",
      "Integrated an AI-powered Q&A system allowing instant, accurate responses",
      "Implemented a personal note-saving feature where users store AI responses and custom notes",
      "Focused on user-friendly interface with responsive design using React.js and Tailwind CSS",
      "Backend functionalities handled via Node.js and Express.js",
    ],
  },
];

export const codingData = {
  platforms: [
    {
      name: "LeetCode",
      handle: "@mdfaijan",
      url: "https://leetcode.com/u/c0derFAIJAN/",
      solved: 200,
      total: "2500+",
      color: "text-amber-300",
      border: "border-amber-300/35",
      bg: "bg-amber-300/[0.07]",
      badges: [
        { name: "50 Days Badge", icon: "🔥", desc: "50-day solving streak" },
        { name: "100 Problems", icon: "💯", desc: "First 100 problems solved" },
        { name: "Top 40%", icon: "📊", desc: "Global percentile ranking" },
      ],
    },
    {
      name: "GeeksforGeeks",
      handle: "@mdfaijan",
      url: "https://www.geeksforgeeks.org/profile/faijanfq5n",
      solved: 150,
      total: "1000+",
      color: "text-emerald-300",
      border: "border-emerald-300/35",
      bg: "bg-emerald-300/[0.07]",
      badges: [
        { name: "Problem Solver", icon: "⚡", desc: "150+ problems solved" },
        { name: "Institute Rank", icon: "🏫", desc: "Top performer at NSEC" },
      ],
    },
  ],

  topicBreakdown: [
    { topic: "Arrays & Strings", count: 55, color: "bg-cyan-400" },
    { topic: "Trees & Graphs", count: 45, color: "bg-teal-400" },
    { topic: "Dynamic Programming", count: 38, color: "bg-violet-400" },
    { topic: "Linked Lists", count: 30, color: "bg-sky-400" },
    { topic: "Recursion & Backtrack", count: 25, color: "bg-emerald-400" },
    { topic: "Sorting & Searching", count: 22, color: "bg-amber-400" },
    { topic: "Stacks & Queues", count: 20, color: "bg-rose-400" },
    { topic: "Segment Trees / BIT", count: 15, color: "bg-pink-400" },
  ],

  keyTechniques: [
    { name: "Two Pointers", icon: "👆", desc: "Reduces O(n²) scans to O(n)" },
    {
      name: "Sliding Window",
      icon: "🪟",
      desc: "Fixed/variable window on arrays/strings",
    },
    {
      name: "Binary Search",
      icon: "🔍",
      desc: "Search on monotonic answer spaces",
    },
    {
      name: "DFS / BFS",
      icon: "🌐",
      desc: "Graph traversal, connected components",
    },
    {
      name: "Memoization",
      icon: "📝",
      desc: "Top-down DP with hash map caching",
    },
    { name: "Tabulation", icon: "📊", desc: "Bottom-up DP, space optimized" },
    { name: "Union-Find", icon: "🔗", desc: "Disjoint set for graph problems" },
    {
      name: "Monotonic Stack",
      icon: "📈",
      desc: "Next greater element class of problems",
    },
    { name: "Segment Tree", icon: "🌳", desc: "Range queries, point updates" },
    {
      name: "Topological Sort",
      icon: "🔢",
      desc: "DAG ordering, course schedule type",
    },
  ],

  notableProblems: [
    {
      name: "Trapping Rain Water",
      difficulty: "Hard",
      technique: "Two Pointers",
      platform: "LeetCode",
    },
    {
      name: "Word Break II",
      difficulty: "Hard",
      technique: "Memoization + BFS",
      platform: "LeetCode",
    },
    {
      name: "Serialize & Deserialize Tree",
      difficulty: "Hard",
      technique: "DFS",
      platform: "LeetCode",
    },
    {
      name: "Edit Distance",
      difficulty: "Medium",
      technique: "Tabulation DP",
      platform: "LeetCode",
    },
    {
      name: "Course Schedule II",
      difficulty: "Medium",
      technique: "Topological Sort",
      platform: "LeetCode",
    },
    {
      name: "LRU Cache",
      difficulty: "Medium",
      technique: "HashMap + DLL",
      platform: "LeetCode",
    },
    {
      name: "Minimum Spanning Tree",
      difficulty: "Medium",
      technique: "Kruskal / Prim",
      platform: "GFG",
    },
    {
      name: "Stock Buy Sell (k trans.)",
      difficulty: "Hard",
      technique: "State Machine DP",
      platform: "LeetCode",
    },
  ],
};
