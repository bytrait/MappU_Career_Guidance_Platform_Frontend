// -------------------------------------------------------
// DEMO CAREER STEPS (8-STAGE CAREER PATH FOR EACH CAREER)
// Keys match career IDs → C1, C2, C3...
// -------------------------------------------------------

export const demoCareerSteps = {
  C1: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What a Software Developer Does</h3>

<p>A software developer designs, builds, tests, and maintains applications—such as mobile apps, websites, automation tools, and digital systems used by companies and individuals.</p>

<p>They use programming languages and problem-solving skills to convert ideas into working solutions. Their work often involves:</p>

<ul>
  <li>Understanding requirements and planning the system</li>
  <li>Writing clean and efficient code</li>
  <li>Debugging and solving technical issues</li>
  <li>Collaborating with designers, testers, and teams</li>
  <li>Maintaining and updating existing software</li>
</ul>

<h3>Typical Work Environment</h3>
<p>Most software developers work in office or remote environments using laptops and tools like VS Code, GitHub, and project trackers.</p>

<table border="1" cellpadding="6">
  <tr><th>Work Setting</th><th>Details</th></tr>
  <tr><td>Office / Remote</td><td>Tech companies, startups, IT firms</td></tr>
  <tr><td>Team Structure</td><td>Developers, designers, testers, managers</td></tr>
  <tr><td>Common Projects</td><td>Apps, websites, dashboards, automation tools</td></tr>
</table>
`,
        mr: `
<h3>सॉफ्टवेअर डेव्हलपर काय काम करतो?</h3>

<p>सॉफ्टवेअर डेव्हलपर मोबाईल अॅप्स, वेबसाइट्स, ऑटोमेशन टूल्स आणि विविध डिजिटल सिस्टीम तयार करणे, तपासणे आणि सुधारणा करणे यासाठी जबाबदार असतो.</p>

<p>तो विविध प्रोग्रामिंग भाषा आणि समस्या सोडवण्याच्या कौशल्यांचा वापर करून कल्पना प्रत्यक्ष सॉफ्टवेअरमध्ये रूपांतरित करतो. या कामात सामान्यतः खालील गोष्टी असतात:</p>

<ul>
  <li>गरज समजून घेणे आणि सिस्टमची योजना तयार करणे</li>
  <li>स्वच्छ आणि योग्य कोड लिहिणे</li>
  <li>तांत्रिक समस्या शोधून काढणे आणि सोडवणे</li>
  <li>डिझाइनर, टेस्टर्स आणि टीमसोबत सहकार्य</li>
  <li>विद्यमान सॉफ्टवेअरची देखभाल आणि सुधारणा</li>
</ul>

<h3>कामाचे वातावरण</h3>
<p>बहुतांश डेव्हलपर्स ऑफिस किंवा घरून काम करतात आणि VS Code, GitHub यांसारखी साधने वापरतात.</p>

<table border="1" cellpadding="6">
  <tr><th>कामाचे ठिकाण</th><th>तपशील</th></tr>
  <tr><td>ऑफिस / घरून</td><td>IT कंपन्या, स्टार्टअप्स, टेक टीम</td></tr>
  <tr><td>टीम स्ट्रक्चर</td><td>डेव्हलपर्स, डिझाइनर, टेस्टर्स, मॅनेजर्स</td></tr>
  <tr><td>सामान्य प्रकल्प</td><td>अॅप्स, वेबसाइट्स, डॅशबोर्ड्स, टूल्स</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Path", mr: "पात्रता व मार्ग" },
      content: {
        en: `
<h3>Education & Eligibility</h3>

<p>You don't need expensive degrees to become a software developer. Many start with basic education and learn through online courses and practice.</p>

<table border="1" cellpadding="6">
  <tr><th>Education Level</th><th>Suitable For</th></tr>
  <tr><td>10th Pass</td><td>Basic coding courses, ITI, certificate programs</td></tr>
  <tr><td>12th Pass</td><td>Diploma in IT, Computer Applications</td></tr>
  <tr><td>Graduates</td><td>BCA, BSc IT, BE/BTech (optional)</td></tr>
</table>

<h3>Typical Learning Path</h3>

<ol>
  <li>Learn basic programming (Python / JavaScript)</li>
  <li>Understand how websites or apps work</li>
  <li>Build small projects (calculator, website, app)</li>
  <li>Learn GitHub and project deployment</li>
  <li>Create a portfolio and apply for internships or jobs</li>
</ol>

<p>Many successful developers are self-taught and rely on practical projects rather than formal degrees.</p>
`,
        mr: `
<h3>शिक्षण आणि पात्रता</h3>

<p>सॉफ्टवेअर डेव्हलपर बनण्यासाठी महागड्या पदवीची गरज नाही. अनेक लोक १०वी किंवा १२वी नंतर ऑनलाइन कोर्सेस आणि सरावातून शिकून हे करिअर सुरू करतात.</p>

<table border="1" cellpadding="6">
  <tr><th>शिक्षण</th><th>योग्य पर्याय</th></tr>
  <tr><td>१०वी उत्तीर्ण</td><td>बेसिक कोडिंग, ITI, सर्टिफिकेट कोर्सेस</td></tr>
  <tr><td>१२वी उत्तीर्ण</td><td>IT डिप्लोमा, कंप्यूटर अप्लिकेशन कोर्स</td></tr>
  <tr><td>पदवीधर</td><td>BCA, BSc IT, BE/BTech (पर्यायी)</td></tr>
</table>

<h3>शिकण्याचा मार्ग</h3>

<ol>
  <li>बेसिक प्रोग्रामिंग (Python / JavaScript) शिकणे</li>
  <li>वेबसाइट किंवा अॅप कसे कार्य करतात ते समजून घेणे</li>
  <li>लहान प्रोजेक्ट्स तयार करणे</li>
  <li>GitHub आणि डिप्लॉयमेंट शिकणे</li>
  <li>पोर्टफोलिओ तयार करून internship/नोकऱ्या शोधणे</li>
</ol>

<p>अनेक यशस्वी डेव्हलपर्स स्वतः शिकलेल्या असतात आणि प्रोजेक्ट्सवर आधारित करिअर बनवतात.</p>
`
      }
    },
    {
      order: 3,
      title: { en: "Entrance Exams", mr: "प्रवेश परीक्षा" },
      content: {
        en: `
<h3>Do You Need Entrance Exams?</h3>

<p>Most software development jobs do <b>not require any entrance exam</b>. Skills matter more than marks.</p>

<h3>Optional Exams (If pursuing a degree)</h3>

<ul>
  <li>JEE Mains – for BE/BTech Computer Science</li>
  <li>CUET – for central university courses like BCA or BSc IT</li>
  <li>State CET Exams – for local engineering colleges</li>
</ul>

<h3>Skill-Based Assessments (More Important)</h3>

<table border="1" cellpadding="6">
  <tr><th>Assessment</th><th>Purpose</th></tr>
  <tr><td>HackerRank</td><td>Coding tests used by IT companies</td></tr>
  <tr><td>Aptitude & Logical Tests</td><td>Common interview screening</td></tr>
  <tr><td>Portfolio Review</td><td>Evaluates real-world projects</td></tr>
</table>

<p>You can become a developer without clearing any big exam—your projects prove your skills.</p>
`,
        mr: `
<h3>प्रवेश परीक्षा आवश्यक आहे का?</h3>

<p>बहुतांश सॉफ्टवेअर डेव्हलपर नोकऱ्यांसाठी <b>कोणतीही प्रवेश परीक्षा लागतेच असे नाही</b>. मार्क्सपेक्षा कौशल्य अधिक महत्त्वाचे असते.</p>

<h3>पदवी कोर्ससाठी पर्यायी परीक्षा</h3>

<ul>
  <li>JEE Mains – BE/BTech Computer Science साठी</li>
  <li>CUET – BCA, BSc IT सारख्या कोर्ससाठी</li>
  <li>स्टेट CET – राज्यातील इंजिनिअरिंग कॉलेजेससाठी</li>
</ul>

<h3>कौशल्य आधारित मूल्यांकन (अधिक महत्त्वाचे)</h3>

<table border="1" cellpadding="6">
  <tr><th>टेस्ट</th><th>उद्देश</th></tr>
  <tr><td>HackerRank</td><td>IT कंपन्यांचे कोडिंग टेस्ट</td></tr>
  <tr><td>अॅप्टिट्यूड टेस्ट</td><td>इंटरव्ह्यूपूर्वी सर्वसाधारण चाचणी</td></tr>
  <tr><td>पोर्टफोलिओ तपासणी</td><td>प्रोजेक्ट कौशल्ये तपासणे</td></tr>
</table>

<p>मोठी परीक्षा न देता देखील डेव्हलपर बनता येते — तुमचे प्रोजेक्ट्स तुमचे कौशल्य दाखवतात.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Colleges & Scholarships", mr: "महाविद्यालये व शिष्यवृत्ती" },
      content: {
        en: `
<h3>Popular Courses for Aspiring Developers</h3>

<ul>
  <li>Bachelor of Computer Applications (BCA)</li>
  <li>Diploma in Computer Engineering</li>
  <li>BSc in Information Technology</li>
  <li>BE/BTech in Computer Science</li>
  <li>Short-term certification courses</li>
</ul>

<h3>Types of Institutes</h3>
<table border="1" cellpadding="6">
  <tr><th>Institute Type</th><th>Details</th></tr>
  <tr><td>Government Colleges</td><td>Affordable, high quality</td></tr>
  <tr><td>Private Colleges</td><td>Modern labs & placements</td></tr>
  <tr><td>Online Platforms</td><td>Coursera, Udemy, free YouTube courses</td></tr>
</table>

<h3>Scholarships</h3>
<ul>
  <li>National Scholarship Portal (NSP)</li>
  <li>State government scholarships</li>
  <li>Private IT training scholarships</li>
  <li>Merit-based waivers in institutes</li>
</ul>

<p>Many students become developers even without expensive colleges—projects and skills matter most.</p>
`,
        mr: `
<h3>डेव्हलपर बनण्यासाठी लोकप्रिय कोर्सेस</h3>

<ul>
  <li>BCA (कंप्यूटर अप्लिकेशन)</li>
  <li>कंप्यूटर इंजिनिअरिंग डिप्लोमा</li>
  <li>BSc IT</li>
  <li>BE/BTech Computer Science</li>
  <li>शॉर्ट-टर्म सर्टिफिकेट कोर्सेस</li>
</ul>

<h3>महाविद्यालयांचे प्रकार</h3>

<table border="1" cellpadding="6">
  <tr><th>प्रकार</th><th>तपशील</th></tr>
  <tr><td>सरकारी कॉलेज</td><td>कमी फी, चांगले शिक्षण</td></tr>
  <tr><td>खाजगी कॉलेज</td><td>आधुनिक लॅब्स आणि प्लेसमेंट</td></tr>
  <tr><td>ऑनलाइन प्लॅटफॉर्म</td><td>Coursera, Udemy, YouTube</td></tr>
</table>

<h3>शिष्यवृत्ती</h3>

<ul>
  <li>National Scholarship Portal (NSP)</li>
  <li>राज्य सरकार शिष्यवृत्ती योजना</li>
  <li>IT प्रशिक्षण संस्था शिष्यवृत्ती</li>
  <li>मेरिट-आधारित फी माफी</li>
</ul>

<p>महागड्या कॉलेजशिवायही अनेक विद्यार्थी उत्कृष्ट डेव्हलपर्स बनतात — कौशल्य सर्वात महत्त्वाचे.</p>
`
      }
    },
    {
      order: 5,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills Needed</h3>

<p>A software developer must have a strong foundation in logic, coding, and analytical thinking. These skills help you write efficient, clean, and error-free programs.</p>

<ul>
  <li><b>Logical Thinking:</b> Breaking problems into smaller steps</li>
  <li><b>Coding Skills:</b> Writing code in one or more languages</li>
  <li><b>Debugging Ability:</b> Finding and fixing bugs</li>
  <li><b>Communication:</b> Explaining ideas clearly to team members</li>
  <li><b>Teamwork:</b> Working with designers, testers, and managers</li>
</ul>

<h3>Important Tools & Technologies</h3>

<table border="1" cellpadding="6">
  <tr><th>Category</th><th>Examples</th></tr>
  <tr><td>Programming Languages</td><td>Python, JavaScript, Java, C++</td></tr>
  <tr><td>Frontend Tools</td><td>React, HTML, CSS</td></tr>
  <tr><td>Backend Tools</td><td>Node.js, Django, Express</td></tr>
  <tr><td>Database</td><td>MySQL, MongoDB, PostgreSQL</td></tr>
  <tr><td>Version Control</td><td>Git, GitHub</td></tr>
  <tr><td>Editors</td><td>VS Code, IntelliJ</td></tr>
</table>

<h3>Soft Skills</h3>
<p>Soft skills improve performance and make collaboration smoother.</p>

<ul>
  <li>Problem-solving mindset</li>
  <li>Time management</li>
  <li>Continuous learning attitude</li>
  <li>Adaptability to new tools</li>
</ul>
`,
        mr: `
<h3>आवश्यक कौशल्ये</h3>

<p>सॉफ्टवेअर डेव्हलपरसाठी लॉजिकल थिंकिंग, कोडिंग आणि विश्लेषणात्मक क्षमता अत्यंत महत्त्वाच्या असतात. या कौशल्यांमुळे स्वच्छ, जलद आणि त्रुटीमुक्त कोड लिहिता येतो.</p>

<ul>
  <li><b>लॉजिकल थिंकिंग:</b> समस्येचे छोटे भाग करून सोडवणे</li>
  <li><b>कोडिंग कौशल्य:</b> एक किंवा अधिक भाषांमध्ये कोड लिहिणे</li>
  <li><b>डिबगिंग क्षमता:</b> चुका शोधून दुरुस्त करणे</li>
  <li><b>कम्युनिकेशन:</b> टीमशी स्पष्ट संवाद</li>
  <li><b>टीमवर्क:</b> डिझाइनर, टेस्टर्स आणि मॅनेजर्ससोबत काम</li>
</ul>

<h3>महत्त्वाची साधने आणि तंत्रज्ञान</h3>

<table border="1" cellpadding="6">
  <tr><th>श्रेणी</th><th>उदाहरणे</th></tr>
  <tr><td>प्रोग्रामिंग भाषा</td><td>Python, JavaScript, Java, C++</td></tr>
  <tr><td>फ्रंटएंड साधने</td><td>React, HTML, CSS</td></tr>
  <tr><td>बॅकएंड साधने</td><td>Node.js, Django, Express</td></tr>
  <tr><td>डेटाबेस</td><td>MySQL, MongoDB, PostgreSQL</td></tr>
  <tr><td>व्हर्जन कंट्रोल</td><td>Git, GitHub</td></tr>
  <tr><td>एडिटर्स</td><td>VS Code, IntelliJ</td></tr>
</table>

<h3>सॉफ्ट स्किल्स</h3>

<ul>
  <li>समस्या सोडवण्याची वृत्ती</li>
  <li>वेळ व्यवस्थापन</li>
  <li>नवीन गोष्टी शिकण्याची इच्छा</li>
  <li>नवीन तंत्रज्ञानाशी जुळवून घेण्याची क्षमता</li>
</ul>
`
      }
    },
    {
      order: 6,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth Levels</h3>

<p>Software development offers one of the fastest-growing career paths. With experience and skills, developers can progress quickly.</p>

<table border="1" cellpadding="6">
  <tr><th>Level</th><th>Experience</th><th>Role</th></tr>
  <tr><td>Junior Developer</td><td>0–2 years</td><td>Basic coding, bug fixes</td></tr>
  <tr><td>Mid-level Developer</td><td>2–5 years</td><td>Feature development, system design</td></tr>
  <tr><td>Senior Developer</td><td>5–8 years</td><td>Architectural decisions, mentoring</td></tr>
  <tr><td>Lead / Architect</td><td>8+ years</td><td>Team leadership, system design</td></tr>
</table>

<h3>Industries Hiring Developers</h3>

<ul>
  <li>IT & Software Companies</li>
  <li>Startups</li>
  <li>E-commerce platforms</li>
  <li>Banks & Finance</li>
  <li>Healthcare Technology</li>
  <li>Educational Technology</li>
</ul>

<h3>Real Opportunities</h3>

<p>Skilled developers can work remotely, freelance, or join global companies. Demand will continue rising for the next decade.</p>
`,
        mr: `
<h3>करिअर वाढ पातळी</h3>

<p>सॉफ्टवेअर डेव्हलपमेंट हे सर्वात जलद वाढणाऱ्या करिअरपैकी एक आहे. अनुभव आणि कौशल्यांनुसार प्रगती जलद होते.</p>

<table border="1" cellpadding="6">
  <tr><th>पातळी</th><th>अनुभव</th><th>भूमिका</th></tr>
  <tr><td>ज्युनियर डेव्हलपर</td><td>0–2 वर्षे</td><td>बेसिक कोडिंग, बग फिक्सिंग</td></tr>
  <tr><td>मिड-लेव्हल डेव्हलपर</td><td>2–5 वर्षे</td><td>फीचर्स तयार करणे, सिस्टम डिझाईन</td></tr>
  <tr><td>सीनियर डेव्हलपर</td><td>5–8 वर्षे</td><td>आर्किटेक्चर, मार्गदर्शन</td></tr>
  <tr><td>लीड / आर्किटेक्ट</td><td>8+ वर्षे</td><td>टीम लीडरशिप, सिस्टम प्लॅनिंग</td></tr>
</table>

<h3>डेव्हलपरसाठी उपलब्ध क्षेत्रे</h3>

<ul>
  <li>IT आणि सॉफ्टवेअर कंपन्या</li>
  <li>स्टार्टअप्स</li>
  <li>ई-कॉमर्स प्लॅटफॉर्म</li>
  <li>बँकिंग आणि फायनान्स</li>
  <li>हेल्थकेअर टेक</li>
  <li>एड-टेक</li>
</ul>

<h3>संधी</h3>

<p>हुशार डेव्हलपर्सना घरून काम, फ्रीलान्स किंवा ग्लोबल कंपन्यांमध्ये संधी मिळते. पुढील १० वर्षे मागणी वेगाने वाढत राहील.</p>
`
      }
    }
    ,
    {
      order: 7,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Emerging Technologies</h3>

<p>The software field is evolving continuously. Developers who learn new technologies stay ahead in the industry.</p>

<ul>
  <li><b>Artificial Intelligence & Machine Learning</b></li>
  <li><b>Automation & Robotics</b></li>
  <li><b>Cloud Computing</b> (AWS, Azure, Google Cloud)</li>
  <li><b>Cybersecurity</b></li>
  <li><b>Blockchain</b></li>
  <li><b>AR/VR & Metaverse Development</b></li>
</ul>

<h3>Shift in Work Culture</h3>

<table border="1" cellpadding="6">
  <tr><th>Trend</th><th>Impact</th></tr>
  <tr><td>Remote Work</td><td>More global job opportunities</td></tr>
  <tr><td>Gig Economy</td><td>Freelance projects increasing</td></tr>
  <tr><td>AI Tools</td><td>Developers become more productive</td></tr>
</table>

<p>The future is bright for developers who keep upgrading their skills.</p>
`,
        mr: `
<h3>उभरते तंत्रज्ञान</h3>

<p>सॉफ्टवेअर क्षेत्र सतत बदलत आहे. नवीन तंत्रज्ञान शिकणारे डेव्हलपर्स नेहमी उद्योगात पुढे राहतात.</p>

<ul>
  <li><b>Artificial Intelligence आणि मशीन लर्निंग</b></li>
  <li><b>ऑटोमेशन आणि रोबोटिक्स</b></li>
  <li><b>क्लाउड कंप्यूटिंग</b> (AWS, Azure, Google Cloud)</li>
  <li><b>सायबर सिक्युरिटी</b></li>
  <li><b>ब्लॉकचेन</b></li>
  <li><b>AR/VR आणि मेटाव्हर्स डेव्हलपमेंट</b></li>
</ul>

<h3>कामाच्या पद्धतीतील बदल</h3>

<table border="1" cellpadding="6">
  <tr><th>ट्रेंड</th><th>परिणाम</th></tr>
  <tr><td>रिमोट वर्क</td><td>ग्लोबल जॉबसाठी जास्त संधी</td></tr>
  <tr><td>गिग इकॉनॉमी</td><td>फ्रीलान्स प्रोजेक्ट्स वाढत आहेत</td></tr>
  <tr><td>AI टूल्स</td><td>डेव्हलपर्सची उत्पादकता वाढते</td></tr>
</table>

<p>कौशल्ये सातत्याने अपडेट करणाऱ्या डेव्हलपर्ससाठी भवितव्य अधिक उज्ज्वल आहे.</p>
`
      }
    }
    ,
    {
      order: 8,
      title: { en: "Summary", mr: "सारांश" },
      content: {
        en: `
<h3>Quick Recap</h3>

<p>Software development is one of the most future-proof careers. Anyone with curiosity, patience, and willingness to learn can grow in this field.</p>

<ul>
  <li>High demand across all industries</li>
  <li>Can start with basic education</li>
  <li>Thousands of free resources available</li>
  <li>Skills matter more than degrees</li>
  <li>Opportunities for remote & international jobs</li>
</ul>

<h3>Next Steps</h3>

<ol>
  <li>Start learning one programming language</li>
  <li>Build small real-world projects</li>
  <li>Create a GitHub portfolio</li>
  <li>Apply for internships or freelance gigs</li>
</ol>

<p>This career rewards consistent practice and problem-solving skills more than anything else.</p>
`,
        mr: `
<h3>थोडक्यात सारांश</h3>

<p>सॉफ्टवेअर डेव्हलपमेंट हे भविष्यात टिकून राहणारे आणि झपाट्याने वाढणारे करिअर आहे. जिज्ञासा, संयम आणि शिकण्याची तयारी असलेला प्रत्येकजण या क्षेत्रात प्रगती करू शकतो.</p>

<ul>
  <li>सर्व क्षेत्रांमध्ये जास्त मागणी</li>
  <li>बेसिक शिक्षणानंतर सुरू करता येते</li>
  <li>मोफत शिकण्यासाठी भरपूर संसाधने</li>
  <li>डिग्रीपेक्षा कौशल्यांना जास्त महत्त्व</li>
  <li>घरून आणि आंतरराष्ट्रीय नोकरीच्या संधी</li>
</ul>

<h3>पुढील पावले</h3>

<ol>
  <li>एक प्रोग्रामिंग भाषा शिकणे सुरू करा</li>
  <li>लहान प्रोजेक्ट्स बनवा</li>
  <li>GitHub वर पोर्टफोलिओ तयार करा</li>
  <li>इंटर्नशिप किंवा फ्रीलान्स संधी शोधा</li>
</ol>

<p>या करिअरमध्ये नियमित सराव आणि समस्या सोडवण्याची वृत्ती यांना सर्वात जास्त किंमत आहे.</p>
`
      }
    }

  ],
  C2: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What a Physiotherapist Does</h3>

<p>A physiotherapist helps patients recover from injuries, pain, disability, or physical limitations using exercises, manual therapy, and rehabilitation techniques.</p>

<p>They work with people who have:</p>

<ul>
  <li>Back or neck pain</li>
  <li>Sports injuries</li>
  <li>Stroke or paralysis recovery needs</li>
  <li>Movement or posture issues</li>
  <li>Chronic pain conditions</li>
</ul>

<h3>Typical Work Environment</h3>

<p>Physiotherapists work closely with doctors, rehabilitation teams, and patients in various settings.</p>

<table border="1" cellpadding="6">
  <tr><th>Work Setting</th><th>Details</th></tr>
  <tr><td>Hospitals</td><td>Rehabilitation, OPD, recovery units</td></tr>
  <tr><td>Clinics</td><td>Private physiotherapy centers</td></tr>
  <tr><td>Sports Centers</td><td>Injury prevention & athletic recovery</td></tr>
  <tr><td>Home Visits</td><td>Physio sessions for patients at home</td></tr>
</table>
`,
        mr: `
<h3>फिजिओथेरपिस्ट काय काम करतो?</h3>

<p>फिजिओथेरपिस्ट दुखापत, वेदना, अपंगत्व किंवा हालचालीच्या समस्यांनी त्रस्त रुग्णांना व्यायाम, थेरपी आणि पुनर्वसन तंत्रांच्या साहाय्याने पूर्णपणे बरे होण्यास मदत करतो.</p>

<p>फिजिओथेरपी खालील प्रकारच्या रुग्णांसाठी उपयुक्त असते:</p>

<ul>
  <li>पाठदुखी किंवा मानेचा त्रास</li>
  <li>खेळातील दुखापती</li>
  <li>स्ट्रोक/लकवा नंतरची पुनर्वसन गरज</li>
  <li>हालचाल किंवा पोश्चर समस्या</li>
  <li>दीर्घकालीन वेदना</li>
</ul>

<h3>कामाचे वातावरण</h3>

<p>फिजिओथेरपिस्ट डॉक्टर आणि पुनर्वसन टीमसोबत विविध ठिकाणी काम करतात.</p>

<table border="1" cellpadding="6">
  <tr><th>कामाचे ठिकाण</th><th>तपशील</th></tr>
  <tr><td>रुग्णालये</td><td>रीहॅब, OPD, पुनर्वसन विभाग</td></tr>
  <tr><td>क्लिनिक</td><td>खाजगी फिजिओथेरपी केंद्रे</td></tr>
  <tr><td>खेळ केंद्रे</td><td>खेळाडूंच्या दुखापत व्यवस्थापनासाठी</td></tr>
  <tr><td>घरगुती सेवा</td><td>रुग्णांच्या घरी फिजिओ सेशन्स</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Path", mr: "पात्रता व मार्ग" },
      content: {
        en: `
<h3>Education & Eligibility</h3>

<p>To become a physiotherapist, students generally pursue a Bachelor's degree in Physiotherapy (BPT). After completing BPT, one can specialize further through Masters (MPT).</p>

<table border="1" cellpadding="6">
  <tr><th>Education Level</th><th>Pathway</th></tr>
  <tr><td>12th Science (PCB)</td><td>Eligible for BPT program</td></tr>
  <tr><td>BPT Degree</td><td>4.5-year program including internship</td></tr>
  <tr><td>Higher Studies</td><td>MPT specialization options</td></tr>
</table>

<h3>Career Path</h3>

<ol>
  <li>Complete 12th Science with Biology</li>
  <li>Clear entrance exam (if required)</li>
  <li>Enroll in BPT program</li>
  <li>Complete clinical internship</li>
  <li>Start working in hospitals or clinics</li>
  <li>(Optional) Pursue MPT for specialization</li>
</ol>

<p>Specializations include sports physiotherapy, neurology, orthopedics, cardiac rehab, and pediatric physiotherapy.</p>
`,
        mr: `
<h3>शिक्षण आणि पात्रता</h3>

<p>फिजिओथेरपिस्ट बनण्यासाठी विद्यार्थ्यांना साधारणपणे BPT (Bachelor of Physiotherapy) पदवी करावी लागते. नंतर MPT करून स्पेशलायझेशन करता येते.</p>

<table border="1" cellpadding="6">
  <tr><th>शिक्षण</th><th>मार्ग</th></tr>
  <tr><td>१२वी विज्ञान (PCB)</td><td>BPT साठी पात्र</td></tr>
  <tr><td>BPT पदवी</td><td>४.५ वर्षे + इंटर्नशिप</td></tr>
  <tr><td>उच्च शिक्षण</td><td>MPT स्पेशलायझेशन पर्याय</td></tr>
</table>

<h3>करिअर मार्ग</h3>

<ol>
  <li>१२वी विज्ञान (बायोलॉजी) पूर्ण करणे</li>
  <li>(लागल्यास) प्रवेश परीक्षा देणे</li>
  <li>BPT कोर्समध्ये प्रवेश</li>
  <li>क्लिनिकल इंटर्नशिप पूर्ण करणे</li>
  <li>रुग्णालय किंवा क्लिनिकमध्ये नोकरी</li>
  <li>(पर्यायी) MPT करून स्पेशलायझेशन</li>
</ol>

<p>स्पेशलायझेशनमध्ये स्पोर्ट्स फिजिओ, न्युरो, ऑर्थो, हार्ट रीहॅब, पेडियाट्रिक फिजिओ इत्यादी समाविष्ट आहेत.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Entrance Exams", mr: "प्रवेश परीक्षा" },
      content: {
        en: `
<h3>Entrance Exams for BPT</h3>

<p>Admission into BPT programs may require clearing certain entrance tests depending on the institute.</p>

<ul>
  <li>NEET (Some states/institutes consider NEET scores)</li>
  <li>State-level entrance exams</li>
  <li>Private university entrance tests</li>
</ul>

<h3>Selection Process</h3>

<table border="1" cellpadding="6">
  <tr><th>Stage</th><th>Description</th></tr>
  <tr><td>Written Test</td><td>Biology-focused questions</td></tr>
  <tr><td>Counselling</td><td>College selection based on score</td></tr>
  <tr><td>Document Verification</td><td>Eligibility confirmation</td></tr>
</table>

<p>Some colleges also offer direct admission based on 12th marks.</p>
`,
        mr: `
<h3>BPT साठी प्रवेश परीक्षा</h3>

<p>काही संस्थांमध्ये BPT मध्ये प्रवेश मिळवण्यासाठी प्रवेश परीक्षा आवश्यक असते.</p>

<ul>
  <li>NEET (काही राज्ये/संस्था NEET गुण विचारात घेतात)</li>
  <li>राज्य-स्तरीय प्रवेश परीक्षा</li>
  <li>खाजगी विद्यापीठ प्रवेश परीक्षा</li>
</ul>

<h3>निवड प्रक्रिया</h3>

<table border="1" cellpadding="6">
  <tr><th>टप्पा</th><th>तपशील</th></tr>
  <tr><td>लेखी परीक्षा</td><td>बायोलॉजी-संबंधित प्रश्न</td></tr>
  <tr><td>कौन्सेलिंग</td><td>गुणांनुसार कॉलेज निवड</td></tr>
  <tr><td>दस्तऐवज तपासणी</td><td>पात्रतेची खात्री</td></tr>
</table>

<p>काही कॉलेजेस १२वीच्या गुणांवर थेट प्रवेश देतात.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Colleges & Scholarships", mr: "महाविद्यालये व शिष्यवृत्ती" },
      content: {
        en: `
<h3>Popular Courses for Physiotherapy</h3>

<ul>
  <li>Bachelor of Physiotherapy (BPT)</li>
  <li>Masters in Physiotherapy (MPT)</li>
  <li>Diploma in Physiotherapy</li>
</ul>

<h3>Types of Institutes</h3>

<table border="1" cellpadding="6">
  <tr><th>Institute Type</th><th>Details</th></tr>
  <tr><td>Government Colleges</td><td>Affordable fees, experienced faculty</td></tr>
  <tr><td>Private Colleges</td><td>Modern labs, practical training</td></tr>
</table>

<h3>Scholarships</h3>

<ul>
  <li>National Scholarship Portal (NSP)</li>
  <li>State Government Scholarships</li>
  <li>Merit-based fee waivers</li>
</ul>

<p>Clinical exposure and hands-on practice are extremely important in physiotherapy education.</p>
`,
        mr: `
<h3>फिजिओथेरपीसाठी लोकप्रिय कोर्सेस</h3>

<ul>
  <li>BPT (बॅचलर ऑफ फिजिओथेरपी)</li>
  <li>MPT (मास्टर्स इन फिजिओथेरपी)</li>
  <li>डिप्लोमा कोर्सेस</li>
</ul>

<h3>महाविद्यालयांचे प्रकार</h3>

<table border="1" cellpadding="6">
  <tr><th>प्रकार</th><th>तपशील</th></tr>
  <tr><td>सरकारी कॉलेज</td><td>कमी फी, अनुभवी शिक्षक</td></tr>
  <tr><td>खाजगी कॉलेज</td><td>आधुनिक लॅब्स, प्रॅक्टिकल ट्रेनिंग</td></tr>
</table>

<h3>शिष्यवृत्ती</h3>

<ul>
  <li>National Scholarship Portal (NSP)</li>
  <li>राज्य सरकारी योजना</li>
  <li>मेरिट-आधारित फी माफी</li>
</ul>

<p>फिजिओथेरपी शिक्षणात प्रॅक्टिकल अनुभव अत्यंत महत्त्वाचा आहे.</p>
`
      }
    },

    {
      order: 5,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills Needed</h3>

<ul>
  <li><b>Patient assessment:</b> Understanding medical conditions</li>
  <li><b>Therapeutic exercises:</b> Designing rehab plans</li>
  <li><b>Manual therapy skills</b></li>
  <li><b>Communication skills</b></li>
  <li><b>Empathy and patience</b></li>
</ul>

<h3>Tools Used in Physiotherapy</h3>

<table border="1" cellpadding="6">
  <tr><th>Tool Type</th><th>Examples</th></tr>
  <tr><td>Therapy Machines</td><td>IFT, Ultrasound, TENS</td></tr>
  <tr><td>Rehab Equipment</td><td>Resistance bands, rollers, weights</td></tr>
  <tr><td>Assessment Tools</td><td>Goniometer, posture charts</td></tr>
</table>

<h3>Soft Skills</h3>

<ul>
  <li>Motivating patients</li>
  <li>Building trust</li>
  <li>Explaining exercises clearly</li>
</ul>
`,
        mr: `
<h3>आवश्यक कौशल्ये</h3>

<ul>
  <li><b>रुग्ण मूल्यांकन:</b> वैद्यकीय स्थिती समजून घेणे</li>
  <li><b>थेरपी व्यायाम:</b> पुनर्वसन योजना तयार करणे</li>
  <li><b>मॅन्युअल थेरपी कौशल्य</b></li>
  <li><b>कम्युनिकेशन कौशल्य</b></li>
  <li><b>समजूतदारपणा आणि संयम</b></li>
</ul>

<h3>फिजिओथेरपीमध्ये वापरली जाणारी साधने</h3>

<table border="1" cellpadding="6">
  <tr><th>साधन प्रकार</th><th>उदाहरणे</th></tr>
  <tr><td>थेरपी मशीन</td><td>IFT, अल्ट्रासाऊंड, TENS</td></tr>
  <tr><td>रीहॅब उपकरणे</td><td>रेझिस्टन्स बँड, रोलर्स, वजन</td></tr>
  <tr><td>मूल्यांकन साधने</td><td>गोनिओमीटर, पोश्चर चार्ट</td></tr>
</table>

<h3>सॉफ्ट स्किल्स</h3>

<ul>
  <li>रुग्णांना प्रेरित करणे</li>
  <li>विश्वास निर्माण करणे</li>
  <li>व्यायाम स्पष्टपणे समजावून सांगणे</li>
</ul>
`
      }
    },

    {
      order: 6,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth Levels</h3>

<table border="1" cellpadding="6">
  <tr><th>Level</th><th>Experience</th><th>Role</th></tr>
  <tr><td>Junior Physiotherapist</td><td>0–2 years</td><td>Basic assessments and treatment</td></tr>
  <tr><td>Physiotherapist</td><td>2–5 years</td><td>Rehab planning & patient handling</td></tr>
  <tr><td>Senior Physiotherapist</td><td>5–8 years</td><td>Supervision & advanced therapy</td></tr>
  <tr><td>Head of Department / Specialist</td><td>8+ years</td><td>Team leadership, specialization</td></tr>
</table>

<h3>Industries Hiring Physiotherapists</h3>

<ul>
  <li>Hospitals</li>
  <li>Rehabilitation Centers</li>
  <li>Sports Academies</li>
  <li>Fitness & Wellness Centers</li>
  <li>Home-care Services</li>
</ul>

<h3>Real Opportunities</h3>

<p>Physiotherapists can also open private clinics, partner with gyms, or work with sports teams.</p>
`,
        mr: `
<h3>करिअर वाढ पातळी</h3>

<table border="1" cellpadding="6">
  <tr><th>पातळी</th><th>अनुभव</th><th>भूमिका</th></tr>
  <tr><td>ज्युनियर फिजिओथेरपिस्ट</td><td>0–2 वर्षे</td><td>बेसिक मूल्यांकन व उपचार</td></tr>
  <tr><td>फिजिओथेरपिस्ट</td><td>2–5 वर्षे</td><td>रीहॅब योजना व रुग्ण व्यवस्थापन</td></tr>
  <tr><td>सीनियर फिजिओथेरपिस्ट</td><td>5–8 वर्षे</td><td>मार्गदर्शन व उन्नत थेरपी</td></tr>
  <tr><td>विभागप्रमुख / विशेषज्ञ</td><td>8+ वर्षे</td><td>टीम लीडरशिप, स्पेशलायझेशन</td></tr>
</table>

<h3>फिजिओथेरपिस्टसाठी उपलब्ध क्षेत्रे</h3>

<ul>
  <li>रुग्णालये</li>
  <li>रीहॅब सेंटर</li>
  <li>स्पोर्ट्स अकादमी</li>
  <li>फिटनेस व वेलनेस सेंटर</li>
  <li>होम-केअर सेवा</li>
</ul>

<p>फिजिओथेरपिस्ट खाजगी क्लिनिक सुरू करू शकतात, जिमसोबत सहयोग करू शकतात किंवा स्पोर्ट्स टीमसोबतही काम करू शकतात.</p>
`
      }
    },

    {
      order: 7,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Emerging Trends in Physiotherapy</h3>

<ul>
  <li><b>Sports Physiotherapy Growth:</b> Due to rising sports injuries</li>
  <li><b>Digital Rehabilitation:</b> Online physio sessions</li>
  <li><b>AI-based Posture Analysis Tools</b></li>
  <li><b>Geriatric Physiotherapy Demand Increasing</b></li>
  <li><b>Ergonomics and Workplace Injury Prevention</b></li>
</ul>

<h3>Technological Changes</h3>

<table border="1" cellpadding="6">
  <tr><th>Trend</th><th>Impact</th></tr>
  <tr><td>Wearable devices</td><td>Monitor body movement and progress</td></tr>
  <tr><td>Tele-Physiotherapy</td><td>Remote treatment options</td></tr>
  <tr><td>Robotic Rehab Equipment</td><td>Improves recovery outcomes</td></tr>
</table>

<p>The physiotherapy field will continue expanding due to lifestyle diseases and aging population.</p>
`,
        mr: `
<h3>फिजिओथेरपीमधील भविष्यातील ट्रेंड</h3>

<ul>
  <li><b>स्पोर्ट्स फिजिओची वाढ:</b> खेळातील दुखापती वाढत आहेत</li>
  <li><b>डिजिटल रीहॅब:</b> ऑनलाइन फिजिओ सेशन्स</li>
  <li><b>AI आधारित पोश्चर अॅनालिसिस साधने</b></li>
  <li><b>ज्येष्ठ नागरिकांसाठी फिजिओथेरपीची गरज वाढत आहे</b></li>
  <li><b>वर्कप्लेस इंज्युरी प्रिव्हेंशन</b></li>
</ul>

<h3>तांत्रिक बदल</h3>

<table border="1" cellpadding="6">
  <tr><th>ट्रेंड</th><th>परिणाम</th></tr>
  <tr><td>वेअरेबल डिव्हाइसेस</td><td>शरीराच्या हालचालींची माहिती</td></tr>
  <tr><td>टेली-फिजिओथेरपी</td><td>दूरस्थ उपचार</td></tr>
  <tr><td>रोबोटिक रीहॅब साधने</td><td>जलद पुनर्वसन</td></tr>
</table>

<p>जीवनशैलीतील आजार आणि वाढते वय यामुळे फिजिओथेरपीची मागणी भविष्यात आणखी वाढणार आहे.</p>
`
      }
    },

    {
      order: 8,
      title: { en: "Summary", mr: "सारांश" },
      content: {
        en: `
<h3>Quick Recap</h3>

<p>Physiotherapy is a respected and growing healthcare profession with strong demand in hospitals, clinics, and sports sectors.</p>

<ul>
  <li>Helps patients recover mobility and strength</li>
  <li>Great demand in India and abroad</li>
  <li>Hands-on and rewarding work</li>
  <li>Opportunities for specialization</li>
  <li>Scope for private practice</li>
</ul>

<h3>Next Steps</h3>

<ol>
  <li>Complete 12th with PCB</li>
  <li>Apply for BPT</li>
  <li>Gain clinical experience</li>
  <li>Choose a specialization</li>
</ol>

<p>If you enjoy helping people and working in healthcare, physiotherapy is an excellent career choice.</p>
`,
        mr: `
<h3>थोडक्यात सारांश</h3>

<p>फिजिओथेरपी हे वाढणारे आणि अत्यंत महत्त्वाचे आरोग्य क्षेत्र आहे. रुग्णालये, क्लिनिक आणि स्पोर्ट्स क्षेत्रात याची मोठी मागणी आहे.</p>

<ul>
  <li>रुग्णांना हालचाल आणि ताकद पुनर्संचयित करण्यात मदत</li>
  <li>भारत आणि परदेशात चांगली संधी</li>
  <li>प्रॅक्टिकल आणि समाधान देणारे काम</li>
  <li>स्पेशलायझेशनचे अनेक पर्याय</li>
  <li>खाजगी क्लिनिक सुरू करण्याची संधी</li>
</ul>

<h3>पुढील पावले</h3>

<ol>
  <li>१२वी PCB पूर्ण करा</li>
  <li>BPT साठी अर्ज करा</li>
  <li>क्लिनिकल अनुभव मिळवा</li>
  <li>स्पेशलायझेशन निवडा</li>
</ol>

<p>जर तुम्हाला लोकांना मदत करायला आवडत असेल तर फिजिओथेरपी उत्कृष्ट करिअर आहे.</p>
`
      }
    }
  ],
  C3: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What an Operations Manager Does</h3>

<p>An Operations Manager ensures that a company’s daily activities run smoothly. They manage people, processes, resources, and workflow to achieve maximum efficiency.</p>

<p>Their responsibilities include:</p>

<ul>
  <li>Coordinating teams and assigning tasks</li>
  <li>Monitoring workflow and productivity</li>
  <li>Improving business processes</li>
  <li>Managing budgets and resources</li>
  <li>Ensuring quality and timely delivery</li>
</ul>

<h3>Typical Work Environment</h3>

<p>Operations managers work in almost every industry including retail, manufacturing, IT, logistics, hospitality, and finance.</p>

<table border="1" cellpadding="6">
  <tr><th>Work Setting</th><th>Details</th></tr>
  <tr><td>Corporate Offices</td><td>Process planning, team leadership</td></tr>
  <tr><td>Manufacturing Units</td><td>Production planning, quality control</td></tr>
  <tr><td>Retail & Service Companies</td><td>Store operations, customer service</td></tr>
  <tr><td>Startups</td><td>End-to-end operations ownership</td></tr>
</table>
`,
        mr: `
<h3>ऑपरेशन्स मॅनेजर काय काम करतो?</h3>

<p>ऑपरेशन्स मॅनेजर कंपनीचे दैनंदिन कामकाज सुरळीत चालण्यासाठी जबाबदार असतो. तो टीम, प्रक्रिया, संसाधने आणि कामाची गती प्रभावीपणे व्यवस्थापित करतो.</p>

<p>त्याच्या मुख्य जबाबदाऱ्या:</p>

<ul>
  <li>टीम समन्वय आणि कार्यांचे वाटप</li>
  <li>वर्कफ्लो आणि उत्पादनक्षमता तपासणे</li>
  <li>व्यवसाय प्रक्रिया सुधारणा</li>
  <li>बजेट आणि संसाधन व्यवस्थापन</li>
  <li>गुणवत्ता आणि वेळेत काम पूर्ण होण्याची खात्री</li>
</ul>

<h3>कामाचे वातावरण</h3>

<p>ऑपरेशन्स मॅनेजर जवळजवळ सर्व उद्योगांमध्ये आवश्यक असतो—रिटेल, मॅन्युफॅक्चरिंग, IT, लॉजिस्टिक्स, हॉस्पिटॅलिटी आणि फायनान्स.</p>

<table border="1" cellpadding="6">
  <tr><th>कामाचे ठिकाण</th><th>तपशील</th></tr>
  <tr><td>कॉर्पोरेट ऑफिस</td><td>प्रक्रिया नियोजन, टीम लीडरशिप</td></tr>
  <tr><td>मॅन्युफॅक्चरिंग</td><td>उत्पादन नियोजन, गुणवत्ता नियंत्रण</td></tr>
  <tr><td>रिटेल/सर्व्हिस</td><td>स्टोअर व्यवस्थापन, ग्राहक सेवा</td></tr>
  <tr><td>स्टार्टअप्स</td><td>एंड-टू-एंड ऑपरेशन्सची जबाबदारी</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Path", mr: "पात्रता व मार्ग" },
      content: {
        en: `
<h3>Education & Eligibility</h3>

<p>Anyone with interest in business processes, management, and coordination can pursue this career. A degree is helpful but practical skills matter more.</p>

<table border="1" cellpadding="6">
  <tr><th>Education Level</th><th>Suitable Path</th></tr>
  <tr><td>12th Pass (Any Stream)</td><td>Diploma in Business / Management Courses</td></tr>
  <tr><td>Graduation</td><td>BBA, BCom, BA Management</td></tr>
  <tr><td>Post-Graduation</td><td>MBA (optional but beneficial)</td></tr>
</table>

<h3>Typical Learning Path</h3>

<ol>
  <li>Learn basics of business management</li>
  <li>Develop communication and leadership skills</li>
  <li>Understand workflow, planning, and coordination</li>
  <li>Do internships in companies or startups</li>
  <li>Start as an Operations Executive</li>
</ol>

<p>Over time, experience matters more than degrees in this role.</p>
`,
        mr: `
<h3>शिक्षण आणि पात्रता</h3>

<p>व्यवस्थापन, समन्वय आणि व्यवसाय प्रक्रिया समजण्याची आवड असलेले विद्यार्थी हे करिअर सहज निवडू शकतात. पदवी उपयुक्त पण कौशल्य अधिक महत्त्वाचे.</p>

<table border="1" cellpadding="6">
  <tr><th>शिक्षण</th><th>योग्य मार्ग</th></tr>
  <tr><td>१२वी (कोणतीही शाखा)</td><td>बिझनेस डिप्लोमा / मॅनेजमेंट कोर्सेस</td></tr>
  <tr><td>पदवी</td><td>BBA, BCom, BA Management</td></tr>
  <tr><td>पदव्युत्तर</td><td>MBA (ऐच्छिक पण उपयुक्त)</td></tr>
</table>

<h3>शिकण्याचा मार्ग</h3>

<ol>
  <li>बेसिक व्यवसाय व्यवस्थापन शिकणे</li>
  <li>कम्युनिकेशन आणि लीडरशिप कौशल्य विकसित करणे</li>
  <li>वर्कफ्लो, नियोजन आणि समन्वय समजून घेणे</li>
  <li>कंपन्या किंवा स्टार्टअप्समध्ये इंटर्नशिप</li>
  <li>ऑपरेशन्स एक्झिक्युटिव्ह म्हणून सुरुवात</li>
</ol>

<p>या क्षेत्रात अनुभवाला पदवीपेक्षा जास्त मूल्य आहे.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Entrance Exams", mr: "प्रवेश परीक्षा" },
      content: {
        en: `
<h3>Are Entrance Exams Required?</h3>

<p>Most operations roles do <b>not</b> require any specific entrance exam. However, if pursuing management degrees like BBA or MBA, some exams apply.</p>

<h3>Optional Exams</h3>

<ul>
  <li>For BBA – CUET, State CET, University-level exams</li>
  <li>For MBA – CAT, MAT, CMAT, XAT</li>
</ul>

<h3>Skill Assessments Used by Companies</h3>

<table border="1" cellpadding="6">
  <tr><th>Assessment</th><th>Purpose</th></tr>
  <tr><td>Aptitude Test</td><td>Checks reasoning & communication</td></tr>
  <tr><td>Case Study Solving</td><td>Evaluates decision-making</td></tr>
  <tr><td>Group Discussions</td><td>Tests leadership & coordination</td></tr>
  <tr><td>Interviews</td><td>Personality & management skills</td></tr>
</table>

<p>Entrance exams matter only for degrees; actual jobs rely more on management ability and communication.</p>
`,
        mr: `
<h3>प्रवेश परीक्षा आवश्यक आहे का?</h3>

<p>बहुतांश ऑपरेशन्स मॅनेजमेंट नोकऱ्यांसाठी <b>विशेष परीक्षा आवश्यक नसते</b>. परंतु BBA किंवा MBA करायचे असल्यास काही परीक्षा द्याव्या लागतात.</p>

<h3>पर्यायी परीक्षा</h3>

<ul>
  <li>BBA साठी – CUET, स्टेट CET, विद्यापीठ परीक्षा</li>
  <li>MBA साठी – CAT, MAT, CMAT, XAT</li>
</ul>

<h3>कंपन्यांकडून घेतल्या जाणाऱ्या चाचण्या</h3>

<table border="1" cellpadding="6">
  <tr><th>चाचणी</th><th>उद्देश</th></tr>
  <tr><td>अॅप्टिट्यूड टेस्ट</td><td>रिझनिंग व कम्युनिकेशन तपासणी</td></tr>
  <tr><td>केस स्टडी सोल्व्हिंग</td><td>निर्णयक्षमता तपासणी</td></tr>
  <tr><td>ग्रुप डिस्कशन</td><td>लीडरशिप व समन्वय</td></tr>
  <tr><td>इंटरव्ह्यू</td><td>व्यवस्थापन कौशल्य तपासणी</td></tr>
</table>

<p>डिग्रीसाठी परीक्षा लागते; नोकरीसाठी कौशल्य अधिक महत्त्वाचे.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Colleges & Scholarships", mr: "महाविद्यालये व शिष्यवृत्ती" },
      content: {
        en: `
<h3>Popular Courses for Operations Roles</h3>

<ul>
  <li>BBA – Bachelor of Business Administration</li>
  <li>BCom – Business & Management stream</li>
  <li>MBA – Operations / General Management</li>
  <li>Diploma in Business/Operations</li>
</ul>

<h3>Types of Institutes</h3>

<table border="1" cellpadding="6">
  <tr><th>Institute Type</th><th>Details</th></tr>
  <tr><td>Government Colleges</td><td>Affordable & reputed</td></tr>
  <tr><td>Private Colleges</td><td>Better industry exposure</td></tr>
  <tr><td>Management Institutes</td><td>Strong placement opportunities</td></tr>
</table>

<h3>Scholarships</h3>

<ul>
  <li>NSP scholarships</li>
  <li>State merit scholarships</li>
  <li>Private institute fee waivers</li>
</ul>

<p>Internships and management clubs in colleges help build strong experience.</p>
`,
        mr: `
<h3>ऑपरेशन्ससाठी लोकप्रिय कोर्सेस</h3>

<ul>
  <li>BBA – बिझनेस अॅडमिनिस्ट्रेशन</li>
  <li>BCom – बिझनेस/मॅनेजमेंट</li>
  <li>MBA – ऑपरेशन्स / जनरल मॅनेजमेंट</li>
  <li>बिझनेस/ऑपरेशन्स डिप्लोमा</li>
</ul>

<h3>महाविद्यालयांचे प्रकार</h3>

<table border="1" cellpadding="6">
  <tr><th>प्रकार</th><th>तपशील</th></tr>
  <tr><td>सरकारी कॉलेज</td><td>कमी फी व चांगली प्रतिष्ठा</td></tr>
  <tr><td>खाजगी कॉलेज</td><td>इंडस्ट्री एक्स्पोजर</td></tr>
  <tr><td>मॅनेजमेंट इन्स्टिट्यूट</td><td>उत्तम प्लेसमेंट संधी</td></tr>
</table>

<h3>शिष्यवृत्ती</h3>

<ul>
  <li>NSP शिष्यवृत्ती</li>
  <li>राज्य सरकार मेरिट शिष्यवृत्ती</li>
  <li>इन्स्टिट्यूट फी माफी योजना</li>
</ul>

<p>इंटर्नशिप आणि मॅनेजमेंट क्लबमुळे अनुभव मजबूत होतो.</p>
`
      }
    },

    {
      order: 5,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills Needed</h3>

<ul>
  <li><b>Leadership:</b> Managing teams effectively</li>
  <li><b>Communication:</b> Coordinating with departments</li>
  <li><b>Planning:</b> Workflow and resource allocation</li>
  <li><b>Problem-solving:</b> Handling operational issues</li>
  <li><b>Time Management</b></li>
</ul>

<h3>Important Tools</h3>

<table border="1" cellpadding="6">
  <tr><th>Category</th><th>Examples</th></tr>
  <tr><td>Project Management</td><td>Trello, Asana, Notion</td></tr>
  <tr><td>Analytics</td><td>Excel, Google Sheets, BI tools</td></tr>
  <tr><td>Communication</td><td>Slack, Email, Zoom</td></tr>
  <tr><td>Documentation</td><td>Docs, Reports, SOP tools</td></tr>
</table>

<h3>Soft Skills</h3>

<ul>
  <li>Decision-making</li>
  <li>Negotiation</li>
  <li>Conflict resolution</li>
</ul>
`,
        mr: `
<h3>आवश्यक कौशल्ये</h3>

<ul>
  <li><b>लीडरशिप:</b> टीमचे प्रभावी व्यवस्थापन</li>
  <li><b>कम्युनिकेशन:</b> विविध विभागांशी समन्वय</li>
  <li><b>नियोजन कौशल्य:</b> वर्कफ्लो व संसाधन वाटप</li>
  <li><b>समस्या सोडवणे:</b> ऑपरेशनल अडचणी हाताळणे</li>
  <li><b>टाइम मॅनेजमेंट</b></li>
</ul>

<h3>महत्त्वाची साधने</h3>

<table border="1" cellpadding="6">
  <tr><th>श्रेणी</th><th>उदाहरणे</th></tr>
  <tr><td>प्रोजेक्ट मॅनेजमेंट</td><td>Trello, Asana, Notion</td></tr>
  <tr><td>डेटा विश्लेषण</td><td>Excel, Google Sheets, BI tools</td></tr>
  <tr><td>संवाद साधने</td><td>Slack, Email, Zoom</td></tr>
  <tr><td>डॉक्युमेंटेशन</td><td>Reports, SOP tools</td></tr>
</table>

<h3>सॉफ्ट स्किल्स</h3>

<ul>
  <li>निर्णयक्षमता</li>
  <li>नेगोशिएशन</li>
  <li>कॉनफ्लिक्ट रिझोल्यूशन</li>
</ul>
`
      }
    },

    {
      order: 6,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth Levels</h3>

<table border="1" cellpadding="6">
  <tr><th>Level</th><th>Experience</th><th>Role</th></tr>
  <tr><td>Operations Executive</td><td>0–2 years</td><td>Daily coordination tasks</td></tr>
  <tr><td>Operations Supervisor</td><td>2–5 years</td><td>Team handling</td></tr>
  <tr><td>Operations Manager</td><td>5–8 years</td><td>Process ownership</td></tr>
  <tr><td>General Manager / Operations Head</td><td>8+ years</td><td>Business-level operations</td></tr>
</table>

<h3>Industries Hiring</h3>

<ul>
  <li>IT & Corporate Sector</li>
  <li>Retail Chains</li>
  <li>E-commerce</li>
  <li>Manufacturing</li>
  <li>Logistics & Supply Chain</li>
  <li>Hospitality</li>
</ul>

<p>Every industry requires operations professionals, making this career highly stable.</p>
`,
        mr: `
<h3>करिअर वाढ पातळी</h3>

<table border="1" cellpadding="6">
  <tr><th>पातळी</th><th>अनुभव</th><th>भूमिका</th></tr>
  <tr><td>ऑपरेशन्स एक्झिक्युटिव्ह</td><td>0–2 वर्षे</td><td>दैनंदिन समन्वय</td></tr>
  <tr><td>ऑपरेशन्स सुपरवायझर</td><td>2–5 वर्षे</td><td>टीम हाताळणे</td></tr>
  <tr><td>ऑपरेशन्स मॅनेजर</td><td>5–8 वर्षे</td><td>प्रक्रिया मालकी</td></tr>
  <tr><td>जनरल मॅनेजर / ऑपरेशन्स हेड</td><td>8+ वर्षे</td><td>व्यवसाय स्तरावरील संचालन</td></tr>
</table>

<h3>उद्योग जेथे मागणी आहे</h3>

<ul>
  <li>IT व कॉर्पोरेट क्षेत्र</li>
  <li>रिटेल चेन</li>
  <li>ई-कॉमर्स</li>
  <li>मॅन्युफॅक्चरिंग</li>
  <li>लॉजिस्टिक्स व सप्लाय चेन</li>
  <li>हॉस्पिटॅलिटी</li>
</ul>

<p>प्रत्येक उद्योगात ऑपरेशन्सची आवश्यकता असल्याने हे करिअर अत्यंत स्थिर आहे.</p>
`
      }
    },

    {
      order: 7,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Key Emerging Trends</h3>

<ul>
  <li><b>Automation in operations:</b> AI-based workflow tools</li>
  <li><b>Data-driven decision making</b></li>
  <li><b>Remote team coordination systems</b></li>
  <li><b>Lean management practices</b></li>
  <li><b>Supply chain digitization</b></li>
</ul>

<h3>Technological Impact</h3>

<table border="1" cellpadding="6">
  <tr><th>Trend</th><th>Impact</th></tr>
  <tr><td>AI Tools</td><td>Automate repetitive tasks</td></tr>
  <tr><td>ERP Systems</td><td>Better tracking & process control</td></tr>
  <tr><td>Cloud Collaboration</td><td>Easy multi-team coordination</td></tr>
</table>

<p>Future operations managers will rely heavily on analytics, automation, and cross-team leadership.</p>
`,
        mr: `
<h3>भविष्यातील प्रमुख ट्रेंड</h3>

<ul>
  <li><b>ऑटोमेशन:</b> AI आधारित वर्कफ्लो</li>
  <li><b>डेटा आधारित निर्णय</b></li>
  <li><b>रिमोट टीम समन्वय</b></li>
  <li><b>लीन मॅनेजमेंट तंत्र</b></li>
  <li><b>डिजिटल सप्लाय चेन</b></li>
</ul>

<h3>तांत्रिक प्रभाव</h3>

<table border="1" cellpadding="6">
  <tr><th>ट्रेंड</th><th>परिणाम</th></tr>
  <tr><td>AI टूल्स</td><td>पुन्हा पुन्हा कराव्या लागणाऱ्या कामांचे ऑटोमेशन</td></tr>
  <tr><td>ERP सिस्टम</td><td>प्रक्रिया ट्रॅकिंग सुधारते</td></tr>
  <tr><td>क्लाउड सहयोग</td><td>मल्टी-टीम समन्वय सोपा</td></tr>
</table>

<p>भविष्यातील ऑपरेशन्स मॅनेजर्सना डेटा, ऑटोमेशन आणि क्रॉस-टीम नेतृत्वावर अवलंबून राहावे लागेल.</p>
`
      }
    },

    {
      order: 8,
      title: { en: "Summary", mr: "सारांश" },
      content: {
        en: `
<h3>Quick Recap</h3>

<p>Operations management is a leadership-oriented career suitable for those who enjoy planning, organizing, and managing teams.</p>

<ul>
  <li>Works across multiple industries</li>
  <li>High growth potential</li>
  <li>Focus on communication & leadership</li>
  <li>Experience is highly valued</li>
</ul>

<h3>Next Steps</h3>

<ol>
  <li>Learn basics of business & management</li>
  <li>Improve teamwork and communication</li>
  <li>Gain internship experience</li>
  <li>Start as an Operations Executive</li>
</ol>

<p>This career is ideal for individuals who enjoy responsibility, coordination, and strategy.</p>
`,
        mr: `
<h3>थोडक्यात सारांश</h3>

<p>ऑपरेशन्स मॅनेजमेंट हे नेतृत्वावर आधारित करिअर आहे. नियोजन, समन्वय आणि टीम व्यवस्थापन आवडणाऱ्यांसाठी हे उत्तम क्षेत्र आहे.</p>

<ul>
  <li>अनेक उद्योगांमध्ये संधी</li>
  <li>वेगवान करिअर वाढ</li>
  <li>कम्युनिकेशन आणि लीडरशिप महत्त्वाचे</li>
  <li>अनुभवाला जास्त किंमत</li>
</ul>

<h3>पुढील पावले</h3>

<ol>
  <li>बिझनेस व मॅनेजमेंटचे बेसिक्स शिका</li>
  <li>टीमवर्क आणि कम्युनिकेशन सुधारवा</li>
  <li>इंटर्नशिप करा</li>
  <li>ऑपरेशन्स एक्झिक्युटिव्ह म्हणून सुरुवात करा</li>
</ol>

<p>जबाबदारी आणि समन्वय आवडणाऱ्यांसाठी हे करिअर सर्वोत्तम आहे.</p>
`
      }
    }
  ],
  C4: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What a Digital Media Strategist Does</h3>

<p>A Digital Media Strategist plans, creates, and manages online content and marketing campaigns across platforms like Instagram, YouTube, Facebook, Google, and websites.</p>

<p>Their role focuses on improving brand awareness, engagement, and online reach using data-driven strategies.</p>

<ul>
  <li>Planning digital marketing campaigns</li>
  <li>Creating content strategies for social media</li>
  <li>Analyzing audience data and trends</li>
  <li>Working with designers, content creators, and marketing teams</li>
  <li>Running ads and tracking performance</li>
</ul>

<h3>Typical Work Environment</h3>

<p>This role exists in almost every modern business—startups, agencies, IT companies, brands, and media houses.</p>

<table border="1" cellpadding="6">
  <tr><th>Work Setting</th><th>Details</th></tr>
  <tr><td>Marketing Agencies</td><td>Handling multiple brand campaigns</td></tr>
  <tr><td>Corporate Offices</td><td>Managing brand digital presence</td></tr>
  <tr><td>Startups</td><td>Growth-focused content planning</td></tr>
  <tr><td>Freelancing</td><td>Independent client handling</td></tr>
</table>
`,
        mr: `
<h3>डिजिटल मीडिया स्ट्रॅटेजिस्ट काय काम करतो?</h3>

<p>डिजिटल मीडिया स्ट्रॅटेजिस्ट इंस्टाग्राम, यूट्यूब, फेसबुक, गूगल आणि वेबसाइट्सवर ब्रँडसाठी कंटेंट आणि मार्केटिंग कॅम्पेनची योजना बनवतो आणि त्यांचे व्यवस्थापन करतो.</p>

<p>त्यांचे मुख्य उद्दिष्ट ब्रँडची ओळख, एंगेजमेंट आणि ऑनलाइन पोहोच वाढवणे असते.</p>

<ul>
  <li>डिजिटल मार्केटिंग कॅम्पेनची योजना बनवणे</li>
  <li>सोशल मीडिया कंटेंट स्ट्रॅटेजी तयार करणे</li>
  <li>प्रेक्षक डेटा व ट्रेंडचे विश्लेषण</li>
  <li>डिझाइनर, कंटेंट क्रिएटर्स आणि मार्केटिंग टीमसोबत काम</li>
  <li>जाहिराती चालवणे व त्यांची परफॉर्मन्स तपासणे</li>
</ul>

<h3>कामाचे वातावरण</h3>

<p>हे करिअर जवळजवळ सर्व व्यवसायांमध्ये आवश्यक आहे—स्टार्टअप्स, एजन्सीज, IT कंपन्या, ब्रँड्स आणि मीडिया हाऊसेस.</p>

<table border="1" cellpadding="6">
  <tr><th>कामाचे ठिकाण</th><th>तपशील</th></tr>
  <tr><td>मार्केटिंग एजन्सी</td><td>अनेक ब्रँड कॅम्पेन हाताळणे</td></tr>
  <tr><td>कॉर्पोरेट ऑफिस</td><td>ब्रँडचे डिजिटल व्यवस्थापन</td></tr>
  <tr><td>स्टार्टअप्स</td><td>वाढ-केंद्रित कंटेंट योजना</td></tr>
  <tr><td>फ्रीलान्स</td><td>स्वतःचे क्लायंट हाताळणे</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Path", mr: "पात्रता व मार्ग" },
      content: {
        en: `
<h3>Education & Eligibility</h3>

<p>Students from any stream can pursue digital media roles. Practical skills and creativity matter more than degrees.</p>

<table border="1" cellpadding="6">
  <tr><th>Education Level</th><th>Pathway</th></tr>
  <tr><td>12th Pass</td><td>Digital marketing certificate courses</td></tr>
  <tr><td>Graduation</td><td>BA/BCom/BBA/Mass Media</td></tr>
  <tr><td>Post-graduation</td><td>MBA in Marketing (optional)</td></tr>
</table>

<h3>Learning Path</h3>

<ol>
  <li>Learn basics of social media marketing</li>
  <li>Understand branding & content planning</li>
  <li>Master ad platforms (Meta Ads, Google Ads)</li>
  <li>Learn analytics tools</li>
  <li>Build a portfolio by handling small projects</li>
</ol>

<p>Real-world experience is the biggest asset in this field.</p>
`,
        mr: `
<h3>शिक्षण आणि पात्रता</h3>

<p>कोणत्याही शाखेतील विद्यार्थी हे करिअर निवडू शकतात. डिग्रीपेक्षा कौशल्ये आणि क्रिएटिव्हिटी अधिक महत्त्वाची असतात.</p>

<table border="1" cellpadding="6">
  <tr><th>शिक्षण</th><th>मार्ग</th></tr>
  <tr><td>१२वी</td><td>डिजिटल मार्केटिंग सर्टिफिकेट कोर्सेस</td></tr>
  <tr><td>पदवी</td><td>BA/BCom/BBA/मास मीडिया</td></tr>
  <tr><td>पदव्युत्तर</td><td>MBA (मार्केटिंग - पर्यायी)</td></tr>
</table>

<h3>शिकण्याचा मार्ग</h3>

<ol>
  <li>सोशल मीडिया मार्केटिंगचे बेसिक्स शिकणे</li>
  <li>ब्रँडिंग आणि कंटेंट प्लॅनिंग समजून घेणे</li>
  <li>जाहिरात प्लॅटफॉर्म (Meta Ads, Google Ads) शिकणे</li>
  <li>डेटा अॅनॅलिटिक्स समजून घेणे</li>
  <li>लहान प्रोजेक्ट्स हाताळून पोर्टफोलिओ तयार करणे</li>
</ol>

<p>या क्षेत्रात प्रत्यक्ष अनुभव सर्वात महत्त्वाचा असतो.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Entrance Exams", mr: "प्रवेश परीक्षा" },
      content: {
        en: `
<h3>Is There Any Entrance Exam?</h3>

<p>This career does <b>not</b> require any mandatory entrance exam. Skill-based roles depend on creativity, strategy, and analytics ability.</p>

<h3>If pursuing formal degrees</h3>

<ul>
  <li>For Mass Media – CUET / University exams</li>
  <li>For MBA Marketing – CAT, MAT, CMAT</li>
</ul>

<h3>Skill Assessments Companies Use</h3>

<table border="1" cellpadding="6">
  <tr><th>Assessment</th><th>Purpose</th></tr>
  <tr><td>Social Media Case Study</td><td>Judges creativity & planning</td></tr>
  <tr><td>Content Strategy Task</td><td>Checks understanding of audience</td></tr>
  <tr><td>Analytics Test</td><td>Reads data & campaign reports</td></tr>
</table>

<p>Even without exams, candidates with strong portfolios get hired easily.</p>
`,
        mr: `
<h3>प्रवेश परीक्षा आवश्यक आहे का?</h3>

<p>या करिअरसाठी <b>कोणतीही अनिवार्य प्रवेश परीक्षा नाही</b>. क्रिएटिव्हिटी, स्ट्रॅटेजी आणि डेटा विश्लेषण कौशल्य अधिक महत्त्वाचे असते.</p>

<h3>डिग्री करायची असल्यास</h3>

<ul>
  <li>मास मीडिया – CUET / विद्यापीठ परीक्षा</li>
  <li>MBA मार्केटिंग – CAT, MAT, CMAT</li>
</ul>

<h3>कंपन्यांकडून घेतल्या जाणाऱ्या चाचण्या</h3>

<table border="1" cellpadding="6">
  <tr><th>चाचणी</th><th>उद्देश</th></tr>
  <tr><td>सोशल मीडिया केस स्टडी</td><td>क्रिएटिव्हिटी व प्लॅनिंग तपासणी</td></tr>
  <tr><td>कंटेंट स्ट्रॅटेजी टास्क</td><td>प्रेक्षकांची समज तपासणे</td></tr>
  <tr><td>डेटा अॅनॅलिसिस टेस्ट</td><td>कॅम्पेन रिपोर्ट वाचण्याची क्षमता</td></tr>
</table>

<p>पोर्टफोलिओ मजबूत असेल तर परीक्षा नसतानाही नोकरी मिळते.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Colleges & Scholarships", mr: "महाविद्यालये व शिष्यवृत्ती" },
      content: {
        en: `
<h3>Popular Courses</h3>

<ul>
  <li>BA in Mass Media / Communication</li>
  <li>BBA / BCom (Marketing)</li>
  <li>Diploma in Digital Marketing</li>
  <li>MBA in Marketing</li>
</ul>

<h3>Types of Institutes</h3>

<table border="1" cellpadding="6">
  <tr><th>Institute Type</th><th>Details</th></tr>
  <tr><td>Media Colleges</td><td>Hands-on content & production training</td></tr>
  <tr><td>Management Colleges</td><td>Branding and marketing education</td></tr>
  <tr><td>Online Platforms</td><td>Google, Meta, Coursera, Udemy</td></tr>
</table>

<h3>Scholarships</h3>

<ul>
  <li>NSP Scholarships</li>
  <li>Institute merit-based discounts</li>
  <li>Marketing certifications sponsored programs</li>
</ul>

<p>Most students learn from online courses and real projects.</p>
`,
        mr: `
<h3>लोकप्रिय कोर्सेस</h3>

<ul>
  <li>BA मास मीडिया / कम्युनिकेशन</li>
  <li>BBA / BCom (मार्केटिंग)</li>
  <li>डिजिटल मार्केटिंग डिप्लोमा</li>
  <li>MBA (मार्केटिंग)</li>
</ul>

<h3>महाविद्यालयांचे प्रकार</h3>

<table border="1" cellpadding="6">
  <tr><th>प्रकार</th><th>तपशील</th></tr>
  <tr><td>मीडिया कॉलेज</td><td>कंटेंट व प्रोडक्शनचे प्रॅक्टिकल ट्रेनिंग</td></tr>
  <tr><td>मॅनेजमेंट कॉलेज</td><td>ब्रँडिंग आणि मार्केटिंग शिक्षण</td></tr>
  <tr><td>ऑनलाइन प्लॅटफॉर्म</td><td>Google, Meta, Coursera, Udemy</td></tr>
</table>

<h3>शिष्यवृत्ती</h3>

<ul>
  <li>NSP शिष्यवृत्ती</li>
  <li>इन्स्टिट्यूट मेरिट डिस्काउंट</li>
  <li>मार्केटिंग सर्टिफिकेशन योजना</li>
</ul>

<p>बहुतांश विद्यार्थी ऑनलाइन कोर्सेस व प्रोजेक्ट्समधून शिकतात.</p>
`
      }
    },

    {
      order: 5,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills Needed</h3>

<ul>
  <li><b>Creativity:</b> Planning engaging content</li>
  <li><b>Analytical Thinking:</b> Reading data & insights</li>
  <li><b>Communication:</b> Writing captions, scripts, briefs</li>
  <li><b>Marketing Understanding</b></li>
  <li><b>Trend Analysis</b></li>
</ul>

<h3>Important Tools</h3>

<table border="1" cellpadding="6">
  <tr><th>Category</th><th>Tools</th></tr>
  <tr><td>Analytics</td><td>Google Analytics, Meta Insights</td></tr>
  <tr><td>Content Planning</td><td>Canva, Notion, Trello</td></tr>
  <tr><td>Ad Platforms</td><td>Meta Ads, Google Ads</td></tr>
  <tr><td>SEO Tools</td><td>Ahrefs, SEMrush</td></tr>
</table>

<h3>Soft Skills</h3>

<ul>
  <li>Creativity & storytelling</li>
  <li>Client communication</li>
  <li>Teamwork</li>
</ul>
`,
        mr: `
<h3>आवश्यक कौशल्ये</h3>

<ul>
  <li><b>क्रिएटिव्हिटी:</b> आकर्षक कंटेंट प्लॅनिंग</li>
  <li><b>डेटा विश्लेषण:</b> इनसाइट्स समजणे</li>
  <li><b>कम्युनिकेशन:</b> कॅप्शन्स, स्क्रिप्ट्स, ब्रिफ लिहिणे</li>
  <li><b>मार्केटिंगची समज</b></li>
  <li><b>ट्रेंड अॅनालिसिस</b></li>
</ul>

<h3>महत्त्वाची साधने</h3>

<table border="1" cellpadding="6">
  <tr><th>श्रेणी</th><th>साधने</th></tr>
  <tr><td>अॅनालिटिक्स</td><td>Google Analytics, Meta Insights</td></tr>
  <tr><td>कंटेंट प्लॅनिंग</td><td>Canva, Notion, Trello</td></tr>
  <tr><td>जाहिरात प्लॅटफॉर्म</td><td>Meta Ads, Google Ads</td></tr>
  <tr><td>SEO साधने</td><td>Ahrefs, SEMrush</td></tr>
</table>

<h3>सॉफ्ट स्किल्स</h3>

<ul>
  <li>स्टोरीटेलिंग</li>
  <li>क्लायंट कम्युनिकेशन</li>
  <li>टीमवर्क</li>
</ul>
`
      }
    },

    {
      order: 6,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth Levels</h3>

<table border="1" cellpadding="6">
  <tr><th>Level</th><th>Experience</th><th>Role</th></tr>
  <tr><td>Social Media Executive</td><td>0–2 years</td><td>Posting, basic content</td></tr>
  <tr><td>Digital Marketing Associate</td><td>2–4 years</td><td>Campaign planning</td></tr>
  <tr><td>Digital Strategist</td><td>4–7 years</td><td>Brand strategy, analytics</td></tr>
  <tr><td>Marketing Manager</td><td>7+ years</td><td>Full marketing leadership</td></tr>
</table>

<h3>Industries Hiring</h3>

<ul>
  <li>Digital agencies</li>
  <li>IT & startups</li>
  <li>Retail & e-commerce brands</li>
  <li>Media companies</li>
  <li>Healthcare, education, real estate</li>
</ul>

<p>Every business needs digital presence, so demand continues to grow.</p>
`,
        mr: `
<h3>करिअर वाढ पातळी</h3>

<table border="1" cellpadding="6">
  <tr><th>पातळी</th><th>अनुभव</th><th>भूमिका</th></tr>
  <tr><td>सोशल मीडिया एक्झिक्युटिव्ह</td><td>0–2 वर्षे</td><td>पोस्टिंग, बेसिक कंटेंट</td></tr>
  <tr><td>डिजिटल मार्केटिंग असोसिएट</td><td>2–4 वर्षे</td><td>कॅम्पेन प्लॅनिंग</td></tr>
  <tr><td>डिजिटल स्ट्रॅटेजिस्ट</td><td>4–7 वर्षे</td><td>ब्रँड स्ट्रॅटेजी, अॅनालिटिक्स</td></tr>
  <tr><td>मार्केटिंग मॅनेजर</td><td>7+ वर्षे</td><td>पूर्ण मार्केटिंग लीडरशिप</td></tr>
</table>

<h3>उद्योग जेथे संधी आहेत</h3>

<ul>
  <li>डिजिटल एजन्सीज</li>
  <li>IT व स्टार्टअप्स</li>
  <li>ई-कॉमर्स ब्रँड्स</li>
  <li>मीडिया कंपन्या</li>
  <li>हेल्थकेअर, एज्युकेशन, रिअल इस्टेट</li>
</ul>

<p>प्रत्येक व्यवसायाला डिजिटल उपस्थिती लागते, त्यामुळे मागणी सतत वाढत आहे.</p>
`
      }
    },

    {
      order: 7,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Emerging Trends</h3>

<ul>
  <li><b>AI-driven content & analytics</b></li>
  <li><b>Short-form video dominance</b></li>
  <li><b>Influencer-driven campaigns</b></li>
  <li><b>Personalized advertising</b></li>
  <li><b>Voice search & conversational marketing</b></li>
</ul>

<h3>Technological Impact</h3>

<table border="1" cellpadding="6">
  <tr><th>Trend</th><th>Impact</th></tr>
  <tr><td>AI Tools</td><td>Faster content planning</td></tr>
  <tr><td>Automation Platforms</td><td>Better scheduling & targeting</td></tr>
  <tr><td>Advanced Analytics</td><td>Stronger data insights</td></tr>
</table>

<p>Digital media roles will keep expanding as businesses continue shifting online.</p>
`,
        mr: `
<h3>उभरते ट्रेंड</h3>

<ul>
  <li><b>AI आधारित कंटेंट व अॅनालिटिक्स</b></li>
  <li><b>शॉर्ट व्हिडिओंचे वर्चस्व</b></li>
  <li><b>इन्फ्लुएंसर मार्केटिंग वाढ</b></li>
  <li><b>वैयक्तिकृत जाहिराती</b></li>
  <li><b>व्हॉईस सर्च व संवादात्मक मार्केटिंग</b></li>
</ul>

<h3>तांत्रिक प्रभाव</h3>

<table border="1" cellpadding="6">
  <tr><th>ट्रेंड</th><th>परिणाम</th></tr>
  <tr><td>AI टूल्स</td><td>कंटेंट प्लॅनिंग जलद</td></tr>
  <tr><td>ऑटोमेशन प्लॅटफॉर्म</td><td>बेहतर शेड्युलिंग</td></tr>
  <tr><td>अॅडव्हान्स्ड अॅनालिटिक्स</td><td>मजबूत डेटा इनसाइट्स</td></tr>
</table>

<p>डिजिटल मीडिया करिअर सतत वाढत राहणार आहे कारण व्यवसाय जलद गतीने ऑनलाइन होत आहेत.</p>
`
      }
    },

    {
      order: 8,
      title: { en: "Summary", mr: "सारांश" },
      content: {
        en: `
<h3>Quick Recap</h3>

<p>A Digital Media Strategist helps brands grow online using creativity, planning, and data insights.</p>

<ul>
  <li>High demand across industries</li>
  <li>Beginner-friendly career</li>
  <li>Freelance and remote work options</li>
  <li>Skills matter more than degrees</li>
</ul>

<h3>Next Steps</h3>

<ol>
  <li>Learn basics of digital marketing</li>
  <li>Build content & campaign samples</li>
  <li>Create a portfolio</li>
  <li>Apply for internships</li>
</ol>

<p>This career is ideal for creative thinkers who enjoy social media and brand building.</p>
`,
        mr: `
<h3>थोडक्यात सारांश</h3>

<p>डिजिटल मीडिया स्ट्रॅटेजिस्ट ब्रँडची ऑनलाइन वाढ क्रिएटिव्हिटी, प्लॅनिंग आणि डेटा इनसाइट्सच्या साहाय्याने करतो.</p>

<ul>
  <li>अनेक उद्योगांमध्ये मोठी मागणी</li>
  <li>सुरुवातीला शिकणे सोपे</li>
  <li>फ्रीलान्स व रिमोट संधी</li>
  <li>डिग्रीपेक्षा कौशल्य अधिक महत्त्वाचे</li>
</ul>

<h3>पुढील पावले</h3>

<ol>
  <li>डिजिटल मार्केटिंगचे बेसिक्स शिका</li>
  <li>कॅम्पेन व कंटेंट नमुने तयार करा</li>
  <li>पोर्टफोलिओ बनवा</li>
  <li>इंटर्नशिपसाठी अर्ज करा</li>
</ol>

<p>सोशल मीडिया, कंटेंट आणि ब्रँड बिल्डिंग आवडणाऱ्यांसाठी हे करिअर उत्तम आहे.</p>
`
      }
    }
  ],
  C5: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What a UX/UI Designer Does</h3>

<p>A UX/UI Designer creates user-friendly and visually appealing digital experiences for apps, websites, and software products. They focus on how users interact with a product and design smooth, intuitive interfaces.</p>

<p>The role includes:</p>

<ul>
  <li>Understanding user needs through research</li>
  <li>Creating wireframes, layouts, and design flows</li>
  <li>Designing attractive user interfaces</li>
  <li>Testing designs to improve usability</li>
  <li>Collaborating with developers and product teams</li>
</ul>

<h3>Typical Work Environment</h3>

<p>UX/UI designers work in tech companies, product-based companies, startups, design studios, and agencies.</p>

<table border="1" cellpadding="6">
  <tr><th>Work Setting</th><th>Details</th></tr>
  <tr><td>Tech Companies</td><td>Designing app & web interfaces</td></tr>
  <tr><td>Product Startups</td><td>User experience improvements</td></tr>
  <tr><td>Agencies</td><td>Multiple client projects</td></tr>
  <tr><td>Freelancing</td><td>Independent design projects</td></tr>
</table>
`,
        mr: `
<h3>UX/UI डिझायनर काय काम करतो?</h3>

<p>UX/UI डिझायनर मोबाईल अॅप, वेबसाइट आणि सॉफ्टवेअर यांसाठी आकर्षक आणि वापरण्यास सोपे डिजिटल अनुभव तयार करतो. तो वापरकर्ता उत्पादनाशी कसा संवाद साधतो हे समजून डिझाइन सुधारतो.</p>

<p>या भूमिकेत खालील कामे येतात:</p>

<ul>
  <li>वापरकर्त्यांच्या गरजा समजून घेणे</li>
  <li>वायरफ्रेम्स आणि लेआउट तयार करणे</li>
  <li>आकर्षक युजर इंटरफेस डिझाइन करणे</li>
  <li>डिझाइन टेस्ट करून उपयोगिता वाढवणे</li>
  <li>डेव्हलपर्स आणि प्रोडक्ट टीमसोबत सहकार्य</li>
</ul>

<h3>कामाचे वातावरण</h3>

<p>UX/UI डिझायनर IT कंपन्या, प्रोडक्ट कंपन्या, स्टार्टअप्स, डिझाइन स्टुडिओ आणि एजन्सीजमध्ये काम करतात.</p>

<table border="1" cellpadding="6">
  <tr><th>कामाचे ठिकाण</th><th>तपशील</th></tr>
  <tr><td>टेक कंपन्या</td><td>अॅप आणि वेबसाइट डिझाइन</td></tr>
  <tr><td>स्टार्टअप्स</td><td>युजर एक्स्पीरियन्स सुधारणा</td></tr>
  <tr><td>एजन्सीज</td><td>अनेक क्लायंट प्रोजेक्ट्स</td></tr>
  <tr><td>फ्रीलान्स</td><td>स्वतःची डिझाइन कामे</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Path", mr: "पात्रता व मार्ग" },
      content: {
        en: `
<h3>Education & Eligibility</h3>

<p>UX/UI design is open to students from all educational backgrounds. Creativity and design thinking matter more than degrees.</p>

<table border="1" cellpadding="6">
  <tr><th>Education Level</th><th>Pathway</th></tr>
  <tr><td>12th Pass (Any Stream)</td><td>Short-term design courses</td></tr>
  <tr><td>Graduation</td><td>BA Design, BSc Design, BDes (optional)</td></tr>
  <tr><td>Self-learning</td><td>Online UX/UI certification</td></tr>
</table>

<h3>Learning Path</h3>

<ol>
  <li>Learn basics of design & user psychology</li>
  <li>Understand layout, color theory, and typography</li>
  <li>Practice wireframing & prototyping</li>
  <li>Use tools like Figma, XD, Sketch</li>
  <li>Create a portfolio with real-world projects</li>
</ol>

<p>You can become a UX/UI designer without any degree—portfolio matters most.</p>
`,
        mr: `
<h3>शिक्षण आणि पात्रता</h3>

<p>UX/UI डिझाइन सर्व शाखेतील विद्यार्थ्यांसाठी उपलब्ध आहे. डिग्रीपेक्षा क्रिएटिव्हिटी आणि डिझाइन थिंकिंग अधिक महत्त्वाचे.</p>

<table border="1" cellpadding="6">
  <tr><th>शिक्षण</th><th>मार्ग</th></tr>
  <tr><td>१२वी (कोणतीही शाखा)</td><td>शॉर्ट-टर्म डिझाइन कोर्सेस</td></tr>
  <tr><td>पदवी</td><td>BA Design, BSc Design, BDes (पर्यायी)</td></tr>
  <tr><td>सेल्फ-लर्निंग</td><td>ऑनलाइन UX/UI सर्टिफिकेशन</td></tr>
</table>

<h3>शिकण्याचा मार्ग</h3>

<ol>
  <li>डिझाइनचे बेसिक्स आणि युजर सायकॉलॉजी शिकणे</li>
  <li>लेआउट, कलर थिअरी आणि टायपोग्राफी समजून घेणे</li>
  <li>वायरफ्रेम व प्रोटोटाइप तयार करणे</li>
  <li>Figma, XD, Sketch वापरणे</li>
  <li>रिअल प्रोजेक्ट्ससह पोर्टफोलिओ बनवणे</li>
</ol>

<p>डिग्रीशिवायही UX/UI डिझायनर बनता येते—पोर्टफोलिओ सर्वात महत्त्वाचा.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Entrance Exams", mr: "प्रवेश परीक्षा" },
      content: {
        en: `
<h3>Is There Any Entrance Exam?</h3>

<p>Most UX/UI careers do <b>not</b> require entrance exams. However, if you pursue a formal design degree, some exams apply.</p>

<h3>Optional Exams for Degrees</h3>

<ul>
  <li>NID DAT – for Bachelor of Design</li>
  <li>UCEED – IIT design programs</li>
  <li>Private design school entrance tests</li>
</ul>

<h3>Skill Tests Used by Employers</h3>

<table border="1" cellpadding="6">
  <tr><th>Test</th><th>Purpose</th></tr>
  <tr><td>Design Task</td><td>Evaluate creativity & problem-solving</td></tr>
  <tr><td>Portfolio Review</td><td>Check real projects</td></tr>
  <tr><td>Usability Challenge</td><td>Assess user experience thinking</td></tr>
</table>

<p>Practical work and portfolio hold more value than exams.</p>
`,
        mr: `
<h3>प्रवेश परीक्षा आवश्यक आहे का?</h3>

<p>बहुतांश UX/UI नोकऱ्यांसाठी <b>प्रवेश परीक्षा लागत नाही</b>. परंतु डिझाइनची औपचारिक पदवी करायची असल्यास काही परीक्षा आवश्यक असतात.</p>

<h3>डिग्रीसाठी पर्यायी परीक्षा</h3>

<ul>
  <li>NID DAT – Bachelor of Design</li>
  <li>UCEED – IIT डिझाइन प्रोग्राम</li>
  <li>खाजगी डिझाइन स्कूल परीक्षा</li>
</ul>

<h3>कंपन्यांच्या कौशल्य चाचण्या</h3>

<table border="1" cellpadding="6">
  <tr><th>चाचणी</th><th>उद्देश</th></tr>
  <tr><td>डिझाइन टास्क</td><td>क्रिएटिव्हिटी व समस्या सोडवणे</td></tr>
  <tr><td>पोर्टफोलिओ तपासणी</td><td>रिअल प्रोजेक्ट्सचे मूल्यांकन</td></tr>
  <tr><td>युजेबिलिटी चॅलेंज</td><td>UX विचार समजणे</td></tr>
</table>

<p>प्रोजेक्ट्स आणि पोर्टफोलिओला परीक्षेपेक्षा जास्त महत्त्व दिले जाते.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Colleges & Scholarships", mr: "महाविद्यालये व शिष्यवृत्ती" },
      content: {
        en: `
<h3>Popular Courses for UX/UI</h3>

<ul>
  <li>BDes (Design)</li>
  <li>BA in Digital Design</li>
  <li>Diploma in UI/UX Design</li>
  <li>Online Certifications</li>
</ul>

<h3>Types of Institutes</h3>

<table border="1" cellpadding="6">
  <tr><th>Institute</th><th>Details</th></tr>
  <tr><td>Design Colleges</td><td>Hands-on projects & labs</td></tr>
  <tr><td>Private Institutes</td><td>Industry-focused training</td></tr>
  <tr><td>Online Platforms</td><td>Coursera, Udemy, Google UX</td></tr>
</table>

<h3>Scholarships</h3>

<ul>
  <li>National Design Scholarships</li>
  <li>Institute-based fee waivers</li>
  <li>Private scholarship programs</li>
</ul>

<p>Most designers build their skills through practice, not expensive colleges.</p>
`,
        mr: `
<h3>UX/UI साठी लोकप्रिय कोर्सेस</h3>

<ul>
  <li>BDes (डिझाइन)</li>
  <li>BA डिजिटल डिझाइन</li>
  <li>UI/UX डिप्लोमा</li>
  <li>ऑनलाइन सर्टिफिकेट्स</li>
</ul>

<h3>महाविद्यालयांचे प्रकार</h3>

<table border="1" cellpadding="6">
  <tr><th>प्रकार</th><th>तपशील</th></tr>
  <tr><td>डिझाइन कॉलेज</td><td>प्रॅक्टिकल प्रोजेक्ट्स व लॅब्स</td></tr>
  <tr><td>खाजगी संस्था</td><td>इंडस्ट्री-फोकस्ड ट्रेनिंग</td></tr>
  <tr><td>ऑनलाइन प्लॅटफॉर्म</td><td>Coursera, Udemy, Google UX</td></tr>
</table>

<h3>शिष्यवृत्ती</h3>

<ul>
  <li>नॅशनल डिझाइन शिष्यवृत्ती</li>
  <li>इन्स्टिट्यूट फी माफी योजना</li>
  <li>खाजगी शिष्यवृत्ती प्रोग्राम</li>
</ul>

<p>बहुतांश डिझाइनर्स महागड्या कॉलेजपेक्षा प्रॅक्टिकल प्रोजेक्ट्समधून कौशल्य विकसित करतात.</p>
`
      }
    },

    {
      order: 5,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills Needed</h3>

<ul>
  <li><b>User research:</b> Understanding user behavior</li>
  <li><b>Wireframing:</b> Structuring layouts & flows</li>
  <li><b>Visual design:</b> Colors, typography, spacing</li>
  <li><b>Prototyping:</b> Interactive design demos</li>
  <li><b>Communication:</b> Explaining design decisions</li>
</ul>

<h3>Key Tools</h3>

<table border="1" cellpadding="6">
  <tr><th>Category</th><th>Tools</th></tr>
  <tr><td>Design Tools</td><td>Figma, Adobe XD, Sketch</td></tr>
  <tr><td>Prototyping</td><td>Figma, InVision</td></tr>
  <tr><td>Research Tools</td><td>Maze, UsabilityHub</td></tr>
  <tr><td>Collaboration</td><td>Notion, Miro</td></tr>
</table>

<h3>Soft Skills</h3>

<ul>
  <li>Creative thinking</li>
  <li>Empathy</li>
  <li>Attention to detail</li>
</ul>
`,
        mr: `
<h3>आवश्यक कौशल्ये</h3>

<ul>
  <li><b>युजर रिसर्च:</b> वापरकर्त्यांची गरज समजणे</li>
  <li><b>वायरफ्रेमिंग:</b> लेआउट व फ्लो स्ट्रक्चर</li>
  <li><b>व्हिज्युअल डिझाइन:</b> रंग, टायपोग्राफी, स्पेसिंग</li>
  <li><b>प्रोटोटायपिंग:</b> इंटरअॅक्टिव्ह डिझाइन डेमो</li>
  <li><b>कम्युनिकेशन:</b> डिझाइन निर्णय स्पष्ट करणे</li>
</ul>

<h3>महत्त्वाची साधने</h3>

<table border="1" cellpadding="6">
  <tr><th>श्रेणी</th><th>साधने</th></tr>
  <tr><td>डिझाइन टूल्स</td><td>Figma, Adobe XD, Sketch</td></tr>
  <tr><td>प्रोटोटायपिंग</td><td>Figma, InVision</td></tr>
  <tr><td>रिसर्च टूल्स</td><td>Maze, UsabilityHub</td></tr>
  <tr><td>कोलॅबोरेशन</td><td>Notion, Miro</td></tr>
</table>

<h3>सॉफ्ट स्किल्स</h3>

<ul>
  <li>क्रिएटिव्ह थिंकिंग</li>
  <li>एम्पथी</li>
  <li>बारकाईने पाहण्याची क्षमता</li>
</ul>
`
      }
    },

    {
      order: 6,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth Levels</h3>

<table border="1" cellpadding="6">
  <tr><th>Level</th><th>Experience</th><th>Role</th></tr>
  <tr><td>Junior UX/UI Designer</td><td>0–2 years</td><td>Basic layouts & wireframes</td></tr>
  <tr><td>UX/UI Designer</td><td>2–5 years</td><td>Full product screens & flows</td></tr>
  <tr><td>Senior Designer</td><td>5–8 years</td><td>Design leadership</td></tr>
  <tr><td>UX Lead / Product Designer</td><td>8+ years</td><td>Strategy & team guidance</td></tr>
</table>

<h3>Industries Hiring Designers</h3>

<ul>
  <li>IT & Software Companies</li>
  <li>Fintech & Edtech</li>
  <li>E-commerce</li>
  <li>Health & Fitness Apps</li>
  <li>Design Agencies</li>
</ul>

<p>Demand for UX/UI designers is increasing rapidly as businesses shift online.</p>
`,
        mr: `
<h3>करिअर वाढ पातळी</h3>

<table border="1" cellpadding="6">
  <tr><th>पातळी</th><th>अनुभव</th><th>भूमिका</th></tr>
  <tr><td>ज्युनियर UX/UI डिझायनर</td><td>0–2 वर्षे</td><td>बेसिक वायरफ्रेम्स</td></tr>
  <tr><td>UX/UI डिझायनर</td><td>2–5 वर्षे</td><td>प्रोडक्ट स्क्रीन आणि फ्लोज</td></tr>
  <tr><td>सीनियर डिझायनर</td><td>5–8 वर्षे</td><td>डिझाइन नेतृत्व</td></tr>
  <tr><td>UX लीड / प्रोडक्ट डिझायनर</td><td>8+ वर्षे</td><td>स्ट्रॅटेजी व टीम मार्गदर्शन</td></tr>
</table>

<h3>ज्या उद्योगांत मागणी आहे</h3>

<ul>
  <li>IT आणि सॉफ्टवेअर</li>
  <li>Fintech, Edtech</li>
  <li>E-commerce</li>
  <li>हेल्थ व फिटनेस अॅप्स</li>
  <li>डिझाइन एजन्सीज</li>
</ul>

<p>व्यवसाय डिजिटल होत असल्याने UX/UI ची मागणी झपाट्याने वाढते आहे.</p>
`
      }
    },

    {
      order: 7,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Emerging Trends in UX/UI</h3>

<ul>
  <li><b>AI-assisted design workflows</b></li>
  <li><b>Design systems & component libraries</b></li>
  <li><b>Voice-based UI (VUI)</b></li>
  <li><b>AR/VR experiences</b></li>
  <li><b>Personalized user journeys</b></li>
</ul>

<h3>Technological Impact</h3>

<table border="1" cellpadding="6">
  <tr><th>Trend</th><th>Impact</th></tr>
  <tr><td>AI Tools</td><td>Faster prototyping & idea generation</td></tr>
  <tr><td>Micro-interactions</td><td>Enhanced user engagement</td></tr>
  <tr><td>3D/Immersive UI</td><td>Next-level visual experiences</td></tr>
</table>

<p>The future of UX/UI will blend creativity with emerging technologies.</p>
`,
        mr: `
<h3>UX/UI मधील उभरते ट्रेंड</h3>

<ul>
  <li><b>AI-assisted डिझाइन</b></li>
  <li><b>डिझाइन सिस्टिम्स आणि कॉम्पोनेंट लायब्ररी</b></li>
  <li><b>व्हॉईस इंटरफेस (VUI)</b></li>
  <li><b>AR/VR आधारित अनुभव</b></li>
  <li><b>वैयक्तिकृत युजर जर्नी</b></li>
</ul>

<h3>तांत्रिक प्रभाव</h3>

<table border="1" cellpadding="6">
  <tr><th>ट्रेंड</th><th>परिणाम</th></tr>
  <tr><td>AI साधने</td><td>जलद प्रोटोटायपिंग</td></tr>
  <tr><td>मायक्रो-इंटरअॅक्शन्स</td><td>युजर एंगेजमेंट वाढ</td></tr>
  <tr><td>3D/इमर्सिव्ह UI</td><td>उत्कृष्ट व्हिज्युअल अनुभव</td></tr>
</table>

<p>भविष्यातील UX/UI मध्ये क्रिएटिव्हिटी आणि अत्याधुनिक तंत्रज्ञान यांचे मिश्रण असेल.</p>
`
      }
    },

    {
      order: 8,
      title: { en: "Summary", mr: "सारांश" },
      content: {
        en: `
<h3>Quick Recap</h3>

<p>UX/UI design is a fast-growing, creative, and high-demand career that shapes digital product experiences.</p>

<ul>
  <li>Beginner-friendly with strong growth</li>
  <li>Portfolio more important than degree</li>
  <li>High demand in tech companies</li>
  <li>Freelance and remote work opportunities</li>
</ul>

<h3>Next Steps</h3>

<ol>
  <li>Learn design fundamentals</li>
  <li>Practice wireframes and UI styles</li>
  <li>Build a strong portfolio</li>
  <li>Apply for internships or freelance projects</li>
</ol>

<p>This career is perfect for students who enjoy creativity, problem-solving, and digital design.</p>
`,
        mr: `
<h3>थोडक्यात सारांश</h3>

<p>UX/UI डिझाइन हे वेगाने वाढणारे आणि क्रिएटिव्ह करिअर आहे जे डिजिटल उत्पादने अधिक वापरकर्ता-अनुकूल बनवते.</p>

<ul>
  <li>सुरुवातीला शिकणे सोपे</li>
  <li>डिग्रीपेक्षा पोर्टफोलिओ महत्त्वाचा</li>
  <li>टेक कंपन्यांमध्ये मोठी मागणी</li>
  <li>फ्रीलान्स व रिमोट कामाची संधी</li>
</ul>

<h3>पुढील पावले</h3>

<ol>
  <li>डिझाइनचे बेसिक्स शिका</li>
  <li>वायरफ्रेम आणि UI स्टाइलचा सराव करा</li>
  <li>मजबूत पोर्टफोलिओ तयार करा</li>
  <li>इंटर्नशिप किंवा फ्रीलान्स प्रोजेक्ट्स घ्या</li>
</ol>

<p>क्रिएटिव्ह विचार करणाऱ्या आणि डिजिटल डिझाइन आवडणाऱ्या विद्यार्थ्यांसाठी हे करिअर उत्कृष्ट आहे.</p>
`
      }
    }
  ],
  C6: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What a Drone Operator Does</h3>

<p>A Drone Operator pilots unmanned aerial vehicles (UAVs) to capture aerial photos/videos, perform surveys, inspect infrastructure, and support mapping, agriculture, and emergency operations.</p>

<ul>
  <li>Operate drones safely within regulations</li>
  <li>Plan flights and mission objectives</li>
  <li>Capture high-quality imagery or sensor data</li>
  <li>Perform basic maintenance and pre-flight checks</li>
  <li>Process or hand over captured data to analysts</li>
</ul>

<h3>Typical Work Settings</h3>
<table border="1" cellpadding="6">
  <tr><th>Setting</th><th>Details</th></tr>
  <tr><td>Film & Media</td><td>Aerial cinematography for events and productions</td></tr>
  <tr><td>Agriculture</td><td>Crop monitoring, spraying, NDVI surveys</td></tr>
  <tr><td>Survey & Mapping</td><td>Topographic surveys and orthomosaic creation</td></tr>
  <tr><td>Inspection</td><td>Roof, tower, pipeline, and solar farm inspections</td></tr>
  <tr><td>Emergency Services</td><td>Search & rescue, disaster assessment</td></tr>
</table>
        `,
        mr: `
<h3>ड्रोन ऑपरेटर काय करतो?</h3>

<p>ड्रोन ऑपरेटर अनमॅनड एरियल व्हेइकल्स (UAV) चालवून एरियल फोटो/व्हिडिओ घेणे, सर्व्हे करणे, इन्फ्रास्ट्रक्चर तपासणी करणे आणि नकाशे, शेती व अपात्कालीन कामांमध्ये मदत करतो.</p>

<ul>
  <li>नियमांचे पालन करून ड्रोन सुरक्षितपणे ऑपरेट करणे</li>
  <li>फ्लाइट व मिशनचे नियोजन करणे</li>
  <li>उच्च दर्जाचे इमेजरी किंवा सेन्सर डेटा कॅप्चर करणे</li>
  <li>लहान-मोठे देखभाल व प्री-फ्लाइट चेक करणे</li>
  <li>कॅप्चर केलेला डेटा विश्लेषकाकडे सुपूर्द करणे किंवा प्रक्रिया करणे</li>
</ul>

<h3>सामान्य कार्यस्थळे</h3>
<table border="1" cellpadding="6">
  <tr><th>ठिकाण</th><th>तपशील</th></tr>
  <tr><td>चित्रपट व मीडिया</td><td>इव्हेंट्स व प्रॉडक्शनसाठी एरियल सिनेमॅटोग्राफी</td></tr>
  <tr><td>शेती</td><td>पिक निरीक्षण, स्प्रेइंग, NDVI सर्व्हे</td></tr>
  <tr><td>सर्व्हे व मॅपिंग</td><td>टॉपोग्राफिक सर्व्हे व ऑर्थोमोसायक तयार करणे</td></tr>
  <tr><td>इन्स्पेक्शन</td><td>रूफ, टॉवर, पाइपलाइन व सोलर फॉर्म तपासणी</td></tr>
  <tr><td>आपत्कालीन सेवा</td><td>शोध व मदत, आपत्तीाचे मूल्यमापन</td></tr>
</table>
        `
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Training", mr: "पात्रता व प्रशिक्षण" },
      content: {
        en: `
<h3>Who Can Become a Drone Operator</h3>

<p>Basic eligibility is flexible: 10th/12th pass is sufficient for many vocational programs. Good eyesight, basic mechanical aptitude, and comfort with technology help.</p>

<h3>Training Path</h3>
<ol>
  <li>Enroll in a recognised drone pilot course</li>
  <li>Learn aviation basics, airspace rules, and safety procedures</li>
  <li>Get hands-on flight training with different drone platforms</li>
  <li>Practice mission planning, data capture, and post-processing</li>
  <li>Complete simulator sessions and supervised real flights</li>
</ol>

<p>Additional training areas: camera operation, GIS basics, payload handling (sprayers, multispectral sensors).</p>
        `,
        mr: `
<h3>कोण ड्रोन ऑपरेटर बनू शकतो?</h3>

<p>१०वी/१२वी उत्तीर्ण असणे अनेक व्यावसायिक कोर्सेससाठी पुरेसे असते. चांगले दृष्टी, तांत्रिक समज आणि यंत्रसामग्रीशी काम करण्यात आराम हवे.</p>

<h3>प्रशिक्षणाचा मार्ग</h3>
<ol>
  <li>मान्यताप्राप्त ड्रोन पायलट कोर्समध्ये नाव नोंद करणे</li>
  <li>एव्हिएशन मूलभूत, एअरस्पेस नियम आणि सुरक्षा प्रक्रियेचे शिक्षण</li>
  <li>वेगवेगळ्या ड्रोन प्लॅटफॉर्मवर हाताळणी प्रशिक्षण</li>
  <li>मिशन नियोजन, डेटा कॅप्चर व पोस्ट-प्रोसेसिंगचा सराव</li>
  <li>सिम्युलेटर सत्र व सुपर्व्हाइझ्ड रियल फ्लाइट</li>
</ol>

<p>अतिरिक्त प्रशिक्षण: कॅमेरा ऑपरेशन, GIS मूलभूत गोष्टी, पेलोड हँडलिंग (स्प्रेअर, मल्टीस्पेक्ट्रल सेन्सर्स).</p>
        `
      }
    },

    {
      order: 3,
      title: { en: "Courses & Certificates", mr: "कोर्सेस व प्रमाणपत्रे" },
      content: {
        en: `
<h3>Useful Courses & Certifications</h3>

<ul>
  <li>Basic Drone Pilot Certificate (entry-level)</li>
  <li>Advanced UAV Operations (mapping, inspection, BVLOS basics)</li>
  <li>Remote Pilot License / DGCA-recognised certifications (where applicable)</li>
  <li>Course in Aerial Photography & Videography</li>
  <li>GIS / Photogrammetry basics for mapping jobs</li>
</ul>

<h3>How to Choose a Course</h3>
<p>Pick courses that include practical flights, mission planning, and legal/regulatory modules. Prefer institutes with real flight hours and placement support.</p>
        `,
        mr: `
<h3>उपयुक्त कोर्सेस व प्रमाणपत्रे</h3>

<ul>
  <li>बेसिक ड्रोन पायलट सर्टिफिकेट (एंट्री-लेव्हल)</li>
  <li>अॅडव्हान्स्ड UAV ऑपरेशन्स (मॅपिंग, इन्स्पेक्शन, BVLOS मूळ गोष्टी)</li>
  <li>रिमोट पायलट परवाना / DGCA मान्यताप्राप्त प्रमाणपत्रे (जिथे लागू)</li>
  <li>एरियल फोटोग्राफी व विडियोग्राफी कोर्स</li>
  <li>मॅपिंगसाठी GIS / फोटोग्रामेट्री मूलभूत</li>
</ul>

<h3>कोर्स कसा निवडावा</h3>
<p>प्रॅक्टिकल फ्लाइट्स, मिशन प्लॅनिंग आणि कायदेशीर/नियमांचे मॉड्यूल असलेले कोर्स निवडा. वास्तविक फ्लाइट तास व प्लेसमेंट सपोर्ट असलेली संस्था प्राधान्य द्या.</p>
        `
      }
    },

    {
      order: 4,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills</h3>
<ul>
  <li><b>Piloting skills:</b> Stable manual control and automated flight management</li>
  <li><b>Regulatory knowledge:</b> Airspace rules, permissions, safety</li>
  <li><b>Data capture:</b> Camera settings, sensor operation, flight framing</li>
  <li><b>Basic maintenance:</b> Battery, motors, prop checks and troubleshooting</li>
  <li><b>Post-processing:</b> Stitching, orthomosaic, basic image correction</li>
  <li><b>Communication & reporting:</b> Clear handover of flight logs and data</li>
</ul>

<h3>Common Tools & Equipment</h3>
<table border="1" cellpadding="6">
  <tr><th>Category</th><th>Examples</th></tr>
  <tr><td>Drone Types</td><td>Multirotor, fixed-wing, hybrid VTOL</td></tr>
  <tr><td>Cameras & Sensors</td><td>RGB cameras, multispectral, LiDAR (specialised)</td></tr>
  <tr><td>Software</td><td>DJI Pilot, Pix4D, DroneDeploy, QGIS</td></tr>
  <tr><td>Accessories</td><td>Spare batteries, ND filters, ground control points</td></tr>
</table>
        `,
        mr: `
<h3>मुख्य कौशल्ये</h3>
<ul>
  <li><b>पायलटिंग कौशल्य:</b> मॅन्युअल नियंत्रण व ऑटोमेटेड फ्लाइट व्यवस्थापन</li>
  <li><b>नियमांचे ज्ञान:</b> एअरस्पेस नियम, परवानग्या, सुरक्षा</li>
  <li><b>डेटा कॅप्चर:</b> कॅमेरा सेटिंग, सेन्सर ऑपरेशन, फ्रेमिंग</li>
  <li><b>मूलभूत देखभाल:</b> बॅटरी, मोटर्स, प्रॉप चेक व ट्रबलशूटिंग</li>
  <li><b>पोस्ट-प्रोसेसिंग:</b> इमेज स्टिचिंग, ऑर्थोमोसायक, साधे इमेज कॉरेक्शन</li>
  <li><b>कम्युनिकेशन व रिपोर्टिंग:</b> फ्लाइट लॉग व डेटा स्पष्टपणे हँडओव्हर करणे</li>
</ul>

<h3>निवडक साधने व उपकरणे</h3>
<table border="1" cellpadding="6">
  <tr><th>श्रेणी</th><th>उदाहरणे</th></tr>
  <tr><td>ड्रोन प्रकार</td><td>मल्टीरोटर, फिक्स्ड-विंग, हायब्रिड VTOL</td></tr>
  <tr><td>कॅमेरे व सेन्सर्स</td><td>RGB कॅमेरे, मल्टीस्पेक्ट्रल, LiDAR (विशेष)</td></tr>
  <tr><td>सॉफ्टवेअर</td><td>DJI Pilot, Pix4D, DroneDeploy, QGIS</td></tr>
  <tr><td>अॅक्सेसरीज़</td><td>स्पेअर बॅटरीज, ND फिल्टर्स, ग्राऊंड कंट्रोल पॉइंट्स</td></tr>
</table>
        `
      }
    },

    {
      order: 5,
      title: { en: "Job Roles & Industry", mr: "नोकरीची भूमिका व उद्योग" },
      content: {
        en: `
<h3>Common Job Roles</h3>
<ul>
  <li>Drone Pilot / Remote Pilot</li>
  <li>Aerial Photographer / Videographer</li>
  <li>Survey & Mapping Technician</li>
  <li>Inspection Drone Operator (solar, telecom, pipelines)</li>
  <li>Precision Agriculture Operator</li>
</ul>

<h3>Industries Hiring Drone Operators</h3>
<ul>
  <li>Media & Film Production</li>
  <li>Agriculture & Agri-tech</li>
  <li>Surveying & Remote Sensing Firms</li>
  <li>Infrastructure & Energy (solar, wind, telecom)</li>
  <li>Disaster Management & Government Agencies</li>
</ul>

<p>Freelance and contract roles are common; many operators work project-to-project.</p>
        `,
        mr: `
<h3>सामान्य नोकरी भूमिका</h3>
<ul>
  <li>ड्रोन पायलट / रिमोट पायलट</li>
  <li>एरियल फोटोग्राफर / विडियोग्राफर</li>
  <li>सर्व्हे व मॅपिंग तंत्रज्ञ</li>
  <li>इन्स्पेक्शन ड्रोन ऑपरेटर (सोलर, टेलीकॉम, पाइपलाइन)</li>
  <li>प्रिसिशन अॅग्रीकल्चर ऑपरेटर</li>
</ul>

<h3>ड्रोन ऑपरेटरना नोकरी देणारे उद्योग</h3>
<ul>
  <li>मीडिया व फिल्म प्रॉडक्शन</li>
  <li>शेती व अॅग्री-टेक</li>
  <li>सर्व्हे व रिमोट सेंसिंग फर्म्स</li>
  <li>इन्फ्रास्ट्रक्चर व ऊर्जा (सोलर, विंड, टेलीकॉम)</li>
  <li>आपत्ती व्यवस्थापन व सरकारी एजन्सीज</li>
</ul>

<p>फ्रीलान्स व कॉन्ट्रॅक्ट भूमिका सर्वसाधारण आहेत; अनेक ऑपरेटर प्रोजेक्ट-टू-प्रोजेक्ट काम करतात.</p>
        `
      }
    },

    {
      order: 6,
      title: { en: "Salary & Earnings", mr: "पगार व कमाई" },
      content: {
        en: `
<h3>Typical Earnings</h3>

<p>Drone operator earnings vary by skill, industry, and experience. Entry-level operators often start with project-based pay; experienced specialists (mapping, LiDAR, BVLOS) command higher fees.</p>

<table border="1" cellpadding="6">
  <tr><th>Experience</th><th>Typical India Range (annual)</th></tr>
  <tr><td>Entry-level / Freelance</td><td>₹1.5–3 LPA (project-based)</td></tr>
  <tr><td>Experienced Operator</td><td>₹3–6 LPA</td></tr>
  <tr><td>Specialist / Team Lead</td><td>₹6–10+ LPA</td></tr>
</table>

<h3>Other Earning Models</h3>
<ul>
  <li>Per-project fees (shoots, inspections)</li>
  <li>Hourly rates for site visits</li>
  <li>Contract with companies (agri, infra)</li>
  <li>Starting a drone service/agency increases revenue potential</li>
</ul>
        `,
        mr: `
<h3>सामान्य कमाई</h3>

<p>ड्रोन ऑपरेटरची कमाई कौशल्य, उद्योग व अनुभवानुसार बदलते. एंट्री-लेव्हल ऑपरेटर प्रोजेक्ट-आधारित पे मिळवतात; मॅपिंग, LiDAR, BVLOS सारख्या स्पेशलिस्टनी जास्त फी आकारता येते.</p>

<table border="1" cellpadding="6">
  <tr><th>अनुभव</th><th>भारतातील वार्षिक सरासरी श्रेणी</th></tr>
  <tr><td>एंट्री-लेव्हल / फ्रीलान्स</td><td>₹1.5–3 LPA (प्रोजेक्ट-आधारित)</td></tr>
  <tr><td>अनुभवी ऑपरेटर</td><td>₹3–6 LPA</td></tr>
  <tr><td>स्पेशलिस्ट / टीम लीड</td><td>₹6–10+ LPA</td></tr>
</table>

<h3>इतर कमाईचे मॉडेल</h3>
<ul>
  <li>प्रोजेक्ट-आधारित फी (शूट्स, इन्स्पेक्शन्स)</li>
  <li>साईट भेटींसाठी तासिक दर</li>
  <li>कंपन्यांसोबत कॉन्ट्रॅक्ट</li>
  <li>ड्रोन सर्व्हिस/एजन्सी सुरू केल्यास नफा वाढतो</li>
</ul>
        `
      }
    },

    {
      order: 7,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Progression</h3>
<ul>
  <li>Junior Pilot → Senior Pilot → Team Lead</li>
  <li>Specialise: Survey & Mapping, LiDAR, Thermal Inspections</li>
  <li>Move into data processing, GIS analysis or project management</li>
  <li>Start your own drone services company or consultancy</li>
</ul>

<h3>Market Opportunities</h3>
<ul>
  <li>Increased demand in infrastructure inspection and renewable energy</li>
  <li>Agri-tech adoption opens precision farming roles</li>
  <li>Government & smart city projects require mapping and monitoring</li>
  <li>Media and real estate continue to hire for aerial content</li>
</ul>

<p>Operators who add mapping, photogrammetry, or regulatory expertise get premium roles.</p>
        `,
        mr: `
<h3>करिअर प्रगती</h3>
<ul>
  <li>ज्युनियर पायलट → सीनियर पायलट → टीम लीड</li>
  <li>स्पेशलायझेशन: सर्व्हे व मॅपिंग, LiDAR, थर्मल इन्स्पेक्शन्स</li>
  <li>डेटा प्रोसेसिंग, GIS अॅनालिसिस किंवा प्रोजेक्ट मॅनेजमेंटकडे वळता येते</li>
  <li>स्वतःची ड्रोन सर्व्हिस कंपनी किंवा कन्सल्टंसी सुरू करा</li>
</ul>

<h3>बाजारातील संधी</h3>
<ul>
  <li>इन्फ्रास्ट्रक्चर इन्स्पेक्शन व नूतनीकरणीय उर्जा क्षेत्रात वाढती मागणी</li>
  <li>अॅग्री-टेकमुळे प्रिसिशन फार्मिंगची संधी</li>
  <li>शासकीय व स्मार्ट सिटी प्रोजेक्टसाठी मॅपिंग व मॉनिटरिंग गरजेचे</li>
  <li>मिडिया व रिअल इस्टेटमध्ये एरियल कंटेंटसाठी मागणी</li>
</ul>

<p>मॅपिंग, फोटोग्रामेट्री किंवा नियमक ज्ञान वाढवणारे ऑपरेटर विशेष भूमिकांसाठी पात्र ठरतात.</p>
        `
      }
    },

    {
      order: 8,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>What to Expect Next</h3>

<ul>
  <li><b>BVLOS (Beyond Visual Line Of Sight):</b> Wider commercial missions as regulations evolve</li>
  <li><b>Autonomous drones:</b> More automated missions with advanced navigation</li>
  <li><b>Integration with GIS & AI:</b> Automated analysis of imagery for faster insights</li>
  <li><b>Specialised sensors:</b> Wider use of LiDAR, thermal, multispectral payloads</li>
  <li><b>Regulatory frameworks:</b> Professional licensing & stricter compliance</li>
</ul>

<p>Operators who learn advanced payload handling, mapping workflows and regulatory compliance will stay in high demand.</p>
        `,
        mr: `
<h3>भविष्यात काय अपेक्षित आहे</h3>

<ul>
  <li><b>BVLOS (व्हिज्युअल लाईन ऑफ साइटच्या पलीकडे):</b> नियम स्विकारल्यावर मोठ्या व्यावसायिक मिशन्स</li>
  <li><b>स्वायत्त ड्रोन:</b> प्रगत नेव्हिगेशनसह जास्त ऑटोमेटेड मिशन्स</li>
  <li><b>GIS व AI सह एकत्रीकरण:</b> इमेजरीचे स्वयंचलित विश्लेषण जलद इनसाइट देते</li>
  <li><b>विशेष सेन्सर्स:</b> LiDAR, थर्मल, मल्टीस्पेक्ट्रल पेलोडचे मोठ्या प्रमाणावर वापर</li>
  <li><b>नियमक चौकट:</b> व्यावसायिक परवाने व कडक अनुपालन</li>
</ul>

<p>अॅडव्हान्स पेलोड हँडलिंग, मॅपिंग व नियमक ज्ञान शिकणारे ऑपरेटर भविष्यात अधिक मागणीतील राहतील.</p>
        `
      }
    }
  ],
  C7: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What an Electrician Does</h3>

<p>An Electrician installs, repairs, and maintains electrical wiring, circuits, switches, appliances, and safety systems in homes, offices, factories, and commercial buildings.</p>

<ul>
  <li>Install and maintain wiring & electrical systems</li>
  <li>Repair fans, switches, lights, MCBs, and appliances</li>
  <li>Test and troubleshoot short circuits & overload issues</li>
  <li>Install inverters, meters, and basic home electrical setups</li>
  <li>Ensure safety compliance and proper grounding</li>
</ul>

<h3>Typical Work Settings</h3>
<table border="1" cellpadding="6">
  <tr><th>Setting</th><th>Details</th></tr>
  <tr><td>Homes & Apartments</td><td>Repairing and installing electrical fittings</td></tr>
  <tr><td>Commercial Buildings</td><td>Wiring, maintenance, safety checks</td></tr>
  <tr><td>Factories</td><td>Industrial electrical systems & machinery</td></tr>
  <tr><td>Construction Sites</td><td>New wiring installation</td></tr>
  <tr><td>Freelance Work</td><td>Independent service calls</td></tr>
</table>
`,
        mr: `
<h3>इलेक्ट्रीशियन काय काम करतो?</h3>

<p>इलेक्ट्रीशियन घर, ऑफिस, कारखाने आणि इमारतींमध्ये वायरिंग, सर्किट्स, स्विचेस, उपकरणे आणि सुरक्षा प्रणालींची बसवणी, दुरुस्ती आणि देखभाल करतो.</p>

<ul>
  <li>वायरिंग व इलेक्ट्रिकल सिस्टीमची बसवणी आणि देखभाल</li>
  <li>फॅन, स्विच, लाइट, MCB आणि उपकरणांची दुरुस्ती</li>
  <li>शॉर्ट सर्किट व ओव्हरलोड चाचणी व समस्या निराकरण</li>
  <li>इन्व्हर्टर, मीटर आणि घरगुती इलेक्ट्रिकल सेटअप बसवणे</li>
  <li>सुरक्षा मानकांचे पालन व योग्य ग्राउंडिंग</li>
</ul>

<h3>सामान्य कार्यस्थळे</h3>
<table border="1" cellpadding="6">
  <tr><th>ठिकाण</th><th>तपशील</th></tr>
  <tr><td>घरे व फ्लॅट्स</td><td>इलेक्ट्रिकल फिटिंग्सची बसवणी व दुरुस्ती</td></tr>
  <tr><td>कमर्शियल इमारती</td><td>वायरिंग, देखभाल व सुरक्षा तपासणी</td></tr>
  <tr><td>कारखाने</td><td>इंडस्ट्रियल इलेक्ट्रिकल सिस्टम व मशिनरी</td></tr>
  <tr><td>कन्स्ट्रक्शन साइट्स</td><td>नवीन वायरिंग इंस्टॉलेशन</td></tr>
  <tr><td>फ्रीलान्स काम</td><td>स्वतंत्र सेवा कॉल्स</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Training", mr: "पात्रता व प्रशिक्षण" },
      content: {
        en: `
<h3>Basic Eligibility</h3>

<p>Anyone with 8th, 10th, or 12th pass education can become an electrician. Practical learning is more important than theoretical knowledge.</p>

<h3>Training Path</h3>

<ol>
  <li>Join ITI (Electrician Trade) or short-term vocational training</li>
  <li>Learn wiring, safety rules, and basic electrical theory</li>
  <li>Hands-on practice with tools & real electrical boards</li>
  <li>Apprenticeship under experienced electricians</li>
  <li>Start working independently or with a contractor</li>
</ol>

<p>Even without formal training, many electricians learn through on-site experience.</p>
`,
        mr: `
<h3>मूलभूत पात्रता</h3>

<p>८वी, १०वी किंवा १२वी उत्तीर्ण विद्यार्थी इलेक्ट्रीशियन बनू शकतात. प्रॅक्टिकल शिकणे हे थिअरीपेक्षा महत्वाचे आहे.</p>

<h3>प्रशिक्षणाचा मार्ग</h3>

<ol>
  <li>ITI (Electrician Trade) किंवा शॉर्ट-टर्म वोकेशनल ट्रेनिंग</li>
  <li>वायरिंग, सुरक्षा नियम व इलेक्ट्रिकल थिअरी शिकणे</li>
  <li>खऱ्या बोर्डवर साधनांसह प्रॅक्टिकल सराव</li>
  <li>अनुभवी इलेक्ट्रीशियनखाली प्रशिक्षण (अपरेन्टिसशिप)</li>
  <li>स्वतंत्ररित्या किंवा कॉन्ट्रॅक्टरसोबत काम सुरू करणे</li>
</ol>

<p>औपचारिक कोर्स नसला तरी अनेक इलेक्ट्रीशियन प्रत्यक्ष कामातूनच शिकतात.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Courses & Certificates", mr: "कोर्सेस व प्रमाणपत्रे" },
      content: {
        en: `
<h3>Useful Courses</h3>

<ul>
  <li>ITI Electrician (2 years)</li>
  <li>Short-term electrician training (3–6 months)</li>
  <li>Domestic wiring & installation course</li>
  <li>Industrial electrician course</li>
  <li>Safety & electrical maintenance workshops</li>
</ul>

<h3>Certificates</h3>
<ul>
  <li>ITI Trade Certificate</li>
  <li>NCVT / SCVT Certification</li>
  <li>Electrician License (state-wise)</li>
  <li>Apprenticeship completion certificate</li>
</ul>

<p>Licensed electricians can take higher responsibility and earn better income.</p>
`,
        mr: `
<h3>उपयुक्त कोर्सेस</h3>

<ul>
  <li>ITI Electrician (२ वर्षे)</li>
  <li>शॉर्ट-टर्म इलेक्ट्रिशियन ट्रेनिंग (३–६ महिने)</li>
  <li>डोमेस्टिक वायरिंग व इंस्टॉलेशन कोर्स</li>
  <li>इंडस्ट्रियल इलेक्ट्रिशियन कोर्स</li>
  <li>सुरक्षा व इलेक्ट्रिकल मेंटेनन्स कार्यशाळा</li>
</ul>

<h3>प्रमाणपत्रे</h3>
<ul>
  <li>ITI ट्रेड सर्टिफिकेट</li>
  <li>NCVT / SCVT प्रमाणपत्र</li>
  <li>इलेक्ट्रीशियन लायसन्स (राज्यानुसार)</li>
  <li>अपरेन्टिसशिप पूर्णत्व प्रमाणपत्र</li>
</ul>

<p>लायसन्स असणारे इलेक्ट्रीशियन अधिक जबाबदारीच्या आणि चांगल्या पगाराच्या नोकऱ्या करू शकतात.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills Needed</h3>

<ul>
  <li>Understanding of wiring & circuits</li>
  <li>Ability to read electrical symbols and diagrams</li>
  <li>Problem-solving for faults & short circuits</li>
  <li>Measurement & testing skills</li>
  <li>Safety awareness & proper handling</li>
</ul>

<h3>Common Tools Used</h3>
<table border="1" cellpadding="6">
  <tr><th>Tool</th><th>Use</th></tr>
  <tr><td>Tester & Multimeter</td><td>Checking current, voltage, continuity</td></tr>
  <tr><td>Pliers & Cutters</td><td>Cutting and connecting wires</td></tr>
  <tr><td>Screwdrivers</td><td>Switch and board installation</td></tr>
  <tr><td>Insulation Tape</td><td>Covering connections safely</td></tr>
  <tr><td>Drill Machine</td><td>Board and fitting installation</td></tr>
</table>
`,
        mr: `
<h3>आवश्यक कौशल्ये</h3>

<ul>
  <li>वायरिंग व सर्किट समज</li>
  <li>इलेक्ट्रिकल चिन्हे व डायग्राम वाचण्याची क्षमता</li>
  <li>फॉल्ट व शॉर्ट सर्किट शोधण्याचे कौशल्य</li>
  <li>मोजमाप व चाचणी कौशल्ये</li>
  <li>सुरक्षा जागरूकता व योग्य हाताळणी</li>
</ul>

<h3>वापरण्यात येणारी साधने</h3>
<table border="1" cellpadding="6">
  <tr><th>साधन</th><th>उपयोग</th></tr>
  <tr><td>टेस्टर व मल्टीमीटर</td><td>करंट, व्होल्टेज व कंटिन्यूटी तपासणे</td></tr>
  <tr><td>प्लायर व कटर</td><td>वायर कापणे व जोडणे</td></tr>
  <tr><td>स्क्रूड्रायव्हर्स</td><td>स्विच व बोर्ड इंस्टॉलेशन</td></tr>
  <tr><td>इन्सुलेशन टेप</td><td>जॉइंट सुरक्षित ठेवणे</td></tr>
  <tr><td>ड्रिल मशीन</td><td>बोर्ड व फिटिंग बसवणे</td></tr>
</table>
`
      }
    },

    {
      order: 5,
      title: { en: "Job Roles & Industry", mr: "नोकरीची भूमिका व उद्योग" },
      content: {
        en: `
<h3>Common Job Roles</h3>

<ul>
  <li>Domestic Electrician</li>
  <li>Industrial Electrician</li>
  <li>Maintenance Technician</li>
  <li>Appliance Repair Technician</li>
  <li>Construction Wiring Technician</li>
</ul>

<h3>Industries Hiring Electricians</h3>

<ul>
  <li>Construction & Real Estate</li>
  <li>Manufacturing & Factories</li>
  <li>Electrical Service Companies</li>
  <li>Maintenance & Facility Management</li>
  <li>Commercial Buildings & Malls</li>
</ul>

<p>Electricians are needed everywhere—urban, rural, and industrial regions.</p>
`,
        mr: `
<h3>सामान्य नोकरी भूमिका</h3>

<ul>
  <li>घरगुती इलेक्ट्रीशियन</li>
  <li>इंडस्ट्रियल इलेक्ट्रीशियन</li>
  <li>मेंटेनन्स तंत्रज्ञ</li>
  <li>उपकरण दुरुस्ती तंत्रज्ञ</li>
  <li>कन्स्ट्रक्शन वायरिंग तंत्रज्ञ</li>
</ul>

<h3>ज्या उद्योगांत मागणी आहे</h3>

<ul>
  <li>कन्स्ट्रक्शन व रिअल इस्टेट</li>
  <li>मॅन्युफॅक्चरिंग व कारखाने</li>
  <li>इलेक्ट्रिकल सर्व्हिस कंपन्या</li>
  <li>मेंटेनन्स व फॅसिलिटी मॅनेजमेंट</li>
  <li>कमर्शियल इमारती व मॉल्स</li>
</ul>

<p>इलेक्ट्रीशियनची गरज सर्वत्र असते—शहरी, ग्रामीण आणि औद्योगिक क्षेत्रात.</p>
`
      }
    },

    {
      order: 6,
      title: { en: "Salary & Earnings", mr: "पगार व कमाई" },
      content: {
        en: `
<h3>Typical Earnings</h3>

<table border="1" cellpadding="6">
  <tr><th>Experience</th><th>Salary Range</th></tr>
  <tr><td>Beginner</td><td>₹10,000–₹15,000 per month</td></tr>
  <tr><td>Skilled Electrician</td><td>₹15,000–₹25,000 per month</td></tr>
  <tr><td>Industrial Electrician</td><td>₹20,000–₹35,000 per month</td></tr>
</table>

<h3>Other Earning Options</h3>
<ul>
  <li>Freelance service calls (₹150–₹600 per job)</li>
  <li>Monthly maintenance contracts</li>
  <li>Appliance repair jobs add extra income</li>
  <li>Starting own service business increases earnings significantly</li>
</ul>
`,
        mr: `
<h3>सामान्य कमाई</h3>

<table border="1" cellpadding="6">
  <tr><th>अनुभव</th><th>पगार श्रेणी</th></tr>
  <tr><td>बिगिनर</td><td>₹10,000–₹15,000 प्रति महिना</td></tr>
  <tr><td>कुशल इलेक्ट्रीशियन</td><td>₹15,000–₹25,000 प्रति महिना</td></tr>
  <tr><td>इंडस्ट्रियल इलेक्ट्रीशियन</td><td>₹20,000–₹35,000 प्रति महिना</td></tr>
</table>

<h3>इतर कमाईचे मार्ग</h3>
<ul>
  <li>फ्रीलान्स सर्व्हिस कॉल (₹150–₹600 प्रति काम)</li>
  <li>मासिक देखभाल कॉन्ट्रॅक्ट्स</li>
  <li>उपकरण दुरुस्तीमुळे अतिरिक्त कमाई</li>
  <li>स्वतःची सेवा सुरू केल्यास उत्पन्न मोठ्या प्रमाणात वाढते</li>
</ul>
`
      }
    },

    {
      order: 7,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Progression</h3>

<ul>
  <li>Helper → Technician → Senior Electrician</li>
  <li>Specialisation in industrial or commercial wiring</li>
  <li>Shift to maintenance supervisor roles</li>
  <li>Opportunity to start independent service business</li>
</ul>

<h3>Opportunities</h3>

<ul>
  <li>Growing real estate and construction projects</li>
  <li>Demand for electricians in factories and industrial parks</li>
  <li>Rise in home automation increasing demand</li>
  <li>Electricians with licenses earn higher salaries</li>
</ul>
`,
        mr: `
<h3>करिअर वाढ</h3>

<ul>
  <li>हेल्पर → टेक्निशियन → सीनियर इलेक्ट्रीशियन</li>
  <li>इंडस्ट्रियल किंवा कमर्शियल वायरिंगमध्ये स्पेशलायझेशन</li>
  <li>मेंटेनन्स सुपरवायझर होण्याची संधी</li>
  <li>स्वतंत्र सेवा व्यवसाय सुरू करण्याची संधी</li>
</ul>

<h3>संधी</h3>

<ul>
  <li>रिअल इस्टेट व कन्स्ट्रक्शन प्रोजेक्ट्समध्ये वाढती मागणी</li>
  <li>कारखाने व औद्योगिक परिसरात कामाच्या संधी</li>
  <li>होम ऑटोमेशनमुळे मागणी वाढत आहे</li>
  <li>लायसन्स असलेले इलेक्ट्रीशियन जास्त कमाई करतात</li>
</ul>
`
      }
    },

    {
      order: 8,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>What to Expect in the Future</h3>

<ul>
  <li>Increased demand for electricians due to housing growth</li>
  <li>More opportunities in solar, EV charging, and home automation</li>
  <li>Smart homes require trained electricians</li>
  <li>Industrial automation increasing maintenance technician roles</li>
</ul>

<p>Electricians who upgrade skills in solar installation, automation, and industrial systems will stay ahead.</p>
`,
        mr: `
<h3>भविष्यातील ट्रेंड</h3>

<ul>
  <li>गृहनिर्माण वाढल्यामुळे इलेक्ट्रीशियनची मागणी वाढणार</li>
  <li>सोलर, EV चार्जिंग आणि होम ऑटोमेशनमध्ये अधिक संधी</li>
  <li>स्मार्ट होमसाठी प्रशिक्षित इलेक्ट्रीशियन आवश्यक</li>
  <li>इंडस्ट्रियल ऑटोमेशनमुळे मेंटेनन्स तंत्रज्ञांची मागणी वाढणार</li>
</ul>

<p>सोलर इंस्टॉलेशन, ऑटोमेशन आणि इंडस्ट्रियल सिस्टिममध्ये कौशल्य वाढवणारे इलेक्ट्रीशियन भविष्यात जास्त संधी मिळवतील.</p>
`
      }
    }
  ],
  C8: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What a Solar Panel Technician Does</h3>

<p>A Solar Panel Technician installs, maintains, and repairs solar power systems on rooftops, buildings, farms, and industrial sites. They ensure proper wiring, panel alignment, safety, and system performance.</p>

<ul>
  <li>Install rooftop & ground-mounted solar panels</li>
  <li>Connect inverters, batteries, and solar wiring</li>
  <li>Check power output and troubleshoot faults</li>
  <li>Maintain panels (cleaning, angle adjustments)</li>
  <li>Ensure safety and compliance at installation sites</li>
</ul>

<h3>Common Work Settings</h3>
<table border="1" cellpadding="6">
  <tr><th>Setting</th><th>Details</th></tr>
  <tr><td>Residential Homes</td><td>Rooftop panel installation & wiring</td></tr>
  <tr><td>Commercial Buildings</td><td>Large solar systems for businesses</td></tr>
  <tr><td>Industrial Plants</td><td>High-capacity solar installations</td></tr>
  <tr><td>Solar Farms</td><td>Massive ground-mounted systems</td></tr>
  <tr><td>Service Companies</td><td>Maintenance & repair projects</td></tr>
</table>
`,
        mr: `
<h3>सोलर पॅनल तंत्रज्ञ काय करतो?</h3>

<p>सोलर पॅनल तंत्रज्ञ घर, इमारती, शेत आणि औद्योगिक ठिकाणी सोलर सिस्टीम बसवतो, देखभाल करतो आणि दुरुस्ती करतो. योग्य वायरिंग, अँगल, सुरक्षा आणि उर्जा कार्यक्षमता याची खात्री करणे हे त्याचे मुख्य काम.</p>

<ul>
  <li>रूफटॉप आणि ग्राउंड-माउंटेड सोलर पॅनेल बसवणे</li>
  <li>इन्व्हर्टर, बॅटरी आणि वायरिंग जोडणे</li>
  <li>पॉवर आउटपुट तपासणे आणि फॉल्ट दुरुस्ती</li>
  <li>पॅनलची स्वच्छता व अँगल समायोजन</li>
  <li>इंस्टॉलेशन साइटवरील सुरक्षा सुनिश्चित करणे</li>
</ul>

<h3>सामान्य कार्यस्थळे</h3>
<table border="1" cellpadding="6">
  <tr><th>ठिकाण</th><th>तपशील</th></tr>
  <tr><td>घरे</td><td>रूफटॉप सोलर इंस्टॉलेशन</td></tr>
  <tr><td>व्यावसायिक इमारती</td><td>मोठ्या क्षमतेचे सोलर सेटअप</td></tr>
  <tr><td>औद्योगिक प्रकल्प</td><td>हाय-कॅपेसिटी सिस्टीम</td></tr>
  <tr><td>सोलर फॉर्म्स</td><td>ग्राऊंड-माउंटेड मोठ्या सिस्टीम</td></tr>
  <tr><td>सर्व्हिस कंपन्या</td><td>देखभाल व दुरुस्ती कामे</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Training", mr: "पात्रता व प्रशिक्षण" },
      content: {
        en: `
<h3>Basic Eligibility</h3>

<p>10th or 12th pass students can easily enter this field. Electrical knowledge is helpful but not mandatory.</p>

<h3>Training Path</h3>
<ol>
  <li>Join a solar technician or renewable energy course</li>
  <li>Learn basics of electricity, safety & solar system components</li>
  <li>Hands-on practice in panel mounting & wiring</li>
  <li>Training with inverters, batteries & charge controllers</li>
  <li>Real-world field installation practice</li>
</ol>

<p>Many technicians learn additional skills from electricians or solar companies.</p>
`,
        mr: `
<h3>मूलभूत पात्रता</h3>

<p>१०वी किंवा १२वी उत्तीर्ण विद्यार्थी सहजपणे या क्षेत्रात करिअर सुरू करू शकतात. इलेक्ट्रिकल ज्ञान असल्यास फायदा होतो.</p>

<h3>प्रशिक्षणाचा मार्ग</h3>
<ol>
  <li>सोलर टेक्निशियन किंवा रिन्यूएबल एनर्जी कोर्समध्ये प्रवेश</li>
  <li>इलेक्ट्रिकल बेसिक्स, सुरक्षा आणि सोलर घटक शिकणे</li>
  <li>पॅनल माउंटिंग व वायरिंगचा प्रत्यक्ष सराव</li>
  <li>इन्व्हर्टर, बॅटरी व कंट्रोलर हाताळणी</li>
  <li>फील्डवर इंस्टॉलेशनचे प्रशिक्षण</li>
</ol>

<p>अनेक तंत्रज्ञ इलेक्ट्रिशियन किंवा सोलर कंपन्यांकडून अतिरिक्त कौशल्ये शिकतात.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Courses & Certificates", mr: "कोर्सेस व प्रमाणपत्रे" },
      content: {
        en: `
<h3>Popular Courses</h3>

<ul>
  <li>Solar PV Technician Certificate</li>
  <li>Renewable Energy Technician course</li>
  <li>Solar Panel Installation Training (2–6 months)</li>
  <li>Electrical Technician course (optional)</li>
</ul>

<h3>Important Certifications</h3>
<ul>
  <li>Skill India – Solar Technician Certification</li>
  <li>NSDC Renewable Energy Courses</li>
  <li>Institute/Company provided practical training certificates</li>
</ul>

<p>Certification boosts credibility and helps in getting better jobs.</p>
`,
        mr: `
<h3>लोकप्रिय कोर्सेस</h3>

<ul>
  <li>सोलर PV टेक्निशियन सर्टिफिकेट</li>
  <li>रिन्यूएबल एनर्जी टेक्निशियन कोर्स</li>
  <li>सोलर पॅनल इंस्टॉलेशन ट्रेनिंग (२–६ महिने)</li>
  <li>इलेक्ट्रिकल टेक्निशियन कोर्स (पर्यायी)</li>
</ul>

<h3>महत्त्वाची प्रमाणपत्रे</h3>
<ul>
  <li>स्किल इंडिया – सोलर टेक्निशियन सर्टिफिकेट</li>
  <li>NSDC रिन्यूएबल एनर्जी कोर्सेस</li>
  <li>इन्स्टिट्यूट/कंपनी प्रॅक्टिकल ट्रेनिंग सर्टिफिकेट</li>
</ul>

<p>प्रमाणपत्रामुळे विश्वासार्हता वाढते आणि चांगल्या नोकऱ्यांची संधी मिळते.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Core Skills</h3>

<ul>
  <li>Electrical wiring basics</li>
  <li>Panel mounting & alignment</li>
  <li>Reading solar diagrams & layouts</li>
  <li>Troubleshooting low power or connection issues</li>
  <li>Understanding inverters, batteries & safety rules</li>
</ul>

<h3>Tools Used</h3>
<table border="1" cellpadding="6">
  <tr><th>Tool</th><th>Use</th></tr>
  <tr><td>Drill Machine</td><td>Mounting panel structures</td></tr>
  <tr><td>Multimeter</td><td>Checking voltage & continuity</td></tr>
  <tr><td>Wrenches & Spanners</td><td>Tightening mounts & brackets</td></tr>
  <tr><td>Screwdrivers</td><td>Basic electrical connections</td></tr>
  <tr><td>Safety Gear</td><td>Helmet, gloves, harness for rooftop safety</td></tr>
</table>
`,
        mr: `
<h3>मुख्य कौशल्ये</h3>

<ul>
  <li>इलेक्ट्रिकल वायरिंगचे ज्ञान</li>
  <li>पॅनल माउंटिंग व अँगल सेटिंग</li>
  <li>सोलर लेआउट व डायग्राम वाचणे</li>
  <li>लो पॉवर किंवा कनेक्शन समस्यांचे निराकरण</li>
  <li>इन्व्हर्टर, बॅटरी व सुरक्षा नियम समज</li>
</ul>

<h3>वापरण्यात येणारी साधने</h3>
<table border="1" cellpadding="6">
  <tr><th>साधन</th><th>उपयोग</th></tr>
  <tr><td>ड्रिल मशीन</td><td>माउंटिंग स्ट्रक्चर बसवणे</td></tr>
  <tr><td>मल्टीमीटर</td><td>व्होल्टेज व कंटिन्यूटी तपासणे</td></tr>
  <tr><td>रेन्च व स्पॅनर्स</td><td>पॅनल ब्रॅकेट घट्ट करणे</td></tr>
  <tr><td>स्क्रूड्रायव्हर्स</td><td>इलेक्ट्रिकल कनेक्शन</td></tr>
  <tr><td>सेफ्टी गिअर</td><td>हेल्मेट, ग्लोव्ह्ज, हार्नेस</td></tr>
</table>
`
      }
    },

    {
      order: 5,
      title: { en: "Job Roles & Industry", mr: "नोकरीची भूमिका व उद्योग" },
      content: {
        en: `
<h3>Career Roles</h3>

<ul>
  <li>Solar Panel Installer</li>
  <li>Solar Maintenance Technician</li>
  <li>Solar Rooftop Technician</li>
  <li>Solar Service Technician</li>
  <li>Solar Plant Helper / Assistant</li>
</ul>

<h3>Industries Hiring</h3>

<ul>
  <li>Solar Installation Companies</li>
  <li>Renewable Energy Firms</li>
  <li>Construction & Real Estate Projects</li>
  <li>Factories & Industrial Plants</li>
  <li>Government Solar Missions</li>
</ul>

<p>India’s fast-growing solar sector offers strong and stable job opportunities.</p>
`,
        mr: `
<h3>नोकरी भूमिका</h3>

<ul>
  <li>सोलर पॅनल इन्स्टॉलर</li>
  <li>सोलर मेंटेनन्स टेक्निशियन</li>
  <li>रूफटॉप सोलर टेक्निशियन</li>
  <li>सोलर सर्व्हिस टेक्निशियन</li>
  <li>सोलर प्लांट हेल्पर / असिस्टंट</li>
</ul>

<h3>ज्या उद्योगांत मागणी आहे</h3>

<ul>
  <li>सोलर इंस्टॉलेशन कंपन्या</li>
  <li>रिन्यूएबल एनर्जी फर्म्स</li>
  <li>कन्स्ट्रक्शन व रिअल इस्टेट</li>
  <li>कारखाने व औद्योगिक प्रकल्प</li>
  <li>सरकारी सोलर मिशन्स</li>
</ul>

<p>भारताचा सोलर क्षेत्र वेगाने वाढत असल्यामुळे या क्षेत्रात स्थिर नोकरी संधी उपलब्ध आहेत.</p>
`
      }
    },

    {
      order: 6,
      title: { en: "Salary & Earnings", mr: "पगार व कमाई" },
      content: {
        en: `
<h3>Earning Potential</h3>

<table border="1" cellpadding="6">
  <tr><th>Experience</th><th>Monthly Earnings</th></tr>
  <tr><td>Beginner</td><td>₹10,000–₹15,000</td></tr>
  <tr><td>Skilled Technician</td><td>₹15,000–₹25,000</td></tr>
  <tr><td>Industrial / Large Solar Plants</td><td>₹20,000–₹30,000+</td></tr>
</table>

<h3>Additional Income Sources</h3>

<ul>
  <li>Installation charges (per kW)</li>
  <li>Maintenance contracts</li>
  <li>Battery/ inverter service</li>
  <li>Freelance installation work</li>
</ul>

<p>Demand is rising, so earnings grow with experience and skill specialization.</p>
`,
        mr: `
<h3>कमाईची क्षमता</h3>

<table border="1" cellpadding="6">
  <tr><th>अनुभव</th><th>मासिक कमाई</th></tr>
  <tr><td>बिगिनर</td><td>₹10,000–₹15,000</td></tr>
  <tr><td>कुशल तंत्रज्ञ</td><td>₹15,000–₹25,000</td></tr>
  <tr><td>इंडस्ट्रियल / मोठे प्लांट</td><td>₹20,000–₹30,000+</td></tr>
</table>

<h3>अतिरिक्त कमाई पर्याय</h3>

<ul>
  <li>इन्स्टॉलेशन चार्ज (प्रति kW)</li>
  <li>मेंटेनन्स कॉन्ट्रॅक्ट्स</li>
  <li>बॅटरी / इन्व्हर्टर सेवा</li>
  <li>फ्रीलान्स इंस्टॉलेशन</li>
</ul>

<p>मागणी वाढत असल्यामुळे अनुभव वाढला की कमाईही वाढते.</p>
`
      }
    },

    {
      order: 7,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth</h3>

<ul>
  <li>Helper → Technician → Senior Technician</li>
  <li>Supervisor roles in solar companies</li>
  <li>Specialization in industrial or large-scale solar systems</li>
  <li>Start your own solar installation business</li>
</ul>

<h3>Opportunities</h3>

<ul>
  <li>India is one of the fastest-growing solar markets</li>
  <li>Government pushing solar adoption through schemes</li>
  <li>More homes switching to solar power every year</li>
  <li>Strong career stability due to long-term sector growth</li>
</ul>
`,
        mr: `
<h3>करिअर वाढ</h3>

<ul>
  <li>हेल्पर → टेक्निशियन → सीनियर टेक्निशियन</li>
  <li>सोलर कंपन्यांमध्ये सुपरवायझर भूमिका</li>
  <li>इंडस्ट्रियल सोलर सिस्टीममध्ये स्पेशलायझेशन</li>
  <li>स्वतःचा सोलर इंस्टॉलेशन व्यवसाय सुरू करणे</li>
</ul>

<h3>संधी</h3>

<ul>
  <li>भारत जगातील सर्वात वेगाने वाढणाऱ्या सोलर मार्केटपैकी एक</li>
  <li>सरकारी योजना सोलरला प्रोत्साहन देतात</li>
  <li>दरवर्षी अधिक घरे सोलरकडे वळत आहेत</li>
  <li>दीर्घकालीन स्थिरतेमुळे करिअर सुरक्षित</li>
</ul>
`
      }
    },

    {
      order: 8,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Future Trends in Solar Industry</h3>

<ul>
  <li>Rapid increase in rooftop solar installations</li>
  <li>Rise of solar-powered EV charging stations</li>
  <li>Growth of solar farms & green energy parks</li>
  <li>Smarter inverters and IoT-based monitoring</li>
  <li>Higher demand for trained technicians</li>
</ul>

<p>Solar technicians who learn battery systems, EV chargers, and smart solar tech will be future-ready.</p>
`,
        mr: `
<h3>सोलर उद्योगातील भविष्यातील ट्रेंड</h3>

<ul>
  <li>रूफटॉप सोलर इंस्टॉलेशनचा वेगाने वाढ</li>
  <li>सोलर-आधारित EV चार्जिंग स्टेशन्स वाढत आहेत</li>
  <li>सोलर फॉर्म्स व ग्रीन एनर्जी पार्क्सचा विस्तार</li>
  <li>स्मार्ट इन्व्हर्टर व IoT मॉनिटरिंग सिस्टम</li>
  <li>प्रशिक्षित तंत्रज्ञांची मोठी मागणी</li>
</ul>

<p>बॅटरी सिस्टिम, EV चार्जर व स्मार्ट सोलर तंत्रज्ञान शिकणारे तंत्रज्ञ भविष्यासाठी सर्वात तयार असतील.</p>
`
      }
    }
  ],
  C9: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What an EV Service Technician Does</h3>

<p>An EV (Electric Vehicle) Service Technician repairs, maintains, and inspects electric two-wheelers, three-wheelers, cars, and charging systems. They work with batteries, motors, controllers, wiring, and diagnostic tools.</p>

<ul>
  <li>Diagnose EV motor & controller issues</li>
  <li>Repair/replace battery packs and BMS components</li>
  <li>Inspect wiring, sensors, and charging ports</li>
  <li>Use diagnostic tools to read faults</li>
  <li>Perform periodic servicing & safety checks</li>
</ul>

<h3>Typical Work Settings</h3>
<table border="1" cellpadding="6">
  <tr><th>Setting</th><th>Details</th></tr>
  <tr><td>EV Service Centers</td><td>Brand-authorized or local EV garages</td></tr>
  <tr><td>Dealerships</td><td>New vehicle setup & maintenance</td></tr>
  <tr><td>Charging Stations</td><td>Inspection & troubleshooting</td></tr>
  <tr><td>EV Manufacturing Units</td><td>Assembly line testing</td></tr>
  <tr><td>Field Service</td><td>On-site repairs & service calls</td></tr>
</table>
`,
        mr: `
<h3>EV सर्व्हिस टेक्निशियन काय करतो?</h3>

<p>EV (इलेक्ट्रिक व्हेइकल) सर्व्हिस टेक्निशियन इलेक्ट्रिक दुचाकी, तिनचाकी, कार आणि चार्जिंग सिस्टीमची दुरुस्ती, तपासणी आणि देखभाल करतो. तो बॅटरी, मोटर, कंट्रोलर, वायरिंग आणि डायग्नोस्टिक साधनांसोबत काम करतो.</p>

<ul>
  <li>EV मोटर व कंट्रोलर समस्या शोधणे</li>
  <li>बॅटरी पॅक व BMS दुरुस्ती/बदल</li>
  <li>वायरिंग, सेन्सर आणि चार्जिंग पोर्ट तपासणी</li>
  <li>फॉल्ट वाचण्यासाठी डायग्नोस्टिक टूल वापरणे</li>
  <li>पिरियॉडिक सर्व्हिसिंग व सुरक्षा तपासणी</li>
</ul>

<h3>सामान्य कार्यस्थळे</h3>
<table border="1" cellpadding="6">
  <tr><th>ठिकाण</th><th>तपशील</th></tr>
  <tr><td>EV सर्व्हिस सेंटर</td><td>ब्रँड अधिकृत किंवा स्थानिक EV गॅरेज</td></tr>
  <tr><td>डीलरशिप</td><td>नवीन वाहन सेटअप व देखभाल</td></tr>
  <tr><td>चार्जिंग स्टेशन</td><td>निरीक्षण व ट्रबलशूटिंग</td></tr>
  <tr><td>EV उत्पादन युनिट</td><td>असेंब्ली लाइन टेस्टिंग</td></tr>
  <tr><td>फील्ड सर्व्हिस</td><td>ऑन-साइट दुरुस्ती</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Training", mr: "पात्रता व प्रशिक्षण" },
      content: {
        en: `
<h3>Basic Eligibility</h3>

<p>10th or 12th pass students can enter this field. Knowledge of basic electronics helps, but is not mandatory.</p>

<h3>Training Path</h3>
<ol>
  <li>Complete EV technician or automotive electrician course</li>
  <li>Learn basics of electricity, motors, batteries & controllers</li>
  <li>Hands-on training in EV repair & diagnostics</li>
  <li>Apprenticeship at EV service center</li>
  <li>Start working as a junior EV technician</li>
</ol>

<p>Continuous learning is important as EV technology evolves quickly.</p>
`,
        mr: `
<h3>मूलभूत पात्रता</h3>

<p>१०वी किंवा १२वी उत्तीर्ण विद्यार्थी हे करिअर सुरू करू शकतात. इलेक्ट्रॉनिक्सचे थोडे ज्ञान असल्यास फायदा होतो.</p>

<h3>प्रशिक्षणाचा मार्ग</h3>
<ol>
  <li>EV टेक्निशियन किंवा ऑटोमोटिव्ह इलेक्ट्रिशियन कोर्स पूर्ण करणे</li>
  <li>इलेक्ट्रिसिटी, मोटर, बॅटरी व कंट्रोलरचे बेसिक्स शिकणे</li>
  <li>EV दुरुस्ती व डायग्नोस्टिकचे प्रॅक्टिकल प्रशिक्षण</li>
  <li>EV सर्व्हिस सेंटरमध्ये अप्रेंटिसशिप</li>
  <li>ज्युनियर EV तंत्रज्ञ म्हणून काम सुरू करणे</li>
</ol>

<p>EV तंत्रज्ञान झपाट्याने बदलत असल्यामुळे सतत शिकणे आवश्यक आहे.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Courses & Certificates", mr: "कोर्सेस व प्रमाणपत्रे" },
      content: {
        en: `
<h3>Recommended Courses</h3>

<ul>
  <li>EV Service Technician Course (3–6 months)</li>
  <li>Automotive Electrician Course</li>
  <li>Battery & BMS Repair Training</li>
  <li>Motor & Controller Troubleshooting Course</li>
  <li>Charging Station Installer Training</li>
</ul>

<h3>Important Certifications</h3>
<ul>
  <li>Skill India – EV Technician Certification</li>
  <li>NSDC Automotive Electrician Certification</li>
  <li>OEM (company) based training certificates</li>
</ul>

<p>OEM certifications improve job opportunities and salary.</p>
`,
        mr: `
<h3>शिफारस केलेले कोर्सेस</h3>

<ul>
  <li>EV सर्व्हिस टेक्निशियन कोर्स (३–६ महिने)</li>
  <li>ऑटोमोटिव्ह इलेक्ट्रिशियन कोर्स</li>
  <li>बॅटरी व BMS दुरुस्ती प्रशिक्षण</li>
  <li>मोटर व कंट्रोलर ट्रबलशूटिंग कोर्स</li>
  <li>चार्जिंग स्टेशन इंस्टॉलर प्रशिक्षण</li>
</ul>

<h3>महत्त्वाची प्रमाणपत्रे</h3>
<ul>
  <li>स्किल इंडिया – EV टेक्निशियन सर्टिफिकेट</li>
  <li>NSDC ऑटोमोटिव्ह इलेक्ट्रिशियन सर्टिफिकेट</li>
  <li>OEM आधारित प्रशिक्षण सर्टिफिकेट</li>
</ul>

<p>OEM सर्टिफिकेटमुळे नोकरी संधी आणि पगार दोन्ही वाढतात.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Essential Skills</h3>

<ul>
  <li>Understanding of EV motors (BLDC), controllers & wiring</li>
  <li>Battery testing and BMS troubleshooting</li>
  <li>Use of diagnostic tools & scanners</li>
  <li>Fault detection & problem-solving</li>
  <li>Knowledge of EV safety protocols</li>
</ul>

<h3>Tools Used</h3>
<table border="1" cellpadding="6">
  <tr><th>Tool</th><th>Use</th></tr>
  <tr><td>Multimeter</td><td>Voltage, current & continuity check</td></tr>
  <tr><td>Battery Analyzer</td><td>Capacity & health testing</td></tr>
  <tr><td>Diagnostic Scanner</td><td>Reading EV fault codes</td></tr>
  <tr><td>Basic Hand Tools</td><td>Repair & wiring tasks</td></tr>
  <tr><td>Safety Gear</td><td>Gloves, goggles, insulated tools</td></tr>
</table>
`,
        mr: `
<h3>महत्त्वाची कौशल्ये</h3>

<ul>
  <li>EV मोटर (BLDC), कंट्रोलर आणि वायरिंगचे ज्ञान</li>
  <li>बॅटरी टेस्टिंग आणि BMS ट्रबलशूटिंग</li>
  <li>डायग्नोस्टिक टूल्स व स्कॅनरचा वापर</li>
  <li>फॉल्ट शोधणे व समस्या सोडवणे</li>
  <li>EV सुरक्षा नियमांचे ज्ञान</li>
</ul>

<h3>वापरण्यात येणारी साधने</h3>
<table border="1" cellpadding="6">
  <tr><th>साधन</th><th>उपयोग</th></tr>
  <tr><td>मल्टीमीटर</td><td>व्होल्टेज, करंट व कंटिन्यूटी तपासणे</td></tr>
  <tr><td>बॅटरी अनालायझर</td><td>बॅटरी क्षमता व हेल्थ तपासणे</td></tr>
  <tr><td>डायग्नोस्टिक स्कॅनर</td><td>EV फॉल्ट कोड वाचणे</td></tr>
  <tr><td>हँड टूल्स</td><td>दुरुस्ती व वायरिंग</td></tr>
  <tr><td>सेफ्टी गिअर</td><td>ग्लोव्हज, गॉगल्स, इन्सुलेटेड टूल्स</td></tr>
</table>
`
      }
    },

    {
      order: 5,
      title: { en: "Job Roles & Industry", mr: "नोकरीची भूमिका व उद्योग" },
      content: {
        en: `
<h3>Common Job Roles</h3>

<ul>
  <li>EV Service Technician</li>
  <li>Battery Repair Technician</li>
  <li>Charging Station Technician</li>
  <li>Motor & Controller Repair Technician</li>
  <li>EV Assembly Line Technician</li>
</ul>

<h3>Industries Hiring EV Technicians</h3>

<ul>
  <li>EV manufacturers (2W, 3W, 4W)</li>
  <li>EV service centers & garages</li>
  <li>Battery manufacturers & recyclers</li>
  <li>Charging station companies</li>
  <li>Dealerships & service franchises</li>
</ul>

<p>EV adoption is rising rapidly—creating strong future job demand.</p>
`,
        mr: `
<h3>सामान्य नोकरी भूमिका</h3>

<ul>
  <li>EV सर्व्हिस टेक्निशियन</li>
  <li>बॅटरी रिपेअर टेक्निशियन</li>
  <li>चार्जिंग स्टेशन टेक्निशियन</li>
  <li>मोटर व कंट्रोलर रिपेअर टेक्निशियन</li>
  <li>EV असेंब्ली लाईन टेक्निशियन</li>
</ul>

<h3>ज्या उद्योगांत मागणी आहे</h3>

<ul>
  <li>EV उत्पादक कंपन्या (2W, 3W, 4W)</li>
  <li>EV सर्व्हिस सेंटर व गॅरेज</li>
  <li>बॅटरी उत्पादन व रिसायकलिंग कंपन्या</li>
  <li>चार्जिंग स्टेशन कंपन्या</li>
  <li>डीलरशिप व सर्व्हिस फ्रेंचायझी</li>
</ul>

<p>EV स्वीकारण्याचे प्रमाण वेगाने वाढत असल्यामुळे नोकरीच्या संधी सातत्याने वाढणार आहेत.</p>
`
      }
    },

    {
      order: 6,
      title: { en: "Salary & Earnings", mr: "पगार व कमाई" },
      content: {
        en: `
<h3>Earning Potential</h3>

<table border="1" cellpadding="6">
  <tr><th>Experience</th><th>Monthly Earnings</th></tr>
  <tr><td>Beginner</td><td>₹10,000–₹15,000</td></tr>
  <tr><td>Skilled Technician</td><td>₹15,000–₹25,000</td></tr>
  <tr><td>Specialist (Battery/Motor)</td><td>₹25,000–₹40,000+</td></tr>
</table>

<h3>Additional Income Options</h3>

<ul>
  <li>Repairing batteries & controllers</li>
  <li>Home service visits</li>
  <li>Freelance repair jobs</li>
  <li>EV charging station maintenance</li>
</ul>

<p>Technicians with advanced diagnostic skills earn significantly more.</p>
`,
        mr: `
<h3>कमाईची क्षमता</h3>

<table border="1" cellpadding="6">
  <tr><th>अनुभव</th><th>मासिक कमाई</th></tr>
  <tr><td>बिगिनर</td><td>₹10,000–₹15,000</td></tr>
  <tr><td>कुशल टेक्निशियन</td><td>₹15,000–₹25,000</td></tr>
  <tr><td>स्पेशलिस्ट (बॅटरी/मोटर)</td><td>₹25,000–₹40,000+</td></tr>
</table>

<h3>अतिरिक्त कमाईचे मार्ग</h3>

<ul>
  <li>बॅटरी व कंट्रोलर दुरुस्ती</li>
  <li>होम सर्व्हिस व्हिजिट</li>
  <li>फ्रीलान्स दुरुस्ती काम</li>
  <li>EV चार्जिंग स्टेशन देखभाल</li>
</ul>

<p>उच्च डायग्नोस्टिक कौशल्य असलेले टेक्निशियन जास्त कमाई करतात.</p>
`
      }
    },

    {
      order: 7,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth</h3>

<ul>
  <li>Junior Technician → Senior Technician → Supervisor</li>
  <li>Specialize in battery engineering or controller repair</li>
  <li>Move into EV testing or quality assurance roles</li>
  <li>Start own EV repair shop or service business</li>
</ul>

<h3>Industry Opportunities</h3>

<ul>
  <li>India’s EV market is expanding rapidly</li>
  <li>More EV vehicles = more maintenance jobs</li>
  <li>Government push for clean mobility</li>
  <li>High demand for trained EV technicians</li>
</ul>
`,
        mr: `
<h3>करिअर वाढ</h3>

<ul>
  <li>ज्युनियर टेक्निशियन → सीनियर टेक्निशियन → सुपरवायझर</li>
  <li>बॅटरी इंजिनियरिंग किंवा कंट्रोलर रिपेअरमध्ये स्पेशलायझेशन</li>
  <li>EV टेस्टिंग किंवा क्वालिटी रोलमध्ये जाण्याची संधी</li>
  <li>स्वतःचे EV रिपेअर शॉप सुरू करणे</li>
</ul>

<h3>उद्योगातील संधी</h3>

<ul>
  <li>भारताचा EV मार्केट झपाट्याने वाढत आहे</li>
  <li>जास्त EV = जास्त सर्व्हिसिंग नोकऱ्या</li>
  <li>स्वच्छ ऊर्जा व मोबिलिटीला सरकारी पाठबळ</li>
  <li>प्रशिक्षित EV टेक्निशियनची मोठी मागणी</li>
</ul>
`
      }
    },

    {
      order: 8,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Future Trends in EV Industry</h3>

<ul>
  <li>Rapid growth of EV ownership in India</li>
  <li>Increase in fast-charging stations</li>
  <li>New battery technology (LFP, solid-state)</li>
  <li>More opportunities in EV diagnostics and automation</li>
  <li>High long-term career stability</li>
</ul>

<p>Technicians who learn advanced battery repair, BMS, and smart diagnostics will be future-ready.</p>
`,
        mr: `
<h3>EV उद्योगातील भविष्यातील ट्रेंड</h3>

<ul>
  <li>भारतात EV वापर वेगाने वाढत आहे</li>
  <li>फास्ट-चार्जिंग स्टेशनचा विस्तार</li>
  <li>नवीन बॅटरी तंत्रज्ञान (LFP, सॉलिड-स्टेट)</li>
  <li>EV डायग्नोस्टिक्स व ऑटोमेशनमध्ये अधिक संधी</li>
  <li>दीर्घकालीन करिअर स्थिरता</li>
</ul>

<p>अॅडव्हान्स्ड बॅटरी दुरुस्ती, BMS आणि स्मार्ट डायग्नोस्टिक्स शिकणारे टेक्निशियन भविष्यासाठी तयार राहतील.</p>
`
      }
    }
  ],
  C10: [
    {
      order: 1,
      title: { en: "Overview", mr: "आढावा" },
      content: {
        en: `
<h3>What a CCTV & Home Automation Technician Does</h3>

<p>A CCTV & Home Automation Technician installs, configures, and maintains security cameras, smart home devices, sensors, alarms, and automation systems in homes, offices, and commercial buildings.</p>

<ul>
  <li>Install CCTV cameras & DVR/NVR systems</li>
  <li>Set up smart home devices like Wi-Fi lights, sensors, alarms</li>
  <li>Configure mobile viewing apps & networking</li>
  <li>Troubleshoot camera issues, wiring faults & internet problems</li>
  <li>Install biometric systems & access controls</li>
</ul>

<h3>Work Settings</h3>
<table border="1" cellpadding="6">
  <tr><th>Setting</th><th>Details</th></tr>
  <tr><td>Homes</td><td>Smart home setups, CCTV installation</td></tr>
  <tr><td>Shops & Offices</td><td>Security camera & biometric systems</td></tr>
  <tr><td>Schools & Hospitals</td><td>Surveillance systems</td></tr>
  <tr><td>Commercial Buildings</td><td>Advanced automation & monitoring</td></tr>
  <tr><td>Service Companies</td><td>Regular maintenance & support</td></tr>
</table>
`,
        mr: `
<h3>CCTV व होम ऑटोमेशन तंत्रज्ञ काय करतो?</h3>

<p>CCTV व होम ऑटोमेशन तंत्रज्ञ घर, ऑफिस आणि व्यावसायिक ठिकाणी सुरक्षा कॅमेरे, स्मार्ट होम डिव्हाइस, सेन्सर्स, अलार्म आणि ऑटोमेशन सिस्टीम बसवणे व देखभाल करणे हे काम करतो.</p>

<ul>
  <li>CCTV कॅमेरे व DVR/NVR सिस्टीम इंस्टॉल करणे</li>
  <li>Wi-Fi लाइट्स, सेन्सर्स, अलार्म सारखी स्मार्ट डिव्हाइसेस सेटअप करणे</li>
  <li>मोबाईल व्ह्यूइंग अॅप्स व नेटवर्किंग कॉन्फिगर करणे</li>
  <li>कॅमेरा समस्या, वायरिंग फॉल्ट व इंटरनेट त्रुटी सोडवणे</li>
  <li>बायोमेट्रिक व ऍक्सेस कंट्रोल सिस्टीम बसवणे</li>
</ul>

<h3>कामाचे ठिकाण</h3>
<table border="1" cellpadding="6">
  <tr><th>ठिकाण</th><th>तपशील</th></tr>
  <tr><td>घरे</td><td>स्मार्ट होम सेटअप, CCTV इंस्टॉलेशन</td></tr>
  <tr><td>दुकाने व ऑफिसेस</td><td>सिक्युरिटी कॅमेरा व बायोमेट्रिक सिस्टीम</td></tr>
  <tr><td>शाळा व रुग्णालये</td><td>सर्व्हेलन्स सिस्टीम</td></tr>
  <tr><td>व्यावसायिक इमारती</td><td>अॅडव्हान्स ऑटोमेशन व मॉनिटरिंग</td></tr>
  <tr><td>सर्व्हिस कंपन्या</td><td>मेंटेनन्स व सपोर्ट</td></tr>
</table>
`
      }
    },

    {
      order: 2,
      title: { en: "Eligibility & Training", mr: "पात्रता व प्रशिक्षण" },
      content: {
        en: `
<h3>Basic Eligibility</h3>

<p>10th or 12th pass candidates can start this career. Basic electrical knowledge is helpful but not mandatory.</p>

<h3>Training Path</h3>
<ol>
  <li>Learn basics of wiring, CCTV setup, and safety</li>
  <li>Practice mounting cameras & routing cables</li>
  <li>Understand DVR/NVR, IP cameras & networking</li>
  <li>Learn home automation systems (Smart lights, sensors)</li>
  <li>Hands-on practice through apprenticeship or field training</li>
</ol>

<p>Many technicians learn through practical experience with local service companies.</p>
`,
        mr: `
<h3>मूलभूत पात्रता</h3>

<p>१०वी किंवा १२वी उत्तीर्ण विद्यार्थी हे करिअर सुरू करू शकतात. बेसिक इलेक्ट्रिकल ज्ञान असल्यास फायदा होतो.</p>

<h3>प्रशिक्षणाचा मार्ग</h3>
<ol>
  <li>वायरिंग, CCTV सेटअप व सुरक्षा बेसिक्स शिकणे</li>
  <li>कॅमेरे माउंट करणे व केबल रूटिंगचा सराव</li>
  <li>DVR/NVR, IP कॅमेरे व नेटवर्किंग समजून घेणे</li>
  <li>स्मार्ट होम सिस्टिम (लाइट्स, सेन्सर्स) शिकणे</li>
  <li>फील्ड प्रशिक्षण किंवा अप्रेंटिसशिप</li>
</ol>

<p>अनेक तंत्रज्ञ प्रत्यक्ष कामातून अनुभव घेतात आणि कौशल्य विकसित करतात.</p>
`
      }
    },

    {
      order: 3,
      title: { en: "Courses & Certificates", mr: "कोर्सेस व प्रमाणपत्रे" },
      content: {
        en: `
<h3>Recommended Courses</h3>

<ul>
  <li>CCTV Installation & Maintenance Course</li>
  <li>IP Camera Networking Training</li>
  <li>Home Automation Technician Course</li>
  <li>Basic Electrical Technician Course</li>
  <li>Security System Installer Training</li>
</ul>

<h3>Useful Certifications</h3>

<ul>
  <li>Skill India – CCTV Technician Certificate</li>
  <li>NSDC Electronics Technician Certificate</li>
  <li>Private Institute Practical Training Certificates</li>
</ul>

<p>Certificates help in getting better projects and higher-paying jobs.</p>
`,
        mr: `
<h3>शिफारस केलेले कोर्सेस</h3>

<ul>
  <li>CCTV इंस्टॉलेशन व मेंटेनन्स कोर्स</li>
  <li>IP कॅमेरा नेटवर्किंग प्रशिक्षण</li>
  <li>होम ऑटोमेशन टेक्निशियन कोर्स</li>
  <li>बेसिक इलेक्ट्रिकल टेक्निशियन कोर्स</li>
  <li>सिक्युरिटी सिस्टम इंस्टॉलर प्रशिक्षण</li>
</ul>

<h3>उपयुक्त प्रमाणपत्रे</h3>

<ul>
  <li>स्किल इंडिया – CCTV टेक्निशियन सर्टिफिकेट</li>
  <li>NSDC इलेक्ट्रॉनिक्स टेक्निशियन सर्टिफिकेट</li>
  <li>खाजगी इन्स्टिट्यूट प्रॅक्टिकल सर्टिफिकेट</li>
</ul>

<p>प्रमाणपत्रामुळे चांगल्या प्रोजेक्ट्स व जास्त पगाराच्या नोकऱ्या मिळतात.</p>
`
      }
    },

    {
      order: 4,
      title: { en: "Skills & Tools", mr: "कौशल्ये व साधने" },
      content: {
        en: `
<h3>Essential Skills</h3>

<ul>
  <li>CCTV wiring & installation</li>
  <li>Network setup (Wi-Fi routers, IP configuration)</li>
  <li>Mobile app configuration for remote viewing</li>
  <li>Basic electrical safety</li>
  <li>Understanding smart home systems (Alexa, Google Home, sensors)</li>
</ul>

<h3>Tools Used</h3>
<table border="1" cellpadding="6">
  <tr><th>Tool</th><th>Use</th></tr>
  <tr><td>Drill Machine</td><td>Camera mounting</td></tr>
  <tr><td>LAN Tester</td><td>Network cable testing</td></tr>
  <tr><td>Multimeter</td><td>Electrical checks</td></tr>
  <tr><td>Crimping Tool</td><td>RJ45 connector setup</td></tr>
  <tr><td>HDD Tools</td><td>DVR/NVR installation</td></tr>
</table>
`,
        mr: `
<h3>महत्त्वाची कौशल्ये</h3>

<ul>
  <li>CCTV वायरिंग व इंस्टॉलेशन</li>
  <li>नेटवर्क सेटअप (Wi-Fi राउटर, IP कॉन्फिगरेशन)</li>
  <li>मोबाईल अॅप कॉन्फिगरेशन</li>
  <li>बेसिक इलेक्ट्रिकल सुरक्षा</li>
  <li>स्मार्ट होम सिस्टीम (Alexa, Google Home, सेन्सर्स)</li>
</ul>

<h3>वापरण्यात येणारी साधने</h3>
<table border="1" cellpadding="6">
  <tr><th>साधन</th><th>उपयोग</th></tr>
  <tr><td>ड्रिल मशीन</td><td>कॅमेरा माउंटिंग</td></tr>
  <tr><td>LAN टेस्टर</td><td>नेटवर्क केबल तपासणी</td></tr>
  <tr><td>मल्टीमीटर</td><td>इलेक्ट्रिकल चेक</td></tr>
  <tr><td>क्रिम्पिंग टूल</td><td>RJ45 कनेक्टर तयार करणे</td></tr>
  <tr><td>HDD टूल्स</td><td>DVR/NVR इंस्टॉलेशन</td></tr>
</table>
`
      }
    },

    {
      order: 5,
      title: { en: "Job Roles & Industry", mr: "नोकरीची भूमिका व उद्योग" },
      content: {
        en: `
<h3>Common Job Roles</h3>

<ul>
  <li>CCTV Installation Technician</li>
  <li>Smart Home Technician</li>
  <li>Security System Installer</li>
  <li>Network & Cabling Technician</li>
  <li>Maintenance Technician</li>
</ul>

<h3>Industries Hiring</h3>

<ul>
  <li>Security system companies</li>
  <li>Home automation service providers</li>
  <li>Real estate & construction projects</li>
  <li>Retail & corporate offices</li>
  <li>Schools, hospitals & institutions</li>
</ul>

<p>This field offers continuous work because buildings always need security & automation.</p>
`,
        mr: `
<h3>सामान्य नोकरी भूमिका</h3>

<ul>
  <li>CCTV इंस्टॉलेशन टेक्निशियन</li>
  <li>स्मार्ट होम टेक्निशियन</li>
  <li>सिक्युरिटी सिस्टम इंस्टॉलर</li>
  <li>नेटवर्क व केबलिंग टेक्निशियन</li>
  <li>मेंटेनन्स टेक्निशियन</li>
</ul>

<h3>ज्या उद्योगांत मागणी आहे</h3>

<ul>
  <li>सिक्युरिटी सिस्टीम कंपन्या</li>
  <li>होम ऑटोमेशन सर्व्हिस प्रोव्हायडर्स</li>
  <li>कन्स्ट्रक्शन व रिअल इस्टेट प्रकल्प</li>
  <li>ऑफिसेस व शॉप्स</li>
  <li>शाळा, रुग्णालये व संस्था</li>
</ul>

<p>सुरक्षा व ऑटोमेशनची गरज सतत वाढत असल्यामुळे या क्षेत्रात नेहमीच काम उपलब्ध असते.</p>
`
      }
    },

    {
      order: 6,
      title: { en: "Salary & Earnings", mr: "पगार व कमाई" },
      content: {
        en: `
<h3>Earning Potential</h3>

<table border="1" cellpadding="6">
  <tr><th>Experience</th><th>Monthly Earnings</th></tr>
  <tr><td>Beginner</td><td>₹10,000–₹14,000</td></tr>
  <tr><td>Skilled Technician</td><td>₹15,000–₹22,000</td></tr>
  <tr><td>Advanced (Networking + Automation)</td><td>₹22,000–₹35,000</td></tr>
</table>

<h3>Extra Income Options</h3>

<ul>
  <li>Freelance CCTV installation</li>
  <li>Annual maintenance contracts (AMC)</li>
  <li>Smart home setup charges</li>
  <li>Cabling & networking projects</li>
</ul>

<p>Technicians with networking and automation expertise earn more.</p>
`,
        mr: `
<h3>कमाईची क्षमता</h3>

<table border="1" cellpadding="6">
  <tr><th>अनुभव</th><th>मासिक कमाई</th></tr>
  <tr><td>बिगिनर</td><td>₹10,000–₹14,000</td></tr>
  <tr><td>कुशल तंत्रज्ञ</td><td>₹15,000–₹22,000</td></tr>
  <tr><td>अॅडव्हान्स्ड (नेटवर्किंग + ऑटोमेशन)</td><td>₹22,000–₹35,000</td></tr>
</table>

<h3>अतिरिक्त कमाई पर्याय</h3>

<ul>
  <li>फ्रीलान्स CCTV इंस्टॉलेशन</li>
  <li>AMC (वार्षिक देखभाल करार)</li>
  <li>स्मार्ट होम सेटअप चार्जेस</li>
  <li>केबलिंग व नेटवर्किंग प्रकल्प</li>
</ul>

<p>नेटवर्किंग आणि ऑटोमेशन कौशल्य असलेले तंत्रज्ञ जास्त कमाई करतात.</p>
`
      }
    },

    {
      order: 7,
      title: { en: "Growth & Opportunities", mr: "वाढ व संधी" },
      content: {
        en: `
<h3>Career Growth</h3>

<ul>
  <li>Helper → Technician → Senior Technician</li>
  <li>Advance to Networking Specialist</li>
  <li>Become a Home Automation Expert</li>
  <li>Start your own CCTV/automation service business</li>
</ul>

<h3>Opportunities</h3>

<ul>
  <li>High demand due to rising security needs</li>
  <li>Smart homes growing in every city</li>
  <li>Offices & shops updating to digital security</li>
  <li>Strong long-term career reliability</li>
</ul>
`,
        mr: `
<h3>करिअर वाढ</h3>

<ul>
  <li>हेल्पर → टेक्निशियन → सीनियर टेक्निशियन</li>
  <li>नेटवर्किंग स्पेशलिस्ट म्हणून प्रगती</li>
  <li>होम ऑटोमेशन एक्स्पर्ट बनणे</li>
  <li>CCTV/ऑटोमेशन सर्व्हिस व्यवसाय सुरू करणे</li>
</ul>

<h3>संधी</h3>

<ul>
  <li>सिक्युरिटीची वाढती गरज</li>
  <li>प्रत्येक शहरात स्मार्ट होमची वाढ</li>
  <li>ऑफिस व दुकानांमध्ये डिजिटल सिक्युरिटी</li>
  <li>दीर्घकालीन स्थिर करिअर</li>
</ul>
`
      }
    },

    {
      order: 8,
      title: { en: "Future Trends", mr: "भविष्यातील ट्रेंड" },
      content: {
        en: `
<h3>Future Trends in Security & Automation</h3>

<ul>
  <li>AI-powered CCTV analytics</li>
  <li>Smart home automation in every apartment</li>
  <li>Cloud-based camera monitoring</li>
  <li>Integration of sensors, alarms & home assistants</li>
  <li>Higher demand for skilled automation technicians</li>
</ul>

<p>Technicians who learn IoT, networking, and automation tools will lead the future market.</p>
`,
        mr: `
<h3>सिक्युरिटी व ऑटोमेशनमधील भविष्यातील ट्रेंड</h3>

<ul>
  <li>AI-आधारित CCTV विश्लेषण</li>
  <li>प्रत्येक फ्लॅटमध्ये स्मार्ट होम सिस्टीम</li>
  <li>क्लाउड-बेस्ड कॅमेरा मॉनिटरिंग</li>
  <li>सेन्सर्स, अलार्म व होम असिस्टंट्सचे इंटिग्रेशन</li>
  <li>कुशल टेक्निशियनची सतत वाढणारी मागणी</li>
</ul>

<p>IoT, नेटवर्किंग आणि ऑटोमेशन शिकणारे तंत्रज्ञ भविष्यात सर्वाधिक यशस्वी ठरतील.</p>
`
      }
    }
  ]

};
