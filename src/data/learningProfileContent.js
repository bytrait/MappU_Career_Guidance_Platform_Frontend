/**
 * Learning preference content keyed by dimension code + preference band.
 * Higher score = stronger preference for the positive pole.
 */

export const LEARNING_DIMENSIONS = [
  {
    code: "VIS",
    positive: { en: "Visual", mr: "दृश्य" },
    opposite: { en: "Verbal", mr: "शाब्दिक" },
    label: { en: "Visual ↔ Verbal", mr: "दृश्य ↔ शाब्दिक" },
  },
  {
    code: "ACT",
    positive: { en: "Active", mr: "सक्रिय" },
    opposite: { en: "Reflective", mr: "चिंतनशील" },
    label: { en: "Active ↔ Reflective", mr: "सक्रिय ↔ चिंतनशील" },
  },
  {
    code: "STR",
    positive: { en: "Structured", mr: "संरचित" },
    opposite: { en: "Exploratory", mr: "शोधक" },
    label: { en: "Structured ↔ Exploratory", mr: "संरचित ↔ शोधक" },
  },
  {
    code: "PRA",
    positive: { en: "Practical", mr: "व्यावहारिक" },
    opposite: { en: "Conceptual", mr: "संकल्पनात्मक" },
    label: { en: "Practical ↔ Conceptual", mr: "व्यावहारिक ↔ संकल्पनात्मक" },
  },
  {
    code: "COL",
    positive: { en: "Collaborative", mr: "सहयोगी" },
    opposite: { en: "Independent", mr: "स्वतंत्र" },
    label: { en: "Collaborative ↔ Independent", mr: "सहयोगी ↔ स्वतंत्र" },
  },
];

const BANDS = [
  { min: 81, max: 100, key: "strong_pos", badge: (p) => `Strong ${p} Preference` },
  { min: 61, max: 80, key: "med_pos", badge: (p) => `Moderate ${p} Preference` },
  { min: 41, max: 60, key: "balanced", badge: () => "Balanced Preference" },
  { min: 21, max: 40, key: "med_opp", badge: (_, o) => `Moderate ${o} Preference` },
  { min: 0, max: 20, key: "strong_opp", badge: (_, o) => `Strong ${o} Preference` },
];

const CONTENT = {
  VIS: {
    strong_pos: {
      suggest: "You strongly prefer learning through visual information and spatial representations.",
      behavior: "Prefers charts, diagrams, mind maps and visual representations.",
      learning: "Diagrams, demonstrations, flowcharts, videos and visual examples.",
      strength: "Exceptional visual memory and spatial conceptualization.",
      watch: "Avoid relying only on diagrams; practise explaining ideas in words as well.",
      reflection: "How can you convert complex text-heavy concepts into intuitive visual frameworks?",
    },
    med_pos: {
      suggest: "You generally prefer visual information when learning, while also being comfortable with verbal explanations.",
      behavior: "Benefits from visual summaries alongside clear written materials.",
      learning: "Visual examples, illustrations and structured outlines.",
      strength: "Adaptive visual processing supported by strong verbal comprehension.",
      watch: "Make sure visual examples are supported by accurate verbal or written explanations.",
      reflection: "What combination of diagrams and text helps you retain new material fastest?",
    },
    balanced: {
      suggest: "You show a balanced preference between visual and verbal ways of learning.",
      behavior: "Comfortable switching between visual media and verbal explanations.",
      learning: "Multi-modal learning combining diagrams, reading, listening and discussions.",
      strength: "Flexible cognitive processing adaptable to any instructional format.",
      watch: "Don't keep changing learning methods unnecessarily; choose the approach that best fits the task.",
      reflection: "How do you decide when a diagram is better than a written explanation?",
    },
    med_opp: {
      suggest: "You generally prefer words and explanations when learning, while still being able to use visual information.",
      behavior: "Prefers reading, structured explanations and guided discussions.",
      learning: "Written notes, lectures, text summaries and explanatory dialogue.",
      strength: "Strong verbal synthesis and analytical reading comprehension.",
      watch: "Don't avoid diagrams; practise interpreting charts, models and visual explanations.",
      reflection: "How can sketching a quick diagram clarify complex written arguments?",
    },
    strong_opp: {
      suggest: "You strongly prefer learning through words, structured explanations and deep discussions.",
      behavior: "Excels with comprehensive text, auditory lectures and debate.",
      learning: "Textbooks, structured podcasts, lectures and self-verbalization.",
      strength: "Exceptional verbal retention, articulating ideas, and conceptual debate.",
      watch: "Don't rely only on words; build confidence with diagrams, charts and models.",
      reflection: "How can you use teaching or explaining concepts aloud to master difficult topics?",
    },
  },
  ACT: {
    strong_pos: {
      suggest: "You strongly prefer learning by doing, practising and experimenting directly.",
      behavior: "Dives quickly into exercises, simulations and interactive problem-solving.",
      learning: "Hands-on projects, interactive labs, trial-and-error and real practice.",
      strength: "Dynamic agility, rapid prototyping, and experiential mastery.",
      watch: "Don't rush into doing without understanding the underlying concept.",
      reflection: "How can you ensure you pause and grasp the core theory before jumping into execution?",
    },
    med_pos: {
      suggest: "You generally prefer to learn through practice and practical application.",
      behavior: "Learns best when applying concepts soon after introduction.",
      learning: "Guided exercises, applied problem sets, and practical examples.",
      strength: "Practical application and quick translation of concepts into action.",
      watch: "Balance practice with enough reflection to understand why an approach works.",
      reflection: "What is your process for reviewing what went well after completing a practical task?",
    },
    balanced: {
      suggest: "You show a balanced preference between active practice and reflective thinking.",
      behavior: "Blends hands-on trial with thoughtful pause and analysis.",
      learning: "Action followed by reflection, simulations with debrief sessions.",
      strength: "Balanced execution supported by critical reflection.",
      watch: "Match action and reflection to the task rather than assuming one approach always works.",
      reflection: "When does a project need immediate action versus careful advance planning?",
    },
    med_opp: {
      suggest: "You generally prefer to think through information before applying it.",
      behavior: "Takes time to organise thoughts and understand frameworks first.",
      learning: "Structured contemplation, case analysis, and deliberate planning.",
      strength: "Thorough analytical planning and low-error execution.",
      watch: "Don't let planning delay practice; set a point at which you move from thinking to doing.",
      reflection: "What timeline helps you transition smoothly from planning into execution?",
    },
    strong_opp: {
      suggest: "You strongly prefer thinking, analysing and reflecting deeply before taking action.",
      behavior: "Processes all variables internally before attempting a solution.",
      learning: "Deep independent study, self-paced analysis, and reflective synthesis.",
      strength: "Deep conceptual rigor, critical analysis, and strategic foresight.",
      watch: "Watch out for over-analysis; practise taking action within reasonable time limits.",
      reflection: "How can taking small imperfect steps help you test your theories faster?",
    },
  },
  STR: {
    strong_pos: {
      suggest: "You strongly prefer clear structure, sequence and guidance when learning.",
      behavior: "Thrives with step-by-step instructions, checklists and explicit goals.",
      learning: "Organised modules, clear rubrics, milestone plans and study guides.",
      strength: "Exceptional methodological discipline, organization, and consistency.",
      watch: "Avoid becoming overly dependent on instructions when faced with an open-ended problem.",
      reflection: "How can you practice solving problems when no step-by-step guide is provided?",
    },
    med_pos: {
      suggest: "You generally prefer organised learning with clear guidance and logical sequence.",
      behavior: "Follows defined objectives while adapting to slight changes in plan.",
      learning: "Structured syllabus, sequential lessons, and guided examples.",
      strength: "Reliable project execution and structured study habits.",
      watch: "Practise solving some problems without a predefined method.",
      reflection: "What steps can you take to build confidence in unstructured scenarios?",
    },
    balanced: {
      suggest: "You show a balanced preference between structured guidance and open exploration.",
      behavior: "Comfortable with both methodical workflows and spontaneous problem-solving.",
      learning: "Flexible study paths that combine core frameworks with self-directed inquiry.",
      strength: "Adaptive versatility across both structured and open-ended projects.",
      watch: "Be deliberate about when you need structure and when exploration is more useful.",
      reflection: "How do you know when it is time to stick to the plan versus explore new ideas?",
    },
    med_opp: {
      suggest: "You generally prefer discovering approaches and experimenting rather than following fixed routines.",
      behavior: "Enjoys open-ended tasks and discovering personalized solutions.",
      learning: "Exploratory research, sandbox environments, and creative inquiry.",
      strength: "Creative curiosity and innovative problem-solving.",
      watch: "Avoid exploring indefinitely; use goals and deadlines to keep experimentation productive.",
      reflection: "What milestones can you set to keep your creative exploration focused on the goal?",
    },
    strong_opp: {
      suggest: "You strongly prefer discovering, experimenting and finding your own novel approach.",
      behavior: "Drives independent exploration; prefers finding original pathways.",
      learning: "Unconstrained projects, creative problem solving, and hypothesis testing.",
      strength: "Breakthrough innovation, lateral thinking, and inventive resourcefulness.",
      watch: "Watch out for losing focus or leaving tasks unfinished because of too much exploration.",
      reflection: "How can establishing a clear definition of 'done' help you finish exploratory projects?",
    },
  },
  PRA: {
    strong_pos: {
      suggest: "You strongly prefer learning through real-world examples, applications and practical tasks.",
      behavior: "Quickly grasps concepts when connected to immediate tangible utility.",
      learning: "Case studies, practical workshops, real-world data and applications.",
      strength: "Grounded pragmatic problem-solving and tangible outcome orientation.",
      watch: "Don't dismiss theory simply because its practical use is not immediately obvious.",
      reflection: "How can understanding fundamental principles make your practical work even more effective?",
    },
    med_pos: {
      suggest: "You generally prefer to connect learning with real-world applications and use-cases.",
      behavior: "Finds concepts more meaningful when illustrated with concrete examples.",
      learning: "Applied examples, interactive simulations, and contextual exercises.",
      strength: "High contextual comprehension and practical relevance.",
      watch: "Spend enough time understanding principles rather than only memorising applications.",
      reflection: "What real-world example best illustrates the concepts you are currently studying?",
    },
    balanced: {
      suggest: "You show a balanced preference between practical application and conceptual understanding.",
      behavior: "Equally values theoretical foundation and real-world implementation.",
      learning: "Balanced curriculum combining deep theory with hands-on labs.",
      strength: "Holistic comprehension bridging abstract concepts and practical execution.",
      watch: "Keep both the 'why' and the 'how' in view when learning.",
      reflection: "How does knowing the theory behind a process help you troubleshoot when things go wrong?",
    },
    med_opp: {
      suggest: "You generally prefer understanding principles and ideas before focusing on application.",
      behavior: "Enjoys exploring why systems work and mapping conceptual connections.",
      learning: "Conceptual models, theoretical proofs, and systematic principles.",
      strength: "Deep abstract thinking, systems analysis, and conceptual coherence.",
      watch: "Don't stay at the theory level; practise applying concepts to unfamiliar situations.",
      reflection: "How can applying a theoretical idea to a physical task solidify your understanding?",
    },
    strong_opp: {
      suggest: "You strongly prefer understanding theories, foundational principles and abstract ideas.",
      behavior: "Fascinated by the underlying architecture and theoretical elegance of concepts.",
      learning: "Foundational theory, philosophical analysis, and abstract modelling.",
      strength: "Exceptional abstract conceptualization and high-level theoretical synthesis.",
      watch: "Watch out for becoming too theoretical; deliberately practise turning ideas into usable skills.",
      reflection: "What is one practical project where you can test out your theoretical models?",
    },
  },
  COL: {
    strong_pos: {
      suggest: "You strongly prefer learning through discussion, teamwork and collective exchange of ideas.",
      behavior: "Thrives in study groups, interactive seminars and collaborative brainstorming.",
      learning: "Group projects, peer mentoring, study circles and team retrospectives.",
      strength: "Collaborative synergy, communication agility, and collective intelligence.",
      watch: "Don't rely entirely on group discussion; build the ability to consolidate learning independently.",
      reflection: "How can you set aside quiet time to consolidate everything you learned in group study?",
    },
    med_pos: {
      suggest: "You generally prefer learning with others while remaining comfortable working independently.",
      behavior: "Values team feedback and dialogue while doing focused prep work.",
      learning: "Interactive discussion, peer feedback, and collaborative problem-solving.",
      strength: "Cooperative teamwork and balanced individual accountability.",
      watch: "Make time for independent consolidation after group learning.",
      reflection: "What balance between group brainstorming and solo review works best for you?",
    },
    balanced: {
      suggest: "You show a balanced preference between collaborative and independent learning.",
      behavior: "Adapts easily between solo concentration and collaborative team sprints.",
      learning: "Hybrid workflows: independent research paired with group discussions.",
      strength: "Versatile social adaptability and self-directed productivity.",
      watch: "Avoid choosing group or solo work by habit; use the mode that best suits the task.",
      reflection: "How do you decide when to seek group input versus working through a problem alone?",
    },
    med_opp: {
      suggest: "You generally prefer to work through ideas on your own before involving others.",
      behavior: "Focuses best in quiet environments; forms personal understanding first.",
      learning: "Self-paced modules, independent research, and individual study.",
      strength: "Deep individual concentration and autonomous problem-solving.",
      watch: "Don't avoid useful discussion or feedback simply because you prefer working alone.",
      reflection: "What feedback from others has helped refine your independent ideas recently?",
    },
    strong_opp: {
      suggest: "You strongly prefer learning, researching and solving problems independently.",
      behavior: "Highly self-reliant; excels in quiet, uninterrupted deep focus.",
      learning: "Autonomous study, self-paced curricula, and quiet research.",
      strength: "High self-reliance, focused stamina, and deep independent mastery.",
      watch: "Watch out for becoming too isolated; practise communication, teamwork and asking for feedback.",
      reflection: "How can sharing your independent findings with a peer help test your conclusions?",
    },
  },
};

export function getLearningBand(score) {
  const n = Number(score) || 0;
  return BANDS.find((b) => n >= b.min && n <= b.max) || BANDS[BANDS.length - 1];
}

export function getLearningContent(code, score, language = "en") {
  const dim = LEARNING_DIMENSIONS.find((d) => d.code === code);
  const band = getLearningBand(score);
  const positive = dim?.positive?.[language] || dim?.positive?.en || "";
  const opposite = dim?.opposite?.[language] || dim?.opposite?.en || "";

  return {
    badge: band.badge(positive, opposite),
    ...(CONTENT[code]?.[band.key] || CONTENT.VIS.balanced),
  };
}
