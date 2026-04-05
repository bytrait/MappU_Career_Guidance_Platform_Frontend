
import React from "react";
import SegmentedContent from "./SegmentedContent";
import "bootstrap-icons/font/bootstrap-icons.css";

const dummyHTML = `
<h3><i class="bi bi-diagram-3-fill"></i> Stream / Subjects After 10th</h3>
<p>To become a **software developer**, choose **Science (PCM)** in 11th–12th. This includes **Physics, Chemistry, and Maths**—essential for engineering and coding. If unsure, you can switch to **Commerce/Arts** later but may need extra maths courses. PCM opens doors to **B.Tech/B.E. in Computer Science**, the most direct path.</p>
<ul>
  <li><b>Science (PCM):</b> Best for coding, engineering, robotics, and IT jobs.</li>
  <li><b>Science (PCB):</b> Not ideal; focus shifts to biology/medicine (but can learn coding separately).</li>
  <li><b>Commerce/Arts:</b> Possible but harder—requires self-study in maths/programming.</li>
</ul>

---

<h3><i class="bi bi-arrow-right"></i> Higher Education Path (Step-by-Step Journey)</h3>
<p>Follow this roadmap to become a software developer after Class 10. Costs vary based on college type (government/private).</p>
<table border="1" cellspacing="0" cellpadding="6">
  <tr>
    <th>Step</th>
    <th>Course / Qualification</th>
    <th>Duration</th>
    <th>Estimated Cost (₹)</th>
  </tr>
  <tr>
    <td>1</td>
    <td>11th–12th (Science PCM)</td>
    <td>2 Years</td>
    <td>₹20k – ₹1L (school + coaching)</td>
  </tr>
  <tr>
    <td>2</td>
    <td>B.Tech/B.E. (Computer Science) or BCA</td>
    <td>3–4 Years</td>
    <td>₹3L – ₹12L (IITs/NITs: ₹8L–₹12L; state colleges: ₹3L–₹6L)</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Internship (e.g., at TCS, Infosys, startups)</td>
    <td>3–6 Months</td>
    <td>Stipend: ₹5k–₹20k/month (or unpaid)</td>
  </tr>
  <tr>
    <td>Optional</td>
    <td>M.Tech (CS) / Certifications (e.g., AWS, Google Cloud)</td>
    <td>1–2 Years</td>
    <td>₹1L – ₹5L (online certs: ₹5k–₹50k)</td>
  </tr>
</table>

---

<h3><i class="bi bi-clipboard-check"></i> Eligibility Requirements</h3>
<ul>
  <li><b>Minimum Marks:</b> **60%+ in 12th (PCM)** for B.Tech; **50%+** for BCA/Diploma. Top colleges (IITs/NITs) need **75%+**.</li>
  <li><b>Entrance Exams:</b>
    <ul>
      <li><b>JEE Main/Advanced</b> (for IITs/NITs)</li>
      <li><b>State exams</b> (e.g., MHCET, KCET, EAMCET)</li>
      <li><b>University tests</b> (e.g., VITEEE, BITSAT)</li>
    </ul>
  </li>
  <li><b>Special Requirements:</b>
    <ul>
      <li>Strong **maths/logic skills** (practice on <a href="https://codeforces.com">Codeforces</a>, <a href="https://leetcode.com">LeetCode</a>).</li>
      <li>Build **projects** (e.g., apps, websites) for your portfolio.</li>
      <li>Learn **Python, Java, or C++** early (free resources: <a href="https://www.freecodecamp.org">freeCodeCamp</a>).</li>
    </ul>
  </li>
</ul>

---

<h3><i class="bi bi-clock-fill"></i> Time & Budget Overview</h3>
<p>Total time: **5–7 years** (12th → B.Tech → Job). Budget depends on college choice.</p>
<table border="1" cellspacing="0" cellpadding="6">
  <tr>
    <th>Education Level</th>
    <th>Duration</th>
    <th>Cost (₹)</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>11th–12th (PCM)</td>
    <td>2 Years</td>
    <td>₹20k – ₹1L</td>
    <td>Coaching for JEE/boards adds cost.</td>
  </tr>
  <tr>
    <td>B.Tech (CSE/IT)</td>
    <td>4 Years</td>
    <td>₹3L – ₹12L</td>
    <td>IITs: ₹8L–₹12L; state colleges: ₹3L–₹6L.</td>
  </tr>
  <tr>
    <td>Internship + Job Hunt</td>
    <td>6–12 Months</td>
    <td>₹0 – ₹50k</td>
    <td>Stipends cover some expenses.</td>
  </tr>
  <tr>
    <td>Master’s (Optional)</td>
    <td>1–2 Years</td>
    <td>₹1L – ₹8L</td>
    <td>Abroad: ₹20L+; Indian M.Tech: ₹1L–₹5L.</td>
  </tr>
</table>

<h3><i class=\"bi bi-diagram-3-fill\"></i> १०वी नंतरचे प्रवाह / विषय</h3>\n<p><b>software developer</b> होण्यासाठी ११वी-१२वी मध्ये <b>Science (PCM)</b> निवडा. यात <b>Physics, Chemistry आणि Maths</b> समाविष्ट असतात—हे इंजिनियरिंग आणि coding साठी अत्यावश्यक आहेत. जर अनिश्चित असाल तर नंतर <b>Commerce/Arts</b> मध्ये जाऊ शकता, परंतु अतिरिक्त maths कोर्सेसची गरज भासू शकते. PCM मुळे <b>B.Tech/B.E. in Computer Science</b> साठी थेट मार्ग मोकळा होतो.</p>\n<ul>\n   <li><b>Science (PCM):</b> Coding, engineering, robotics आणि IT jobs साठी उत्तम.</li>\n   <li><b>Science (PCB):</b> योग्य नाही; focus biology/medicine वर असतो (पण coding वेगळे शिकता येते).</li>\n   <li><b>Commerce/Arts:</b> शक्य आहे पण अवघड—maths/programming मध्ये self-study करण्याची गरज.</li>\n</ul>\n---\n<h3><i class=\"bi bi-arrow-right\"></i> उच्च शिक्षणाचा मार्ग (स्टेप-बाय-स्टेप प्रगती)</h3>\n<p>१०वी नंतर <b>software developer</b> होण्यासाठी हा रोडमॅप फॉलो करा. खर्च college च्या प्रकारावर (government/private) अवलंबून बदलतो.</p>\n<table border=\"1\" cellspacing=\"0\" cellpadding=\"6\">\n   <tr>\n     <th>स्टेप</th>\n     <th>कोर्स / पात्रता</th>\n     <th>कालावधी</th>\n     <th>अंदाजे खर्च (₹)</th>\n   </tr>\n   <tr>\n     <td>1</td>\n     <td>११वी–१२वी (Science PCM)</td>\n     <td>2 वर्षे</td>\n     <td>₹20k – ₹1L (शाळा + coaching)</td>\n   </tr>\n   <tr>\n     <td>2</td>\n     <td>B.Tech/B.E. (Computer Science) किंवा BCA</td>\n     <td>3–4 वर्षे</td>\n     <td>₹3L – ₹12L (IITs/NITs: ₹8L–₹12L; राज्य महाविद्यालये: ₹3L–₹6L)</td>\n   </tr>\n   <tr>\n     <td>3</td>\n     <td>Internship (उदा., TCS, Infosys, startups मध्ये)</td>\n     <td>3–6 महिने</td>\n     <td>Stipend: ₹5k–₹20k/महिना (किंवा unpaid)</td>\n   </tr>\n   <tr>\n     <td>Optional</td>\n     <td>M.Tech (CS) / Certifications (उदा., AWS, Google Cloud)</td>\n     <td>1–2 वर्षे</td>\n     <td>₹1L – ₹5L (online certs: ₹5k–₹50k)</td>\n   </tr>\n</table>\n---\n<h3><i class=\"bi bi-clipboard-check\"></i> पात्रता निकष</h3>\n<ul>\n   <li><b>किमान गुण:</b> B.Tech साठी <b>१२वी (PCM) मध्ये ६०%+</b>; BCA/Diploma साठी <b>५०%+</b>. टॉप कॉलेजेस (IITs/NITs) साठी <b>७५%+</b> आवश्यक.</li>\n   <li><b>प्रवेश परीक्षा:</b>\n     <ul>\n       <li><b>JEE Main/Advanced</b> (IITs/NITs साठी)</li>\n       <li><b>राज्य परीक्षा</b> (उदा., MHCET, KCET, EAMCET)</li>\n       <li><b>विश्वविद्यालय परीक्षा</b> (उदा., VITEEE, BITSAT)</li>\n     </ul>\n   </li>\n   <li><b>विशेष आवश्यकता:</b>\n     <ul>\n       <li>मजबूत <b>maths/logic skills</b> (प्रॅक्टिस <a href=\"https://codeforces.com\">Codeforces</a>, <a href=\"https://leetcode.com\">LeetCode</a> वर करा).</li>\n       <li>तुमच्या <b>portfolio</b> साठी <b>projects</b> बनवा (उदा., apps, websites).</li>\n       <li>लवकर <b>Python, Java, किंवा C++</b> शिका (फ्री रिसोर्सेस: <a href=\"https://www.freecodecamp.org\">freeCodeCamp</a>).</li>\n     </ul>\n   </li>\n</ul>\n---\n<h3><i class=\"bi bi-clock-fill\"></i> वेळ आणि बजेट आढावा</h3>\n<p>एकूण वेळ: <b>५–७ वर्षे</b> (१२वी → B.Tech → Job). बजेट college निवडीवर अवलंबून असते.</p>\n<table border=\"1\" cellspacing=\"0\" cellpadding=\"6\">\n   <tr>\n     <th>शिक्षण पातळी</th>\n     <th>कालावधी</th>\n     <th>खर्च (₹)</th>\n     <th>नोंदी</th>\n   </tr>\n   <tr>\n     <td>११वी–१२वी (PCM)</td>\n     <td>2 वर्षे</td>\n     <td>₹20k – ₹1L</td>\n     <td>JEE/boards साठी coaching मुळे खर्च वाढतो.</td>\n   </tr>\n   <tr>\n     <td>B.Tech (CSE/IT)</td>\n     <td>4 वर्षे</td>\n     <td>₹3L – ₹12L</td>\n     <td>IITs: ₹8L–₹12L; राज्य महाविद्यालये: ₹3L–₹6L.</td>\n   </tr>\n   <tr>\n     <td>Internship + Job Hunt</td>\n     <td>6–12 महिने</td>\n     <td>₹0 – ₹50k</td>\n     <td>Stipend मुळे काही खर्च भरून निघतात.</td>\n   </tr>\n   <tr>\n     <td>Master’s (Optional)</td>\n     <td>1–2 वर्षे</td>\n     <td>₹1L – ₹8L</td>\n     <td>परदेश: ₹20L+; Indian M.Tech: ₹1L–₹5L.</td>\n   </tr>\n</table>
<h3><i class=\"bi bi-diagram-3-fill\"></i> १०वी नंतर स्ट्रीम / विषय निवड</h3>\n<p>**सॉफ्टवेअर डेव्हलपर** होण्यासाठी ११वी–१२वीत **सायन्स (PCM)** निवडा. यात **फिजिक्स, केमिस्ट्री आणि मॅथ्स** असतात—इंजिनियरिंग आणि कोडिंगसाठी हे विषय अत्यंत आवश्यक आहेत. नक्की नसल्यास नंतर **कॉमर्स/आर्ट्स**मध्ये जाऊ शकता, पण त्यासाठी अतिरिक्त मॅथ्सचे कोर्सेस करावे लागतील. PCM हा **B.Tech/B.E. (कंप्यूटर सायन्स)**चा थेट मार्ग उघडतो.</p>\n<ul>\n   <li><b>सायन्स (PCM):</b> कोडिंग, इंजिनियरिंग, रोबोटिक्स आणि IT जॉब्ससाठी सर्वोत्तम.</li>\n   <li><b>सायन्स (PCB):</b> योग्य नाही; फोकस बायोलॉजी/मेडिसिनवर जातो (पण स्वतंत्रपणे कोडिंग शिकता येते).</li>\n   <li><b>कॉमर्स/आर्ट्स:</b> शक्य आहे, पण अवघड—मॅथ्स आणि प्रोग्रामिंगचे स्व-अध्ययन आवश्यक.</li>\n</ul>\n---\n<h3><i class=\"bi bi-arrow-right\"></i> उच्च शिक्षणाचा मार्ग (स्टेप-बाय-स्टेप)</h3>\n<p>१०वी नंतर सॉफ्टवेअर डेव्हलपर होण्यासाठी हा रोडमॅप फॉलो करा. खर्च कॉलेजच्या प्रकारावर अवलंबून असतो (सरकारी/खाजगी).</p>\n<table border=\"1\" cellspacing=\"0\" cellpadding=\"6\">\n   <tr>\n     <th>स्टेप</th>\n     <th>कोर्स / पात्रता</th>\n     <th>कालावधी</th>\n     <th>अंदाजे खर्च (₹)</th>\n   </tr>\n   <tr>\n     <td>१</td>\n     <td>११वी–१२वी (सायन्स PCM)</td>\n     <td>२ वर्षे</td>\n     <td>₹२०k – ₹१L (शाळा + कोचिंग)</td>\n   </tr>\n   <tr>\n     <td>२</td>\n     <td>B.Tech/B.E. (कंप्यूटर सायन्स) किंवा BCA</td>\n     <td>३–४ वर्षे</td>\n     <td>₹३L – ₹१२L (IITs/NITs: ₹८L–₹१२L; राज्य कॉलेज: ₹३L–₹६L)</td>\n   </tr>\n   <tr>\n     <td>३</td>\n     <td>इंटर्नशिप (उदा., TCS, Infosys, स्टार्टअप्स)</td>\n     <td>३–६ महिने</td>\n     <td>स्टायपेंड: ₹५k–₹२०k/महिना (किंवा अनपेड)</td>\n   </tr>\n   <tr>\n     <td>ऐच्छिक</td>\n     <td>M.Tech (CS) / सर्टिफिकेशन्स (उदा., AWS, Google Cloud)</td>\n     <td>१–२ वर्षे</td>\n     <td>₹१L – ₹५L (ऑनलाइन सर्ट्स: ₹५k–₹५०k)</td>\n   </tr>\n</table>\n---\n<h3><i class=\"bi bi-clipboard-check\"></i> पात्रता निकष</h3>\n<ul>\n   <li><b>किमान गुण:</b> B.Techसाठी **१२वीत ६०%+ (PCM)**; BCA/डिप्लोमासाठी **५०%+**. टॉप कॉलेजेस (IITs/NITs) साठी **७५%+** आवश्यक.</li>\n   <li><b>प्रवेश परीक्षा:</b>\n     <ul>\n       <li><b>JEE Main/Advanced</b> (IITs/NITsसाठी)</li>\n       <li><b>राज्य परीक्षा</b> (उदा., MHCET, KCET, EAMCET)</li>\n       <li><b>युनिव्हर्सिटी टेस्ट</b> (उदा., VITEEE, BITSAT)</li>\n     </ul>\n   </li>\n   <li><b>विशेष आवश्यकता:</b>\n     <ul>\n       <li>मजबूत **मॅथ्स/लॉजिक स्किल्स** (<a href=\"https://codeforces.com\">Codeforces</a>, <a href=\"https://leetcode.com\">LeetCode</a>वर प्रॅक्टिस करा).</li>\n       <li>पोर्टफोलिओसाठी **प्रोजेक्ट्स** बनवा (उदा., ऍप्स, वेबसाइट्स).</li>\n       <li>लवकरात लवकर **Python, Java, किंवा C++** शिका (फ्री रिसोर्सेस: <a href=\"https://www.freecodecamp.org\">freeCodeCamp</a>).</li>\n     </ul>\n   </li>\n</ul>\n---\n<h3><i class=\"bi bi-clock-fill\"></i> वेळ आणि बजेट आढावा</h3>\n<p>एकूण वेळ: **५–७ वर्षे** (१२वी → B.Tech → जॉब). बजेट कॉलेज निवडीवर अवलंबून.</p>\n<table border=\"1\" cellspacing=\"0\" cellpadding=\"6\">\n   <tr>\n     <th>शिक्षण पातळी</th>\n     <th>कालावधी</th>\n     <th>खर्च (₹)</th>\n     <th>नोंदी</th>\n   </tr>\n   <tr>\n     <td>११वी–१२वी (PCM)</td>\n     <td>२ वर्षे</td>\n     <td>₹२०k – ₹१L</td>\n     <td>JEE/बोर्डसाठी कोचिंगमुळे खर्च वाढतो.</td>\n   </tr>\n   <tr>\n     <td>B.Tech (CSE/IT)</td>\n     <td>४ वर्षे</td>\n     <td>₹३L – ₹१२L</td>\n     <td>IITs: ₹८L–₹१२L; राज्य कॉलेज: ₹३L–₹६L.</td>\n   </tr>\n   <tr>\n     <td>इंटर्नशिप + जॉब शोध</td>\n     <td>६–१२ महिने</td>\n     <td>₹० – ₹५०k</td>\n     <td>स्टायपेंडमुळे काही खर्च भरून निघतो.</td>\n   </tr>\n   <tr>\n     <td>मास्टर्स (ऐच्छिक)</td>\n     <td>१–२ वर्षे</td>\n     <td>₹१L – ₹८L</td>\n     <td>परदेश: ₹२०L+; भारतीय M.Tech: ₹१L–₹५L.</td>\n   </tr>\n</table>
`
function CareerContent() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Software Developer – Structured Career Info
      </h1>
      <SegmentedContent html={dummyHTML} />
    </div>
  );
}

export default CareerContent;
