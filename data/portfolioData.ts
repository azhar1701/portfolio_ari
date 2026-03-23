
import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  profile: {
    name: "ARI AZHAR MAULANA, ST.",
    title: "Water Resources Engineer",
    location: "Ciamis, Indonesia",
    phone: "089638421353",
    email: "ti3.ari170197@gmail.com",
    socials: {
      linkedin: "https://linkedin.com/in/ariazhar971",
      github: "https://github.com/ariazhar",
      instagram: "https://instagram.com/ariazhar",
      youtube: "https://youtube.com/@AriAzharHaise",
    }
  },
  summary: "Water resources engineer, 6+ years. I build SIPASDA — a system that brings Ciamis's irrigation and water data online — and do hydraulic modeling (HEC-RAS), rainfall prediction (SARIMAX), and GIS work for flood and disaster planning.",
  summaryImage: "/images/summary_hero.png",
  experience: [
    {
      role: "Water Resources Engineer",
      company: "DPUPRP Kabupaten Ciamis – Jawa Barat, Indonesia",
      period: "Juli 2023 – Now",
      responsibilities: [
        "Developing and managing SIPASDA (Sistem Informasi Pengelolaan Air Sumber Daya Air) for digitalized regional water monitoring.",
        "Conducted technical assessments of irrigation networks, including hydraulic performance evaluation and infrastructure condition surveys.",
        "Applied GIS and remote sensing tools to analyze watershed characteristics, land use change, and irrigation service areas.",
        "Integrating irrigation programs with climate adaptation and disaster risk reduction strategies.",
      ],
      achievements: [
        "Launched SIPASDA digital platform to improve transparency and efficiency in regional water resources management.",
        "Assisted in preparing and submitting proposed activity plans to the Ministry of Public Works for the 2024 DAK program.",
        "Managed and updated irrigation network data through the Epaksi system and Water Resources GIS.",
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
      title: "Implementasi Metode SARIMAX untuk Prediksi Curah Hujan Jangka Pendek di Pagerageung, Tasikmalaya",
      details: "Jurnal Sumber Daya Air, Direktorat Bina Teknik Sumber Daya Air, Vol. 20, No. 1, 2024",
      link: "https://doi.org/10.32679/jsda.v20i1",
    },
    {
      title: "Remote Sensing and Geographic Information System for Mapping Flood Hazard Areas of the Citanduy River Watershed",
      details: "39th Annual Scientific Conference Indonesian Hydraulic Engineering Association (HATHI), 2022",
      link: "https://hathi.id/download/155/?tmstv=1678244135",
    },
    {
      title: "Pembelajaran Dari Fenomena Rip Current, Beach Cusp dan Kasus Korban Tenggelam Menggunakan Citra Satelit",
      details: "Pertemuan Ilmiah Tahunan (PIT) ke-39 Himpunan Ahli Teknik Hidraulik Indonesia (HATHI), 2022",
      link: "https://hathi.id",
    },
  ],
  projects: [
    {
      id: "proj-sipasda",
      name: "SIPASDA Digital Platform Development",
      description: "Building SIPASDA — a web platform that tracks water flow and irrigation status across the Ciamis regency in real time.",
      technologies: ["Digitalization", "Data Management", "Water Resources", "Web Integration"],
      challenge: "Regional water flow and irrigation data in Ciamis were primarily managed through manual systems, leading to delays in decision-making and reporting.",
      solution: "Built a central dashboard that pulls water-flow readings and infrastructure reports into one place, so field teams and planners can act on current data instead of waiting for monthly summaries.",
      images: [
        "/images/project_sipasda.png",
        "/images/project_sih3.png"
      ],
      link: "https://youtube.com/@AriAzharHaise"
    },
    {
      id: "proj-1",
      name: "Irrigation Network Rehabilitation Planning",
      description: "Planned where to fix aging irrigation canals first — which stretches lose the most water and serve the most farmers.",
      technologies: ["AutoCAD", "GIS", "HEC-RAS", "Project Management"],
      challenge: "Many existing irrigation networks were outdated and inefficient, leading to water loss and unreliable supply for agriculture, especially during dry seasons. The primary challenge was to prioritize rehabilitation efforts with a limited budget to achieve the maximum positive impact.",
      solution: "Mapped every canal in GIS and layered in condition surveys, crop water needs, and farmer complaints. That showed us which repairs to prioritise so the budget did the most good.",
      images: [
        "/images/gallery_survey.png",
        "/images/project_default.png"
      ],
      link: "#experience"
    },
    {
      id: "proj-2",
      name: "Citanduy River Basin SIH3 Management",
      description: "Managed the information system for Hydrology, Hydrometeorology, and Hydrogeology (SIH3) for the Citanduy river basin, including stakeholder coordination and data management.",
      technologies: ["Data Management", "GIS", "Stakeholder Coordination", "SIH3 Platform"],
      challenge: "Data related to water resources was fragmented across multiple departments and stakeholders, often in inconsistent formats. This made full basin-wide analysis and informed decision-making difficult and time-consuming.",
      solution: "Got the agencies sharing data through one platform (SIH3) by drafting a formal cooperation agreement. Once everyone reported in the same format, basin-wide analysis actually became possible.",
      images: [
        "/images/project_sih3.png",
        "/images/gallery_planning.png"
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
    title: "Flood Risk Mapping for the Citanduy Basin",
    description: "Built a GIS-based flood risk system for the Citanduy River Basin. Combined historical discharge records with satellite imagery to replace manual tracking with predictive flood maps.",
    before: {
      description: "Flood monitoring ran on paper archives and scattered sensors. Data came in late, and peak discharge estimates were off by roughly 35%.",
      imageUrls: [
        '/images/showcase_before.png',
        '/images/project_default.png',
      ],
    },
    after: {
      description: "Using SARIMAX rainfall forecasts, we generated flood inundation maps with 92% spatial accuracy across 15 irrigation zones.",
      imageUrls: [
        '/images/showcase_after.png',
        '/images/gallery_mapping.png',
      ],
    },
  },
  testimonials: [
    {
      id: "test-1",
      name: "Dr. Ahmad Wijaya",
      role: "Senior Water Resources Engineer",
      company: "Ministry of Public Works",
      avatar: "/images/avatar_ahmad.png",
      content: "Ari knows GIS inside and out and doesn't cut corners. Reliable person to have on a water-resources project.",
      rating: 5,
    },
    {
      id: "test-2",
      name: "Siti Nurhaliza",
      role: "Project Manager",
      company: "Citanduy River Basin Center",
      avatar: "/images/avatar_siti.png",
      content: "On irrigation projects, Ari catches problems early and figures out practical fixes. Good to work with.",
      rating: 5,
    },
  ],
  blogPosts: [
    {
      id: "blog-1",
      title: "Modern Approaches to Irrigation System Design",
      excerpt: "Practical methods in irrigation planning using GIS and remote sensing technologies.",
      content: "GIS and remote sensing are changing how we plan irrigation systems. This post walks through the tools and methods I use in the field...",
      date: "2024-01-15",
      author: "Ari Azhar Maulana",
      category: "Engineering",
      image: "/images/blog_irrigation.png",
      tags: ["Irrigation", "GIS", "Engineering"],
      readTime: 5,
      featured: true,
    },
    {
      id: "blog-2",
      title: "Flood Risk Assessment Using HEC-RAS",
      excerpt: "A practical guide to hydraulic modeling for flood analysis in river basins.",
      content: "Understanding flood risk starts with good hydraulic modeling. Here I walk through how I use HEC-RAS for flood analysis in river basins...",
      date: "2023-12-10",
      author: "Ari Azhar Maulana",
      category: "Analysis",
      image: "/images/blog_hecras.png",
      tags: ["Flood Analysis", "HEC-RAS", "Modeling"],
      readTime: 7,
      featured: false,
    },
  ],
  gallery: [
    {
      id: "img-1",
      image: "/images/gallery_survey.png",
      title: "Irrigation Canal Survey",
      description: "Field survey of irrigation infrastructure in Ciamis region",
      category: "Field Work",
      projectId: "proj-1",
    },
    {
      id: "img-2",
      image: "/images/gallery_mapping.png",
      title: "GIS Mapping Analysis",
      description: "Digital mapping and analysis of watershed characteristics",
      category: "Technical",
    },
    {
      id: "img-3",
      image: "/images/gallery_planning.png",
      title: "Water Resource Planning",
      description: "Planning session for water resource management",
      category: "Planning",
    },
  ],
};
