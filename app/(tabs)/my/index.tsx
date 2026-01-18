// oba_fronted/app/(tabs)/my/index.tsx

import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ✅ 경로 확인 (본인 프로젝트 구조에 맞게)
import { apiClient } from "../../../src/api/apiClient"; 
import PizzaMenu from "../../components/PizzaMenu";     

export default function MyPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 화면이 포커스될 때마다 유저 정보 갱신
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const fetchUser = async () => {
    try {
      const res = await apiClient.get("/api/users/me");
      // 유저 정보가 있고 이름이 유효한 경우만 세팅
      if (res.data && res.data.name) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log("Guest 모드: 유저 정보를 불러올 수 없습니다.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("accessToken");
          await SecureStore.deleteItemAsync("refreshToken");
          setUser(null);
          router.replace("/(tabs)"); 
        },
      },
    ]);
  };

  const handleLoginNavigation = () => {
    router.push("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 헤더 섹션 */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          {/* 뒤로가기 버튼 */}
          <View style={styles.navBarAbsolute}>
            <TouchableOpacity onPress={() => router.replace("/(tabs)")} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* 프로필 이미지 */}
          <View style={styles.profileImageWrap}>
            <Image
              source={
                user?.picture
                  ? { uri: user.picture }
                  : require("../../../assets/knight/hand.png")
              }
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          {/* 이름 & 이메일 (로그인 여부에 따라 텍스트 변경) */}
          <Text style={styles.name}>
            {user ? user.name : "로그인이 필요합니다"}
          </Text>
          {user ? (
            <Text style={styles.email}>{user.email}</Text>
          ) : (
            <Text style={styles.guestText}>회원가입하고 학습 기록을 남겨보세요!</Text>
          )}
        </View>

        {/* 메뉴 리스트 */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/wrongArticles")}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Ionicons name="book-outline" size={20} color="#333" />
              <Text style={styles.menuText}>오답 노트</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* ✅ 핵심: 상태에 따라 버튼 분기 (로그인 vs 로그아웃) */}
        <View style={styles.actionButtonContainer}>
          {user ? (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLoginNavigation} style={styles.loginButton}>
              <Text style={styles.loginText}>로그인 하기</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
      
      {/* 피자 메뉴는 항상 표시 */}
      <PizzaMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  navBarAbsolute: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  backButton: { padding: 5 },
  profileImageWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 15,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#f0f0f0"
  },
  profileImage: { width: "100%", height: "100%" },
  name: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 4 },
  email: { fontSize: 14, color: "#888" },
  guestText: { fontSize: 14, color: "#aaa", marginTop: 4 },
  
  menuContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  menuItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuText: { fontSize: 16, color: "#333", fontWeight: "500" },

  actionButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  logoutText: { color: "#FF3B30", fontSize: 16, fontWeight: "600" },

  loginButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});