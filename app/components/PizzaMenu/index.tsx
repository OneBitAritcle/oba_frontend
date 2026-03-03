// app/components/PizzaMenu/index.tsx
import { View, Pressable, Animated, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePizzaAnimation from "./usePizzaAnimation";
import PizzaSlice from "./PizzaSlice";

export default function PizzaMenu() {
  const {
    toggle,
    halfScale,
    sliceScale,
    slice1X,
    slice1Y,
    slice2X,
    slice2Y,
    slice3X,
    slice3Y,
    isOpen,
    factor,
    anim,
    baseX,
    baseY,
  } = usePizzaAnimation();

  const insets = useSafeAreaInsets();
  const containerSize = 70 * factor;

  return (
    <View style={styles.fullScreenRoot} pointerEvents="box-none">
      {/* 🌑 배경 딤 (Dimming) - 메뉴가 열릴 때 배경을 어둡게 함 */}
      <Animated.View
        style={[
          styles.dimOverlay,
          {
            opacity: anim ? anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.45],
            }) : 0,
          },
        ]}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <Pressable style={{ flex: 1 }} onPress={toggle} />
      </Animated.View>

      <View
        style={[
          styles.container,
          {
            width: containerSize,
            height: containerSize,
            bottom: insets.bottom + 16,
          },
        ]}
      >
        {/* 슬라이스 1: 마이 */}
        <PizzaSlice
          source={require("../../../assets/navi/navi_slice_1.png")}
          translateX={slice1X}
          translateY={slice1Y}
          scale={sliceScale}
          onPressRoute="/my"
          isOpen={isOpen}
          onToggle={toggle}
          factor={factor}
          anim={anim}
          label="마이"
          sliceSize={60}
          labelOffsetX={-23}
          labelOffsetY={-50}
          touchRotationOffset={-13}
          touchOffsetX={15}
          touchOffsetY={30}
        />

        {/* 슬라이스 2: 리포트 */}
        <PizzaSlice
          source={require("../../../assets/navi/navi_slice_2.png")}
          translateX={slice2X}
          translateY={slice2Y}
          scale={sliceScale}
          onPressRoute="/report"
          isOpen={isOpen}
          onToggle={toggle}
          factor={factor}
          anim={anim}
          label="리포트"
          sliceSize={62.5}
          labelOffsetX={-55}
          labelOffsetY={-25}
          sliceRotation={0}
          touchRotationOffset={-55}
          touchOffsetX={30}
          touchOffsetY={23}
        />

        {/* 슬라이스 3: 틀린문제 */}
        <PizzaSlice
          source={require("../../../assets/navi/navi_slice_3.png")}
          translateX={slice3X}
          translateY={slice3Y}
          scale={sliceScale}
          onPressRoute="/wrongArticles"
          isOpen={isOpen}
          onToggle={toggle}
          factor={factor}
          anim={anim}
          label="틀린문제"
          sliceSize={63}
          labelOffsetX={-85}
          labelOffsetY={0}
          sliceRotation={0}
          touchRotationOffset={-95}
          touchOffsetX={30}
          touchOffsetY={-5}
        />

        {/* 기본 피자 반쪽 - 토글 버튼 */}
        <Pressable onPress={toggle}>
          <Animated.Image
            source={require("../../../assets/navi/navi_half.png")}
            style={[
              styles.halfPizza,
              {
                width: 70 * factor,
                height: 70 * factor,
                transform: [
                  { scale: halfScale },
                  { translateX: baseX },
                  { translateY: baseY },
                ],
              },
            ]}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenRoot: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99, // 네비게이터가 항상 위에 오도록
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  container: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  halfPizza: {
    width: 50,
    height: 50,
  },
});
