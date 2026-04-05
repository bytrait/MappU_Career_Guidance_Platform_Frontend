export const demoCareerBaseInfo = {
    C1: {
        id: "C1",
        category: "Technology",
        careerType: "professional",
        title: { en: "Software Engineer", mr: "सॉफ्टवेअर अभियंता" },
        description: {
            en: "Design and develop software applications and digital systems.",
            mr: "सॉफ्टवेअर अॅप्लिकेशन्स आणि डिजिटल सिस्टीम विकसित करण्याचे काम."
        },
        similarity: 96,
        cost: { min: "₹20,000", max: "₹1,50,000" },
        avgSalary: "₹4–12 LPA",
        riasec: { R: 8, I: 24, A: 6, S: 6, E: 12, C: 14 },
        aptitude: { NA: 9, MR: 8, LA: 9, LR: 8, SA: 7 }
    },

    C2: {
        id: "C2",
        category: "Healthcare",
        careerType: "professional",
        title: { en: "Physiotherapist", mr: "फिजिओथेरपिस्ट" },
        description: {
            en: "Help patients recover mobility through exercises and therapy.",
            mr: "रुग्णांचे हालचाल सुधारण्यासाठी व्यायाम आणि थेरपीद्वारे मदत करणे."
        },
        similarity: 92,
        cost: { min: "₹10,000", max: "₹80,000" },
        avgSalary: "₹3–7 LPA",
        riasec: { R: 14, I: 18, A: 6, S: 22, E: 8, C: 10 },
        aptitude: { NA: 7, MR: 6, LA: 7, LR: 6, SA: 9 }
    },

    C3: {
        id: "C3",
        category: "Business & Management",
        careerType: "professional",
        title: { en: "Operations Manager", mr: "ऑपरेशन्स मॅनेजर" },
        description: {
            en: "Manage daily operations, teams, and workflow efficiency.",
            mr: "दैनंदिन कामकाज, टीम आणि कामकाजाची कार्यक्षमता व्यवस्थापित करणे."
        },
        similarity: 94,
        cost: { min: "₹8,000", max: "₹40,000" },
        avgSalary: "₹5–12 LPA",
        riasec: { R: 10, I: 12, A: 6, S: 14, E: 22, C: 10 },
        aptitude: { NA: 7, MR: 7, LA: 8, LR: 8, SA: 8 }
    },

    C4: {
        id: "C4",
        category: "Media & Communication",
        careerType: "professional",
        title: { en: "Digital Media Strategist", mr: "डिजिटल मीडिया स्ट्रॅटेजिस्ट" },
        description: {
            en: "Plan, create, and manage digital content and branding strategies.",
            mr: "डिजिटल कंटेंट व ब्रँडिंग स्ट्रॅटेजी तयार करणे आणि व्यवस्थापित करणे."
        },
        similarity: 91,
        cost: { min: "₹6,000", max: "₹30,000" },
        avgSalary: "₹4–9 LPA",
        riasec: { R: 6, I: 10, A: 16, S: 14, E: 20, C: 10 },
        aptitude: { NA: 7, MR: 6, LA: 8, LR: 7, SA: 9 }
    },

    C5: {
        id: "C5",
        category: "Design & Creativity",
        careerType: "professional",
        title: { en: "UX/UI Designer", mr: "UX/UI डिझायनर" },
        description: {
            en: "Design user-friendly digital experiences and interactive interfaces.",
            mr: "वापरकर्त्यांसाठी सोपी व आकर्षक डिजिटल इंटरफेस आणि अनुभव तयार करणे."
        },
        similarity: 95,
        cost: { min: "₹10,000", max: "₹50,000" },
        avgSalary: "₹3–8 LPA",
        riasec: { R: 6, I: 12, A: 24, S: 10, E: 10, C: 8 },
        aptitude: { NA: 7, MR: 6, LA: 8, LR: 7, SA: 8 }
    },

    // -----------------------
    // VOCATIONAL CAREERS
    // -----------------------

    C6: {
        id: "C6",
        category: "Modern Tech Trade",
        careerType: "vocational",
        title: { en: "Drone Operator", mr: "ड्रोन ऑपरेटर" },
        description: {
            en: "Operate drones for photography, mapping, inspection, and surveying.",
            mr: "फोटोग्राफी, मॅपिंग, तपासणी आणि सर्व्हे साठी ड्रोन चालवणे."
        },
        similarity: 98,
        cost: { min: "₹15,000", max: "₹60,000" },
        avgSalary: "₹2–5 LPA",
        riasec: { R: 20, I: 16, A: 10, S: 6, E: 10, C: 8 },
        aptitude: { NA: 8, MR: 6, LA: 6, LR: 8, SA: 6 }
    },

    C7: {
        id: "C7",
        category: "Construction & Infrastructure",
        careerType: "vocational",
        title: { en: "Electrician", mr: "इलेक्ट्रीशियन" },
        description: {
            en: "Install and repair electrical wiring, circuits, and equipment.",
            mr: "विद्युत वायरिंग, सर्किट आणि उपकरणे बसवणे व दुरुस्त करणे."
        },
        similarity: 97,
        cost: { min: "₹5,000", max: "₹25,000" },
        avgSalary: "₹2–4 LPA",
        riasec: { R: 22, I: 12, A: 6, S: 8, E: 10, C: 10 },
        aptitude: { NA: 8, MR: 7, LA: 6, LR: 7, SA: 6 }
    },

    C8: {
        id: "C8",
        category: "Green Energy",
        careerType: "vocational",
        title: { en: "Solar Panel Technician", mr: "सोलर पॅनेल तंत्रज्ञ" },
        description: {
            en: "Install and maintain solar power systems for homes and businesses.",
            mr: "घर व व्यवसायांसाठी सोलर सिस्टीम बसवणे आणि देखभाल करणे."
        },
        similarity: 93,
        cost: { min: "₹8,000", max: "₹35,000" },
        avgSalary: "₹2–4.5 LPA",
        riasec: { R: 20, I: 14, A: 6, S: 8, E: 10, C: 12 },
        aptitude: { NA: 7, MR: 6, LA: 6, LR: 7, SA: 6 }
    },

    C9: {
        id: "C9",
        category: "Automotive & EV",
        careerType: "vocational",
        title: { en: "EV Service Technician", mr: "ईव्ही सर्व्हिस तंत्रज्ञ" },
        description: {
            en: "Repair and maintain electric vehicles, batteries, and motors.",
            mr: "इलेक्ट्रिक वाहन, बॅटरी आणि मोटर्सची दुरुस्ती व देखभाल करणे."
        },
        similarity: 90,
        cost: { min: "₹6,000", max: "₹30,000" },
        avgSalary: "₹2–4 LPA",
        riasec: { R: 24, I: 14, A: 6, S: 6, E: 8, C: 10 },
        aptitude: { NA: 8, MR: 7, LA: 6, LR: 7, SA: 6 }
    },

    C10: {
        id: "C10",
        category: "Smart Systems & Security",
        careerType: "vocational",
        title: { en: "CCTV & Home Automation Technician", mr: "CCTV आणि होम ऑटोमेशन तंत्रज्ञ" },
        description: {
            en: "Install and maintain CCTV systems and smart home devices.",
            mr: "CCTV सिस्टीम आणि स्मार्ट होम उपकरणे बसवणे व देखभाल करणे."
        },
        similarity: 95,
        cost: { min: "₹5,000", max: "₹20,000" },
        avgSalary: "₹2–4 LPA",
        riasec: { R: 18, I: 12, A: 6, S: 8, E: 10, C: 10 },
        aptitude: { NA: 7, MR: 6, LA: 6, LR: 7, SA: 6 }
    }
};
