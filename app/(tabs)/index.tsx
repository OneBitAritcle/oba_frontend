// app/(tabs)/index.tsx
import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { apiClient } from "@/api/apiClient";

// ===============================
// CONFIG
// ===============================
const CARD_SPACING = 10;

function useDynamicDimensions() {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = width * 0.65;
  const SIDE_SPACING = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
  return { CARD_WIDTH, SIDE_SPACING, SNAP_INTERVAL };
}

// ===============================
// 첫 이미지 추출 함수
// ===============================
const getFirstImage = (content: any): string | null => {
  if (!Array.isArray(content)) return null;
  for (const section of content) {
    for (const line of section) {
      if (typeof line === "string" && line.startsWith("<img>")) {
        return line.replace("<img>", "").trim();
      }
    }
  }
  return null;
};

export default function Home() {
  const { CARD_WIDTH, SIDE_SPACING, SNAP_INTERVAL } = useDynamicDimensions();

  // 오늘 날짜
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  // 🔥 백엔드 데이터
  const [articles, setArticles] = useState([]);

  async function loadArticles() {
    try {
      const res = await apiClient.get("/articles/latest");
      setArticles(res.data);
    } catch (err) {
      console.error("❌ 오늘의 기사 불러오기 오류:", err);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  // 캐러셀용 루프 데이터
  const loopData =
    articles.length >= 3
      ? [
          ...articles.slice(-2),
          ...articles,
          ...articles.slice(0, 2),
        ]
      : [];

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // =============================
  // 카드 컴포넌트
  // =============================
  const Card = ({ item, cardIndex }) => {
    const inputRange = [
      (cardIndex - 1) * SNAP_INTERVAL,
      cardIndex * SNAP_INTERVAL,
      (cardIndex + 1) * SNAP_INTERVAL,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    });

    return (
      <Link href={`/article/${item.articleId}`} asChild>
        <Pressable>
          <Animated.View
            style={[
              styles.card,
              { width: CARD_WIDTH, opacity, transform: [{ scale }] },
            ]}
          >
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>

            <Image
              source={require("../../assets/images/placeholder.png")}
              style={styles.cardImage}
              resizeMode="cover"
            />

            <Text numberOfLines={3} style={styles.cardSummary}>
              {item.summaryBullets?.join(" ") ?? "요약 없음"}
            </Text>
          </Animated.View>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 80 }}>
      {/* =============================== */}
      {/* 🔥 상단 streak / 날짜 / 프로필 카드 유지 */}
      {/* =============================== */}
      <View style={styles.streakCard}>
        <View style={styles.topRow}>
          <Image
            source={require("../../assets/knight/basic_profile.png")}
            style={styles.profileIcon}
          />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.name}>한입기사님</Text>
            <Text style={styles.date}>{formattedDate}</Text>

            <View style={styles.streakRow}>
              <Text style={styles.fireEmoji}>🔥</Text>
              <Text style={styles.streakText}>연속 학습 5일</Text>
            </View>
          </View>

          <Link href="/report" asChild>
            <TouchableOpacity>
              <Text style={styles.goReport}>›</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* 요일 표시 */}
        <View style={styles.weekRow}>
          {["월", "화", "수", "목", "금", "토", "일"].map((day, i) => (
            <View
              key={i}
              style={[
                styles.dayCircle,
                (i + 1) % 7 === today.getDay() && styles.todayCircle,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  (i + 1) % 7 === today.getDay() && styles.todayText,
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* =============================== */}
      {/* 🔥 오늘의 기사 캐러셀 */}
      {/* =============================== */}
      <View style={{ marginTop: 40 }}>
        <Text style={styles.sectionTitle}>오늘의 기사</Text>

        {loopData.length > 0 ? (
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: SIDE_SPACING }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          >
            {loopData.map((item, i) => (
              <Card key={i} item={item} cardIndex={i} />
            ))}
          </Animated.ScrollView>
        ) : (
          <Text style={{ marginLeft: 24 }}>불러오는 중...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  streakCard: {
    backgroundColor: "#fff7e6",
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 20,
  },
  topRow: { flexDirection: "row", alignItems: "center" },

  profileIcon: { width: 42, height: 42, borderRadius: 21 },

  name: { fontSize: 16, fontWeight: "700", color: "#222" },
  date: { fontSize: 14, color: "#555", marginTop: 2 },

  streakRow: { flexDirection: "row", marginTop: 4, alignItems: "center" },
  fireEmoji: { fontSize: 20, marginRight: 4 },
  streakText: { fontSize: 14, color: "#333" },

  goReport: { fontSize: 30, color: "#777", marginLeft: 12 },

  weekRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  todayCircle: { backgroundColor: "#ffd666" },
  dayText: { fontSize: 14, color: "#666" },
  todayText: { color: "#fff", fontWeight: "700" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 24,
    marginBottom: 16,
    color: "#333",
  },

  card: {
    height: 400,
    marginRight: CARD_SPACING,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  cardImage: {
    height: 150,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardSummary: {
    fontSize: 12,
    color: "#555",
  },
});
