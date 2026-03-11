
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
  summary: "Water Resources Engineer with over 6 years of experience in water resource management and GIS innovation. Currently leading the digitalization of regional water data through the development of SIPASDA (Sistem Informasi Pengelolaan Air Sumber Daya Air) at DPUPRP Ciamis. Specialized in HEC-RAS hydraulic modeling, short-term rainfall prediction using SARIMAX, and geospatial analysis for disaster mitigation.",
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
        description: "Leading the development of Sistem Informasi Pengelolaan Air Sumber Daya Air (SIPASDA), a regional digital platform for real-time water monitoring and irrigation management.",
        technologies: ["Digitalization", "Data Management", "Water Resources", "Web Integration"],
        challenge: "Regional water flow and irrigation data in Ciamis were primarily managed through manual systems, leading to delays in decision-making and reporting.",
        solution: "Engineered a comprehensive digital ecosystem that centralizes water flow metrics and infrastructure status. The platform improves data transparency and enables rapid response to irrigation needs across the regency.",
        images: [
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497402120352-675204434217?q=80&w=2070&auto=format&fit=crop"
        ],
        link: "https://youtube.com/@AriAzharHaise"
    },
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
    title: "Geospatial Flood Risk Digitalization",
    description: "Architected a comprehensive hydrodynamic risk framework for the Citanduy River Basin. By synthesizing historical discharge data with real-time remote sensing, we transitioned from reactive manual tracking to a predictive, multi-layered geospatial intelligence system.",
    before: {
      description: "Legacy flood risk monitoring relied on non-indexed physical archives and point-source telemetry, resulting in critical data latency and a 35% discrepancy in peak discharge estimates.",
      imageUrls: [
        'https://images.unsplash.com/photo-1551854388-333a01394336?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560980439-5134c5145b25?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    after: {
      description: "Deployed a high-resolution inundation model using SARIMAX-informed rainfall predictions, enabling dynamic polygon generation with 92% spatial verification accuracy across 15 irrigation zones.",
      imageUrls: [
        'https://images.unsplash.com/photo-1497402120352-675204434217?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559635013-35a82c40c39f?q=80&w=2070&auto=format&fit=crop',
      ],
    },
  },
  testimonials: [
    {
      id: "test-1",
      name: "Dr. Ahmad Wijaya",
      role: "Senior Water Resources Engineer",
      company: "Ministry of Public Works",
      content: "Ari has exceptional skills in GIS analysis and water resource management. His technical expertise and dedication to quality work make him a valuable team member.",
      rating: 5,
    },
    {
      id: "test-2",
      name: "Siti Nurhaliza",
      role: "Project Manager",
      company: "Citanduy River Basin Center",
      content: "Working with Ari on irrigation projects has been excellent. His attention to detail and problem-solving abilities are outstanding.",
      rating: 5,
    },
  ],
  blogPosts: [
    {
      id: "blog-1",
      title: "Modern Approaches to Irrigation System Design",
      excerpt: "Exploring innovative techniques in irrigation planning using GIS and remote sensing technologies.",
      content: "In recent years, the field of irrigation engineering has evolved significantly with the integration of Geographic Information Systems (GIS) and remote sensing technologies...",
      date: "2024-01-15",
      author: "Ari Azhar Maulana",
      category: "Engineering",
      tags: ["Irrigation", "GIS", "Engineering"],
      readTime: 5,
      featured: true,
    },
    {
      id: "blog-2",
      title: "Flood Risk Assessment Using HEC-RAS",
      excerpt: "A comprehensive guide to hydraulic modeling for flood analysis in river basins.",
      content: "Flood risk assessment is crucial for sustainable water resource management. This article discusses the application of HEC-RAS software...",
      date: "2023-12-10",
      author: "Ari Azhar Maulana",
      category: "Analysis",
      tags: ["Flood Analysis", "HEC-RAS", "Modeling"],
      readTime: 7,
      featured: false,
    },
  ],
  gallery: [
    {
      id: "img-1",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
      title: "Irrigation Canal Survey",
      description: "Field survey of irrigation infrastructure in Ciamis region",
      category: "Field Work",
      projectId: "proj-1",
    },
    {
      id: "img-2",
      image: "https://images.unsplash.com/photo-1559635013-35a82c40c39f?q=80&w=2070&auto=format&fit=crop",
      title: "GIS Mapping Analysis",
      description: "Digital mapping and analysis of watershed characteristics",
      category: "Technical",
    },
    {
      id: "img-3",
      image: "https://images.unsplash.com/photo-1497402120352-675204434217?q=80&w=2070&auto=format&fit=crop",
      title: "Water Resource Planning",
      description: "Strategic planning session for water resource management",
      category: "Planning",
    },
  ],
};
