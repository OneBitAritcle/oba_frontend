import { View, Pressable, Animated, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePizzaAnimation from "./usePizzaAnimation";
import PizzaSlice from "./PizzaSlice";

export default function PizzaMenu() {
  const {
    toggle,
    close,
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
      <Animated.View
        style={[
          styles.dimOverlay,
          { opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.45] }) },
        ]}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <Pressable style={{ flex: 1 }} onPress={close} />
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
        <Pressable onPress={toggle} style={styles.baseButton}>
          <Animated.Image
            source={require("../../../assets/navi/navi_half.png")}
            style={[
              styles.halfPizza,
              {
                width: 70 * factor,
                height: 70 * factor,
                opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1] }),
                transform: [{ scale: halfScale }, { translateX: baseX }, { translateY: baseY }],
              },
            ]}
            resizeMode="contain"
          />
        </Pressable>

        <View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            left: containerSize / 2,
            top: containerSize / 2,
            zIndex: 5,
          }}
        >
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
            sliceSize={55}
            imageOffsetX={15}
            imageOffsetY={30}
            labelOffsetX={10}
            labelOffsetY={-12}
            sliceTouchScale={1.45}
            touchRotationOffset={-12}
            touchOffsetX={23}
            touchOffsetY={50}
          />

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
            sliceSize={55}
            imageOffsetX={30}
            imageOffsetY={23}
            labelOffsetX={-15}
            labelOffsetY={3}
            sliceTouchScale={1.45}
            touchRotationOffset={-55}
            touchOffsetX={50}
            touchOffsetY={43}
            sliceRotation={-0.5}
          />

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
            sliceSize={56}
            imageOffsetX={30}
            imageOffsetY={-5}
            labelOffsetX={-30}
            labelOffsetY={-3}
            sliceTouchScale={1.45}
            touchRotationOffset={-100}
            touchOffsetX={50}
            touchOffsetY={-12}
            sliceRotation={-0.3}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenRoot: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
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
  baseButton: {
    zIndex: 1,
  },
  halfPizza: {
    width: 50,
    height: 50,
  },
});
