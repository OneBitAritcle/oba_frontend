import { View, Pressable, Animated, StyleSheet, Image } from "react-native";
import usePizzaAnimation from "./usePizzaAnimation";
import PizzaSlice from "./PizzaSlice";

export default function PizzaMenu() {
  const {
    toggle,
    scale,
    slice1X,
    slice1Y,
    slice2X,
    slice2Y,
    slice3X,
    slice3Y,
  } = usePizzaAnimation();

  return (
    <View style={styles.container}>

      {/* 슬라이스 1: MY */}
      <PizzaSlice
        source={require("../../../assets/navi/navi_slice_1.png")}
        translateX={slice1X}
        translateY={slice1Y}
        scale={scale}
        onPressRoute="/my"
      />

      {/* 슬라이스 2: 리포트 */}
      <PizzaSlice
        source={require("../../../assets/navi/navi_slice_2.png")}
        translateX={slice2X}
        translateY={slice2Y}
        scale={scale}
        onPressRoute="/report"
      />

      {/* 슬라이스 3: 틀린문제 */}
      <PizzaSlice
        source={require("../../../assets/navi/navi_slice_3.png")}
        translateX={slice3X}
        translateY={slice3Y}
        scale={scale}
        onPressRoute="/report" // 필요시 수정
      />

      {/* 기본 피자 반쪽 - 토글 버튼 */}
      <Pressable onPress={toggle}>
        <Animated.Image
          source={require("../../../assets/navi/navi_half.png")}
          style={[styles.halfPizza, { transform: [{ scale }] }]}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 30,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  halfPizza: {
    width: 110,
    height: 110,
  },
});
