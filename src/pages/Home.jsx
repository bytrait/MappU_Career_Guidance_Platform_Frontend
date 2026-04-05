import { useEffect, useState } from 'react';
import { fetchAssessmentQuestions } from '../services/assessmentService';

function HomePage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchAssessmentQuestions('OCEAN', 'en');
        console.log('Fetched questions:', data);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    loadQuestions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Assessment Questions</h1>
      <ul className="space-y-2">
        {questions.map((q) => (
          <li key={q.id} className="p-3 bg-white shadow rounded">
            {q.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
