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
    sections: [
      {
        id: "s1",
        title: "Getting Started with React",
        order: 1,
        videos: [
          { id: "v1", title: "Introduction to React", youtubeId: "Tn6-PIqc4UM", duration: "12:30", durationSeconds: 750, order: 1 },
          { id: "v2", title: "Setting Up Your Environment", youtubeId: "Tn6-PIqc4UM", duration: "8:45", durationSeconds: 525, order: 2 },
          { id: "v3", title: "JSX Deep Dive", youtubeId: "Tn6-PIqc4UM", duration: "15:20", durationSeconds: 920, order: 3 },
        ],
      },
      {
        id: "s2",
        title: "Hooks & State Management",
        order: 2,
        videos: [
          { id: "v4", title: "useState & useEffect", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 1 },
          { id: "v5", title: "useContext & useReducer", youtubeId: "Tn6-PIqc4UM", duration: "22:10", durationSeconds: 1330, order: 2 },
          { id: "v6", title: "Custom Hooks", youtubeId: "Tn6-PIqc4UM", duration: "14:50", durationSeconds: 890, order: 3 },
        ],
      },
      {
        id: "s3",
        title: "Advanced Patterns",
        order: 3,
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
    sections: [
      {
        id: "s4",
        title: "Node.js Fundamentals",
        order: 1,
        videos: [
          { id: "v9", title: "Node.js Architecture", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
          { id: "v10", title: "Modules & npm", youtubeId: "Tn6-PIqc4UM", duration: "12:30", durationSeconds: 750, order: 2 },
        ],
      },
      {
        id: "s5",
        title: "Express.js & REST APIs",
        order: 2,
        videos: [
          { id: "v11", title: "Building REST APIs", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
          { id: "v12", title: "Middleware & Error Handling", youtubeId: "Tn6-PIqc4UM", duration: "18:45", durationSeconds: 1125, order: 2 },
          { id: "v13", title: "Authentication with JWT", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 3 },
        ],
      },
      {
        id: "s6",
        title: "Database & Deployment",
        order: 3,
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
    sections: [
      {
        id: "s7",
        title: "Type System Deep Dive",
        order: 1,
        videos: [
          { id: "v16", title: "Advanced Types", youtubeId: "Tn6-PIqc4UM", duration: "19:00", durationSeconds: 1140, order: 1 },
          { id: "v17", title: "Generics Mastery", youtubeId: "Tn6-PIqc4UM", duration: "23:00", durationSeconds: 1380, order: 2 },
          { id: "v18", title: "Conditional & Mapped Types", youtubeId: "Tn6-PIqc4UM", duration: "17:30", durationSeconds: 1050, order: 3 },
        ],
      },
      {
        id: "s8",
        title: "Real-World Patterns",
        order: 2,
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
    sections: [
      {
        id: "s9",
        title: "Containerization",
        order: 1,
        videos: [
          { id: "v22", title: "Docker Fundamentals", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
          { id: "v23", title: "Docker Compose", youtubeId: "Tn6-PIqc4UM", duration: "15:00", durationSeconds: 900, order: 2 },
        ],
      },
      {
        id: "s10",
        title: "CI/CD Pipelines",
        order: 2,
        videos: [
          { id: "v24", title: "GitHub Actions", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
          { id: "v25", title: "Automated Testing", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
        ],
      },
      {
        id: "s11",
        title: "Cloud Deployment",
        order: 3,
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
    sections: [
      {
        id: "s12",
        title: "Fundamentals",
        order: 1,
        videos: [
          { id: "v28", title: "Scalability Principles", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 1 },
          { id: "v29", title: "Load Balancing & Caching", youtubeId: "Tn6-PIqc4UM", duration: "19:00", durationSeconds: 1140, order: 2 },
        ],
      },
      {
        id: "s13",
        title: "Case Studies",
        order: 2,
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
    sections: [
      {
        id: "s14",
        title: "SQL Foundations",
        order: 1,
        videos: [
          { id: "v33", title: "SELECT, JOIN & Subqueries", youtubeId: "Tn6-PIqc4UM", duration: "20:00", durationSeconds: 1200, order: 1 },
          { id: "v34", title: "Aggregation & Window Functions", youtubeId: "Tn6-PIqc4UM", duration: "18:00", durationSeconds: 1080, order: 2 },
        ],
      },
      {
        id: "s15",
        title: "Schema Design",
        order: 2,
        videos: [
          { id: "v35", title: "Normalization", youtubeId: "Tn6-PIqc4UM", duration: "16:00", durationSeconds: 960, order: 1 },
          { id: "v36", title: "Indexing Strategies", youtubeId: "Tn6-PIqc4UM", duration: "22:00", durationSeconds: 1320, order: 2 },
        ],
      },
      {
        id: "s16",
        title: "Performance",
        order: 3,
        videos: [
          { id: "v37", title: "Query Optimization", youtubeId: "Tn6-PIqc4UM", duration: "24:00", durationSeconds: 1440, order: 1 },
          { id: "v38", title: "Transactions & Locking", youtubeId: "Tn6-PIqc4UM", duration: "19:00", durationSeconds: 1140, order: 2 },
        ],
      },
    ],
  },
];
