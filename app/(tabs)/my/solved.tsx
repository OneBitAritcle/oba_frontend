import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fetchSolvedArticles } from "@/api/my";
import { useRouter } from "expo-router";

export default function SolvedScreen() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchSolvedArticles().then(setList);
  }, []);

  return (
    <View>
      {list.map((item: any) => (
        <TouchableOpacity
          key={item.articleId}
          onPress={() => router.push(`/article/${item.articleId}`)}
        >
          <Text>{item.articleId}. {item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
