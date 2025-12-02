import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fetchWrongArticles } from "@/api/my";
import { useRouter } from "expo-router";

export default function WrongScreen() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchWrongArticles().then(setList);
  }, []);

  return (
    <View>
      {list.map((item: any) => (
        <TouchableOpacity
          key={item.articleId}
          onPress={() => router.push(`/article/${item.articleId}?retry=true`)}
        >
          <Text style={{ color: "red" }}>⚠ 틀림 → 다시 풀기</Text>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
