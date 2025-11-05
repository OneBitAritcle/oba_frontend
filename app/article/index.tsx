import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function ArticleList() {
  const dummyArticles = [
    { id: 1, title: "AI & 데이터 서밋 2025 요약", date: "2025.10.20" },
    { id: 2, title: "한입기사 프로젝트 성공 비결", date: "2025.10.21" },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F3EA" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        오늘의 기사
      </Text>

      {dummyArticles.map((a) => (
        <TouchableOpacity
          key={a.id}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Link href={`/article/${a.id}`} style={{ textDecorationLine: "none" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#222" }}>
              {a.title}
            </Text>
            <Text style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
              {a.date}
            </Text>
          </Link>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
