import { useState } from "react";

export default function useQuizState(quizCount: number) {
  const [current, setCurrent] = useState(0);

  return {
    current,
    next: () => setCurrent((c) => Math.min(c + 1, quizCount - 1)),
  };
}
