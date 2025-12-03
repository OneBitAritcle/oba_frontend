import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const pizza = [
  require("../../../assets/pizza/comb.png"),
  require("../../../assets/pizza/hwaa.png"),
  require("../../../assets/pizza/mar.png"),
  require("../../../assets/pizza/pep.png"),
];

export default function KeywordTab({ keywords }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {keywords.map((item, idx) => (
        <View key={idx} style={styles.box}>
          <View style={styles.row}>
            <Image source={pizza[idx % pizza.length]} style={styles.icon} />
            <Text style={styles.word}>{item.word}</Text>
          </View>

          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      ))}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, gap: 14 },
  box: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  icon: { width: 22, height: 22, marginRight: 6 },
  word: { fontSize: 16, fontWeight: "700" },
  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    paddingLeft: 4,
    marginTop: 4,
  },
});
