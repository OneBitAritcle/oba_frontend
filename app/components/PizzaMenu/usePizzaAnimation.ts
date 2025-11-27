import { useRef } from "react";
import { Animated } from "react-native";

export default function usePizzaAnimation() {
  const anim = useRef(new Animated.Value(0)).current; // 0=닫힘, 1=열림

  const toggle = () => {
    Animated.spring(anim, {
      toValue: anim.__getValue() === 1 ? 0 : 1,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  // 닫혀 있어도 피자 전체는 보이도록 scale 1 유지
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1], // 열릴 때 살짝 커짐
  });

  const opacity = 1; // 항상 보임

  // 각 조각 이동 좌표
  const slice1X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -65],
  });
  const slice1Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -90],
  });

  const slice2X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const slice2Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const slice3X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -35],
  });
  const slice3Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 75],
  });

  return {
    toggle,
    scale,
    opacity,
    slice1X,
    slice1Y,
    slice2X,
    slice2Y,
    slice3X,
    slice3Y,
  };
}
