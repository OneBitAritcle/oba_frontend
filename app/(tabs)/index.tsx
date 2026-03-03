// oba_frontend/app/(tabs)/index.tsx

import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { apiClient } from "../../src/api/apiClient";
import PizzaMenu from "../components/PizzaMenu";
import HomeHeader from "../components/HomeHeader";

// ✅ [수정 1] ArticleSummary 인터페이스에 thumbnailUrl 추가
interface ArticleSummary {
  articleId: string;
  title: string;
  summaryBullets?: string[];
  thumbnailUrl?: string;
  servingDate?: string;
}

interface UserProfile {
  nickname: string;
  profileImage: string;
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  const CARD_WIDTH = width * 0.75;
  const CARD_HEIGHT = Math.min(height * 0.55, 550);
  const SIDE_SPACING = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + 12;

  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // 날짜 포맷팅 함수 (예: 2026. 03. 03. (화))
  const getFormattedDate = () => {
    const now = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}. (${days[now.getDay()]})`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("📡 [Home] 데이터 요청 시작...");

        const [articlesRes, profileRes, statsRes] = await Promise.all([
          apiClient.get<ArticleSummary[]>("/articles/latest?limit=10"),
          apiClient.get<UserProfile>("/api/user/profile"),
          apiClient.get<{ consecutiveDays: number }>("/api/report/stats")
        ]);

        setArticles(articlesRes.data);
        setUserProfile(profileRes.data);
        setStreak(statsRes.data.consecutiveDays);

      } catch (err) {
        console.error("❌ [Home] 데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5FAFF" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: "#666" }}>따끈한 피자 기사를 굽는 중... 🍕</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 10, backgroundColor: "#F5FAFF" }}>
      {/* 🟢 홈 헤더 (프로필, 스트릭, 요일) */}
      {userProfile && (
        <HomeHeader
          user={userProfile}
          streak={streak}
          date={getFormattedDate()}
        />
      )}

      <View style={{ marginTop: 0 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", marginLeft: 24, marginBottom: 16, color: "#191F28" }}>
          오늘의 기사
        </Text>

        {articles.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 50, paddingHorizontal: 40 }}>
            <Image
              source={require("../../assets/knight/hand.png")}
              style={{ width: 100, height: 100, marginBottom: 10, opacity: 0.5 }}
              resizeMode="contain"
            />
            <Text style={{ color: "#999", fontSize: 16, marginBottom: 5 }}>아직 도착한 기사가 없어요.</Text>
            <Text style={{ color: "#ccc", fontSize: 12 }}>({new Date().toLocaleDateString()} 기준)</Text>
          </View>
        ) : (
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: SIDE_SPACING }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          >
            {articles.map((item, i) => {
              const inputRange = [
                (i - 1) * SNAP_INTERVAL,
                i * SNAP_INTERVAL,
                (i + 1) * SNAP_INTERVAL,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.93, 1, 0.93],
                extrapolate: "clamp",
              });

              const summaryText = item.summaryBullets && item.summaryBullets.length > 0
                ? item.summaryBullets.map(s => `• ${s}`).join("\n")
                : "요약 내용이 없습니다.";

              return (
                <Link key={i} href={`/article/${item.articleId}`} asChild>
                  <Pressable>
                    <Animated.View
                      style={{
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        padding: 0, // 이미지 꽉 채우기 위해 0으로 변경 후 내부 padding 추가
                        marginRight: 12,
                        transform: [{ scale }],
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 5,
                        overflow: "hidden",
                      }}
                    >
                      {/* 기사 썸네일 */}
                      <View style={{ height: "45%", backgroundColor: "#F2F4F6" }}>
                        <Image
                          source={item.thumbnailUrl ? { uri: item.thumbnailUrl } : require("../../assets/knight/deliever.png")}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </View>

                      <View style={{ padding: 20, flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: "800", color: "#191F28", marginBottom: 12 }} numberOfLines={2}>
                          {item.title}
                        </Text>

                        <Text style={{ fontSize: 14, lineHeight: 22, color: "#4E5968", flex: 1 }} numberOfLines={4}>
                          {summaryText}
                        </Text>

                        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 10 }}>
                          <Text style={{ fontSize: 12, color: "#8B95A1" }}>
                            {item.servingDate}
                          </Text>
                        </View>
                      </View>
                    </Animated.View>
                  </Pressable>
                </Link>
              );
            })}
          </Animated.ScrollView>
        )}
      </View>

      <PizzaMenu />
    </View>
  );
}