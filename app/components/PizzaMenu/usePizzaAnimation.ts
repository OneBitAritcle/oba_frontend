import { useRef, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";

type Point = { x: number; y: number };
type SliceKey = "s1" | "s2" | "s3";

const addPoint = (a: Point, b: Point): Point => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export default function usePizzaAnimation() {
  const anim = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = useWindowDimensions();
  const factor = Math.min(width, height) / 390;

  const run = (toValue: 0 | 1) => {
    Animated.spring(anim, {
      toValue,
      friction: 6,
      tension: 62,
      useNativeDriver: true,
    }).start();
  };

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    run(next ? 1 : 0);
  };

  const close = () => {
    if (!isOpen) return;
    setIsOpen(false);
    run(0);
  };

  const CLOSED_BASE: Point = { x: -20, y: -20 };
  const OPEN_BASE: Point = { x: -40, y: -38 };

  // ---- Per-slice tuning zone (edit these values) ----
  const CLOSED_RAW: Record<SliceKey, Point> = {
    s1: { x: -42.5, y: -66.2 },
    s2: { x: -68.6, y: -57.3 },
    s3: { x: -68.7, y: -10.3 },
  };
  const CLOSED_SLICE_TWEAK: Record<SliceKey, Point> = {
    s1: { x: 0, y: 0 },
    s2: { x: 0, y: 0 },
    s3: { x: 0, y: 0 },
  };
  const OPEN_SLICE_TWEAK: Record<SliceKey, Point> = {
    s1: { x: 0, y: 0 },
    s2: { x: -1, y: 4 },
    s3: { x: -5, y: 0 },
  };
  // -----------------------------------------------

  const CLOSED: Record<SliceKey, Point> = {
    s1: addPoint(CLOSED_RAW.s1, CLOSED_SLICE_TWEAK.s1),
    s2: addPoint(CLOSED_RAW.s2, CLOSED_SLICE_TWEAK.s2),
    s3: addPoint(CLOSED_RAW.s3, CLOSED_SLICE_TWEAK.s3),
  };

  // OPEN은 CLOSED를 기준으로 "비례 확대"해서 계산한다.
  const OPEN_PIVOT: Point = { x: -45, y: -35 };
  const OPEN_SPREAD = 1.62;
  const OPEN_GLOBAL_SHIFT: Point = { x: -44, y: -42 };
  const spreadFromClosed = (p: Point): Point => ({
    x: OPEN_PIVOT.x + (p.x - OPEN_PIVOT.x) * OPEN_SPREAD + OPEN_GLOBAL_SHIFT.x,
    y: OPEN_PIVOT.y + (p.y - OPEN_PIVOT.y) * OPEN_SPREAD + OPEN_GLOBAL_SHIFT.y,
  });

  const OPEN: Record<SliceKey, Point> = {
    s1: addPoint(spreadFromClosed(CLOSED.s1), OPEN_SLICE_TWEAK.s1),
    s2: addPoint(spreadFromClosed(CLOSED.s2), OPEN_SLICE_TWEAK.s2),
    s3: addPoint(spreadFromClosed(CLOSED.s3), OPEN_SLICE_TWEAK.s3),
  };

  const sx = (v: number) => v * factor;

  const baseX = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED_BASE.x), sx(OPEN_BASE.x)] });
  const baseY = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED_BASE.y), sx(OPEN_BASE.y)] });

  const slice1X = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED.s1.x), sx(OPEN.s1.x)] });
  const slice1Y = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED.s1.y), sx(OPEN.s1.y)] });
  const slice2X = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED.s2.x), sx(OPEN.s2.x)] });
  const slice2Y = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED.s2.y), sx(OPEN.s2.y)] });
  const slice3X = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED.s3.x), sx(OPEN.s3.x)] });
  const slice3Y = anim.interpolate({ inputRange: [0, 1], outputRange: [sx(CLOSED.s3.y), sx(OPEN.s3.y)] });

  const SLICE_SCALE_CLOSED = 0.68;
  const SLICE_SCALE_OPEN = 1.0;
  const HALF_SCALE_OPEN = 1 + (SLICE_SCALE_OPEN - SLICE_SCALE_CLOSED) * 0.6;
  const halfScale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, HALF_SCALE_OPEN] });
  const sliceScale = anim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [SLICE_SCALE_CLOSED, 1.04, SLICE_SCALE_OPEN],
  });

  return {
    anim,
    factor,
    isOpen,
    toggle,
    close,
    baseX,
    baseY,
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
