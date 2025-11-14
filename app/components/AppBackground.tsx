import { View, Image, StyleSheet } from "react-native";

export default function AppBackground() {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: "#F5FAFF" }
      ]}
      pointerEvents="none"
    >

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          backgroundColor: "red",
          zIndex: 999,
        }}
      />

      <Image
        source={require("../../assets/pizza/pep.png")}
        style={[styles.decoration, { top: 80, left: 20 }]}
      />

      <Image
        source={require("../../assets/food/burger.png")}
        style={[styles.decoration, { top: 200, right: 20 }]}
      />

      <Image
        source={require("../../assets/food/potato.png")}
        style={[styles.decoration, { top: 350, left: 30 }]}
      />

      <Image
        source={require("../../assets/pizza/mar.png")}
        style={[styles.decoration, { top: 500, right: 30 }]}
      />

      <Image
        source={require("../../assets/food/ckin.png")}
        style={[styles.decoration, { top: 650, left: 70 }]}
      />

      <Image
        source={require("../../assets/food/chic.png")}
        style={[styles.decoration, { bottom: 140, right: 40 }]}
      />

      <Image
        source={require("../../assets/pizza/hwaa.png")}
        style={[styles.decoration, { bottom: 30, left: 60 }]}
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
