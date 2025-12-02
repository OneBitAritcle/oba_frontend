import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fetchQuiz, submitIncorrect, submitSolved } from "@/api/quiz";

export default function QuizTab({ articleId }) {
  const [quiz, setQuiz] = useState([]);
  const [selected, setSelected] = useState(Array(5).fill(null));

  useEffect(() => {
    fetchQuiz(articleId).then((data) => setQuiz(data.quiz));
  }, []);

  const onSelect = (idx: number, value: number) => {
    const next = [...selected];
    next[idx] = value;
    setSelected(next);
  };

  const submit = async () => {
    const incorrect = selected.map((ans, i) => ans !== quiz[i].answer);

    await submitSolved(articleId);
    await submitIncorrect(articleId, incorrect);
  };

  return (
    <View>
      {quiz.map((q, idx) => (
        <View key={idx}>
          <Text>{q.question}</Text>

          {q.options.map((opt: string, i: number) => (
            <TouchableOpacity key={i} onPress={() => onSelect(idx, i + 1)}>
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity onPress={submit}>
        <Text>정답 제출</Text>
      </TouchableOpacity>
    </View>
  );
}
