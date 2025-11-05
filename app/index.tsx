import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  // 오늘 날짜 자동 표시
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  // 📰 더미 기사 데이터
  const articles = [
    {
      id: 1,
      title: "AI & 데이터 서밋 2025",
      summary: "AI 전략과 데이터 기반 혁신이 산업 경쟁력을 결정한다는 분석.",
    },
    {
      id: 2,
      title: "테슬라, 자율주행 완전 상용화 선언",
      summary: "일부 지역에서 자율주행 차량을 완전 개방하며 시장 반응이 뜨겁다.",
    },
    {
      id: 3,
      title: "메타버스 2.0 시대 개막",
      summary: "현실 경제와 디지털 세상이 융합되는 새로운 메타버스 플랫폼이 공개되었다.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* 🔥 상단: 프로필 + 출석 카드 */}
      <View style={styles.streakCard}>
        {/* 상단: 프로필 + 날짜 + 화살표 */}
        <View style={styles.topRow}>
          <Link href="/my" asChild>
            <TouchableOpacity>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                }}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          </Link>

          <View style={styles.dateSection}>
            <Text style={styles.todayDate}>{formattedDate}</Text>
            <View style={styles.streakRow}>
              <Text style={styles.fireEmoji}>🔥</Text>
              <Text style={styles.streakText}>
                연속 학습 <Text style={{ fontWeight: "700" }}>5</Text>일
              </Text>
            </View>
          </View>

          <TouchableOpacity>
            <Text style={styles.nextArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 🗓 주간 달력 */}
        <View style={styles.weekRow}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
            <View
              key={i}
              style={[
                styles.dayCircle,
                i >= 1 && i <= 3
                  ? styles.activeDay
                  : i === today.getDay()
                  ? styles.todayDay
                  : styles.inactiveDay,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  i >= 1 && i <= 3
                    ? styles.activeText
                    : i === today.getDay()
                    ? styles.todayText
                    : styles.inactiveText,
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 📰 기사 리스트 (가로 스와이프 캐러셀) */}
      <View style={styles.articleSection}>
        <Text style={styles.articleTitle}>오늘의 기사</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={styles.articleScroll}
        >
          {articles.map((article) => (
            <View key={article.id} style={styles.articleCard}>
              <Text style={styles.articleHeader}>{article.title}</Text>
              <Text style={styles.articleSummary}>{article.summary}</Text>
              <Link href={`/article/${article.id}`} asChild>
                <TouchableOpacity style={styles.readBtn}>
                  <Text style={styles.readBtnText}>자세히 보기</Text>
                </TouchableOpacity>
              </Link>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3EA",
    paddingTop: 50,
  },
  fireEmoji: {
    fontSize: 20,
    marginRight: 6,
  },


  streakCard: {
    backgroundColor: "#fff7e6",
    borderRadius: 20,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  profileIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  dateSection: {
    flex: 1,
    marginLeft: 10,
  },

  todayDate: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  streakRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  fireIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },

  streakText: {
    fontSize: 15,
    color: "#333",
  },

  nextArrow: {
    fontSize: 22,
    color: "#999",
    fontWeight: "600",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 4,
  },

  dayCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  activeDay: { backgroundColor: "#ffe58f" },
  todayDay: {
    backgroundColor: "#ffd666",
    borderWidth: 2,
    borderColor: "#ff9f00",
  },
  inactiveDay: { backgroundColor: "#f0f0f0" },

  dayText: { fontSize: 15 },
  activeText: { color: "#c47f00", fontWeight: "600" },
  todayText: { color: "#fff", fontWeight: "700" },
  inactiveText: { color: "#999" },

  // 📰 기사 섹션
  articleSection: {
    marginTop: 40,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 24,
    marginBottom: 12,
    color: "#333",
  },
  articleScroll: {
    paddingHorizontal: 16,
  },
  articleCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: 280,
    padding: 20,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  articleHeader: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  articleSummary: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    lineHeight: 20,
  },
  readBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#222",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  readBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

