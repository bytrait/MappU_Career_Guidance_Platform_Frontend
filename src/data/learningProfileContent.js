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
      suggest: "You strongly prefer learning through visual information.",
      best: "You are likely to look for diagrams, demonstrations, charts, videos and visual examples when learning something new.",
      watch: "Avoid relying only on diagrams; practise explaining ideas in words as well.",
    },
    med_pos: {
      suggest: "You generally prefer visual information when learning, while also being comfortable with verbal explanations.",
      best: "You often benefit from diagrams, examples, charts or demonstrations alongside explanations.",
      watch: "Make sure visual examples are supported by accurate verbal or written explanations.",
    },
    balanced: {
      suggest: "You show a balanced preference between visual and verbal ways of learning.",
      best: "You appear comfortable learning through diagrams as well as reading, listening and discussion.",
      watch: "Don't keep changing learning methods unnecessarily; choose the approach that best fits the task.",
    },
    med_opp: {
      suggest: "You generally prefer words and explanations when learning, while still being able to use visual information.",
      best: "You may prefer reading, listening, discussion and clear verbal explanations.",
      watch: "Don't avoid diagrams; practise interpreting charts, models and visual explanations.",
    },
    strong_opp: {
      suggest: "You strongly prefer learning through words, explanations and discussion.",
      best: "You are likely to seek written explanations, conversations and opportunities to explain ideas yourself.",
      watch: "Don't rely only on words; build confidence with diagrams, charts and models.",
    },
  },
  ACT: {
    strong_pos: {
      suggest: "You strongly prefer learning by doing, practising and experimenting.",
      best: "You are likely to engage quickly with exercises, projects, simulations and hands-on activities.",
      watch: "Don't rush into doing without understanding the underlying concept.",
    },
    med_pos: {
      suggest: "You generally prefer to learn through practice and application.",
      best: "You often benefit from trying examples and applying concepts soon after learning them.",
      watch: "Balance practice with enough reflection to understand why an approach works.",
    },
    balanced: {
      suggest: "You show a balanced preference between active practice and reflective thinking.",
      best: "You appear comfortable learning by trying things as well as taking time to think.",
      watch: "Match action and reflection to the task rather than assuming one approach always works.",
    },
    med_opp: {
      suggest: "You generally prefer to think through information before applying it.",
      best: "You may benefit from time to analyse and organise before attempting a task.",
      watch: "Don't let planning delay practice; set a point at which you move from thinking to doing.",
    },
    strong_opp: {
      suggest: "You strongly prefer thinking, analysing and reflecting before taking action.",
      best: "You are likely to spend time processing information before attempting a task.",
      watch: "Watch out for over-analysis; practise taking action within reasonable time limits.",
    },
  },
  STR: {
    strong_pos: {
      suggest: "You strongly prefer clear structure, sequence and guidance when learning.",
      best: "You are likely to work comfortably with step-by-step instructions, checklists and clearly defined goals.",
      watch: "Avoid becoming overly dependent on instructions when faced with a new problem.",
    },
    med_pos: {
      suggest: "You generally prefer organised learning with clear guidance.",
      best: "You often benefit from defined objectives, examples and a logical sequence of activities.",
      watch: "Practise solving some problems without a predefined method.",
    },
    balanced: {
      suggest: "You show a balanced preference between structured guidance and exploration.",
      best: "You appear comfortable following a clear method when useful and exploring alternatives when appropriate.",
      watch: "Be deliberate about when you need structure and when exploration is more useful.",
    },
    med_opp: {
      suggest: "You generally prefer discovering approaches and experimenting rather than following a fixed sequence.",
      best: "You may enjoy open-ended problems and opportunities to find your own solution.",
      watch: "Avoid exploring indefinitely; use goals and deadlines to keep experimentation productive.",
    },
    strong_opp: {
      suggest: "You strongly prefer discovering, experimenting and finding your own approach.",
      best: "You are likely to enjoy open-ended tasks where there is more than one possible path.",
      watch: "Watch out for losing focus or leaving tasks unfinished because of too much exploration.",
    },
  },
  PRA: {
    strong_pos: {
      suggest: "You strongly prefer learning through real-world examples, applications and practical tasks.",
      best: "You are likely to understand concepts more easily when you can see what they are used for.",
      watch: "Don't dismiss theory simply because its practical use is not immediately obvious.",
    },
    med_pos: {
      suggest: "You generally prefer to connect learning with real-world applications.",
      best: "Examples, applications and practical exercises are likely to make new concepts more meaningful.",
      watch: "Spend enough time understanding principles rather than only memorising applications.",
    },
    balanced: {
      suggest: "You show a balanced preference between practical application and conceptual understanding.",
      best: "You appear comfortable learning through real examples as well as exploring theories.",
      watch: "Keep both the 'why' and the 'how' in view when learning.",
    },
    med_opp: {
      suggest: "You generally prefer understanding principles and ideas before focusing on application.",
      best: "You may enjoy exploring why something works and how ideas connect.",
      watch: "Don't stay at the theory level; practise applying concepts to unfamiliar situations.",
    },
    strong_opp: {
      suggest: "You strongly prefer understanding theories, principles and underlying ideas.",
      best: "You are likely to be interested in why things work and how concepts connect.",
      watch: "Watch out for becoming too theoretical; deliberately practise turning ideas into usable skills.",
    },
  },
  COL: {
    strong_pos: {
      suggest: "You strongly prefer learning through discussion, teamwork and exchange of ideas.",
      best: "You are likely to benefit from group discussions, peer learning and collaborative projects.",
      watch: "Don't rely entirely on group discussion; build the ability to consolidate learning independently.",
    },
    med_pos: {
      suggest: "You generally prefer learning with other people while remaining comfortable working independently when needed.",
      best: "You may benefit from discussion, peer feedback and collaborative activities.",
      watch: "Make time for independent consolidation after group learning.",
    },
    balanced: {
      suggest: "You show a balanced preference between collaborative and independent learning.",
      best: "You appear comfortable working with others as well as concentrating independently.",
      watch: "Avoid choosing group or solo work by habit; use the mode that best suits the task.",
    },
    med_opp: {
      suggest: "You generally prefer to work through ideas on your own before involving others.",
      best: "You may concentrate better independently and prefer to form your own understanding first.",
      watch: "Don't avoid useful discussion or feedback simply because you prefer working alone.",
    },
    strong_opp: {
      suggest: "You strongly prefer learning and solving problems independently.",
      best: "You are likely to value quiet study, self-paced learning and time to develop your own understanding.",
      watch: "Watch out for becoming too isolated; practise communication, teamwork and asking for feedback.",
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
