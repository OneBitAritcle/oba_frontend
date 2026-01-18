//oba_frontend//app/(tabs)/index.tsx
import { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useFocusEffect } from "expo-router"; // navigation 제거

import { apiClient } from "../../src/api/apiClient";
import PizzaMenu from "../components/PizzaMenu";
import React from "react";

interface UserSummary {
  name: string;
  picture?: string;
  consecutiveDays: number;
  weeklyLog: boolean[];
}

interface ArticleSummary {
  articleId: string;
  title: string;
  summaryBullets?: string[];
  servingDate?: string;
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  
  const scrollX = useRef(new Animated.Value(0)).current;
  
  const CARD_WIDTH = width * 0.65;
  const CARD_HEIGHT = Math.min(height * 0.5, 500);
  const SIDE_SPACING = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + 10;

  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [user, setUser] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // 🚨 [삭제됨] navigation.setOptions 코드를 지워서 탭 바가 다시 켜지지 않게 함
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      try {
        const userRes = await apiClient.get<UserSummary>("/api/users/me");
        if (userRes.data && userRes.data.name) {
          setUser(userRes.data);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }

      const res = await apiClient.get<ArticleSummary[]>("/api/articles/latest?limit=10");
      const data = res.data;

      if (!data || !Array.isArray(data)) {
          setArticles([]);
      } else {
          const mappedArticles = data.map(item => ({
            articleId: (item as any).articleId || (item as any).id || (item as any)._id || "", 
            title: item.title || "제목 없음",
            summaryBullets: (item as any).summaryBullets || (item as any).summary_bullets || [],
            servingDate: (item as any).servingDate || (item as any).serving_date || "",
          }));
          setArticles(mappedArticles);
      }
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}. (${days[now.getDay()]})`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ flex: 1 }}>
        
        <View style={styles.dashboardWrapper}>
          <View style={styles.dashboardCard}>
            <View style={styles.profileHeader}>
              <View>
                <Text style={styles.userName}>
                  {user ? `${user.name}님` : "로그인이 필요해요"}
                </Text>
                <Text style={styles.dateText}>
                  {getFormattedDate()}
                </Text>

                {user ? (
                  <View style={styles.streakWrapper}>
                    <Text style={styles.streakEmoji}>🔥</Text>
                    <Text style={styles.streakText}>
                      연속 학습 {user.consecutiveDays}일
                    </Text>
                  </View>
                ) : (
                  <Link href="/(auth)/login" asChild>
                    <Pressable style={{ marginTop: 8 }}>
                      <Text style={{ color: "#FF6B00", fontWeight: "bold", fontSize: 16 }}>
                        로그인 하러가기 {'>'}
                      </Text>
                    </Pressable>
                  </Link>
                )}
              </View>
            
              <Link href={user ? "/my" : "/(auth)/login"} asChild>
                <Pressable>
                  <View style={styles.profileImageContainer}>
                    <Image 
                      source={
                        user?.picture 
                          ? { uri: user.picture } 
                          : require("../../assets/knight/hand.png") 
                      } 
                      style={styles.profileImage}
                    />
                  </View>
                </Pressable>
              </Link>
            </View>

            {user && (
              <View style={styles.weeklyLogContainer}>
                {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
                  const isActive = user.weeklyLog ? user.weeklyLog[index] : false;
                  return (
                    <View key={index} style={{ alignItems: "center" }}>
                      <View 
                        style={[
                          styles.dayCircle,
                          { backgroundColor: isActive ? "#FFB74D" : "#EFEFEF" }
                        ]}
                      >
                        {isActive && <Text style={styles.checkMark}>✓</Text>}
                      </View>
                      <Text style={[styles.dayText, { color: isActive ? "#333" : "#999" }]}>{day}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>오늘의 기사</Text>
          
          {articles.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image 
                source={require("../../assets/knight/hand.png")} 
                style={styles.emptyImage} 
                resizeMode="contain"
              />
              <Text style={styles.emptyText}>아직 도착한 기사가 없어요.</Text>
            </View>
          ) : (
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SNAP_INTERVAL}
              decelerationRate="fast"
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingHorizontal: SIDE_SPACING, paddingBottom: 30 }}
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
                  outputRange: [0.9, 1, 0.9],
                  extrapolate: "clamp",
                });
                const summaryText = item.summaryBullets && item.summaryBullets.length > 0 
                  ? item.summaryBullets.map(s => `• ${s}`).join("\n")
                  : "요약 내용이 없습니다.";

                return (
                  <Link key={i} href={`/article/${item.articleId}`} asChild>
                    <Pressable>
                      <Animated.View
                        style={[
                          styles.articleCard,
                          {
                            width: CARD_WIDTH,
                            height: CARD_HEIGHT,
                            transform: [{ scale }],
                          }
                        ]}
                      >
                        <Text style={styles.articleTitle} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <View style={styles.articleImageWrapper}>
                          <Image
                            source={require("../../assets/knight/deliever.png")} 
                            style={styles.articleKnightImage}
                          />
                        </View>
                        <Text style={styles.articleSummary} numberOfLines={5}>
                          {summaryText}
                        </Text>
                        <Text style={styles.articleDate}>
                          {item.servingDate}
                        </Text>
                      </Animated.View>
                    </Pressable>
                  </Link>
                );
              })}
            </Animated.ScrollView>
          )}
        </View>
      </View>

      <PizzaMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  dashboardWrapper: { paddingHorizontal: 24, marginTop: 20, marginBottom: 20 },
  dashboardCard: { 
    backgroundColor: "#FFF9E6", 
    borderRadius: 24, 
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2 
  },
  profileHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 4 },
  dateText: { fontSize: 14, color: "#666" },
  streakWrapper: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  streakEmoji: { fontSize: 16 },
  streakText: { fontSize: 15, fontWeight: "600", color: "#FF6B00", marginLeft: 4 },
  profileImageContainer: { 
    width: 50, height: 50, borderRadius: 25, backgroundColor: "#fff", 
    alignItems: "center", justifyContent: "center", overflow: "hidden",
    borderWidth: 1, borderColor: "#eee"
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, resizeMode: "cover" },
  weeklyLogContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  dayCircle: { 
    width: 32, height: 32, borderRadius: 16, 
    alignItems: "center", justifyContent: "center", marginBottom: 6
  },
  checkMark: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  dayText: { fontSize: 12 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginLeft: 24, marginBottom: 16, color: "#191F28" },
  emptyContainer: { alignItems: "center", marginTop: 50, paddingHorizontal: 40 },
  emptyImage: { width: 80, height: 80, marginBottom: 10, opacity: 0.5 },
  emptyText: { color: "#999", fontSize: 14 },
  articleCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  articleTitle: { fontSize: 19, fontWeight: "700", marginBottom: 14, lineHeight: 26 },
  articleImageWrapper: { alignItems: "center", marginBottom: 20 },
  articleKnightImage: { height: 130, width: 130, resizeMode: "contain" },
  articleSummary: { fontSize: 14, lineHeight: 22, color: "#555", flex: 1 },
  articleDate: { fontSize: 12, color: "#999", textAlign: "right", marginTop: 14 },
});