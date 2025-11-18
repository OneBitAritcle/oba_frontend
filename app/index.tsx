// app/index.tsx

import { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

// =========================================================
// 캐러셀 레이아웃 세팅
// =========================================================
const CARD_WIDTH = width * 0.55; // 카드 1개 폭
const CARD_SPACING = 14; // 카드 간격
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING; // 스와이프 단위
const SIDE_PADDING = (width - (CARD_WIDTH * 3 + CARD_SPACING * 2)) / 2; // 3장 중앙 배치 padding

// =========================================================
// 메인 컴포넌트
// =========================================================
export default function Home() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  // 기사 데이터
  const articles = [
    {
      id: 1,
      title: "AI & 데이터 서밋 2025",
      bullets: [
        "AI 산업 확산 전략 공개",
        "데이터 기반 의사결정 강조",
        "경쟁력 핵심 요소로 부상",
        "인프라 투자 확대",
        "글로벌 기술 표준 논의",
      ],
    },
    {
      id: 2,
      title: "테슬라, 자율주행 완전 상용화",
      bullets: [
        "FSD 완전 개방",
        "개입률 대폭 감소",
        "도로 데이터 수집 확대",
        "안전성 검증 병행",
        "글로벌 확장 계획",
      ],
    },
    {
      id: 3,
      title: "메타버스 2.0 시대 개막",
      bullets: [
        "디지털 융합 가속화",
        "플랫폼 신규 공개",
        "콘텐츠 생태계 확대",
        "가상 오피스 증가",
        "디지털 거버넌스 논의",
      ],
    },
    {
      id: 4,
      title: "메타, 차세대 메타버스 비전",
      bullets: [
        "AI 상호작용 강화",
        "창작자 도구 업그레이드",
        "대규모 파트너십",
        "시장 확장",
        "업무 기능 강화",
      ],
    },
    {
      id: 5,
      title: "메타버스 플랫폼 경쟁",
      bullets: [
        "플랫폼 경쟁 심화",
        "사용자 급증",
        "XR 기술 활용 증가",
        "시장 폭발 성장",
        "자율 경제 시스템 도입",
      ],
    },
  ];

  // 무한 루프용 데이터
  const loopData = [
    articles[articles.length - 1],
    ...articles,
    articles[0],
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  // =========================================================
  // 무한 루프 스크롤 처리
  // =========================================================
  const handleScrollEnd = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / SNAP_INTERVAL);

    // 앞에서 튕김 → 끝으로 순간 이동
    if (index === 0) {
      scrollViewRef.current.scrollTo({
        x: SNAP_INTERVAL * articles.length,
        animated: false,
      });
    }

    // 뒤에서 넘어감 → 처음으로 순간 이동
    if (index === articles.length + 1) {
      scrollViewRef.current.scrollTo({
        x: SNAP_INTERVAL,
        animated: false,
      });
    }
  };

  // =========================================================
  // 캐러셀 카드 컴포넌트
  // =========================================================
  const Card = ({ item, cardIndex }) => {
    const pressAnim = useRef(new Animated.Value(1)).current;

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

    // 터치 애니메이션
    const onPressIn = () => {
      Animated.spring(pressAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(pressAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Link href={`/article/${item.id}`} asChild>
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.View
            style={[
              styles.card,
              {
                opacity,
                transform: [{ scale }, { scale: pressAnim }],
              },
            ]}
          >
            {/* 제목: 중앙 정렬 */}
            <Text style={styles.cardTitle}>{item.title}</Text>

            {/* bullets: 왼쪽 정렬 */}
            <View style={{ marginTop: 10, width: "100%" }}>
              {item.bullets.map((b, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ marginRight: 6 }}>•</Text>
                  <Text style={{ fontSize: 13, flex: 1 }}>{b}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </Pressable>
      </Link>
    );
  };

  // =========================================================
  // 화면 렌더링
  // =========================================================
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
          {["월", "화", "수", "목", "금", "토", "일"].map((d, i) => (
            <View key={i} style={styles.dayCircle}>
              <Text style={styles.dayText}>{d}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 오늘의 기사 */}
      <Text style={styles.sectionTitle}>오늘의 기사</Text>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === "web"} // 웹에서만 스크롤바 표시
        style={
          Platform.OS === "web"
            ? { overflowX: "scroll", overflowY: "hidden", width: "100vw" }
            : {}
        }
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
        }}
      >
        {loopData.map((item, i) => (
          <Card key={i} item={item} cardIndex={i} />
        ))}
      </Animated.ScrollView>
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
  name: { fontSize: 16, fontWeight: "700" },
  date: { fontSize: 14, marginTop: 2 },
  streakRow: { flexDirection: "row", marginTop: 4 },
  fireEmoji: { fontSize: 20, marginRight: 4 },
  streakText: { fontSize: 14 },
  goReport: { fontSize: 30, marginLeft: 10, color: "#666" },

  weekRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: { fontSize: 14 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 36,
    marginLeft: 24,
  },

  // 캐러셀 카드
  card: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
