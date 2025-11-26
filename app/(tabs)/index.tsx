// app/index.tsx
import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { articles } from "../data/article"; 

// ===============================
// CONFIG
// ===============================
const CARD_SPACING = 10;

function useDynamicDimensions() {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = width * 0.65;
  const SIDE_SPACING = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
  return { width, CARD_WIDTH, SIDE_SPACING, SNAP_INTERVAL };
}

// 첫 이미지 추출 함수
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
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  // Loop용 데이터: 앞뒤 패딩 추가로 무한 루프 구성
  const loopData =
    articles.length >= 3
      ? [
          ...articles.slice(-2), // 마지막 2개를 앞에 복사
          ...articles,            // 원본
          ...articles.slice(0, 2), // 첫 2개를 뒤에 복사
        ]
      : new Array(5).fill(articles[0]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(articles.length >= 2 ? 2 : 0); // 원본 시작점으로 설정

  // 초기 로드 시 중앙 위치로 스크롤
  useEffect(() => {
    if (scrollViewRef.current && loopData.length > 0) {
      const startIdx = articles.length >= 2 ? 2 : 0;
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: startIdx * SNAP_INTERVAL,
          animated: false,
        });
      }, 100);
    }
  }, [SNAP_INTERVAL, loopData.length]);

  // =============================
  // LOOP 처리 - 무한 루프 구현
  // =============================
  const handleScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    let newIndex = Math.round(offsetX / SNAP_INTERVAL);

    // 앞쪽 패딩 영역에 도달: 뒤쪽으로 이동
    if (newIndex < articles.length / 2) {
      newIndex = articles.length + (newIndex % articles.length);
      scrollViewRef.current?.scrollTo({
        x: newIndex * SNAP_INTERVAL,
        animated: false,
      });
    }

    // 뒤쪽 패딩 영역에 도달: 앞쪽으로 이동
    if (newIndex >= articles.length + articles.length / 2) {
      newIndex = articles.length - (loopData.length - newIndex);
      scrollViewRef.current?.scrollTo({
        x: newIndex * SNAP_INTERVAL,
        animated: false,
      });
    }

    setIndex(newIndex);
  };


  // =============================
  // 카드 컴포넌트
  // =============================
  const Card = ({ item, cardIndex }: { item: any; cardIndex: number }) => {
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
      outputRange: [0.4, 1, 0.4],
    });

    const firstImage = Array.isArray(item?.content) ? getFirstImage(item.content) : null;
    const summaryText = item?.summary ?? "";

    return (
      <Link href={`/article/${item.id}`} asChild>
        <Pressable>
          <Animated.View
            style={[
              {
                width: CARD_WIDTH,
                height: 400,
                marginRight: CARD_SPACING,
                backgroundColor: "#fff",
                borderRadius: 18,
                padding: 14,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 6,
              },
              {
                opacity,
                transform: [{ scale }],
              },
            ]}
          >  
            {/* 제목 */}
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>

            {/* 이미지 또는 플레이스홀더 */}
            {firstImage ? (
              <Image
                source={{ uri: firstImage }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.cardPlaceholder}>
                <Image
                  source={require("../../assets/knight/deliever.png")}
                  style={styles.placeholderImage}
                  resizeMode="contain"
                />
                <Text style={styles.placeholderText}>이미지가 없습니다.</Text>
              </View>
            )}

            {/* 요약 */}
            <Text numberOfLines={3} style={styles.cardSummary}>
              {summaryText}
            </Text>
          </Animated.View>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 80 }}>
      {/* 상단 박스 */}
      <View style={styles.streakCard}>
        <View style={styles.topRow}>
          <Link href="/my" asChild>
            <TouchableOpacity>
              <Image
                source={require("../../assets/knight/basic_profile.png")}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          </Link>

          <View style={{ flex: 1, marginLeft: 12 }}>
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

        {/* 요일 */}
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

      {/* 기사 3장 캐러셀 */}
      <View style={{ marginTop: 40 }}>
        <Text style={styles.sectionTitle}>오늘의 기사</Text>

        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingHorizontal: SIDE_SPACING,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {loopData.map((item, i) => (
            <Card key={i} item={item} cardIndex={i} />
          ))}
        </Animated.ScrollView>
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  streakRow: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
  },
  fireEmoji: { fontSize: 20, marginRight: 4 },
  streakText: { fontSize: 14, color: "#333" },
  goReport: {
    fontSize: 28,
    fontWeight: "700",
    color: "#777",
    marginLeft: 12,
  },

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
  todayCircle: {
    backgroundColor: "#ffd666",
  },
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
    height: 500,
    marginRight: CARD_SPACING,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 15,
  },
  cardImage: {
    height: 150,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardPlaceholder: {
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  cardSummary: {
    fontSize: 11,
    lineHeight: 16,
    color: "#666",
    flex: 1,
  },
});