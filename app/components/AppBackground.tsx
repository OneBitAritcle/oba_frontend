import { View, Image, StyleSheet } from "react-native";

export default function AppBackground() {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { position: "absolute", backgroundColor: "#F5FAFF" }
      ]}
      pointerEvents="none"
    >
      <Image
        source={require("../../assets/pizza/pep.png")}
        style={[styles.decoration, { top: 80, left: 140 }]}
      />

      <Image
        source={require("../../assets/food/burger.png")}
        style={[styles.decoration, { top: 180, right: 90, transform: [{ rotate: "-12deg" }], }]}
      />

      <Image
        source={require("../../assets/food/potato.png")}
        style={[styles.decoration, { top: 330, left: 60 , transform: [{ rotate: "-12deg" }],}]}
      />

      <Image
        source={require("../../assets/pizza/mar.png")}
        style={[styles.decoration, { top: 460, right: 180 , transform: [{ rotate: "12deg" }],}]}
      />

      <Image
        source={require("../../assets/food/ckin.png")}
        style={[styles.decoration, { top: 620, left: 180, transform: [{ rotate: "16deg" }], }]}
      />

      <Image
        source={require("../../assets/food/chic.png")}
        style={[styles.decoration, { top: 720, right: 120 }]}
      />

      <Image
        source={require("../../assets/pizza/hwaa.png")}
        style={[styles.decoration, { bottom: 150, left: 100 }]}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  decoration: {
    position: "absolute",
    width: 60,
    height: 60,
    opacity: 0.15,
  },
});
