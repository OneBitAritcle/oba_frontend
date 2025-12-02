import { useEffect, useRef, useState } from "react";
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

// 백엔드 Article 목록 타입
type ArticleCard = {
  articleId: number;
  title: string;
  summaryBullets: string[];
  servingDate: string;
};

const CARD_SPACING = 10;

function useDynamicDimensions() {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = width * 0.65;
  const SIDE_SPACING = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
  return { CARD_WIDTH, SIDE_SPACING, SNAP_INTERVAL };
}

export default function Home() {
  const { CARD_WIDTH, SIDE_SPACING, SNAP_INTERVAL } = useDynamicDimensions();

  const [articles, setArticles] = useState<ArticleCard[]>([]);

  useEffect(() => {
    fetch("http://43.200.179.159:9000/articles/latest")
      .then((res) => res.json())
      .then((data) => {
        // 백엔드 응답 그대로 사용
        setArticles(data);
      })
      .catch(console.error);
  }, []);

  if (!articles.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  const loopData = [
    ...articles.slice(-2),
    ...articles,
    ...articles.slice(0, 2),
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: 2 * SNAP_INTERVAL,
        animated: false,
      });
    }, 200);
  }, []);

  const Card = ({ item, cardIndex }: { item: ArticleCard; cardIndex: number }) => {
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
      <Link href={`/article/${item.articleId}`} asChild>
        <Pressable>
          <Animated.View
            style={[
              {
                width: CARD_WIDTH,
                height: 380,
                marginRight: CARD_SPACING,
                backgroundColor: "#fff",
                borderRadius: 18,
                padding: 14,
              },
              { opacity, transform: [{ scale }] },
            ]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>

            <Text style={styles.cardSummary}>
              {item.summaryBullets?.slice(0, 2).join(" · ")}
            </Text>

            <Text style={styles.cardDate}>{item.servingDate}</Text>
          </Animated.View>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.sectionTitle}>오늘의 기사</Text>

        <Animated.ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          scrollEventThrottle={16}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },

  cardSummary: {
    color: "#555",
    fontSize: 14,
    marginBottom: 20,
  },

  cardDate: {
    color: "#777",
    marginTop: "auto",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 16,
  },
});
