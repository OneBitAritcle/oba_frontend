import { useRef, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";

export default function usePizzaAnimation() {
  const anim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  // 🔥 화면비 정규화 인자 — 모든 크기/거리 계산의 기준!
  const factor = Math.min(width, height) / 390;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);

    Animated.spring(anim, {
      toValue: next ? 1 : 0,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  // ================================
  // 🔥 닫힌 상태 좌표 (네가 만든 값 기준)
  // ================================
  const CLOSED = {
    slice1: { x: -38 * factor, y: -12.4 * factor },
    slice2: { x: -49.2 * factor, y: -10.2 * factor },
    slice3: { x: -49.7 * factor, y: 9 * factor },
  };

  // ================================
  // 🔥 열린 상태 좌표 (비율 기반으로 재정규화)
  //    → 여기 값만 너가 조절하면 됨
  // ================================
  const OPEN = {
    slice1: { x: -42 * factor, y: -30 * factor },
    slice2: { x: -62 * factor, y: -22 * factor },
    slice3: { x: -65 * factor, y: 10 * factor },
  };

  // ================================
  // 🔥 조각 이동 애니메이션
  // ================================
  const slice1X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice1.x, OPEN.slice1.x],
  });
  const slice1Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice1.y, OPEN.slice1.y],
  });

  const slice2X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice2.x, OPEN.slice2.x],
  });
  const slice2Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice2.y, OPEN.slice2.y],
  });

  const slice3X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice3.x, OPEN.slice3.x],
  });
  const slice3Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice3.y, OPEN.slice3.y],
  });

  // ================================
  // 🔥 크기 애니메이션 (닫혔을 때 OK)
  // ================================
  const halfScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08], // 그대로 둠
  });

  const sliceScale = anim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.6, 0.8, 0.7],
  });

  return {
    toggle,
    isOpen,
    factor,
    halfScale,

    sliceScale,
    slice1X,
    slice1Y,
    slice2X,
    slice2Y,
    slice3X,
    slice3Y,
  };
}
