import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  Platform ,
} from "react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 280;
const SPACING = 20;
const CENTER_OFFSET = (width - CARD_WIDTH) / 2;

export default function Home() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const articles = [
    {
      id: 1,
      title: "AI & 데이터 서밋 2025",
      bullets: [
        "AI 산업 확산 전략 공개",
        "데이터 기반 의사결정 중요성 강조",
        "기업 경쟁력의 핵심 요소로 부상",
        "AI 인프라 투자 계획 대폭 확대",
        "글로벌 기술 표준 협의 논의",
      ],
    },
    {
      id: 2,
      title: "테슬라, 자율주행 완전 상용화 선언",
      bullets: [
        "FSD 완전자율주행 일부 지역 개방",
        "운전자 개입률 대폭 감소 발표",
        "도로 데이터 수집 규모 확대",
        "규제기관과 안전성 검증 진행 중",
        "글로벌 서비스 확장 계획 표명",
      ],
    },
    {
      id: 3,
      title: "메타버스 2.0 시대 개막",
      bullets: [
        "현실 경제와 디지털 융합 가속화",
        "새로운 메타버스 플랫폼 공개",
        "콘텐츠 제작 생태계 확대",
        "기업들의 가상 오피스 도입 증가",
        "차세대 디지털 거버넌스 논의",
      ],
    },
    {
      id: 4,
      title: "메타, 차세대 메타버스 비전 발표",
      bullets: [
        "가상 플랫폼 기능 대폭 업그레이드",
        "AI 기반 상호작용 기능 강화",
        "창작자 지원 프로그램 확대",
        "글로벌 파트너십 체결",
        "교육·업무용 기능 개선",
      ],
    },
    {
      id: 5,
      title: "메타버스 플랫폼 경쟁 본격화",
      bullets: [
        "대형 IT 기업들의 플랫폼 전쟁",
        "사용자 기반 성장 경쟁 심화",
        "XR 기술 활용 폭발적 증가",
        "콘텐츠 시장 규모 급성장",
        "자율 경제 시스템 도입 확산",
      ],
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  // loop를 위해 앞뒤에 카드 추가
  const loopData = [
    articles[articles.length - 1],
    ...articles,
    articles[0],
  ];

  const onScrollEnd = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / (CARD_WIDTH + SPACING)) - 1;

    let realIndex = index;
    if (index === -1) realIndex = articles.length - 1;
    else if (index === articles.length) realIndex = 0;

    setActiveIndex(realIndex);
  };

  // 카드 컴포넌트
  const ArticleCard = ({ item, index }) => {
    const inputRange = [
      (index - 2) * (CARD_WIDTH + SPACING),
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    const rotateY = scrollX.interpolate({
      inputRange,
      outputRange: ["20deg", "0deg", "-20deg"],
      extrapolate: "clamp",
    });

    return (
      <Link href={`/article/${item.id}`} asChild>
        <Pressable>
          <Animated.View
            style={[
              styles.articleCard,
              {
                transform: [{ scale }, { rotateY }],
                opacity,
              },
            ]}
          >
            <Text style={styles.articleHeader}>{item.title}</Text>

            <View style={{ marginVertical: 10 }}>
              {item.bullets.map((b, idx) => (
                <View key={idx} style={{ flexDirection: "row", marginBottom: 4 }}>
                  <Text style={{ fontSize: 12, marginRight: 6 }}>•</Text>
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
    <View style={{ flex: 1, paddingTop: 50 }}>
      {/* 유저 카드 (그대로 유지) */}
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

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#222" }}>
              한입기사님
            </Text>
            <Text style={{ fontSize: 14, color: "#555" }}>{formattedDate}</Text>

            <View style={styles.streakRow}>
              <Text style={styles.fireEmoji}>🔥</Text>
              <Text style={styles.streakText}>연속 학습 5일</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 기사 캐러셀 */}
      <View style={{ marginTop: 40 }}>
        <Text style={styles.articleTitle}>오늘의 기사</Text>

        <Animated.ScrollView
          horizontal
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingHorizontal: CENTER_OFFSET,
          }}
          
          // ⭐ 플랫폼별 스크롤바 제어
          showsHorizontalScrollIndicator={Platform.OS === "web"}

          // ⭐ 웹에서만 overflow scroll 강제
          style={
            Platform.OS === "web"
              ? { overflowX: "scroll", overflowY: "hidden" }
              : {}
          }

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={onScrollEnd}
        >
          {loopData.map((item, index) => (
            <ArticleCard key={index} item={item} index={index} />
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
    padding: 16,
    borderRadius: 20,
  },
  topRow: { flexDirection: "row", alignItems: "center" },
  profileIcon: { width: 42, height: 42, borderRadius: 21 },
  streakRow: { flexDirection: "row", alignItems: "center" },
  fireEmoji: { fontSize: 20, marginRight: 6 },
  streakText: { fontSize: 15, color: "#333" },

  articleTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 24,
    marginBottom: 12,
    color: "#333",
  },

  articleCard: {
    width: CARD_WIDTH,
    marginRight: SPACING,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  articleHeader: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },

  indicatorWrap: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#222",
    width: 18,
  },
});
