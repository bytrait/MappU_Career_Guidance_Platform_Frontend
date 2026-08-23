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
      showUp: "You may be more likely to notice changes in your mood, identify what triggered them and recognise when a feeling is affecting your choices.",
      leverage: "Use reflection as a strength. After important experiences, ask: What happened? What was I feeling? What influenced my response?",
      watch: "Avoid over-analysing yourself. Awareness is most useful when it leads to a constructive action.",
    },
    good: {
      suggest: "You generally have a good understanding of your emotions, strengths and reactions, although this may become less clear in stressful situations.",
      showUp: "You can often recognise what you are feeling and why, but may sometimes understand your reaction only after the situation has passed.",
      leverage: "Build a simple reflection habit after challenging situations and identify recurring triggers or patterns.",
      watch: "Knowing how you feel does not automatically determine how you respond; pair awareness with deliberate action.",
    },
    developing: {
      suggest: "Your responses suggest that self-awareness is developing. You may recognise your feelings in some situations but find it harder in others.",
      showUp: "You may understand your reactions more clearly after taking time to think about an experience.",
      leverage: "Keep a short reflection log and notice situations where you feel confident, stressed, motivated or frustrated.",
      watch: "Don't judge yourself from one emotional reaction. Look for patterns over time.",
    },
    emerging: {
      suggest: "Recognising and interpreting your own emotions and reactions may sometimes be challenging.",
      showUp: "You may occasionally find it difficult to explain why you reacted in a particular way.",
      leverage: "After an important situation, name the emotion, identify the trigger and think about one alternative response.",
      watch: "Don't make fixed conclusions about yourself based on a single situation.",
    },
    growth: {
      suggest: "Understanding your emotions, strengths and reactions may currently be an important area for development.",
      showUp: "You may find it difficult to recognise what you are feeling or how emotions influence your behaviour.",
      leverage: "Start with a simple habit: What happened? What did I feel? What did I do?",
      watch: "This is not a fixed weakness. Self-awareness can improve through reflection and feedback.",
    },
  },
  SR: {
    strong: {
      suggest: "You show a strong tendency to manage your emotional reactions and stay focused when situations become difficult.",
      showUp: "You may be able to pause before reacting, recover from setbacks and continue working toward an important goal.",
      leverage: "Use this strength in challenging projects. Practise helping yourself and others stay calm during difficult situations.",
      watch: "Self-control does not mean suppressing emotions. Recognise and communicate important feelings.",
    },
    good: {
      suggest: "You generally manage your reactions effectively, although stress or frustration may sometimes make this harder.",
      showUp: "You can usually stay focused and recover from setbacks, but your response may depend on the level of pressure.",
      leverage: "Use techniques such as pausing before responding and breaking difficult tasks into smaller steps.",
      watch: "Notice situations where pressure builds gradually; managing stress early is usually easier.",
    },
    developing: {
      suggest: "You can manage your emotions in some situations but may find it harder when pressure or frustration increases.",
      showUp: "Your ability to stay calm and focused may vary depending on the situation.",
      leverage: "Practise a pause-and-plan routine: stop, identify what is happening, choose the next useful action.",
      watch: "The goal is not to eliminate emotions; it is to recover and respond constructively.",
    },
    emerging: {
      suggest: "Managing emotions and reactions under pressure may currently be an area for development.",
      showUp: "You may sometimes react quickly when frustrated or find it difficult to refocus after setbacks.",
      leverage: "Practise delaying your response when upset and break large goals into smaller steps.",
      watch: "Don't judge yourself for emotional reactions; focus on practising a different response next time.",
    },
    growth: {
      suggest: "Managing reactions, frustration or motivation may currently require deliberate practice.",
      showUp: "You may find it difficult to stay calm or continue with a task when something goes wrong.",
      leverage: "Start with one simple habit: when frustrated, pause before responding and identify the next small action.",
      watch: "This is not a fixed trait. Emotional regulation develops through practice and support.",
    },
  },
  EM: {
    strong: {
      suggest: "You show a strong tendency to notice other people's feelings and consider perspectives different from your own.",
      showUp: "You may be attentive to signs that someone is uncomfortable and naturally consider how a situation looks from their point of view.",
      leverage: "Use this strength to listen carefully and ask thoughtful questions. Combine empathy with clear boundaries.",
      watch: "Don't take responsibility for everyone else's emotions.",
    },
    good: {
      suggest: "You generally understand other people's perspectives and emotions, although this may vary depending on the situation.",
      showUp: "You are likely to listen and consider how others may be feeling, but may occasionally miss subtle signals.",
      leverage: "Practise active listening: let the other person finish, summarise what you heard, then ask a question.",
      watch: "Don't assume you always know what someone is feeling; check by asking.",
    },
    developing: {
      suggest: "Your ability to understand other people's perspectives appears to be developing.",
      showUp: "You may understand others well in familiar situations but need more time in unfamiliar ones.",
      leverage: "Ask yourself, 'What might this person be seeing that I am not?' Then listen for evidence.",
      watch: "Different people can respond very differently to the same situation.",
    },
    emerging: {
      suggest: "Recognising or interpreting other people's feelings and perspectives may sometimes be challenging.",
      showUp: "You may focus more naturally on the task or your own viewpoint.",
      leverage: "Slow down during conversations, ask open questions and check that you have understood.",
      watch: "A different reaction does not necessarily mean someone is being unreasonable.",
    },
    growth: {
      suggest: "Understanding other people's emotional perspectives may currently be an area for development.",
      showUp: "You may sometimes find it difficult to recognise how another person feels.",
      leverage: "Practise active listening and ask questions before giving your opinion.",
      watch: "Don't label yourself as lacking empathy. This is a learnable interpersonal skill.",
    },
  },
  SS: {
    strong: {
      suggest: "You show a strong tendency to communicate, cooperate and handle differences constructively.",
      showUp: "You may be comfortable contributing ideas, listening to others and helping resolve disagreements.",
      leverage: "Take responsibility in group projects and practise facilitating discussions.",
      watch: "Strong social skills do not mean always being outgoing; make space for quieter contributors.",
    },
    good: {
      suggest: "You are generally comfortable working with others, although some situations may feel easier than others.",
      showUp: "You can usually participate in discussions but may need more confidence in unfamiliar groups.",
      leverage: "Take opportunities to present, collaborate and practise giving constructive feedback.",
      watch: "Don't avoid difficult conversations simply because they are uncomfortable.",
    },
    developing: {
      suggest: "You appear comfortable with some forms of interaction but may prefer certain people or situations.",
      showUp: "You may communicate effectively in familiar settings but need time in new groups.",
      leverage: "Practise one small skill at a time: asking questions, giving a short presentation, or contributing an idea.",
      watch: "Don't compare your communication style with someone else's; focus on clarity and confidence.",
    },
    emerging: {
      suggest: "Communication, collaboration or handling disagreements may sometimes feel challenging.",
      showUp: "You may find it difficult to start conversations or express your views in groups.",
      leverage: "Start with low-pressure opportunities: a small group, one question in class, or a short presentation.",
      watch: "Being quieter does not mean you cannot communicate well.",
    },
    growth: {
      suggest: "Interacting, communicating or managing group situations may currently require extra effort.",
      showUp: "You may prefer to stay quiet or find it hard to express your ideas clearly in groups.",
      leverage: "Start small: practise introducing yourself, asking a question and expressing one opinion respectfully.",
      watch: "Don't treat this score as a prediction of career success. Social skills improve with practice.",
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
