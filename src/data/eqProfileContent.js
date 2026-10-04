/**
 * EQ profile content keyed by dimension code + score band.
 * Student-facing labels from ByTrait EQ Assessment Resources.
 */

export const EQ_DIMENSIONS = [
  {
    code: "SAW",
    label: { en: "Understanding Myself", mr: "स्वतःला समजणे" },
    name: "Self-Awareness",
  },
  {
    code: "SR",
    label: { en: "Managing Myself", mr: "स्वतःचे व्यवस्थापन" },
    name: "Self-Regulation",
  },
  {
    code: "EM",
    label: { en: "Understanding Others", mr: "इतरांना समजणे" },
    name: "Empathy",
  },
  {
    code: "SS",
    label: { en: "Working With Others", mr: "इतरांसोबत काम करणे" },
    name: "Social Skills",
  },
];

const BANDS = [
  { min: 81, max: 100, level: "Strong", key: "strong" },
  { min: 61, max: 80, level: "Good", key: "good" },
  { min: 41, max: 60, level: "Developing", key: "developing" },
  { min: 21, max: 40, level: "Emerging", key: "emerging" },
  { min: 0, max: 20, level: "Growth Opportunity", key: "growth" },
];

const CONTENT = {
  SAW: {
    strong: {
      suggest: "You show a strong tendency to recognise what you are feeling, understand your strengths and notice when emotions may influence your decisions.",
      showUp: "Notices mood shifts quickly; identifies emotional triggers in real-time.",
      leverage: "Use reflection as a strength to evaluate decisions after high-stakes experiences.",
      strength: "Deep introspective clarity and intuitive emotional self-monitoring.",
      watch: "Avoid over-analysing yourself; awareness is most useful when it leads to constructive action.",
      reflection: "When did an emotional shift last alter your decision, and how did you navigate it?",
    },
    good: {
      suggest: "You generally have a good understanding of your emotions, strengths and reactions, although this may become less clear in stressful situations.",
      showUp: "Recognises feelings and reasons after taking time to process experiences.",
      leverage: "Build a short reflection habit after challenging situations to identify recurring triggers.",
      strength: "Balanced self-awareness and receptiveness to personal growth feedback.",
      watch: "Knowing how you feel does not automatically decide action; pair awareness with deliberate choices.",
      reflection: "What recurring patterns do you notice in situations that cause you stress or excitement?",
    },
    developing: {
      suggest: "Your responses suggest that self-awareness is developing. You may recognise your feelings in some situations but find it harder in others.",
      showUp: "Understands emotional reactions clearly once given time to step back and reflect.",
      leverage: "Keep a short reflection log noting moments of high confidence and unexpected frustration.",
      strength: "Growing curiosity about internal motivations and personal reaction styles.",
      watch: "Don't judge yourself from a single emotional reaction; look for trends over time.",
      reflection: "What is one emotional trigger you have recently learned to recognise earlier?",
    },
    emerging: {
      suggest: "Recognising and interpreting your own emotions and reactions may sometimes be challenging.",
      showUp: "May occasionally find it tricky to articulate why a certain situation caused frustration.",
      leverage: "After an important event, name the emotion, identify the trigger, and choose a response.",
      strength: "Openness to developing emotional self-understanding through guided reflection.",
      watch: "Avoid fixed conclusions about yourself based on an isolated difficult experience.",
      reflection: "What simple questions can help you pause and identify what you are feeling right now?",
    },
    growth: {
      suggest: "Understanding your emotions, strengths and reactions may currently be an important area for development.",
      showUp: "May feel overwhelmed by emotions before identifying their root causes.",
      leverage: "Start with a simple three-step check: What happened? What did I feel? What did I do?",
      strength: "Opportunity to build self-awareness habits from the ground up.",
      watch: "Emotional awareness is a learnable skill that sharpens with regular practice.",
      reflection: "How can taking two minutes to write down your thoughts help clarify complex feelings?",
    },
  },
  SR: {
    strong: {
      suggest: "You show a strong tendency to manage your emotional reactions and stay focused when situations become difficult.",
      showUp: "Pauses before reacting; recovers smoothly from setbacks and maintains focus.",
      leverage: "Use this composure in challenging projects to guide team members through high pressure.",
      strength: "Calm composure under stress and goal-oriented emotional resilience.",
      watch: "Self-control does not mean suppressing emotions; communicate feelings constructively.",
      reflection: "How do you balance maintaining composure with expressing genuine concerns?",
    },
    good: {
      suggest: "You generally manage your reactions effectively, although stress or frustration may sometimes make this harder.",
      showUp: "Usually stays focused and recovers from setbacks depending on the pressure level.",
      leverage: "Break difficult tasks into smaller milestones and use structured pauses before responding.",
      strength: "Adaptable emotional regulation and steady perseverance through daily challenges.",
      watch: "Notice when pressure builds gradually; managing stress early is much easier.",
      reflection: "What is your most reliable technique for resetting focus when tension rises?",
    },
    developing: {
      suggest: "You can manage your emotions in some situations but may find it harder when pressure or frustration increases.",
      showUp: "Ability to stay calm varies depending on the familiarity and stakes of the situation.",
      leverage: "Practise a pause-and-plan routine: stop, assess what is happening, and choose the next action.",
      strength: "Developing awareness of self-regulation techniques and response control.",
      watch: "The goal is not to eliminate emotions, but to recover and respond constructively.",
      reflection: "What is one trigger where a 10-second pause would prevent a hasty reaction?",
    },
    emerging: {
      suggest: "Managing emotions and reactions under pressure may currently be an area for development.",
      showUp: "May react quickly when frustrated or find it tricky to refocus after an unexpected setback.",
      leverage: "Practise delaying reactions by taking deep breaths and breaking large goals into bite-sized steps.",
      strength: "Receptive to structured frameworks for managing stress and task pacing.",
      watch: "Don't judge yourself for emotional reactions; focus on practising a different response next time.",
      reflection: "How can breaking a stressful problem into smaller steps help you stay calm?",
    },
    growth: {
      suggest: "Managing reactions, frustration or motivation may currently require deliberate practice.",
      showUp: "May find it challenging to maintain focus or continue working when obstacles arise.",
      leverage: "Adopt a simple pause habit: step back, breathe, and name one constructive next action.",
      strength: "Potential to transform frustration into focus through disciplined daily routines.",
      watch: "Emotional regulation is like a muscle that grows stronger with every deliberate pause.",
      reflection: "What positive reminder can you give yourself when things don't go according to plan?",
    },
  },
  EM: {
    strong: {
      suggest: "You show a strong tendency to notice other people's feelings and consider perspectives different from your own.",
      showUp: "Attentive to subtle social cues; naturally considers situations from others' viewpoints.",
      leverage: "Listen actively, ask open-ended questions, and facilitate inclusive team discussions.",
      strength: "Exceptional empathetic resonance and intuitive interpersonal sensitivity.",
      watch: "Maintain healthy boundaries so you do not carry everyone else's emotional burdens.",
      reflection: "How can you protect your own emotional energy while continuing to support others?",
    },
    good: {
      suggest: "You generally understand other people's perspectives and emotions, although this may vary depending on the situation.",
      showUp: "Listens well and considers others' feelings, occasionally needing clarification on subtle cues.",
      leverage: "Practise active listening: let others finish, summarize what you heard, then ask thoughtful questions.",
      strength: "Thoughtful perspective-taking and warm, collaborative communication.",
      watch: "Avoid assuming you already know what someone feels; verify by asking openly.",
      reflection: "What question helps you understand someone whose opinion is completely different from yours?",
    },
    developing: {
      suggest: "Your ability to understand other people's perspectives appears to be developing steadily.",
      showUp: "Understands peers easily in familiar environments, while needing more observation in new groups.",
      leverage: "Ask yourself: 'What might this person be seeing that I am not?' before drawing conclusions.",
      strength: "Growing awareness of social dynamics and diverse working styles.",
      watch: "Remember that different individuals can experience the same situation in entirely different ways.",
      reflection: "How does pausing to consider someone's background change your response to their actions?",
    },
    emerging: {
      suggest: "Recognising or interpreting other people's feelings and perspectives may sometimes be challenging.",
      showUp: "Naturally focuses on objective tasks and logic rather than emotional undertones.",
      leverage: "Slow down during group conversations, ask clarifying questions, and observe body language.",
      strength: "Direct and task-focused communication that benefits from added interpersonal warmth.",
      watch: "A different reaction from someone does not mean they are being unreasonable.",
      reflection: "What is one sign you can look for to gauge if a teammate needs encouragement?",
    },
    growth: {
      suggest: "Understanding other people's emotional perspectives may currently be an area for development.",
      showUp: "May find it difficult to identify how others feel or why they react in certain ways.",
      leverage: "Practise asking: 'How do you see this?' before sharing your own perspective in discussions.",
      strength: "Clear, straightforward communication style ready to incorporate empathetic listening.",
      watch: "Empathy is a learnable skill that develops through curiosity and attentive listening.",
      reflection: "How can simply asking someone about their day build stronger connection?",
    },
  },
  SS: {
    strong: {
      suggest: "You show a strong tendency to communicate, cooperate and handle differences constructively.",
      showUp: "Articulates ideas clearly; navigates team dynamics and resolves differences smoothly.",
      leverage: "Take initiative in leading collaborative projects and mentoring peers through challenges.",
      strength: "Natural relationship building, collaborative leadership, and diplomatic communication.",
      watch: "Ensure quieter team members have ample time and encouragement to contribute their ideas.",
      reflection: "How can you use your social confidence to amplify the voices of quieter teammates?",
    },
    good: {
      suggest: "You are generally comfortable working with others, although some situations may feel easier than others.",
      showUp: "Participates actively in familiar groups; adapts communication style across team settings.",
      leverage: "Engage in presentations, collaborative workshops, and constructive peer review sessions.",
      strength: "Reliable team collaboration and supportive, constructive interpersonal communication.",
      watch: "Don't avoid difficult or awkward conversations when constructive feedback is needed.",
      reflection: "What approach helps you address disagreements with confidence and mutual respect?",
    },
    developing: {
      suggest: "You appear comfortable with some forms of interaction but may prefer certain people or situations.",
      showUp: "Communicates effectively in small, familiar teams; takes more time to open up in large groups.",
      leverage: "Practise contributing one key point or question in every team discussion or class session.",
      strength: "Focused and intentional interaction style with close peers and project partners.",
      watch: "Focus on clarity and authenticity rather than comparing your communication style to others.",
      reflection: "What low-pressure environment helps you share your best ideas most confidently?",
    },
    emerging: {
      suggest: "Communication, collaboration or handling disagreements may sometimes feel challenging.",
      showUp: "Prefers working independently and may hesitate before speaking up in group settings.",
      leverage: "Start with low-pressure interactions: pair projects, one-on-one chats, or written contributions.",
      strength: "Independent focus and thoughtful deliberation before sharing conclusions.",
      watch: "Being thoughtful and quieter is an asset; pair it with clear and timely communication.",
      reflection: "What is one communication goal you can set for your next group project?",
    },
    growth: {
      suggest: "Interacting, communicating or managing group situations may currently require extra effort.",
      showUp: "May feel reserved or find it challenging to express complex ideas spontaneously in teams.",
      leverage: "Prepare talking points in advance and practise sharing one idea in a supportive group setting.",
      strength: "Strong potential for deep individual work with growing collaborative reach.",
      watch: "Social confidence builds steadily through repeated, small positive interactions.",
      reflection: "How can preparing your key points beforehand boost your confidence in meetings?",
    },
  },
};

export function getEqBand(score) {
  const n = Number(score) || 0;
  return BANDS.find((b) => n >= b.min && n <= b.max) || BANDS[BANDS.length - 1];
}

export function getEqContent(code, score) {
  const band = getEqBand(score);
  return {
    level: band.level,
    ...(CONTENT[code]?.[band.key] || CONTENT.SAW.developing),
  };
}

