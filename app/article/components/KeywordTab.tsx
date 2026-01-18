// oba_fronted/app/article/components/KeywordTab.tsx
import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

export interface KeywordData {
  keyword: string;
  description?: string;
  desc?: string;
  definition?: string;
}

interface KeywordTabProps {
  keywords?: (string | KeywordData)[]; 
}

export default function KeywordTab({ keywords }: KeywordTabProps) {
  const safeKeywords = keywords || [];

  if (!safeKeywords || safeKeywords.length === 0) {
    return null;
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      {safeKeywords.map((item, index) => {
        // 1. 키워드 추출
        const keyword = typeof item === 'string' ? item : item.keyword;
        
        // 2. 설명 추출 (description, desc, definition 등 다 찾아봄)
        let description = null;
        if (typeof item !== 'string') {
          description = item.description || item.desc || item.definition || null;
        }

        return (
          <View key={index} style={styles.keywordCard}>
            <View style={styles.header}>
              <Text style={styles.icon}>🍕</Text>
              <Text style={styles.keywordTitle}>{keyword}</Text>
            </View>
            
            {/* 3. 설명 표시 (없으면 안내 문구) */}
            <Text style={[
              styles.keywordDesc,
              !description && styles.noDataText
            ]}>
              {description || "서버로부터 상세 설명 데이터를 받지 못했습니다."}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  keywordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  keywordTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#191F28",
  },
  keywordDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4E5968",
    marginTop: 4,
  },
  noDataText: {
    color: "#999",
    fontStyle: "italic",
    fontSize: 13,
  }
});