// oba_fronted/app/(tabs)/my/index.tsx
// oba_fronted/app/(tabs)/my/index.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// import { apiClient } from "../../src/api/apiClient"; // 백엔드 API 완성 시 주석 해제

type UserProfile = {
  nickname: string;
  email: string;
  profileImage: any;
};

export default function MyPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const fetchAllData = async () => {
    try {
      console.log("[Client] 유저 정보를 요청합니다...");
      
      // ✅ 실제 API 연동 시 아래 주석 해제
      // const res = await apiClient.get("/user/me");
      // setUserProfile(res.data);

      // 현재는 더미 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 800)); 
      
      const mockUser: UserProfile = {
        nickname: "김제니",
        email: "demo@oba.com",
        profileImage: require("../../../assets/knight/basic_profile.png"),
      };
      setUserProfile(mockUser);

    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      Alert.alert("오류", "데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const openEditModal = () => {
    if (!userProfile) return;
    setInputText(userProfile.nickname);
    setModalVisible(true);
  };

  const handleSaveNickname = async () => {
    if (inputText.trim() === "") {
      Alert.alert("알림", "닉네임을 입력해주세요.");
      return;
    }
    try {
      // await apiClient.post("/user/nickname", { nickname: inputText });
      setUserProfile((prev) => prev ? { ...prev, nickname: inputText } : null);
      setModalVisible(false);
      Alert.alert("성공", "닉네임이 수정되었습니다.");
    } catch (error) {
      Alert.alert("오류", "닉네임 수정 실패");
    }
  };

  const renderHeader = () => {
    if (!userProfile) return null;
    return (
      <View style={styles.headerSection}>
        <TouchableOpacity style={styles.trendyCard} activeOpacity={0.9} onPress={openEditModal}>
          <View style={styles.profileLeft}>
            <Image source={userProfile.profileImage} style={styles.trendyImage} />
          </View>
          <View style={styles.profileRight}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{userProfile.nickname}</Text>
              <Ionicons name="pencil" size={16} color="#999" />
            </View>
            <Text style={styles.userId}>{userProfile.email}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A8CFF" />
          <Text style={styles.loadingText}>정보를 불러오는 중...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {renderHeader()}
          <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
            <Text style={{ color: '#8E8E93' }}>내 정보 및 설정을 확인하세요.</Text>
          </View>
        </View>
      )}

      {/* 닉네임 수정 모달 */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>닉네임 수정</Text>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="새로운 닉네임을 입력하세요"
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={handleSaveNickname}>
                <Text style={styles.saveText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5FAFF" },
  headerSection: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 30, backgroundColor: "#F5FAFF" },
  trendyCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 24, borderRadius: 24, ...Platform.select({ ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 12 }, android: { elevation: 6 } }), borderWidth: 1, borderColor: "#F2F4F6" },
  profileLeft: { marginRight: 18 },
  trendyImage: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#F2F4F6", borderWidth: 2, borderColor: "#fff" },
  profileRight: { flex: 1, justifyContent: "center" },
  nameRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  userName: { fontSize: 22, fontWeight: "800", color: "#1A1A1A", marginRight: 8 },
  userId: { fontSize: 14, color: "#8E8E93", fontWeight: "500" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#8E8E93", fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", backgroundColor: "white", borderRadius: 20, padding: 28, alignItems: "center", elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#1A1A1A" },
  input: { width: "100%", height: 52, borderWidth: 1, borderColor: "#E5E5EA", borderRadius: 12, paddingHorizontal: 16, marginBottom: 24, fontSize: 16, backgroundColor: "#F2F4F6" },
  modalButtons: { flexDirection: "row", width: "100%", gap: 12 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  cancelBtn: { backgroundColor: "#F2F4F6" },
  saveBtn: { backgroundColor: "#007AFF" },
  cancelText: { fontSize: 16, color: "#8E8E93", fontWeight: "600" },
  saveText: { fontSize: 16, color: "white", fontWeight: "600" },
});