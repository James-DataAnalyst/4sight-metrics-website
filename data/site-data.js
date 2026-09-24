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
    {
      name: "QuickBooks",
      icon: "assets/icons/tools/quickbooks.svg",
      heroIcon: "assets/icons/tools/gray/quickbooks-gray.svg",
    },
    {
      name: "Housecall Pro",
      icon: "assets/icons/tools/housecall-pro.svg",
      heroIcon: "assets/icons/tools/gray/housecall-pro-gray.svg",
    },
    {
      name: "Gusto",
      icon: "assets/icons/tools/gusto.svg",
      heroIcon: "assets/icons/tools/gray/gusto-gray.svg",
    },
    {
      name: "Buildertrend",
      icon: "assets/icons/tools/buildertrend.svg",
      heroIcon: "assets/icons/tools/gray/buildertrend-gray.svg",
    },
    {
      name: "Excel",
      icon: "assets/icons/tools/excel.svg",
      heroIcon: "assets/icons/tools/gray/excel-gray.svg",
    },
    {
      name: "Jobber",
      icon: "assets/icons/tools/jobber.svg",
      heroIcon: "assets/icons/tools/gray/jobber-gray.svg",
    },
    {
      name: "Zoho CRM",
      icon: "assets/icons/tools/zoho-crm.svg",
      heroIcon: "assets/icons/tools/gray/zoho-crm-gray.svg",
    },
    {
      name: "Google Sheets",
      icon: "assets/icons/tools/google-sheets.svg",
      heroIcon: "assets/icons/tools/gray/google-sheets-gray.svg",
    },
    {
      name: "Power BI",
      icon: "assets/icons/tools/power-bi.svg",
      heroIcon: "assets/icons/tools/gray/power-bi-gray.svg",
    },
  ],
  services: [
    {
      number: "01",
      icon: "landmark",
      title: "Financial",
      description: "See the financial outcome clearly.",
      points: [
        "Revenue",
        "Gross margin",
        "Profitability",
        "Cash flow",
        "Accounts receivable",
      ],
    },
    {
      number: "02",
      icon: "settings-2",
      title: "Operational",
      description: "Understand what is driving the result.",
      points: [
        "Volume",
        "Productivity",
        "Utilization",
        "Conversion",
        "Capacity",
      ],
    },
    {
      number: "03",
      icon: "chart-no-axes-combined",
      title: "Business Clarity",
      description:
        "Connect financial outcomes to the operational activity driving them",
      points: [
        "What is happening?",
        "Why is it happening?",
        "Where should we focus?",
      ],
      result: true,
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
      id: "glimpse-bank",
      image: "assets/images/glimpse/bank.webp",
      imageAlt: "Banking dashboard",
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
      id: "automated-monthly-sales-reporting",
      type: "Reporting Systems",
      category: "Excel automation · Sales operations",
      title: "Automated Monthly Sales Reporting",
      shortTitle: "Monthly Sales Reporting",
      description:
        "A refresh-ready Excel reporting system that turns new monthly sales files into a dashboard and management report without rebuilding the workbook each month.",
      tags: ["Excel", "Power Query", "Power Pivot", "PivotTables"],
      theme: "ocean",

      image: "assets/images/projects/automated-monthly-sales-dashboard.png",
      imageAlt:
        "BluePeak Excel performance dashboard showing sales, profit, targets, orders and business filters",

      caseStudy: {
        kicker: "Excel automation · Sales operations",

        headline:
          "Monthly reporting without rebuilding the report every month.",

        intro:
          "BluePeak's reporting process was designed around a simple business need: add the new month's sales file, refresh the workbook, and get an updated management view without repeating the same preparation work again.",

        heroImage:
          "assets/images/projects/automated-monthly-sales-dashboard.png",

        heroAlt:
          "BluePeak performance command center showing net sales, gross profit, gross margin, operating profit, target attainment and orders",

        heroCaption:
          "The final dashboard brings sales, profitability, targets and branch performance into one clear monthly view.",

        problem: {
          title: "The same reporting work kept coming back every month.",

          text: "When monthly sales arrive as separate Excel or CSV files, teams can spend time combining files, cleaning columns, rebuilding summaries and checking formulas before they can even discuss performance. The bigger problem is not Excel itself. It is a reporting process that depends on repeating manual steps.",
        },

        solution: {
          title: "Turn the monthly task into a reusable reporting system.",

          text: "The workbook was built so new sales files can be added to the reporting folder and pulled into the same Power Query process. The cleaned data feeds one connected model, which then updates the pivots, dashboard and management report from the same source.",
        },

        gallery: [
          {
            eyebrow: "01 / Prepare",

            title: "New monthly files enter one repeatable data process.",

            text: "Power Query combines the monthly sales files, keeps the required fields, standardises the data and applies the same preparation steps each time. That removes the need to manually copy and reshape the new month before reporting can begin.",

            image:
              "assets/images/projects/automated-monthly-sales-power-query.png",

            alt: "Power Query workflow used to combine and transform monthly sales files",
          },

          {
            eyebrow: "02 / Connect",

            title: "One model keeps the numbers connected.",

            text: "Sales, dates, products, customers, branches, sales representatives, targets and expenses are organised into a connected model. This gives the workbook one consistent foundation instead of separate calculations being rebuilt in different sheets.",

            image: "assets/images/projects/automated-monthly-sales-model.png",

            alt: "Excel Power Pivot data model connecting sales, date, product, customer, branch, target and expense tables",
          },

          {
            eyebrow: "03 / Calculate",

            title: "Reusable reporting tables respond to the same filters.",

            text: "The model feeds reusable PivotTables for sales, profit, branches, products, channels and month-on-month performance. These supporting tables update with the dashboard selections and provide a controlled layer behind the report visuals.",

            image: "assets/images/projects/automated-monthly-sales-pivots.png",

            alt: "Model PivotTables supporting the automated monthly sales dashboard",
          },

          {
            eyebrow: "04 / Communicate",

            title:
              "Management gets a report that explains the month, not just the numbers.",

            text: "The management report compares the selected period with the prior month, shows the variance and status for key measures, and adds a short performance commentary. It gives decision-makers a printable summary alongside the interactive dashboard.",

            image: "assets/images/projects/automated-monthly-sales-report.png",

            alt: "Monthly management report comparing selected period, prior period, variance and performance status",
          },
        ],

        outcomes: [
          {
            icon: "refresh-cw",
            title: "Faster month-end updates",
            text: "The process is designed around adding the new file and refreshing the existing reporting system instead of rebuilding it.",
          },

          {
            icon: "shield-check",
            title: "More consistent numbers",
            text: "Dashboard, pivots and management reporting are driven from the same connected model and KPI logic.",
          },

          {
            icon: "chart-no-axes-combined",
            title: "Clearer performance visibility",
            text: "Sales, profit, margin, targets, orders and branch performance can be reviewed together instead of across disconnected sheets.",
          },

          {
            icon: "file-text",
            title: "A management-ready output",
            text: "The same workflow supports both an interactive dashboard and a concise monthly report for review or distribution.",
          },
        ],

        workflow: [
          {
            title: "Add the new month",
            text: "Place the latest sales file in the reporting folder using the agreed file structure.",
          },

          {
            title: "Refresh the workbook",
            text: "Power Query imports the files and applies the existing transformation steps automatically.",
          },

          {
            title: "Update the model",
            text: "The connected model and reporting tables recalculate the measures from the refreshed data.",
          },

          {
            title: "Review and share",
            text: "The dashboard and monthly management report are ready for performance review and decision-making.",
          },
        ],

        demoNote:
          "Demonstration project built with fictional BluePeak business data. It illustrates the reporting workflow and design approach; the figures do not represent a real company's performance.",

        ctaTitle: "Still rebuilding the same report every month?",

        ctaText:
          "4Sight Metrics can help turn recurring spreadsheet reporting into a cleaner, repeatable system built around the numbers your team actually uses.",

        ctaLabel: "Discuss your reporting process",
      },
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
      id: "dca-flight-performance-dashboard",
      type: "Reporting Systems",
      category: "Aviation analytics",
      title: "DCA Flight Performance Dashboard",
      shortTitle: "Flight Performance",
      description:
        "An interactive aviation dashboard showing airline reliability, arrival delays, congestion patterns and hourly flight performance for clearer operational monitoring.",
      tags: ["Power BI", "Aviation Analytics", "Operational Reporting"],
      theme: "aqua",

      image: "assets/images/projects/dca-flight-performance.png",
      imageAlt:
        "Power BI flight performance dashboard showing airline delay analysis, reliability scorecards, congestion rankings and hourly performance trends",

      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiODIwMjc2ZmItYTI3ZC00MWQyLTkxYjYtZDc4ZDY3N2U4ZWY2IiwidCI6IjRiZTBmMTg5LWVkODQtNDhiOC05YTEyLTkwNDFkNWRiYzNhMiJ9",
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
  ],

  testimonials: [
    {
      quote:
        "As an Amazon DSP owner, there are hundreds of things to keep track of. 4Sight helped cut through the noise and connect the financial and operational data that matters most, giving me a much clearer view of the business.",
      name: "Tola, O.",
      role: "Amazon DSP Owner",
    },
    {
      quote:
        "I was drowning in spreadsheets and had tried multiple AI tools, but I still couldn’t get the clarity I needed. I ended up spending hours trying to make it work on my own. One conversation with the 4Sight Metrics team changed that, they understood what I was trying to accomplish and helped turn it into a clear, practical solution.",
      name: "Ola, K.",
      role: "Builder and General Contractor",
    },
    {
      quote:
        "I partner with the 4Sight Metrics team to build custom dashboards for my premium clients. Their professionalism, patience, and ability to turn complex ideas into clear, well-designed solutions are exceptional. I highly recommend them.",
      name: "Michael, O.",
      role: "Business Coach",
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
  ],
};
