// src/services/mockCareerService.js
// Demo/mock data to help preview UI without backend

export async function fetchCareerDemo(id = "software-developer") {
  // simulate latency
  await new Promise((r) => setTimeout(r, 200));
  return {
    career: "software developer",
    translations: {
      en: { title: "Software Developer", description: "Build apps, websites, and backend systems." }
    },
    base: {
      category: "Technology",
      riasec: [2.3,8.5,3.1,4.0,9.0,3.2],
      ocean: [7.5,6.8,5.1,6.2,3.4],
      salary_snapshot: { entry: "3–6 LPA", mid: "7–15 LPA", senior: "18–40 LPA" }
    },
    matchScore: 82,
    strengths: ["Investigative", "Logical Reasoning", "Problem Solving", "Openness"],
    highlights: ["High demand in product companies", "Good remote opportunities", "Many low-cost learning paths"],
    aptitude_requirements: { NA: 7, MR: 4, LA: 6, LR: 8, SA: 5 },
    path: {
      name: "AI Default Path",
      steps: [
        { order: 1, type: "overview", title: "Career Overview", content: "<p>A software developer builds digital products. Example content here...</p>" },
        { order: 2, type: "education", title: "Educational Path & Eligibility", content: "<p>12th PCM preferred. Options include B.Tech, BCA, diplomas...</p>" },
        { order: 3, type: "exam", title: "Entrance Exams", content: "<p>JEE / State CET / University exams</p>" },
        { order: 4, type: "college", title: "Top Colleges & Scholarships", content: "<p>IITs, NITs, top private colleges</p>" },
        { order: 5, type: "skills", title: "Skills & Tools Required", content: "<ul><li>Programming (Python, JS)</li><li>Git</li></ul>" },
        { order: 6, type: "growth", title: "Career Growth & Opportunities", content: "<p>Paths: engineer → senior → architect → leader</p>" },
        { order: 7, type: "future_trends", title: "Future Trends & Exposure", content: "<p>AI, cloud, edge computing</p>" },
        { order: 8, type: "motivation", title: "Motivation & Summary", content: "<p>Start small: build projects, internships matter</p>" }
      ]
    },
    recommendations: [
      { title: "Start with Python", desc: "Complete basic Python courses and small projects", cta: "Explore Courses" },
      { title: "Practice Aptitude", desc: "Improve logical/math skills with puzzles", cta: "Aptitude Practice" }
    ],
  };
}

export async function fetchUserProfileDemo() {
  await new Promise((r) => setTimeout(r, 60));
  return {
    topTraits: ["Investigative", "Realistic", "Logical Reasoning"],
    aptitude: { NA: 5, MR: 3, LA: 7, LR: 5, SA: 4 },
    ocean: [7,6,4,6,3]
  };
}
