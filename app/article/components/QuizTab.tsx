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
        <View key={idx} style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: "700" }}>{q.question}</Text>

          {q.options.map((opt: string, i: number) => (
            <TouchableOpacity
              key={i}
              onPress={() => onSelect(idx, i + 1)}
              style={{
                padding: 6,
                marginTop: 4,
                borderWidth: 1,
                borderColor: selected[idx] === i + 1 ? "blue" : "#ccc",
              }}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity
        onPress={submit}
        style={{
          padding: 12,
          backgroundColor: "#2C6EF2",
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>정답 제출</Text>
      </TouchableOpacity>
    </View>
  );
}
