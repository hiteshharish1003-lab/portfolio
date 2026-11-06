export const profile = {
  name: "Hitesh H",
  tagline: "Engineering software that's smart, scalable and secure.",
  location: "Bengaluru, India",
  status: "Open to internships & full-time roles",
  email: "hitesh.harish1003@gmail.com",
  linkedin: "https://www.linkedin.com/in/hitesh-harish-474b82339/",
  github: "https://github.com/hiteshharish1003-lab",
  resume: "/resume.pdf",
  photo: "/images/profile.jpg",
  photo2: "/images/about.jpg",
  bio: "I'm a passionate Computer Science student with a strong interest in software development, Artificial Intelligence, and building practical solutions to real-world problems. I enjoy exploring new technologies, developing full-stack applications, and working on projects involving Machine Learning, Deep Learning, and intelligent systems. I'm always eager to learn, experiment, and turn ideas into meaningful products. I believe in continuous growth, creative problem-solving, and building technology that makes a difference.",
  interests: ["Sports", "Gaming", "Bikes & Cars", "Music", "Movies & TV"],
};

export const education = {
  school: "Global Academy of Technology",
  degree: "B.E. in Computer Science",
  year: "Expected 2027",
  cgpa: "8.83",
};

export const projects = [
  {
    n: "01",
    title: "Hybrid Liver Tumor Detection Framework",
    years: "2025 – 2026",
    type: "Team project",
    role: "Full-stack & AI framework",
    image: "/images/projects/liver-1.jpg",
    images: [
      "/images/projects/liver-1.jpg",
      "/images/projects/liver-2.jpg",
      "/images/projects/liver-3.jpg",
      "/images/projects/liver-4.jpg",
      "/images/projects/liver-5.jpg",
      "/images/projects/liver-6.jpg",
    ],
    stack: ["Python", "PyTorch", "ConvNeXt", "U-Net", "XGBoost"],
    bullets: [
      "Hybrid diagnostic framework using 2.5D ConvNeXt-Tiny and U-Net for liver tumor detection and segmentation from CT scans.",
      "Clinical parameter analysis with XGBoost to strengthen detection and diagnostic assessment.",
      "Tumor localization through bounding boxes and segmented tumor regions generated from CT images.",
      "Grad-CAM heatmaps that visually explain the regions driving each prediction.",
    ],
    github: "",
  },
  {
    n: "02",
    title: "MediAssist AI",
    years: "2025 – 2026",
    type: "Solo project",
    role: "Designed & built end-to-end",
    image: "/images/projects/mediassist-1.jpg",
    images: [
      "/images/projects/mediassist-1.jpg",
      "/images/projects/mediassist-2.jpg",
      "/images/projects/mediassist-3.jpg",
      "/images/projects/mediassist-4.jpg",
    ],
    stack: ["Python", "FastAPI", "React", "Tesseract OCR", "NLP"],
    bullets: [
      "Full-stack healthcare app that extracts and organizes information from medical prescriptions and documents using OCR and NLP.",
      "Tesseract OCR with image preprocessing to pull out patient details, medications, doctor information and prescription data.",
      "FastAPI backend with REST APIs for document processing, structured extraction, summaries and healthcare insights.",
      "React dashboard and chatbot interface presenting extracted data, summaries and interactive insights.",
    ],
    github: "https://github.com/hiteshharish1003-lab/mediassit-ai",
  },
  {
    n: "03",
    title: "REAGENT: Verified Document & Research Assistant",
    years: "2026",
    type: "Team project",
    role: "Full-stack & AI framework",
    image: "/images/projects/reagent-1.jpg",
    images: [
      "/images/projects/reagent-1.jpg",
      "/images/projects/reagent-2.jpg",
      "/images/projects/reagent-3.jpg",
      "/images/projects/reagent-4.jpg",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "SQLite FTS5", "LLM APIs"],
    bullets: [
      "Multi-agent research and document Q&A system with two engines: Archive (answers from uploaded PDF/TXT/CSV) and Inquiry (plan → research → analyse → write → verify → correct).",
      "RAG on SQLite FTS5 with BM25 ranking where every answer sentence cites a source passage, with no embedding model or vector DB.",
      "Claim-level verification layer that removes or rewrites unsupported claims. One evaluation run raised faithfulness from 0.92 to 1.0.",
      "FastAPI backend with streaming and automatic fallback across Gemini, Groq and Anthropic, plus an evaluation harness and a React + TypeScript frontend with citations.",
    ],
    github: "",
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "Java", "SQL", "HTML/CSS"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind"] },
  { group: "Backend", items: ["FastAPI", "Node.js", "Express", "SQLite"] },
  {
    group: "AI / ML",
    items: ["PyTorch", "scikit-learn", "XGBoost", "Transformers", "pandas", "NumPy", "Matplotlib", "ConvNeXt", "U-Net", "Grad-CAM"],
  },
  { group: "Tools & DevOps", items: ["Git", "Docker", "VS Code", "Eclipse"] },
  { group: "Currently exploring", items: ["Cybersecurity"], accent: true },
];

export const activities = [
  {
    when: "1 year",
    title: "Web Developer",
    org: "ACM GAT Student Chapter",
    text: "Served as a member of the ACM student chapter at Global Academy of Technology as a web developer.",
  },
  {
    when: "Attended",
    title: "ROCS: Research Outreach and Collaboration Series",
    org: "BMS College of Engineering (BMSCE)",
    text: "Attended the research outreach and collaboration conference hosted by BMSCE.",
  },
  {
    when: "Competed",
    title: "Prompt Battle",
    org: "ACM, Global Academy of Technology",
    text: "Competed in the Prompt Battle event hosted by ACM at GAT, Bengaluru.",
  },
  {
    when: "Sep 2023",
    title: "Ethical Hacking & Cyber Security Workshop",
    org: "NIC & Global Academy of Technology, Bengaluru",
    text: "Participated in a hands-on workshop that sparked my interest in cybersecurity.",
  },
];

export const certifications = [
  {
    file: "ibm-big-data-foundations",
    title: "Big Data Foundations",
    issuer: "IBM SkillsBuild",
    date: "Oct 2026",
    note: "Completion certificate.",
  },
  {
    file: "infosys-ml-python",
    title: "TechA Machine Learning with Python",
    issuer: "Infosys Springboard",
    date: "May 2026",
    note: "Certificate of Achievement. Verifiable via the QR code on the certificate.",
  },
  {
    file: "mathworks-deep-learning",
    title: "Deep Learning Techniques in MATLAB for Image Applications",
    issuer: "MathWorks Training Services",
    date: "Apr 2026",
    note: "CNNs, tuning training options, regression and object detection with deep learning.",
  },
  {
    file: "mathworks-image-segmentation",
    title: "Image Segmentation and Analysis in MATLAB",
    issuer: "MathWorks Training Services",
    date: "Apr 2026",
    note: "Color spaces, filtering, semi-automated segmentation, postprocessing and binary image analysis.",
  },
];
