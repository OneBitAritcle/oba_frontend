// oba_fronted/app/article/components/KeywordTab.tsx

import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

// 🍕 pizza 이미지 4개 불러오기
const pizzaImages = [
  require("../../../assets/pizza/comb.png"),
  require("../../../assets/pizza/hwaa.png"),
  require("../../../assets/pizza/mar.png"),
  require("../../../assets/pizza/pep.png"),
];

export default function KeywordTab({ keywords }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 10 }}>
      {keywords.map((kw, index) => (
        <View key={index} style={styles.keywordBox}>
          <View style={styles.row}>
            <Image source={pizzaImages[index % 4]} style={styles.pizzaImg} />
            <Text style={styles.word}>{kw.name}</Text>
          </View>
          <Text style={styles.description}>{kw.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  keywordBox: {
    marginBottom: 18,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    marginLeft: 5,
  },
  word: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  pizzaImg: {
    width: 23,
    height: 23,
    marginRight: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginTop: 4,
    marginLeft: 29, // Align with the word (pizzaImg width + marginRight)
  },
});
