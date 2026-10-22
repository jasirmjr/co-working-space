export const COMPANY_INFO = {
  name: "NEXUS WORKSPACES",
  tagline: "The Future of Enterprise Workspace Intelligence",
  phone: "+1 (800) 482-9020",
  email: "enterprise@nexusworkspaces.com",
  locationsCount: 28,
  citiesCount: 14,
  countriesCount: 6,
  founded: "2019",
  satisfactionRate: "99.4%",
};

export const NAVIGATION_LINKS = [
  { name: "Home", path: "/" },
  { name: "Facilities", path: "/facilities" },
  { name: "Plans & Pricing", path: "/plans" },
  { name: "Community & Reviews", path: "/reviews" },
  { name: "Virtual Tour", path: "/tour" },
  { name: "Contact", path: "/contact" },
];

export const OFFICE_ZONES = [
  {
    range: [0, 0.22],
    tag: "ZONE 01 • ARRIVAL & HOSPITALITY",
    title: "Welcome to Workspace Reimagined",
    subtitle: "Where world-class enterprises and high-growth startups thrive in biometric-secured, concierge-serviced luxury.",
    stats: "24/7 Concierge • Smart Credential Pass • Barista Lounge"
  },
  {
    range: [0.25, 0.48],
    tag: "ZONE 02 • HIGH-PERFORMANCE WORKSTATIONS",
    title: "Adaptive Workspaces for Dynamic Teams",
    subtitle: "Ergonomic Herman Miller seating, motorized sit-stand desks, dual 4K monitor docks, and multi-gigabit fiber connections.",
    stats: "10 Gbps Redundant Wi-Fi • Sit-Stand Desks • Herman Miller Embody"
  },
  {
    range: [0.52, 0.74],
    tag: "ZONE 03 • SOCIAL & COLLABORATIVE COMMONS",
    title: "Collaborative Lounges & Wellness Cafés",
    subtitle: "Spark natural serendipity over artisan micro-roasts, cold brew taps, acoustic booths, and biophilic wellness areas.",
    stats: "La Marzocco Espresso • Acoustic Phone Booths • Biophilic Air Scrubbing"
  },
  {
    range: [0.78, 1.0],
    tag: "ZONE 04 • EXECUTIVE PRIVACY & GOVERNANCE",
    title: "Executive Boardrooms & Confidential Suites",
    subtitle: "Soundproofed enterprise privacy engineered for high-stakes board deliberations, VC pitches, and confidential M&A strategy.",
    stats: "Class-A Sound Isolation • Cisco Webex Room Kit • Private VLAN Racks"
  }
];

export const STATS = [
  { 
    label: "Global Enterprise Tenants", 
    numericValue: 450, 
    value: "450", 
    suffix: "+", 
    decimals: 0, 
    desc: "From Series-A startups to Fortune 500" 
  },
  { 
    label: "Average Team Productivity Lift", 
    numericValue: 38, 
    value: "38", 
    suffix: "%", 
    indicator: "↑", 
    decimals: 0, 
    desc: "Measured across 12,000+ desk hours" 
  },
  { 
    label: "Redundant Fiber Uptime", 
    numericValue: 99, 
    value: "99", 
    suffix: "%", 
    decimals: 0, 
    desc: "Zero downtime multi-homed ISP failover" 
  },
  { 
    label: "Locations Across Metro Hubs", 
    numericValue: 28, 
    value: "28", 
    suffix: " Hubs", 
    decimals: 0, 
    desc: "Prime downtown Tier-1 architectural towers" 
  }
];

export const PARTNERS = [
  { name: "Apex Capital", logo: "APEX", industry: "Venture Capital" },
  { name: "Veritas AI", logo: "VERITAS", industry: "Artificial Intelligence" },
  { name: "CloudScale Systems", logo: "CLOUDSCALE", industry: "Enterprise SaaS" },
  { name: "Strata FinTech", logo: "STRATA", industry: "Financial Services" },
  { name: "NeuroBio Labs", logo: "NEUROBIO", industry: "BioTech" },
  { name: "Quantico Global", logo: "QUANTICO", industry: "Cybersecurity" },
  { name: "Nexora Technologies", logo: "NEXORA", industry: "Cloud Computing" },
  { name: "Vertex Dynamics", logo: "VERTEX", industry: "Software Development" }
 
];

export const FACILITIES = [
  {
    id: "connectivity",
    category: "Network & Infrastructure",
    title: "10 Gbps Redundant Fiber & Dedicated VLANs",
    shortDesc: "Enterprise-grade Tier-1 dual ISP backbone with zero packet loss guarantee.",
    description: "Each workspace is supported by dual subterranean fiber entries with Cisco Catalyst core routing. Enterprises can provision private virtual LANs, point-to-point IPsec tunnels, and direct on-ramps to AWS, GCP, and Azure.",
    specs: ["Dual 10 Gbps Fiber Drops", "Zero-Trust Private VLANs", "Direct AWS/GCP Cloud Interconnects", "Sub-2ms Metro Ping"],
    badge: "SOC 2 Type II Certified",
    icon: "Wifi"
  },
  {
    id: "security",
    category: "Access & Governance",
    title: "24/7 Biometric & Encrypted RFID Control",
    shortDesc: "End-to-end access audit trails compliant with corporate compliance regimes.",
    description: "Multi-factor authentication grants friction-free, cryptographic ingress to your private suites. Centralized admin portal allows corporate HR teams to provision or revoke guest keycards instantaneously.",
    specs: ["Facial & Keycard Biometrics", "Full Audit Logging & Export", "Dedicated Suite Motion Sensors", "On-site 24/7 Executive Security"],
    badge: "Enterprise Security",
    icon: "ShieldCheck"
  },
  {
    id: "ergonomics",
    category: "Physical Well-Being",
    title: "Herman Miller Seating & Sit-Stand Engineering",
    shortDesc: "Engineered ergonomics designed to eliminate cognitive fatigue and posture strain.",
    description: "Every dedicated desk and private suite features Herman Miller Embody & Aeron chairs paired with LINAK-motorized motorized sit-stand desks with millimeter programmable height presets.",
    specs: ["Herman Miller Embody & Aeron", "LINAK Motorized 140cm Desks", "4K Dual-Monitor Arm Mounts", "BIFMA Compliant Hardware"],
    badge: "Ergonomics Gold",
    icon: "Armchair"
  },
  {
    id: "acoustics",
    category: "Focus & Media",
    title: "Acoustic Focus Pods & 4K Podcasting Studio",
    shortDesc: "Sound dampening panels rated at STC-45 for confidential investor and client calls.",
    description: "Engineered with triple-glazed acoustic acoustic glass and active silent airflow ventilation. Includes a turn-key sound-isolated broadcasting and video recording suite equipped with Shure SM7B microphones.",
    specs: ["STC-45 Sound Isolation Rating", "Shure SM7B Broadcast Mics", "Silent Air Exchange (40 CFM)", "Blackmagic 4K Studio Cameras"],
    badge: "Studio Grade",
    icon: "Headphones"
  },
  {
    id: "hospitality",
    category: "Culinary & Wellness",
    title: "Artisan Espresso Bar & Nutrition Pantry",
    shortDesc: "Unlimited specialty single-origin roasts, organic kombucha, and smart snack dispensaries.",
    description: "Staffed by certified baristas during peak business hours. Includes continuous cold brew on tap, sparkling water dispensers, and oat milk stations stocked fresh daily.",
    specs: ["La Marzocco Linea PB Bar", "Cold Brew & Kombucha on Tap", "Organic Superfood Pantries", "Dietary Customization"],
    badge: "Complimentary Daily",
    icon: "Coffee"
  },
  {
    id: "datacenter",
    category: "Hardware & Edge Compute",
    title: "Climate-Controlled Server Racks & Colocation",
    shortDesc: "On-premise secure 42U rack space with isolated N+1 APC battery and generator backup.",
    description: "Host proprietary hardware, on-prem AI inference clusters, or local storage arrays within your private dedicated suite rack enclosures with independent biometric access locks.",
    specs: ["42U Lockable Half/Full Racks", "Dual 30A PDU Power Feeds", "N+1 Precision In-Row Cooling", "FM-200 Fire Suppression"],
    badge: "Tier-3 Equivalent",
    icon: "Server"
  }
];

export const PRICING_PLANS = [
  {
    id: "day-pass",
    name: "Day Pass & Hot Desk",
    tagline: "For agile individual executives & visiting consultants",
    monthlyPrice: 6999,
    yearlyPrice: 5599, // 20% discount
    periodNote: "or ₹699 single-day pass",
    popular: false,
    badge: "Flexible Access",
    image: "/plan-hotdesk.jpg",
    features: [
      "1 Gbps symmetric fiber Wi-Fi",
      "Ergonomic hot desk zone access",
      "Unlimited barista coffee & tea",
      "Member networking salons"
    ],
    cta: "Book Day Pass",
    workspaceType: "Hot Desk"
  },
  {
    id: "dedicated-desk",
    name: "Dedicated Desk",
    tagline: "Your permanent personal workstation in a shared executive wing",
    monthlyPrice: 12999,
    yearlyPrice: 10399, // 20% discount
    periodNote: "billed monthly or annually",
    popular: true,
    badge: "Most Popular For Founders",
    image: "/plan-dedicated.jpg",
    features: [
      "24/7 biometric keycard access",
      "Permanent assigned desk & pedestal",
      "Herman Miller Aeron posture chair",
      "8 hrs/mo conference credits"
    ],
    cta: "Reserve Dedicated Desk",
    workspaceType: "Dedicated Desk"
  },
  {
    id: "team-suite",
    name: "Private Team Suite",
    tagline: "Enclosed, sound-insulated custom office suites for teams of 4–20",
    monthlyPrice: 48999,
    yearlyPrice: 39199, // 20% discount
    periodNote: "starting base for 4 seats (₹10,500/seat after)",
    popular: false,
    badge: "For High-Growth Teams",
    image: "/plan-suite.jpg",
    features: [
      "Private soundproof frosted suite",
      "Autonomous smartphone access",
      "Dedicated corporate VLAN",
      "25 hrs/mo boardroom credits"
    ],
    cta: "Schedule Suite Tour",
    workspaceType: "Private Suite"
  },
  {
    id: "enterprise-floor",
    name: "Enterprise Custom Floor",
    tagline: "Full-floor or bespoke multi-wing headquarters for 25–200+ personnel",
    monthlyPrice: null, // Custom Quote
    yearlyPrice: null,
    periodNote: "Tailored multi-year terms with cap-ex buildout credits",
    popular: false,
    badge: "Enterprise Custom",
    image: "/plan-enterprise.jpg",
    features: [
      "Entire floor with private elevator",
      "Turnkey architectural design & fit-out",
      "Direct 10 Gbps dark fiber cross-connect",
      "Dedicated on-site IT & hospitality lead"
    ],
    cta: "Request Enterprise RFP",
    workspaceType: "Enterprise Floor"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Elena Rostova",
    role: "Chief Operating Officer",
    company: "Veritas AI",
    industry: "Generative AI Infrastructure",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    metrics: "+42% Engineering Velocity",
    quote: "Transitioning 65 engineers from a rigid commercial lease to NEXUS was the smartest operational decision we made in 2025. The 10 Gbps dedicated VLAN and zero-latency interconnects felt like being on an enterprise campus from day one.",
    highlight: "Smooth 65-seat scale in under 48 hours."
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Managing Partner",
    company: "Apex Horizon Ventures",
    industry: "Venture Capital & Growth Equity",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    metrics: "140+ Partner Pitches Hosted",
    quote: "When hosting founders raising $20M+ Series B rounds, the atmosphere must project prestige and discretion. The acoustic treatment of the boardroom suites and the white-glove barista service consistently impress our international LPs.",
    highlight: "Unmatched executive prestige and privacy."
  },
  {
    id: 3,
    name: "David K. Chen",
    role: "VP of Product Engineering",
    company: "CloudScale Systems",
    industry: "Enterprise B2B Cloud",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    metrics: "+35% Team Productivity Lift",
    quote: "Our retention metrics jumped after moving here. The Herman Miller seating, sit-stand desks, and circadian wellness lighting reduced afternoon slump drastically. Plus, not dealing with facility leases freed up half our HR team's time.",
    highlight: "Direct boost in employee happiness and retention."
  },
  {
    id: 4,
    name: "Sarah Lindqvist",
    role: "Head of Talent & Culture",
    company: "Strata FinTech Global",
    industry: "Banking Technology",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    rating: 5,
    metrics: "Zero Downtime across 18 Months",
    quote: "The on-site community directors are extensions of our internal team. From organizing confidential cross-border summits to daily guest badge handling, everything is executed with Swiss precision.",
    highlight: "Flawless hospitality and administrative support."
  }
];

export const CASE_STUDY = {
  clientName: "Synthex Health Technologies",
  scale: "From 12 to 54 team members in 9 months",
  challenge: "Facing an inflexible 5-year commercial lease renewal with $400K in upfront tenant buildout capital requirements and 6-month permitting delays.",
  solution: "Deployed a customized, expandable 40-seat private suite with dedicated server racks and private biometric reception within NEXUS Grand Central.",
  results: [
    { metric: "68% Capital Saved", detail: "Zero cap-ex requirement; conserved $380,000 in upfront fit-out cash." },
    { metric: "3-Day Transition", detail: "Moved engineering and regulatory compliance teams with zero system downtime." },
    { metric: "100% HIPAA Ready", detail: "Passed strict medical privacy audit via isolated VLANs and biometric logging." }
  ],
  quote: "NEXUS gave us the balance sheet agility of a tech startup with the security posture of an established pharmaceutical enterprise.",
  author: "Dr. Alistair Finch, Chief Executive Officer"
};

export const VIRTUAL_TOUR_ZONES = [
  {
    id: "lobby",
    name: "Grand Reception & Concierge Salon",
    description: "A triple-height biophilic reception lounge equipped with Italian terrazzo floors, digital guest check-in kiosks, and dedicated executive concierge.",
    tags: ["Biometric Gate", "Concierge Desk", "Guest Lounge"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    hotspots: [
      { x: "32%", y: "45%", title: "Automated Guest Check-in", desc: "Fast QR code scanning and direct host notifications via Slack/Teams." },
      { x: "68%", y: "52%", title: "Artisan Coffee Bar", desc: "La Marzocco espresso machines with certified baristas." }
    ]
  },
  {
    id: "open-workspace",
    name: "Acoustic Open Workstation Commons",
    description: "Designed for deep individual flow state and rapid cross-functional agile scrums, bathed in natural circadian-matched sunlight.",
    tags: ["LINAK Sit-Stand Desks", "Herman Miller Embody", "4K Hubs"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80",
    hotspots: [
      { x: "40%", y: "58%", title: "Motorized Sit-Stand Desks", desc: "Programmable height memory with under-desk cable management." },
      { x: "75%", y: "38%", title: "Acoustic Ceiling Baffles", desc: "Reduces reverberation time below 0.4 seconds for quiet concentration." }
    ]
  },
  {
    id: "boardroom",
    name: "Executive Glass Boardroom (18-Seat)",
    description: "Double-walled acoustic glass conference room with 4K Cisco Webex telepresence, Shure ceiling beamforming microphones, and electronic switchable privacy smart glass.",
    tags: ["Smart Privacy Glass", "Cisco Webex 4K", "STC-48 Soundproof"],
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&auto=format&fit=crop&q=80",
    hotspots: [
      { x: "50%", y: "42%", title: "Switchable Smart Glass", desc: "Transitions from crystal clear to 100% opaque frost at the press of a wall button." },
      { x: "82%", y: "62%", title: "Dual 85” Ultra-HD Displays", desc: "Zero-latency wireless screen sharing and multi-camera AI speaker tracking." }
    ]
  },
  {
    id: "wellness",
    name: "Wellness Sanctuary & Oxygen Lounge",
    description: "Quiet reflection space with zero-gravity relaxation loungers, HEPA H14 hospital-grade filtered air circulation, and circadian lighting scenes.",
    tags: ["HEPA H14 Air", "Circadian Lighting", "Zero Phone Policy"],
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80",
    hotspots: [
      { x: "45%", y: "50%", title: "Zero Gravity Loungers", desc: "Spinal decompression chairs for 15-minute mental resets." },
      { x: "65%", y: "30%", title: "Biophilic Living Walls", desc: "Over 800 live plants naturally purifying oxygen levels." }
    ]
  }
];

export const FAQS = [
  {
    question: "How fast can an enterprise team move into a private suite?",
    answer: "We support move-in within as little as 24 to 48 hours for standard suites. Pre-configured enterprise hardware, dedicated VLANs, and custom door signages are prepared prior to your arrival."
  },
  {
    question: "Can we install custom proprietary IT hardware or private server racks?",
    answer: "Yes. Our private suites feature dedicated lockable rack enclosures, redundant PDU circuits, and on-premise dark fiber interconnects with 24/7 biometric keycard isolation."
  },
  {
    question: "What are your contractual lease terms and commitment flexibility?",
    answer: "We offer month-to-month flexibility as well as 6, 12, and 24-month structured enterprise agreements. Annual commitments include a 20% discount and dedicated boardroom credits."
  },
  {
    question: "How does guest access and conference room booking work?",
    answer: "Everything is managed through the NEXUS Member Portal or our mobile application. You can invite external guests with instant digital passes and reserve 4K boardrooms in real time."
  },
  {
    question: "Do you offer soundproof suites for confidential legal or financial firms?",
    answer: "All private suites and conference rooms feature STC-45+ rated double-laminated acoustic walls, silent HVAC baffles, and optional switchable frosted privacy glass."
  }
];

export const LOCATIONS = [
  {
    city: "San Francisco",
    name: "Financial District Tower",
    address: "555 California Street, 38th Floor",
    phone: "+1 (415) 890-2100",
    spaces: "Hot Desks, 12 Private Suites, 2 Enterprise Floors",
    image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=600&auto=format&fit=crop&q=80"
  },
  {
    city: "New York City",
    name: "Midtown Manhattan Plaza",
    address: "375 Park Avenue, 24th Floor",
    phone: "+1 (212) 640-9800",
    spaces: "Executive Suites, 4K Boardrooms, Barista Lounge",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80"
  },
  {
    city: "London",
    name: "Bishopsgate Financial Centre",
    address: "100 Bishopsgate, Level 19, EC2N 4AG",
    phone: "+44 (0) 20 7946 0920",
    spaces: "Private Team Pods, Podcasting Suite, Wellness Commons",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80"
  },
  {
    city: "Singapore",
    name: "Marina Bay Financial Centre",
    address: "10 Marina Boulevard, Tower 2, #28-01",
    phone: "+65 6789 4321",
    spaces: "Enterprise Headquarters, High-Density Desk Wings",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80"
  }
];
