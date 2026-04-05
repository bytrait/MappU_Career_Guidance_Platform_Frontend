// src/data/demoQuestions.js

export const OCEAN = [
  {
    code: "O",
    name: "Openness",
    questions: [
      {
        order: 1,
        reverse: false,
        translations: [
          { language: "en", text: "I enjoy trying new and creative ideas." },
          { language: "mr", text: "मला नवीन आणि सर्जनशील कल्पना आजमावायला आवडतात." }
        ]
      },
      {
        order: 2,
        reverse: true,
        translations: [
          { language: "en", text: "I avoid tasks that require imagination." },
          { language: "mr", text: "कल्पनाशक्ती लागणारी कामे मी टाळतो." }
        ]
      }
    ]
  },

  {
    code: "C",
    name: "Conscientiousness",
    questions: [
      {
        order: 3,
        reverse: false,
        translations: [
          { language: "en", text: "I always complete my work on time." },
          { language: "mr", text: "मी माझे काम नेहमी वेळेत पूर्ण करतो." }
        ]
      },
      {
        order: 4,
        reverse: true,
        translations: [
          { language: "en", text: "I find it difficult to stay organized." },
          { language: "mr", text: "व्यवस्थित राहणे मला कठीण जाते." }
        ]
      }
    ]
  },

  {
    code: "E",
    name: "Extraversion",
    questions: [
      {
        order: 5,
        reverse: false,
        translations: [
          { language: "en", text: "I enjoy talking to new people." },
          { language: "mr", text: "मला नवीन लोकांशी बोलायला आवडते." }
        ]
      },
      {
        order: 6,
        reverse: true,
        translations: [
          { language: "en", text: "I prefer to stay quiet in groups." },
          { language: "mr", text: "समूहात मी शांत राहणे पसंत करतो." }
        ]
      }
    ]
  },

  {
    code: "A",
    name: "Agreeableness",
    questions: [
      {
        order: 7,
        reverse: false,
        translations: [
          { language: "en", text: "I like helping others when they need support." },
          { language: "mr", text: "इतरांना मदत करायला मला आवडते." }
        ]
      },
      {
        order: 8,
        reverse: true,
        translations: [
          { language: "en", text: "I easily get irritated with people." },
          { language: "mr", text: "मी लोकांवर पटकन चिडतो." }
        ]
      }
    ]
  },

  {
    code: "N",
    name: "Neuroticism",
    questions: [
      {
        order: 9,
        reverse: false,
        translations: [
          { language: "en", text: "I often worry about small things." },
          { language: "mr", text: "मी छोट्या गोष्टींवरही अनेकदा काळजी करतो." }
        ]
      },
      {
        order: 10,
        reverse: true,
        translations: [
          { language: "en", text: "I remain calm even under pressure." },
          { language: "mr", text: "दबावाखालीही मी शांत राहतो." }
        ]
      }
    ]
  }
];
export const RIASEC = [
  {
    code: "R",
    name: "Realistic",
    questions: [
      {
        order: 1,
        reverse: false,
        translations: [
          { language: "en", text: "Work with machines or tools." },
          { language: "mr", text: "यंत्रे किंवा साधनांसोबत काम करणे." }
        ]
      }
    ]
  },
  {
    code: "I",
    name: "Investigative",
    questions: [
      {
        order: 2,
        reverse: false,
        translations: [
          { language: "en", text: "Solve science or math problems." },
          { language: "mr", text: "विज्ञान किंवा गणिताच्या समस्या सोडवणे." }
        ]
      }
    ]
  },
  {
    code: "A",
    name: "Artistic",
    questions: [
      {
        order: 3,
        reverse: false,
        translations: [
          { language: "en", text: "Create drawings, stories, or designs." },
          { language: "mr", text: "रेखाटन, कथा किंवा डिझाइन तयार करणे." }
        ]
      }
    ]
  },
  {
    code: "S",
    name: "Social",
    questions: [
      {
        order: 4,
        reverse: false,
        translations: [
          { language: "en", text: "Help people learn or solve problems." },
          { language: "mr", text: "लोकांना शिकायला किंवा समस्या सोडवायला मदत करणे." }
        ]
      }
    ]
  },
  {
    code: "E",
    name: "Enterprising",
    questions: [
      {
        order: 5,
        reverse: false,
        translations: [
          { language: "en", text: "Lead or persuade others." },
          { language: "mr", text: "इतरांचे नेतृत्व करणे किंवा त्यांना पटवणे." }
        ]
      }
    ]
  },
  {
    code: "C",
    name: "Conventional",
    questions: [
      {
        order: 6,
        reverse: false,
        translations: [
          { language: "en", text: "Work with numbers or data." },
          { language: "mr", text: "संख्या किंवा डेटा सोबत काम करणे." }
        ]
      }
    ]
  }
];
export const APTITUDE = [
  {
    code: "LA",
    name: "English Language Aptitude",
    questions: [
      {
        order: 1,
        reverse: false,
        timeLimitSeconds: 60,
        translations: [
          { language: "en", text: "What is a synonym for 'happy'?" },
          { language: "mr", text: "‘Happy’ चा समानार्थी शब्द कोणता?" }
        ],
        options: [
          {
            isCorrect: true,
            translations: [
              { language: "en", text: "Joyful" },
              { language: "mr", text: "आनंदी" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "Sad" },
              { language: "mr", text: "दु:खी" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "Angry" },
              { language: "mr", text: "रागावलेला" }
            ]
          }
        ]
      },
      {
        order: 2,
        reverse: false,
        timeLimitSeconds: 45,
        translations: [
          { language: "en", text: "Choose the correct plural form of 'child'." },
          { language: "mr", text: "'child' चा बऱ्याच प्रमाणातील स्वरूप कोणते?" }
        ],
        options: [
          {
            isCorrect: true,
            translations: [
              { language: "en", text: "Children" },
              { language: "mr", text: "लहान मुले" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "Childs" },
              { language: "mr", text: "चिल्ड्स" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "Childes" },
              { language: "mr", text: "चिल्डेस" }
            ]
          }
        ]
      },
      {
        order: 3,
        reverse: false,
        timeLimitSeconds: 50,
        translations: [
          { language: "en", text: "Select the grammatically correct sentence." },
          { language: "mr", text: "व्याकरणदृष्ट्या योग्य वाक्य निवडा." }
        ],
        options: [
          {
            isCorrect: true,
            translations: [
              { language: "en", text: "She has finished her work." },
              { language: "mr", text: "तिने आपले काम पूर्ण केले आहे." }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "She have finished her work." },
              { language: "mr", text: "तिने आपले काम पूर्ण केले आहेत." }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "She finishing her work." },
              { language: "mr", text: "ती आपले काम पूर्ण करत आहे." }
            ]
          }
        ]
      }
    ]
  },
  {
    code: "QM",
    name: "Quantitative Aptitude",
    questions: [
      {
        order: 4,
        reverse: false,
        timeLimitSeconds: 75,
        translations: [
          { language: "en", text: "What is 12 × 8?" },
          { language: "mr", text: "12 × 8 किती होते?" }
        ],
        options: [
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "86" },
              { language: "mr", text: "86" }
            ]
          },
          {
            isCorrect: true,
            translations: [
              { language: "en", text: "96" },
              { language: "mr", text: "96" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "108" },
              { language: "mr", text: "108" }
            ]
          }
        ]
      },
      {
        order: 5,
        reverse: false,
        timeLimitSeconds: 90,
        translations: [
          { language: "en", text: "If a = 5 and b = 3, what is a^2 + b?" },
          { language: "mr", text: "a = 5 आणि b = 3 असतील तर a^2 + b = काय?" }
        ],
        options: [
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "28" },
              { language: "mr", text: "28" }
            ]
          },
          {
            isCorrect: true,
            translations: [
              { language: "en", text: "28" },
              { language: "mr", text: "28" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "25" },
              { language: "mr", text: "25" }
            ]
          }
        ]
      }
    ]
  },
  {
    code: "LR",
    name: "Logical Reasoning",
    questions: [
      {
        order: 6,
        reverse: false,
        timeLimitSeconds: 60,
        translations: [
          { language: "en", text: "Find the next number in the sequence: 2, 4, 8, 16, ?" },
          { language: "mr", text: "खालील अनुक्रमात पुढचा अंक काय आहे: 2, 4, 8, 16, ?" }
        ],
        options: [
          {
            isCorrect: true,
            translations: [
              { language: "en", text: "32" },
              { language: "mr", text: "32" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "24" },
              { language: "mr", text: "24" }
            ]
          },
          {
            isCorrect: false,
            translations: [
              { language: "en", text: "20" },
              { language: "mr", text: "20" }
            ]
          }
        ]
      }
    ]
  }
];
