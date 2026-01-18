// app/components/PizzaMenu/UsePizzaAnimation.ts

import { useRef, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";

export default function usePizzaAnimation() {
  const anim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  // 아이폰 미니 기준 스케일
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

  /* -------------------------------
   * 닫힌 상태: 기존 값 그대로
   * ----------------------------- */
  const CLOSED = {
    slice1: { x: -7.5 * factor, y: -17.1 * factor },
    slice2: { x: -18.4 * factor, y: -14.8 * factor },
    slice3: { x: -19.2 * factor, y: 4.8 * factor },
  };

  /* -------------------------------
   * 열린 상태: 확실한 부채꼴로 재배치
   *
   *  - slice1: 위쪽 왼쪽
   *  - slice2: 정면 왼쪽
   *  - slice3: 아래 왼쪽
   * ----------------------------- */
  const OPEN = {
    slice1: { x: -13.8 * factor, y: -34.4 * factor }, // 위로 확실히 올림
    slice2: { x: -35.7 * factor, y: -26.2 * factor },  // 가운데, 가장 왼쪽
    slice3: { x: -38.0 * factor, y: 5.3 * factor },  // 아래로 내림
  };

  // 슬라이스 1
  const slice1X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice1.x, OPEN.slice1.x],
  });
  const slice1Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice1.y, OPEN.slice1.y],
  });

  // 슬라이스 2
  const slice2X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice2.x, OPEN.slice2.x],
  });
  const slice2Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice2.y, OPEN.slice2.y],
  });

  // 슬라이스 3
  const slice3X = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice3.x, OPEN.slice3.x],
  });
  const slice3Y = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED.slice3.y, OPEN.slice3.y],
  });

  // 반쪽 피자 / 슬라이스 스케일
  const halfScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const sliceScale = anim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.6, 0.8, 0.7],
  });

  return {
    toggle,
    isOpen,
    factor,
    anim,
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
