export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  durationSeconds: number;
  order: number;
}

export interface Section {
  id: string;
  title: string;
  order: number;
  videos: Video[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  totalVideos: number;
  totalDuration: string;
  sections: Section[];
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badges: ("Premium" | "Bestseller" | "New" | "Hot")[];
}

export interface CourseBundle {
  id: string;
  title: string;
  description: string;
  courses: string[]; // course ids
  price: number;
  originalPrice: number;
  badges: ("Premium" | "Bestseller" | "New")[];
}

export const courses: Course[] = [
  {
    id: "react-masterclass",
    title: "React.js Masterclass 2024",
    description: "Master React from fundamentals to advanced patterns. Build production-grade applications with hooks, context, performance optimization, and modern best practices used by top tech companies.",
    instructor: "Sarah Chen",
    thumbnail: "",
    category: "Frontend",
    totalVideos: 8,
    totalDuration: "4h 30m",
    price: 499,
    originalPrice: 3099,
    rating: 4.6,
    reviewCount: 17636,
    badges: ["Premium", "Bestseller"],
    sections: [
      {
        id: "s1", title: "Getting Started with React", order: 1,
        videos: [
          { id: "v1", title: "Introduction to React", youtubeId: "Tn6-PIqc4UM", duration: "12:30", durationSeconds: 750, order: 1 },
          { id: "v2", title: "Setting Up Your Environment", youtubeId: "Tn6-PIqc4UM", duration: "8:45", durationSeconds: 525, order: 2 },
          { id: "v3", title: "JSX Deep Dive", youtubeId: "Tn6-PIqc4UM", duration: "15:20", durationSeconds: 920, order: 3 },
        ],
      },
      {
        id: "s2", title: "Hooks & State Management", order: 2,
        videos: [
          { id: "v4", title: "useState & useEffect", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 1 },
          { id: "v5", title: "useContext & useReducer", youtubeId: "Tn6-PIqc4UM", duration: "22:10", durationSeconds: 1330, order: 2 },
          { id: "v6", title: "Custom Hooks", youtubeId: "Tn6-PIqc4UM", duration: "14:50", durationSeconds: 890, order: 3 },
        ],
      },
      {
        id: "s3", title: "Advanced Patterns", order: 3,
        videos: [
          { id: "v7", title: "Performance Optimization", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
          { id: "v8", title: "Testing React Applications", youtubeId: "Tn6-PIqc4UM", duration: "25:30", durationSeconds: 1530, order: 2 },
        ],
      },
    ],
  },
  {
    id: "node-backend",
    title: "Node.js Backend Development",
    description: "Build scalable backend services with Node.js and Express. Learn REST API design, authentication, database integration, and deployment strategies for production environments.",
    instructor: "Marcus Johnson",
    thumbnail: "",
    category: "Backend",
    totalVideos: 7,
    totalDuration: "5h 15m",
    price: 509,
    originalPrice: 799,
    rating: 4.4,
    reviewCount: 2212,
    badges: ["Premium", "Bestseller"],
    sections: [
      {
        id: "s4", title: "Node.js Fundamentals", order: 1,
        videos: [
          { id: "v9", title: "Node.js Architecture", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
          { id: "v10", title: "Modules & npm", youtubeId: "Tn6-PIqc4UM", duration: "12:30", durationSeconds: 750, order: 2 },
        ],
      },
      {
        id: "s5", title: "Express.js & REST APIs", order: 2,
        videos: [
          { id: "v11", title: "Building REST APIs", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
          { id: "v12", title: "Middleware & Error Handling", youtubeId: "Tn6-PIqc4UM", duration: "18:45", durationSeconds: 1125, order: 2 },
          { id: "v13", title: "Authentication with JWT", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 3 },
        ],
      },
      {
        id: "s6", title: "Database & Deployment", order: 3,
        videos: [
          { id: "v14", title: "MySQL Integration", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
          { id: "v15", title: "Deployment to Production", youtubeId: "Tn6-PIqc4UM", duration: "15:30", durationSeconds: 930, order: 2 },
        ],
      },
    ],
  },
  {
    id: "typescript-pro",
    title: "TypeScript for Professionals",
    description: "Go beyond basic types. Learn advanced TypeScript patterns including generics, conditional types, mapped types, and how to build type-safe libraries and applications.",
    instructor: "Elena Rodriguez",
    thumbnail: "",
    category: "Languages",
    totalVideos: 6,
    totalDuration: "3h 45m",
    price: 2499,
    originalPrice: 4999,
    rating: 4.3,
    reviewCount: 522,
    badges: ["Bestseller"],
    sections: [
      {
        id: "s7", title: "Type System Deep Dive", order: 1,
        videos: [
          { id: "v16", title: "Advanced Types", youtubeId: "Tn6-PIqc4UM", duration: "19:00", durationSeconds: 1140, order: 1 },
          { id: "v17", title: "Generics Mastery", youtubeId: "Tn6-PIqc4UM", duration: "23:00", durationSeconds: 1380, order: 2 },
          { id: "v18", title: "Conditional & Mapped Types", youtubeId: "Tn6-PIqc4UM", duration: "17:30", durationSeconds: 1050, order: 3 },
        ],
      },
      {
        id: "s8", title: "Real-World Patterns", order: 2,
        videos: [
          { id: "v19", title: "Type-Safe APIs", youtubeId: "Tn6-PIqc4UM", duration: "21:00", durationSeconds: 1260, order: 1 },
          { id: "v20", title: "Error Handling Patterns", youtubeId: "Tn6-PIqc4UM", duration: "14:00", durationSeconds: 840, order: 2 },
          { id: "v21", title: "Testing with Types", youtubeId: "Tn6-PIqc4UM", duration: "16:30", durationSeconds: 990, order: 3 },
        ],
      },
    ],
  },
  {
    id: "devops-essentials",
    title: "DevOps & CI/CD Essentials",
    description: "Learn Docker, Kubernetes, GitHub Actions, and cloud deployment. Master the DevOps toolchain used by modern engineering teams to ship reliable software at scale.",
    instructor: "Alex Kim",
    thumbnail: "",
    category: "DevOps",
    totalVideos: 6,
    totalDuration: "4h 00m",
    price: 459,
    originalPrice: 799,
    rating: 4.3,
    reviewCount: 414,
    badges: ["Premium"],
    sections: [
      {
        id: "s9", title: "Containerization", order: 1,
        videos: [
          { id: "v22", title: "Docker Fundamentals", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
          { id: "v23", title: "Docker Compose", youtubeId: "Tn6-PIqc4UM", duration: "15:00", durationSeconds: 900, order: 2 },
        ],
      },
      {
        id: "s10", title: "CI/CD Pipelines", order: 2,
        videos: [
          { id: "v24", title: "GitHub Actions", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
          { id: "v25", title: "Automated Testing", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
        ],
      },
      {
        id: "s11", title: "Cloud Deployment", order: 3,
        videos: [
          { id: "v26", title: "Kubernetes Basics", youtubeId: "Tn6-PIqc4UM", duration: "25:00", durationSeconds: 1500, order: 1 },
          { id: "v27", title: "Production Monitoring", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 2 },
        ],
      },
    ],
  },
  {
    id: "system-design",
    title: "System Design for Engineers",
    description: "Prepare for system design interviews and real-world architecture challenges. Cover scalability, load balancing, caching, database sharding, and distributed systems.",
    instructor: "David Park",
    thumbnail: "",
    category: "Architecture",
    totalVideos: 5,
    totalDuration: "3h 20m",
    price: 459,
    originalPrice: 3199,
    rating: 4.2,
    reviewCount: 4038,
    badges: ["Premium"],
    sections: [
      {
        id: "s12", title: "Fundamentals", order: 1,
        videos: [
          { id: "v28", title: "Scalability Principles", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
          { id: "v29", title: "Load Balancing & Caching", youtubeId: "Tn6-PIqc4UM", duration: "19:00", durationSeconds: 1140, order: 2 },
        ],
      },
      {
        id: "s13", title: "Case Studies", order: 2,
        videos: [
          { id: "v30", title: "Design a URL Shortener", youtubeId: "Tn6-PIqc4UM", duration: "28:00", durationSeconds: 1680, order: 1 },
          { id: "v31", title: "Design a Chat System", youtubeId: "Tn6-PIqc4UM", duration: "30:00", durationSeconds: 1800, order: 2 },
          { id: "v32", title: "Design a Video Platform", youtubeId: "Tn6-PIqc4UM", duration: "26:00", durationSeconds: 1560, order: 3 },
        ],
      },
    ],
  },
  {
    id: "sql-mastery",
    title: "SQL & Database Design Mastery",
    description: "From basic queries to advanced optimization. Learn normalization, indexing, query planning, transactions, and how to design schemas that scale for enterprise applications.",
    instructor: "Lisa Wang",
    thumbnail: "",
    category: "Databases",
    totalVideos: 6,
    totalDuration: "3h 50m",
    price: 509,
    originalPrice: 3199,
    rating: 4.5,
    reviewCount: 6559,
    badges: ["Bestseller", "Hot"],
    sections: [
      {
        id: "s14", title: "SQL Foundations", order: 1,
        videos: [
          { id: "v33", title: "SELECT, JOIN & Subqueries", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
          { id: "v34", title: "Aggregation & Window Functions", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
        ],
      },
      {
        id: "s15", title: "Schema Design", order: 2,
        videos: [
          { id: "v35", title: "Normalization", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
          { id: "v36", title: "Indexing Strategies", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
        ],
      },
      {
        id: "s16", title: "Performance", order: 3,
        videos: [
          { id: "v37", title: "Query Optimization", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
          { id: "v38", title: "Transactions & Locking", youtubeId: "Tn6-PIqc4UM", duration: "19:00", durationSeconds: 1140, order: 2 },
        ],
      },
    ],
  },
  {
    id: "python-bootcamp",
    title: "Python Programming Bootcamp",
    description: "Learn Python from scratch to advanced. Cover data types, OOP, file handling, web scraping, automation, and build real-world projects with Python 3.",
    instructor: "Raj Patel",
    thumbnail: "",
    category: "Languages",
    totalVideos: 8,
    totalDuration: "5h 00m",
    price: 449,
    originalPrice: 2999,
    rating: 4.7,
    reviewCount: 24500,
    badges: ["Bestseller", "Hot"],
    sections: [
      { id: "s17", title: "Python Basics", order: 1, videos: [
        { id: "v39", title: "Variables & Data Types", youtubeId: "Tn6-PIqc4UM", duration: "14:00", durationSeconds: 840, order: 1 },
        { id: "v40", title: "Control Flow & Loops", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 2 },
        { id: "v41", title: "Functions & Modules", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 3 },
      ]},
      { id: "s18", title: "Advanced Python", order: 2, videos: [
        { id: "v42", title: "OOP in Python", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
        { id: "v43", title: "File Handling & APIs", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
        { id: "v44", title: "Web Scraping", youtubeId: "Tn6-PIqc4UM", duration: "17:00", durationSeconds: 1020, order: 3 },
      ]},
      { id: "s19", title: "Projects", order: 3, videos: [
        { id: "v45", title: "Automation Scripts", youtubeId: "Tn6-PIqc4UM", duration: "25:00", durationSeconds: 1500, order: 1 },
        { id: "v46", title: "Build a CLI App", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
      ]},
    ],
  },
  {
    id: "data-science-ml",
    title: "Data Science & Machine Learning",
    description: "Master data analysis, visualization, and machine learning with Python. Learn pandas, NumPy, scikit-learn, and TensorFlow to build predictive models.",
    instructor: "Dr. Priya Sharma",
    thumbnail: "",
    category: "Data Science",
    totalVideos: 7,
    totalDuration: "6h 30m",
    price: 599,
    originalPrice: 4999,
    rating: 4.5,
    reviewCount: 8920,
    badges: ["Premium", "Hot"],
    sections: [
      { id: "s20", title: "Data Analysis", order: 1, videos: [
        { id: "v47", title: "Pandas & NumPy", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
        { id: "v48", title: "Data Visualization", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
      ]},
      { id: "s21", title: "Machine Learning", order: 2, videos: [
        { id: "v49", title: "Supervised Learning", youtubeId: "Tn6-PIqc4UM", duration: "28:00", durationSeconds: 1680, order: 1 },
        { id: "v50", title: "Unsupervised Learning", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
        { id: "v51", title: "Neural Networks Intro", youtubeId: "Tn6-PIqc4UM", duration: "30:00", durationSeconds: 1800, order: 3 },
      ]},
      { id: "s22", title: "Projects", order: 3, videos: [
        { id: "v52", title: "Prediction Model", youtubeId: "Tn6-PIqc4UM", duration: "35:00", durationSeconds: 2100, order: 1 },
        { id: "v53", title: "Image Classification", youtubeId: "Tn6-PIqc4UM", duration: "28:00", durationSeconds: 1680, order: 2 },
      ]},
    ],
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Practitioner & Solutions Architect",
    description: "Prepare for AWS certifications. Learn EC2, S3, Lambda, RDS, VPC, IAM, and architect scalable cloud solutions on Amazon Web Services.",
    instructor: "James Wilson",
    thumbnail: "",
    category: "Cloud",
    totalVideos: 7,
    totalDuration: "5h 45m",
    price: 549,
    originalPrice: 3499,
    rating: 4.6,
    reviewCount: 11200,
    badges: ["Premium", "Bestseller"],
    sections: [
      { id: "s23", title: "AWS Fundamentals", order: 1, videos: [
        { id: "v54", title: "Cloud Computing Basics", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 1 },
        { id: "v55", title: "IAM & Security", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
      ]},
      { id: "s24", title: "Core Services", order: 2, videos: [
        { id: "v56", title: "EC2 & S3", youtubeId: "Tn6-PIqc4UM", duration: "25:00", durationSeconds: 1500, order: 1 },
        { id: "v57", title: "Lambda & API Gateway", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
        { id: "v58", title: "RDS & DynamoDB", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 3 },
      ]},
      { id: "s25", title: "Architecture", order: 3, videos: [
        { id: "v59", title: "VPC & Networking", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
        { id: "v60", title: "High Availability Design", youtubeId: "Tn6-PIqc4UM", duration: "26:00", durationSeconds: 1560, order: 2 },
      ]},
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Ethical Hacking",
    description: "Learn network security, penetration testing, vulnerability assessment, and ethical hacking techniques. Prepare for CompTIA Security+ certification.",
    instructor: "Kevin Moore",
    thumbnail: "",
    category: "Security",
    totalVideos: 6,
    totalDuration: "4h 20m",
    price: 479,
    originalPrice: 2799,
    rating: 4.4,
    reviewCount: 5430,
    badges: ["Premium", "New"],
    sections: [
      { id: "s26", title: "Security Fundamentals", order: 1, videos: [
        { id: "v61", title: "Network Security Basics", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
        { id: "v62", title: "Cryptography", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
      ]},
      { id: "s27", title: "Penetration Testing", order: 2, videos: [
        { id: "v63", title: "Kali Linux & Tools", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
        { id: "v64", title: "Web App Exploitation", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
      ]},
      { id: "s28", title: "Defense", order: 3, videos: [
        { id: "v65", title: "Firewall & IDS", youtubeId: "Tn6-PIqc4UM", duration: "19:00", durationSeconds: 1140, order: 1 },
        { id: "v66", title: "Incident Response", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 2 },
      ]},
    ],
  },
  {
    id: "java-enterprise",
    title: "Java Enterprise Development",
    description: "Build enterprise applications with Java, Spring Boot, and Hibernate. Learn microservices, REST APIs, and production deployment patterns.",
    instructor: "Michael Torres",
    thumbnail: "",
    category: "Backend",
    totalVideos: 7,
    totalDuration: "5h 30m",
    price: 529,
    originalPrice: 3299,
    rating: 4.3,
    reviewCount: 6780,
    badges: ["Bestseller"],
    sections: [
      { id: "s29", title: "Java Core", order: 1, videos: [
        { id: "v67", title: "Java OOP Deep Dive", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
        { id: "v68", title: "Collections & Streams", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
      ]},
      { id: "s30", title: "Spring Boot", order: 2, videos: [
        { id: "v69", title: "Spring Boot Setup", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
        { id: "v70", title: "REST API with Spring", youtubeId: "Tn6-PIqc4UM", duration: "25:00", durationSeconds: 1500, order: 2 },
        { id: "v71", title: "Spring Security", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 3 },
      ]},
      { id: "s31", title: "Microservices", order: 3, videos: [
        { id: "v72", title: "Microservice Architecture", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
        { id: "v73", title: "Docker & Deployment", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
      ]},
    ],
  },
  {
    id: "uiux-design",
    title: "UI/UX Design with Figma",
    description: "Learn user-centered design, wireframing, prototyping, and visual design using Figma. Build a portfolio of real-world design projects.",
    instructor: "Anna Kim",
    thumbnail: "",
    category: "Design",
    totalVideos: 6,
    totalDuration: "4h 10m",
    price: 399,
    originalPrice: 2499,
    rating: 4.6,
    reviewCount: 9340,
    badges: ["Bestseller", "Hot"],
    sections: [
      { id: "s32", title: "Design Fundamentals", order: 1, videos: [
        { id: "v74", title: "Design Thinking", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
        { id: "v75", title: "Color Theory & Typography", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
      ]},
      { id: "s33", title: "Figma Mastery", order: 2, videos: [
        { id: "v76", title: "Wireframes & Layouts", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
        { id: "v77", title: "Components & Variants", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
      ]},
      { id: "s34", title: "Portfolio Projects", order: 3, videos: [
        { id: "v78", title: "Mobile App Design", youtubeId: "Tn6-PIqc4UM", duration: "25:00", durationSeconds: 1500, order: 1 },
        { id: "v79", title: "Dashboard Design", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
      ]},
    ],
  },
  {
    id: "mongodb-nosql",
    title: "MongoDB & NoSQL Database Design",
    description: "Master MongoDB for modern applications. Learn document modeling, aggregation pipelines, indexing, replication, and integration with Node.js.",
    instructor: "Carlos Mendez",
    thumbnail: "",
    category: "Databases",
    totalVideos: 6,
    totalDuration: "3h 40m",
    price: 459,
    originalPrice: 2799,
    rating: 4.4,
    reviewCount: 3210,
    badges: ["New"],
    sections: [
      { id: "s35", title: "MongoDB Basics", order: 1, videos: [
        { id: "v80", title: "CRUD Operations", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 1 },
        { id: "v81", title: "Document Modeling", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 2 },
      ]},
      { id: "s36", title: "Advanced Features", order: 2, videos: [
        { id: "v82", title: "Aggregation Pipeline", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
        { id: "v83", title: "Indexing & Performance", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
      ]},
      { id: "s37", title: "Integration", order: 3, videos: [
        { id: "v84", title: "Mongoose & Node.js", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
        { id: "v85", title: "Replication & Sharding", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
      ]},
    ],
  },
  {
    id: "git-github",
    title: "Git & GitHub for Teams",
    description: "Master version control with Git. Learn branching strategies, pull requests, code reviews, CI/CD integration, and collaborative workflows.",
    instructor: "Tom Bradley",
    thumbnail: "",
    category: "DevOps",
    totalVideos: 5,
    totalDuration: "2h 50m",
    price: 299,
    originalPrice: 1499,
    rating: 4.5,
    reviewCount: 15600,
    badges: ["Bestseller", "Hot"],
    sections: [
      { id: "s38", title: "Git Essentials", order: 1, videos: [
        { id: "v86", title: "Git Init to Push", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
        { id: "v87", title: "Branching & Merging", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
      ]},
      { id: "s39", title: "Team Workflows", order: 2, videos: [
        { id: "v88", title: "Pull Requests & Reviews", youtubeId: "Tn6-PIqc4UM", duration: "14:00", durationSeconds: 840, order: 1 },
        { id: "v89", title: "Git Flow & Trunk-Based", youtubeId: "Tn6-PIqc4UM", duration: "12:00", durationSeconds: 720, order: 2 },
        { id: "v90", title: "CI/CD with GitHub Actions", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 3 },
      ]},
    ],
  },
  {
    id: "react-native-mobile",
    title: "React Native Mobile Development",
    description: "Build cross-platform mobile apps with React Native. Learn navigation, state management, native modules, and deploy to App Store and Google Play.",
    instructor: "Sarah Chen",
    thumbnail: "",
    category: "Mobile",
    totalVideos: 7,
    totalDuration: "5h 15m",
    price: 549,
    originalPrice: 3499,
    rating: 4.4,
    reviewCount: 4560,
    badges: ["Premium", "New"],
    sections: [
      { id: "s40", title: "Getting Started", order: 1, videos: [
        { id: "v91", title: "React Native Setup", youtubeId: "Tn6-PIqc4UM", duration: "14:00", durationSeconds: 840, order: 1 },
        { id: "v92", title: "Core Components", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
      ]},
      { id: "s41", title: "Navigation & State", order: 2, videos: [
        { id: "v93", title: "React Navigation", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
        { id: "v94", title: "Redux & Context", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
      ]},
      { id: "s42", title: "Advanced & Deploy", order: 3, videos: [
        { id: "v95", title: "Native Modules", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
        { id: "v96", title: "Animations", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 2 },
        { id: "v97", title: "App Store Deployment", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 3 },
      ]},
    ],
  },
  {
    id: "graphql-apis",
    title: "GraphQL API Development",
    description: "Build flexible, efficient APIs with GraphQL. Learn schema design, resolvers, subscriptions, authentication, and integration with React and Apollo.",
    instructor: "Elena Rodriguez",
    thumbnail: "",
    category: "Backend",
    totalVideos: 6,
    totalDuration: "3h 55m",
    price: 479,
    originalPrice: 2999,
    rating: 4.3,
    reviewCount: 2870,
    badges: ["New"],
    sections: [
      { id: "s43", title: "GraphQL Basics", order: 1, videos: [
        { id: "v98", title: "Schema & Types", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 1 },
        { id: "v99", title: "Queries & Mutations", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
      ]},
      { id: "s44", title: "Advanced GraphQL", order: 2, videos: [
        { id: "v100", title: "Resolvers & DataLoaders", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
        { id: "v101", title: "Subscriptions", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 2 },
      ]},
      { id: "s45", title: "Full Stack", order: 3, videos: [
        { id: "v102", title: "Apollo Client + React", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
        { id: "v103", title: "Auth & Caching", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
      ]},
    ],
  },
  {
    id: "nextjs-fullstack",
    title: "Next.js Full Stack Framework",
    description: "Master Next.js for production apps. Learn SSR, SSG, API routes, middleware, authentication, and deploy to Vercel with optimal performance.",
    instructor: "David Park",
    thumbnail: "",
    category: "Frontend",
    totalVideos: 7,
    totalDuration: "4h 45m",
    price: 529,
    originalPrice: 3199,
    rating: 4.7,
    reviewCount: 7890,
    badges: ["Premium", "Bestseller"],
    sections: [
      { id: "s46", title: "Next.js Fundamentals", order: 1, videos: [
        { id: "v104", title: "Pages & Routing", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
        { id: "v105", title: "SSR vs SSG", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 2 },
      ]},
      { id: "s47", title: "API & Data", order: 2, videos: [
        { id: "v106", title: "API Routes", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 1 },
        { id: "v107", title: "Database Integration", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
        { id: "v108", title: "Authentication", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 3 },
      ]},
      { id: "s48", title: "Production", order: 3, videos: [
        { id: "v109", title: "Performance & SEO", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 1 },
        { id: "v110", title: "Deploy to Vercel", youtubeId: "Tn6-PIqc4UM", duration: "14:00", durationSeconds: 840, order: 2 },
      ]},
    ],
  },
  {
    id: "dsa-masterclass",
    title: "Data Structures & Algorithms Masterclass",
    description: "Ace coding interviews with comprehensive DSA coverage. Learn arrays, trees, graphs, dynamic programming, and solve 100+ LeetCode-style problems.",
    instructor: "Raj Patel",
    thumbnail: "",
    category: "Computer Science",
    totalVideos: 8,
    totalDuration: "7h 00m",
    price: 599,
    originalPrice: 4499,
    rating: 4.8,
    reviewCount: 19200,
    badges: ["Premium", "Bestseller", "Hot"],
    sections: [
      { id: "s49", title: "Foundations", order: 1, videos: [
        { id: "v111", title: "Big O & Complexity", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
        { id: "v112", title: "Arrays & Strings", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
        { id: "v113", title: "Linked Lists & Stacks", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 3 },
      ]},
      { id: "s50", title: "Trees & Graphs", order: 2, videos: [
        { id: "v114", title: "Binary Trees & BST", youtubeId: "Tn6-PIqc4UM", duration: "25:00", durationSeconds: 1500, order: 1 },
        { id: "v115", title: "Graph Algorithms", youtubeId: "Tn6-PIqc4UM", duration: "28:00", durationSeconds: 1680, order: 2 },
      ]},
      { id: "s51", title: "Advanced", order: 3, videos: [
        { id: "v116", title: "Dynamic Programming", youtubeId: "Tn6-PIqc4UM", duration: "30:00", durationSeconds: 1800, order: 1 },
        { id: "v117", title: "Greedy & Backtracking", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
        { id: "v118", title: "Interview Patterns", youtubeId: "Tn6-PIqc4UM", duration: "26:00", durationSeconds: 1560, order: 3 },
      ]},
    ],
  },
];

export const bundles: CourseBundle[] = [
  {
    id: "fullstack-bundle",
    title: "Full Stack Web Development Bundle",
    description: "Master frontend and backend development with React, Node.js, TypeScript, and SQL. Everything you need to become a full-stack engineer.",
    courses: ["react-masterclass", "node-backend", "typescript-pro", "sql-mastery"],
    price: 2999,
    originalPrice: 12096,
    badges: ["Premium", "Bestseller"],
  },
  {
    id: "sde-bundle",
    title: "Software Development Engineer Bundle",
    description: "Comprehensive path covering system design, DevOps, TypeScript, and database mastery for aspiring software development engineers.",
    courses: ["system-design", "devops-essentials", "typescript-pro", "sql-mastery"],
    price: 2499,
    originalPrice: 11196,
    badges: ["Premium", "New"],
  },
  {
    id: "cloud-bundle",
    title: "Cloud & Infrastructure Bundle",
    description: "Learn DevOps, system design, and backend development to master cloud-native application architecture and deployment.",
    courses: ["devops-essentials", "system-design", "node-backend"],
    price: 1299,
    originalPrice: 4797,
    badges: ["New"],
  },
];
