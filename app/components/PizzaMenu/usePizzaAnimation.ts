import { useRef, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";

export default function usePizzaAnimation() {
  const anim = useRef(new Animated.Value(0)).current; // 0=닫힘, 1=열림
  const { width, height } = useWindowDimensions();
  const factor = Math.min(width, height) / 390; // base design width ~390
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      Animated.spring(anim, {
        toValue: next ? 1 : 0,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }).start();
      return next;
    });
  };

  // 피자 토글 버튼(반쪽 피자)용 스케일
  const halfScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08], // 열릴 때 살짝 커짐
  });

  // 슬라이스들이 닫혀 있을 때 작게 있다가 열릴 때 커지도록 별도 스케일 사용
  const sliceScale = anim.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.6, 1.05, 1],
  });

  const opacity = 1; // 항상 보임 for now

  // 각 조각 이동 좌표
  // 이동 거리를 화면 크기에 맞춰 조정
  const slice1X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-90, -60 * factor],
  });
  const slice1Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-28, -55 * factor],
  });

  const slice2X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-116, -100 * factor],
  });
  const slice2Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-23, -50 * factor],
  });

  const slice3X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-118, -110 * factor],
  });
  const slice3Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 0 * factor],
  });

  return {
    toggle,
    halfScale,
    sliceScale,
    opacity,
    slice1X,
    slice1Y,
    slice2X,
    slice2Y,
    slice3X,
    slice3Y,
    isOpen,
    factor,
  };
}
