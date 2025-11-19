import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

// 🍕 pizza 이미지 7개 불러오기 
// 리액트 네이티브는 “동적 require” x > 배열로 전부 불러와야 함.
const pizzaImages = [
  require("../../../assets/pizza/comb.png"),
  require("../../../assets/pizza/hwaa.png"),
  require("../../../assets/pizza/mar.png"),
  require("../../../assets/pizza/pep.png"),
];


export default function KeywordTab({ keywords }) {
  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* <Text style={styles.title}> 핵심 키워드 </Text> */}

      {keywords.map((item, index) => (
        <View key={index} style={styles.keywordBox}>
          <View style={styles.row}>
              <Image 
              source={pizzaImages[index%pizzaImages.length]}
              style={styles.pizzaImg}
              />
              <Text style={styles.word}>{item.word}</Text>
          </View>
          <View style={styles.descLineBox}>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        </View>
      ))}
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },
  keywordBox: {
    marginBottom: 18,
    padding: 16,
    backgroundColor: "#fff",

    borderRadius: 14,

    // 더 자연스러운 modern shadow
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    elevation: 3,
  },
  row:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    marginLeft:5,
  },
  word: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 0,
  },
  // descLineBox: {
  // borderLeftWidth: 3,
  // borderLeftColor: "#a09c9cff",
  // paddingLeft: 10,
  // marginTop: 6,
  // marginLeft:10,
  // },
  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 21,
    marginLeft: 8,
    marginRight: 10,
  },
  pizzaImg: {
    width: 23,
    height: 23,
    marginRight: 6,
  },
});
