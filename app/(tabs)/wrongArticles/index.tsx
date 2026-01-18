// oba_frontend//app/(tabs)/wrongArticles/index.tsx
import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl, 
  Platform 
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router"; // useNavigation 삭제
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { apiClient } from "../../../src/api/apiClient"; 

interface WrongArticle {
  articleId: string;
  title: string;
  summary: string;
  solvedAt: string;
  category?: string; 
}

export default function WrongArticlesPage() {
  const router = useRouter();
  
  const [articles, setArticles] = useState<WrongArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [refreshing, setRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Tech News", "Health Daily"];

  useFocusEffect(
    useCallback(() => {
      // 🚨 [삭제됨] navigation.setOptions 코드 삭제. _layout.tsx가 숨김 처리함.
      checkLoginAndFetch();
    }, [])
  );

  const checkLoginAndFetch = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      
      if (!token) {
        setIsLoggedIn(false);
        setIsLoading(false);
        setArticles([]);
        return;
      }

      setIsLoggedIn(true);
      await fetchHistory();
    } catch (error) {
      console.error("초기화 에러:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await apiClient.get<WrongArticle[]>("/api/quiz/wrong");
      setArticles(res.data || []);
    } catch (error) {
      console.log("오답노트 로딩 실패");
      setArticles([]); 
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const getFilteredData = () => {
    const currentArticles = articles || [];
    let filtered = selectedCategory === "All" 
      ? currentArticles 
      : currentArticles.filter(a => a.category === selectedCategory);

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.solvedAt).getTime();
      const dateB = new Date(b.solvedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  const renderItem = ({ item, index }: { item: WrongArticle; index: number }) => {
    const sortedData = getFilteredData();
    const isLast = index === sortedData.length - 1;

    return (
      <View style={styles.timelineItem}>
        <View style={styles.timelineLeft}>
          <View style={styles.dotContainer}>
            <View style={styles.dot} />
            {!isLast && <View style={styles.line} />} 
          </View>
        </View>

        <View style={styles.timelineRight}>
          <Text style={styles.dateText}>{item.solvedAt}</Text>
          <TouchableOpacity 
            style={styles.articleCard} 
            onPress={() => router.push(`/article/${item.articleId}`)}
          >
            <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
            {item.category && <Text style={styles.cardCategory}>{item.category}</Text>}
            <View style={styles.cardFooter}>
               <Text style={styles.retryText}>다시 풀기 {'>'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (isLoading) return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#4A8CFF" />
    </View>
  );

  // 비로그인 화면
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>오답 노트</Text>
        </View>
        
        <View style={styles.empty}>
          <Ionicons name="lock-closed-outline" size={50} color="#ccc" style={{marginBottom: 10}} />
          <Text style={styles.emptyText}>로그인이 필요한 기능입니다.</Text>
          <TouchableOpacity 
            style={styles.loginLinkBtn}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.loginLinkText}>로그인 하러 가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
            <Text style={styles.headerTitle}>틀린 기사 다시보기</Text>
            <Text style={styles.headerSub}>최근 1년의 기사를 확인하세요</Text>
        </View>
      </View>

      <View style={styles.filterBar}>
        <View style={styles.categoryScroll}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catBtn, selectedCategory === cat && styles.catBtnActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
          style={styles.sortBtn} 
          onPress={() => setSortOrder(s => s === "newest" ? "oldest" : "newest")}
        >
          <Ionicons name={sortOrder === "newest" ? "arrow-down" : "arrow-up"} size={16} color="#4A8CFF" />
          <Text style={styles.sortText}>{sortOrder === "newest" ? "최신순" : "오래된 순"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredData()}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.articleId ? item.articleId.toString() : `item-${index}`}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchHistory(); }} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>틀린 문제가 없습니다 🎉</Text></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { paddingHorizontal: 20, paddingTop: 60, marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, marginBottom: 20 },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  headerSub: { fontSize: 14, color: "#8E8E93", marginTop: 5 },
  filterBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 20 },
  categoryScroll: { flexDirection: "row", gap: 8 },
  catBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E5EA" },
  catBtnActive: { backgroundColor: "#4A8CFF", borderColor: "#4A8CFF" },
  catText: { fontSize: 13, color: "#48484A" },
  catTextActive: { color: "#fff", fontWeight: "bold" },
  sortBtn: { flexDirection: "row", alignItems: "center", padding: 5 },
  sortText: { fontSize: 13, color: "#4A8CFF", marginLeft: 4, fontWeight: "600" },
  listContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  timelineItem: { flexDirection: "row" },
  timelineLeft: { width: 30, alignItems: "center" },
  dotContainer: { alignItems: "center", flex: 1 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#4A8CFF", zIndex: 1, marginTop: 8 },
  line: { width: 2, backgroundColor: "#E5E5EA", flex: 1, marginTop: -2 },
  timelineRight: { flex: 1, paddingBottom: 30, marginLeft: 10 },
  dateText: { fontSize: 13, color: "#8E8E93", marginBottom: 8, fontWeight: "500" },
  articleCard: {
    backgroundColor: "#fff", borderRadius: 16, padding: 18, borderWidth: 1, borderColor: "#F2F4F6",
    ...Platform.select({ ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 }, android: { elevation: 2 } })
  },
  articleTitle: { fontSize: 16, fontWeight: "bold", color: "#1A1A1A", lineHeight: 22 },
  cardCategory: { fontSize: 12, color: "#4A8CFF", marginTop: 8, fontWeight: "600" },
  cardFooter: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#F2F4F6", alignItems: "flex-end" },
  retryText: { fontSize: 12, color: "#4A8CFF", fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
  emptyText: { color: "#999", fontSize: 16 },
  loginLinkBtn: { marginTop: 20, padding: 10 },
  loginLinkText: { color: "#4A8CFF", fontWeight: "bold", fontSize: 16 },
});