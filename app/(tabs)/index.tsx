import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.65;
const CARD_SPACING = 10;
const SIDE_SPACING = (width - CARD_WIDTH * 3) / 2;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

export default function Home() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  // ================================
  // 🔥 1) Spring 최신 기사 상태
  // ================================
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // 🔥 2) API 호출
  // ================================
  useEffect(() => {
    fetch("http://<SPRING_IP>:8080/articles/latest")
      .then((res) => res.json())
      .then((data) => {
        // data = [{ id, title, bullets }]
        setArticles(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("❌ 최신 기사 불러오기 실패:", e);
        setLoading(false);
      });
  }, []);

  // ===============================================
  // 🔥 3) loopData 구성 (articles 기반)
  // ===============================================
  const loopData =
    articles.length >= 2
      ? [
          articles[articles.length - 2],
          articles[articles.length - 1],
          ...articles,
          articles[0],
          articles[1],
        ]
      : [];

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [index, setIndex] = useState(2);

  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    let newIndex = Math.round(offsetX / SNAP_INTERVAL);

    if (newIndex === 0) {
      newIndex = articles.length;
      scrollViewRef.current.scrollTo({
        x: articles.length * SNAP_INTERVAL,
        animated: false,
      });
    }

    if (newIndex === loopData.length - 1) {
      newIndex = 1;
      scrollViewRef.current.scrollTo({
        x: SNAP_INTERVAL,
        animated: false,
      });
    }

    setIndex(newIndex);
  };

  // ===============================================
  // 카드 컴포넌트
  // ===============================================
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
              { opacity, transform: [{ scale }] },
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

  // ===============================================
  // 로딩 중
  // ===============================================
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={{ marginTop: 10 }}>최신 기사를 불러오는 중…</Text>
      </View>
    );
  }

  // ===============================================
  // 실제 UI
  // ===============================================
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

      {/* 최신 기사 캐러셀 */}
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
