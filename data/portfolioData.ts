
import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  profile: {
    name: "ARI AZHAR MAULANA, ST.",
    title: "Junior Expert Irrigation Engineer",
    location: "Ciamis, Indonesia",
    phone: "089638421353",
    email: "ti3.ari170197@gmail.com",
  },
  summary: "I am an experienced civil engineering graduate with a specialization in water resources for professional activities. Working as an Individual Consultant at the Ministry of Public Works and Housing, Directorate General of Water Resources, Citanduy River Basin Center. Have a great interest to work in Civil Engineering, Water Resources, Geographic Information Systems (GIS) and accept new challenges to work in other fields.",
  experience: [
    {
      role: "Junior Expert Irrigation Engineer",
      company: "Dinas Pekerjaan Umum, Penataan Ruang dan Pertanahan Kabupaten Ciamis – Kabupaten Ciamis, Indonesia",
      period: "Juli 2023 – Now",
      responsibilities: [
        "Conducted technical assessments of irrigation networks, including hydraulic performance evaluation and infrastructure condition surveys.",
        "Applied GIS and remote sensing tools to analyze watershed characteristics, land use change, and irrigation service areas.",
        "Assisted in the integration of irrigation programs with climate adaptation and disaster risk reduction strategies, including flood risk analysis.",
      ],
      achievements: [
        "Assisted in preparing and submitting proposed activity plans to the Ministry of Public Works for the 2024 DAK program and the implementation of Presidential Instruction No. 2/2025.",
        "Contributed to the planning of rehabilitation programs for irrigation networks, focusing on improving system performance and service reliability.",
        "Supported the role of site supervisor for projects related to the upgrading and rehabilitation of irrigation infrastructure, ensuring quality standards and compliance with technical specifications.",
        "Managed and updated irrigation network data through the Epaksi system and Water Resources GIS, strengthening data accuracy and accessibility for planning and monitoring.",
      ],
    },
    {
      role: "Individual Consultant - Hydrology, Hydrometeorology, and Hydrogeology Information System Management",
      company: "Kementerian PUPR, Direktorat Jenderal SDA, BBWS Citanduy – Kota Banjar, Indonesia",
      period: "Mar 2022 – Jul 2023",
      responsibilities: [
        "Collect problems in SIH3 data and information management.",
        "Develop activity plan, prepare and conduct monitoring and evaluation consultation for policy & strategy follow-up and action plan for SIH3 implementation.",
        "Preparing and consulting the Cooperation Agreement (PKS) between stakeholders for SIH3 Management.",
        "Prepare monthly and final reports.",
      ],
      achievements: [],
    },
    {
        role: "Design Planning Professional",
        company: "Design Planning Professionals",
        period: "May 2021 - Dec 2021",
        responsibilities: [
            "Coordination across technical units and identification of data needs from various sources.",
            "Carry out design analysis.",
            "Preparing design documents and drawings.",
            "Prepare design recommendation report.",
        ],
        achievements: [],
    },
    {
        role: "Water Resource Information System Officer",
        company: "Kementerian PUPR, BBWS Citanduy",
        period: "Apr 2018 – Apr 2021",
        responsibilities: [
            "Controlling proposal documents from the community.",
            "Carry out preliminary survey activities, process survey data and make survey result reports.",
            "Carry out administrative work for technical work.",
            "Support all activities in the Integrated Water Resources Infrastructure Development Division.",
        ],
        achievements: [],
    }
  ],
  education: [
    {
      institution: "UNIVERSITAS GALUH",
      degree: "Bachelor of Civil Engineering",
      period: "2015 - 2019",
      gpa: "3.44",
    },
  ],
  skills: [
    {
      category: "Water Resources Engineering",
      skills: [
        "Planning & Management",
        "Hydrological Modeling",
        "Flood Analysis",
        "Infrastructure Monitoring"
      ],
    },
    {
      category: "GIS & Remote Sensing",
      skills: [
        "ArcGIS",
        "QGIS",
        "Google Earth Engine",
        "ENVI",
        "Geospatial Analysis"
      ],
    },
    {
      category: "Engineering Software",
      skills: [
        "AutoCAD",
        "Civil3D",
        "HEC-RAS",
        "HEC-HMS"
      ],
    },
  ],
  organizations: [
    "Indonesian Hydraulic Engineering Association Member (Himpunan Ahli Teknik Hidraulik Indonesia/ HATHI)",
  ],
  certifications: [
    "Young Expert in Water Resources Engineering (BNSP)",
    "Intermediate Irrigation Channel Employer (BNSP)",
    "Junior Expert in Irrigation Planning (BNSP)",
    "Basic Google Earth Engine (GeoAccses Indonesia)",
    "Professional Fellowship Program - Fundamental of GIS (Esri Indonesia)",
    "Water Resources Expert – Junior (LPJK Indonesia)",
  ],
  publications: [
    {
      title: "Implementation Short-term Rainfall Prediction in Pagerageung, Tasikmalaya",
      details: "Jurnal Sumber Daya Air, Direktorat Bina Teknik Sumber Daya Air, 2022",
      link: "https://doi.org/10.32679/jsda.v20i1",
    },
    {
      title: "Remote Sensing and Geographic Information System for Mapping Flood Hazard Areas of the Citanduy River Watershed",
      details: "39th Annual Scientific Conference Indonesian Hydraulic Engineering Association (HATHI), 2022",
      link: "https://hathi.id/download/155/?tmstv=1678244135",
    },
    {
      title: "Evaluation of Flood Impact Due to Change on The Upstream of Citanduy River in Tanjungkerta Village, Tasikmalaya-West Java",
      details: "Jurnal Sumber Daya Air, Direktorat Bina Teknik Sumber Daya Air, 2022",
      link: "https://doi.org/10.32679/jsda.v18i1.745",
    },
  ],
  projects: [
    {
        id: "proj-1",
        name: "Irrigation Network Rehabilitation Planning",
        description: "Contributed to the strategic planning of rehabilitation programs for major irrigation networks, focusing on enhancing system performance and service reliability.",
        technologies: ["AutoCAD", "GIS", "HEC-RAS", "Project Management"],
        challenge: "Many existing irrigation networks were outdated and inefficient, leading to water loss and unreliable supply for agriculture, especially during dry seasons. The primary challenge was to prioritize rehabilitation efforts with a limited budget to achieve the maximum positive impact.",
        solution: "A data-driven approach was implemented using GIS to map the entire network and overlay it with data on infrastructure condition, crop water requirements, and community feedback. This allowed for the identification of critical bottlenecks and high-impact areas for rehabilitation, ensuring resources were allocated effectively.",
        images: [
            "https://images.unsplash.com/photo-1549925247-21932398913a?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1596229948034-de5de01d4d8a?q=80&w=2070&auto=format&fit=crop"
        ],
        link: "#experience"
    },
    {
        id: "proj-2",
        name: "Citanduy River Basin SIH3 Management",
        description: "Managed the information system for Hydrology, Hydrometeorology, and Hydrogeology (SIH3) for the Citanduy river basin, including stakeholder coordination and data management.",
        technologies: ["Data Management", "GIS", "Stakeholder Coordination", "SIH3 Platform"],
        challenge: "Data related to water resources was fragmented across multiple departments and stakeholders, often in inconsistent formats. This made comprehensive basin-wide analysis and informed decision-making difficult and time-consuming.",
        solution: "Led the initiative to centralize and standardize data collection through the SIH3 platform. Developed and implemented a Cooperation Agreement (PKS) among key stakeholders to ensure consistent data sharing protocols. This created a single source of truth, enabling more accurate hydrological modeling and resource planning.",
        images: [
            "https://images.unsplash.com/photo-1588622146633-4927c9eb4482?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559027225-099d4f009f53?q=80&w=2070&auto=format&fit=crop"
        ],
        link: "#experience"
    }
  ],
  stats: [
    { label: "Years of Experience", value: 6, suffix: "+" },
    { label: "Published Papers", value: 3, suffix: "" },
    { label: "Certifications", value: 6, suffix: "" },
    { label: "GIS Tools Proficient", value: 4, suffix: "+" },
  ],
  locations: [
    {
      name: "Ciamis, Indonesia",
      position: [-7.327, 108.353],
      description: "Primary work location for local government irrigation projects.",
    },
    {
      name: "Kota Banjar, Indonesia",
      position: [-7.371, 108.530],
      description: "Location of the BBWS Citanduy office, focused on river basin management.",
    },
    {
      name: "Tasikmalaya, Indonesia",
      position: [-7.348, 108.218],
      description: "Site of research and flood modeling for published academic papers.",
    },
  ],
  showcase: {
    title: "GIS-Based Flood Hazard Mapping",
    description: "Developed a comprehensive flood hazard map for the Citanduy River Watershed by integrating remote sensing data and GIS analysis to identify high-risk areas, supporting disaster mitigation planning.",
    before: {
      description: "Fragmented and outdated flood risk data, leading to reactive and inefficient mitigation efforts.",
      imageUrls: [
        'https://images.unsplash.com/photo-1551854388-333a01394336?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560980439-5134c5145b25?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    after: {
      description: "A clear, data-driven hazard map enabling proactive infrastructure planning and improved emergency response protocols.",
      imageUrls: [
        'https://images.unsplash.com/photo-1497402120352-675204434217?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559635013-35a82c40c39f?q=80&w=2070&auto=format&fit=crop',
      ],
    },
  },
};
