/*
  4SIGHT METRICS — EDITABLE WEBSITE CONTENT

  This is the main file to edit when you want to add:
  - a new tool logo
  - a new Glimpse slide
  - a new Selected Work project
  - a new testimonial

  For image-based cards, place your PNG/JPG/WebP inside the matching folder in
  assets/images and add its relative path to the `image` field.
*/

window.SITE_DATA = {
  tools: [
    { name: "Power BI", icon: "assets/icons/tools/power-bi.svg" },
    {
      name: "Microsoft Fabric",
      icon: "assets/icons/tools/microsoft-fabric.svg",
    },
    { name: "SQL", icon: "assets/icons/tools/sql.svg" },
    { name: "Azure", icon: "assets/icons/tools/azure.svg" },
    { name: "Excel", icon: "assets/icons/tools/excel.svg" },
    { name: "Snowflake", icon: "assets/icons/tools/snowflake.svg" },
    { name: "Databricks", icon: "assets/icons/tools/databricks.svg" },
    { name: "Deneb", icon: "assets/icons/tools/deneb.svg" },
    { name: "PostgreSQL", icon: "assets/icons/tools/postgresql.svg" },
  ],

  services: [
    {
      number: "01",
      icon: "layout-dashboard",
      title: "Executive dashboards",
      description:
        "One trusted view of performance, priorities and risk—designed for leaders.",
      points: [
        "Financial & operational reporting",
        "Board and management views",
        "Mobile-ready KPI monitoring",
      ],
      featured: true,
    },
    {
      number: "02",
      icon: "network",
      title: "Data & KPI foundations",
      description:
        "Clean models, governed metrics and reliable refreshes your team can trust.",
      points: ["Data modelling", "KPI architecture", "Automated pipelines"],
    },
    {
      number: "03",
      icon: "compass",
      title: "BI strategy & advisory",
      description:
        "A practical roadmap that aligns people, technology and reporting priorities.",
      points: [
        "BI maturity assessment",
        "Reporting transformation",
        "Team enablement",
      ],
    },
  ],

  glimpses: [
    {
      id: "glimpse-supplement",
      image: "assets/images/glimpse/supplement-sales.webp",
      imageAlt: "Supplement",
    },

    {
      id: "glimpse-sales",
      image: "assets/images/glimpse/sales-report.webp",
      imageAlt: "Sales dashboard showing performance and opportunities",
    },
    {
      id: "glimpse-crypto",
      image: "assets/images/glimpse/crypto.webp",
      imageAlt: "Crypto dashboard",
    },
    {
      id: "glimpse-hotel",
      image: "assets/images/glimpse/hotel.webp",
      imageAlt: "Hotel dashboard showing occupancy, revenue and performance",
    },

    {
      id: "glimpse-Admin",
      image: "assets/images/glimpse/Admin.webp",
      imageAlt: "Admin dashboard",
    },

    {
      id: "glimpse-retail",
      image: "assets/images/glimpse/retail-practices.webp",
      imageAlt: "Retail dashboard showing performance",
    },
    {
      id: "glimpse-fashion",
      image: "assets/images/glimpse/fashion.webp",
      imageAlt: "Fashion dashboard",
    },
    {
      id: "glimpse-liquidity",
      image: "assets/images/glimpse/liquidity.webp",
      imageAlt: "Liquidity dashboard",
    },

    {
      id: "glimpse-healthfitness",
      image: "assets/images/glimpse/health-fitness.webp",
      imageAlt: "Health & Fitness dashboard",
    },
    {
      id: "glimpse-nigeriafood",
      image: "assets/images/glimpse/nigeria-food.webp",
      imageAlt: "Nigeria Food dashboard",
    },

    {
      id: "glimpse-FinacialOverview",
      image: "assets/images/glimpse/FinancialOverview.webp",
      imageAlt: "Financial Overview dashboard",
    },

    {
      id: "glimpse-watch",
      image: "assets/images/glimpse/watch.webp",
      imageAlt: "Watch dashboard",
    },
    {
      id: "glimpse-fashion2",
      image: "assets/images/glimpse/fashion2.webp",
      imageAlt: "Fashion dashboard",
    },
    {
      id: "glimpse-US sales",
      image: "assets/images/glimpse/US sales.webp",
      imageAlt: "US Sales dashboard",
    },
  ],

  projectTypes: ["All", "Reporting Systems", "Analytics Apps"],

  projects: [
    {
      id: "crypto-dashboard",
      type: "Analytics Apps",
      title: "Crypto Market Intelligence",
      shortTitle: "Crypto Intelligence",
      description:
        "A unified view of digital assets, market movements, balances and trading activity.",
      tags: ["React", "Market Analytics", "Crypto"],
      theme: "ocean",

      image: "assets/images/projects/crypto.webp",
      imageAlt:
        "Dark cryptocurrency intelligence dashboard showing portfolio balance, market trends, top coins and trading activity",

      embedUrl: "https://new-crypto-dashboard-ashy.vercel.app/",
    },
    {
      id: "finance-cockpit",
      type: "Reporting Systems",
      title: "Executive Revenue Performance",
      shortTitle: "Revenue Performance",
      description:
        "Revenue, targets, performance gaps and profit margin brought together in one executive view.",
      tags: ["Power BI", "Revenue Analytics", "Executive Reporting"],
      theme: "ocean",

      image: "assets/images/projects/sales-report.webp",
      imageAlt:
        "Executive revenue dashboard showing total revenue, target performance, revenue gap, profit margin and regional contribution",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiMzIzYmVhOTQtZjcxMC00YWM3LWI1ZTUtZDAyN2JhNmQ0NWE2IiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
    },
    {
      id: "retail-sales-intelligence",
      type: "Reporting Systems",
      title: "Retail Sales Intelligence",
      shortTitle: "Sales Intelligence",
      description:
        "A unified view of sales, profit, customer orders and regional performance for sharper retail decisions.",
      tags: ["Power BI", "Retail Analytics", "Sales"],
      theme: "ocean",

      image: "assets/images/projects/retail-practices.webp",
      imageAlt:
        "Dark Power BI retail dashboard showing revenue, profit trends, customer orders and regional performance",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiNTY0NWU1MDktOWI3OS00YzJlLThmYmUtZTM5ZTMyNzNmNTU4IiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
    },
    {
      id: "health-fitness-tracker",
      type: "Reporting Systems",
      title: "Health & Fitness Tracker",
      shortTitle: "Fitness Tracker",
      description:
        "Health, activity and fitness indicators organised into one clear personal performance view.",
      tags: ["Power BI", "Health Analytics", "Fitness Tracking"],
      theme: "ice",

      image: "assets/images/projects/health-fitness.webp",
      imageAlt:
        "Health and fitness dashboard showing heart rate, calories, daily steps, blood pressure, stress level and monthly fitness trends",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiYjE0ZmNiZTgtNzZjMi00NzA4LTljZDItZWI2ZjY3MTY1YmVmIiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
    },
    {
      id: "vertex-admin-dashboard",
      type: "Analytics Apps",
      title: "Business Operations Dashboard",
      shortTitle: "Operations Dashboard",
      description:
        "A responsive admin experience for monitoring revenue, customers, orders and day-to-day business activity.",
      tags: ["React", "Business Analytics", "Admin UI"],
      theme: "violet",

      image: "assets/images/projects/Admin.webp",
      imageAlt:
        "Dark business operations dashboard showing revenue, active users, orders, sales categories and recent activity",
      embedUrl: "https://admin-dashboard-james-isaac.vercel.app/",
    },
    {
      id: "supplement-sales-analytics",
      type: "Reporting Systems",
      title: "Supplement Sales Intelligence",
      shortTitle: "Supplement Sales",
      description:
        "A clear view of supplement sales, product demand, returns and marketplace performance.",
      tags: ["Power BI", "Sales Analytics", "E-commerce"],
      theme: "aqua",

      image: "assets/images/projects/supplement-sales.webp",
      imageAlt:
        "Dark Power BI supplement sales dashboard showing revenue, product demand, returns and marketplace performance",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiY2JmM2I3MmEtNDJjZC00NzBmLWJjZWItNjBjMGI5M2EzNDdhIiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
    },
    {
      id: "restaurant-sales-analytics",
      type: "Reporting Systems",
      title: "Restaurant Sales Intelligence",
      shortTitle: "Restaurant Sales",
      description:
        "A unified view of revenue, customer behaviour, menu demand and sales performance across locations and channels.",
      tags: ["Power BI", "Restaurant Analytics", "Sales"],
      theme: "sand",

      image: "assets/images/projects/nigeria-food.webp",
      imageAlt:
        "Power BI restaurant dashboard showing revenue, customer behaviour, popular meals, sales channels and branch performance",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiZTNjOTBkODUtMjFkNS00ZWI4LTk2MzctMmUwNmYwNDhiNjFmIiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
    },
    {
      id: "fashion-product-explorer",
      type: "Analytics Apps",
      title: "Fashion Product Explorer",
      shortTitle: "Product Analytics",
      description:
        "An interactive catalogue for exploring fashion products by category, audience and colour.",
      tags: ["Power BI", "Fashion Analytics", "Product Catalogue"],
      theme: "ice",

      image: "assets/images/projects/fashion.webp",
      imageAlt:
        "Power BI fashion product explorer displaying clothing and footwear with category, audience and colour filters",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiMTg5YTEwYjAtM2ViNi00OTVmLWFhMDAtYmZjYzVkNjhkY2JmIiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
    },
    {
      id: "sales-performance-overview",
      type: "Reporting Systems",
      title: "Sales Performance Overview",
      shortTitle: "Sales Performance",
      description:
        "A clear view of revenue, profit, orders and product performance across markets and time.",
      tags: ["Power BI", "Sales Analytics", "Performance"],
      theme: "ice",

      image: "assets/images/projects/US sales.webp",
      imageAlt:
        "Power BI sales performance dashboard showing revenue, profit, orders, regional results and product contribution",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiZTY4YjM2YTgtNDRhMy00MTgxLWE0NWEtMDQzMTBlYjQyY2E0IiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
    },
  ],

  testimonials: [
    {
      quote:
        "4Sight helped us move from scattered monthly reports to one clear performance view. Leadership conversations are now faster and more focused.",
      name: "Alex Morgan",
      role: "Finance Director",
      company: "Demo company",
      initials: "AM",
    },
    {
      quote:
        "The team understood the business question before touching the dashboard. That made the final solution genuinely useful—not just impressive.",
      name: "Sarah Okafor",
      role: "Operations Lead",
      company: "Demo company",
      initials: "SO",
    },
    {
      quote:
        "We finally have metrics everyone defines the same way. Reporting is lighter, and managers know exactly where to focus.",
      name: "David Lee",
      role: "Commercial Manager",
      company: "Demo company",
      initials: "DL",
    },
  ],

  socialLinks: [
    {
      name: "Facebook",
      url: "https://web.facebook.com/4SightMetrics",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/4sightmetrics",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/4sightmetrics",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/12819445756",
    },
  ],
};
