-- Insert default profile data
INSERT INTO profiles (id, name, title, location, phone, email) VALUES 
('00000000-0000-0000-0000-000000000001', 'ARI AZHAR MAULANA, ST.', 'Junior Expert Irrigation Engineer', 'Ciamis, Indonesia', '089638421353', 'ti3.ari170197@gmail.com')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  location = EXCLUDED.location,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email;

-- Insert default portfolio data
INSERT INTO portfolio_data (id, summary, data) VALUES 
('00000000-0000-0000-0000-000000000001', 
'I am an experienced civil engineering graduate with a specialization in water resources for professional activities. Working as an Individual Consultant at the Ministry of Public Works and Housing, Directorate General of Water Resources, Citanduy River Basin Center.',
'{
  "experience": [
    {
      "role": "Junior Expert Irrigation Engineer",
      "company": "Dinas Pekerjaan Umum, Penataan Ruang dan Pertanahan Kabupaten Ciamis",
      "period": "Juli 2023 – Now",
      "responsibilities": [
        "Conducted technical assessments of irrigation networks",
        "Applied GIS and remote sensing tools for analysis",
        "Assisted in climate adaptation strategies"
      ],
      "achievements": [
        "Prepared activity plans for 2024 DAK program",
        "Contributed to rehabilitation programs planning",
        "Managed irrigation network data systems"
      ]
    }
  ],
  "education": [
    {
      "institution": "UNIVERSITAS GALUH",
      "degree": "Bachelor of Civil Engineering",
      "period": "2015 - 2019",
      "gpa": "3.44"
    }
  ],
  "skills": [
    {
      "category": "Water Resources Engineering",
      "skills": ["Planning & Management", "Hydrological Modeling", "Flood Analysis"]
    },
    {
      "category": "GIS & Remote Sensing",
      "skills": ["ArcGIS", "QGIS", "Google Earth Engine"]
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "Irrigation Network Rehabilitation Planning",
      "description": "Strategic planning of rehabilitation programs for irrigation networks",
      "technologies": ["AutoCAD", "GIS", "HEC-RAS"],
      "challenge": "Outdated irrigation networks with water loss issues",
      "solution": "Data-driven GIS approach for network mapping and analysis",
      "images": ["https://images.unsplash.com/photo-1549925247-21932398913a?q=80&w=2070&auto=format&fit=crop"],
      "link": "#experience"
    }
  ],
  "stats": [
    {"label": "Years of Experience", "value": 6, "suffix": "+"},
    {"label": "Published Papers", "value": 3, "suffix": ""},
    {"label": "Certifications", "value": 6, "suffix": ""},
    {"label": "GIS Tools Proficient", "value": 4, "suffix": "+"}
  ],
  "locations": [
    {
      "name": "Ciamis, Indonesia",
      "position": [-7.327, 108.353],
      "description": "Primary work location"
    }
  ],
  "showcase": {
    "title": "GIS-Based Flood Hazard Mapping",
    "description": "Comprehensive flood hazard mapping using GIS and remote sensing",
    "before": {
      "description": "Fragmented flood risk data",
      "imageUrls": ["https://images.unsplash.com/photo-1551854388-333a01394336?q=80&w=2070&auto=format&fit=crop"]
    },
    "after": {
      "description": "Data-driven hazard mapping system",
      "imageUrls": ["https://images.unsplash.com/photo-1497402120352-675204434217?q=80&w=2070&auto=format&fit=crop"]
    }
  },
  "organizations": ["Indonesian Hydraulic Engineering Association Member"],
  "certifications": [
    "Young Expert in Water Resources Engineering (BNSP)",
    "Junior Expert in Irrigation Planning (BNSP)",
    "Water Resources Expert – Junior (LPJK Indonesia)"
  ],
  "publications": [
    {
      "title": "Implementation Short-term Rainfall Prediction in Pagerageung, Tasikmalaya",
      "details": "Jurnal Sumber Daya Air, 2022",
      "link": "https://doi.org/10.32679/jsda.v20i1"
    }
  ]
}')
ON CONFLICT (id) DO UPDATE SET
  summary = EXCLUDED.summary,
  data = EXCLUDED.data;

-- Insert sample testimonials
INSERT INTO testimonials (id, name, role, company, content, rating) VALUES 
('test-1', 'Dr. Ahmad Wijaya', 'Senior Water Resources Engineer', 'Ministry of Public Works', 'Ari has exceptional skills in GIS analysis and water resource management.', 5),
('test-2', 'Siti Nurhaliza', 'Project Manager', 'Citanduy River Basin Center', 'Working with Ari on irrigation projects has been excellent.', 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  company = EXCLUDED.company,
  content = EXCLUDED.content,
  rating = EXCLUDED.rating;

-- Insert sample blog posts
INSERT INTO blog_posts (id, title, excerpt, content, date, author, category, read_time, featured) VALUES 
('blog-1', 'Modern Approaches to Irrigation System Design', 'Exploring innovative techniques in irrigation planning using GIS technologies.', 'In recent years, irrigation engineering has evolved with GIS integration...', '2024-01-15', 'Ari Azhar Maulana', 'Engineering', 5, true),
('blog-2', 'Flood Risk Assessment Using HEC-RAS', 'Comprehensive guide to hydraulic modeling for flood analysis.', 'Flood risk assessment is crucial for water resource management...', '2023-12-10', 'Ari Azhar Maulana', 'Analysis', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  date = EXCLUDED.date,
  author = EXCLUDED.author,
  category = EXCLUDED.category,
  read_time = EXCLUDED.read_time,
  featured = EXCLUDED.featured;

-- Insert sample gallery items
INSERT INTO gallery (id, title, description, image, category) VALUES 
('img-1', 'Irrigation Canal Survey', 'Field survey of irrigation infrastructure', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop', 'Field Work'),
('img-2', 'GIS Mapping Analysis', 'Digital mapping and watershed analysis', 'https://images.unsplash.com/photo-1559635013-35a82c40c39f?q=80&w=2070&auto=format&fit=crop', 'Technical'),
('img-3', 'Water Resource Planning', 'Strategic planning session', 'https://images.unsplash.com/photo-1497402120352-675204434217?q=80&w=2070&auto=format&fit=crop', 'Planning')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  category = EXCLUDED.category;