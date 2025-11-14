import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
// Link → 특정 라우트(/article/[id] 등)로 이동하기 위한 Expo Router 컴포넌트

export default function ArticleList() {
  // 📌 더미 기사 목록 (나중에 API 연동 시 이 자리에 서버 데이터가 들어옴)
  const dummyArticles = [
    { id: 1, title: "AI & 데이터 서밋 2025 요약", date: "2025.10.20" },
    { id: 2, title: "한입기사 프로젝트 성공 비결", date: "2025.10.21" },
  ];

  return (
    // 전체 화면이 스크롤 가능하도록 ScrollView 사용
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F7F3EA" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* 페이지 제목 */}
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

      {/* 기사 목록 반복 렌더링 */}
      {dummyArticles.map((a) => (
        <TouchableOpacity
          key={a.id}
          activeOpacity={0.8}                     // 누를 때 살짝 어두워지는 효과
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
          {/* Link로 기사 상세 페이지로 이동 (/article/ID) */}
          <Link
            href={`/article/${a.id}`}             // 예: /article/1
            style={{ textDecorationLine: "none" }} // 밑줄 제거
          >
            {/* 기사 제목 */}
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#222" }}>
              {a.title}
            </Text>

            {/* 기사 날짜 */}
            <Text style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
              {a.date}
            </Text>
          </Link>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
