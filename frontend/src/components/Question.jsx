import { useEffect, useState } from "react";

function QuestionAnswer() {
  const [answer, setAnswer] = useState("Fetching answer...");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/data/answer`)
      .then((res) => res.json())
      .then((data) => setAnswer(data.answer))
      .catch((err) => setAnswer("Failed to load answer"));
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">What is React?</h2>
      <p className="text-lg text-gray-700">{answer}</p>
    </div>
  );
}

export default QuestionAnswer;
