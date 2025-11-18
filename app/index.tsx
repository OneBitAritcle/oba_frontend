// app/index.tsx

import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

// ===============================
// CONFIG
// ===============================
const CARD_WIDTH = width * 0.65;  // 한 장당 65%
const SIDE_SPACING = (width - CARD_WIDTH * 3) / 2;  // 3장 전체 가운데 배치
const CARD_SPACING = 10;

// 실제 화면에 카드 3장이 보이도록 Offset 계산
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

export default function Home() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  // =============================
  // ARTICLE DATA
  // =============================
  const articles = [
    {
      id: 1,
      title: "AI & 데이터 서밋 2025",
      bullets: [
        "AI 산업 확산 전략 공개",
        "데이터 기반 의사결정 중요성 강조",
        "기업 경쟁력 핵심 요소로 부상",
        "AI 인프라 투자 계획 확대",
        "글로벌 기술 표준 협의 논의",
      ],
    },
    {
      id: 2,
      title: "테슬라, 자율주행 완전 상용화 선언",
      bullets: [
        "FSD 완전자율 일부 지역 개방",
        "운전자 개입률 대폭 감소",
        "도로 데이터 수집 확대",
        "안전성 검증 진행 중",
        "글로벌 확장 계획 발표",
      ],
    },
    {
      id: 3,
      title: "메타버스 2.0 시대 개막",
      bullets: [
        "현실과 디지털 융합 가속화",
        "차세대 플랫폼 공개",
        "콘텐츠 생태계 확대",
        "기업 가상 오피스 도입 증가",
        "디지털 거버넌스 논의",
      ],
    },
    {
      id: 4,
      title: "메타, 차세대 메타버스 비전 발표",
      bullets: [
        "AI 기반 상호작용 강화",
        "창작자 도구 업그레이드",
        "파트너십 대규모 체결",
        "글로벌 시장 확대",
        "교육/업무용 기능 강화",
      ],
    },
    {
      id: 5,
      title: "메타버스 플랫폼 경쟁 본격화",
      bullets: [
        "대형 플랫폼 경쟁 심화",
        "사용자 기반 급증",
        "XR 기술 활용 증가",
        "콘텐츠 시장 폭발 성장",
        "자율 경제 시스템 도입",
      ],
    },
  ];

  // Loop용 데이터
  const loopData = [
    articles[articles.length - 2],
    articles[articles.length - 1],
    ...articles,
    articles[0],
    articles[1],
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const [index, setIndex] = useState(2); // 중앙 인덱스(루프 보정)

  // =============================
  // LOOP 처리
  // =============================
  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    let newIndex = Math.round(offsetX / SNAP_INTERVAL);

    // 루프 앞쪽
    if (newIndex === 0) {
      newIndex = articles.length;
      scrollViewRef.current.scrollTo({
        x: articles.length * SNAP_INTERVAL,
        animated: false,
      });
    }

    // 루프 뒤쪽
    if (newIndex === loopData.length - 1) {
      newIndex = 1;
      scrollViewRef.current.scrollTo({
        x: SNAP_INTERVAL,
        animated: false,
      });
    }

    setIndex(newIndex);
  };

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
      outputRange: [0.4, 1, 0.4],
    });

    return (
      <Link href={`/article/${item.id}`} asChild>
        <Pressable>
          <Animated.View
            style={[
              styles.card,
              {
                opacity,
                transform: [{ scale }],
              },
            ]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>

            <View style={{ marginTop: 10 }}>
              {item.bullets.map((b, i) => (
                <View key={i} style={{ flexDirection: "row", marginBottom: 3 }}>
                  <Text style={{ marginRight: 6, fontSize: 12 }}>•</Text>
                  <Text style={{ fontSize: 13, flex: 1 }}>{b}</Text>
                </View>
              ))}
            </View>
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
                source={require("../assets/images/basic_profile.png")}
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
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
});
