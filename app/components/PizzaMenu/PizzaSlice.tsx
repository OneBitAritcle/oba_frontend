import React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  ImageSourcePropType,
  Text,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

type Props = {
  source: ImageSourcePropType;
  translateX: Animated.AnimatedInterpolation<number>;
  translateY: Animated.AnimatedInterpolation<number>;
  scale: Animated.AnimatedInterpolation<number>;
  onPressRoute: string;
  isOpen: boolean;
  onToggle: () => void;
  factor: number;
  anim?: Animated.Value;
  label?: string;

  labelOffsetX?: number;
  labelOffsetY?: number;
  labelIconSource?: ImageSourcePropType;

  sliceSize?: number;        // 이미지 자체 크기
  sliceRotation?: number;    // 회전값
  sliceTouchScale?: number;  // 터치 가능 영역 축소 비율

  touchRotationOffset?: number; // 터치 영역 추가 회전
  touchOffsetX?: number;        // 터치 영역 가로 이동
  touchOffsetY?: number;        // 터치 영역 세로 이동
};

export default function PizzaSlice({
  source,
  translateX,
  translateY,
  scale,
  onPressRoute,
  isOpen,
  onToggle,
  factor,
  anim,
  label,
  labelOffsetX,
  labelOffsetY,
  labelIconSource,
  sliceSize = 60,
  sliceRotation = 0,
  sliceTouchScale = 1.5,  // ← 너무 커서 0.85배로 다시 적절히 조정
  touchRotationOffset = 0,
  touchOffsetX = 0,
  touchOffsetY = 0,
}: Props) {

  const DEBUG_TOUCH = true; // ← 바로 여기! 딱 이곳이 정답
  const router = useRouter();


  // 라벨 Fade-in
  const labelOpacity = anim
    ? anim.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0, 1],
    })
    : 0;

  const baseSlideX = anim
    ? anim.interpolate({
      inputRange: [0, 1],
      outputRange: [10 * factor, 0],
    })
    : 0;

  const labelScale = anim
    ? anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1],
    })
    : 1;

  const finalSize = sliceSize * factor;
  const touchSize = finalSize * sliceTouchScale; // ← 조정된 터치 영역 크기

  const finalOffsetX = (labelOffsetX ?? 0) * factor;
  const finalOffsetY = (labelOffsetY ?? 0) * factor;

  const translateXWithOffset = anim
    ? Animated.add(baseSlideX, new Animated.Value(finalOffsetX))
    : new Animated.Value(finalOffsetX);

  const translateYWithOffset = new Animated.Value(finalOffsetY);

  const handlePress = () => {
    if (!isOpen) {
      onToggle();
      return;
    }
    try {
      router.push(onPressRoute as any);
    } catch (e) {
      console.warn("Navigation error:", e);
    }
    onToggle();
  };

  // 피자 조각 형태의 삼각형 Path 데이터 계산
  // 부채꼴의 삼각형 근사치: Tip을 중앙(Bottom Center)으로 하고 위로 퍼지는 형태
  const R = touchSize;
  const halfBase = (R / 2) * Math.tan((30 * Math.PI) / 180); // 60도 부채꼴 가정
  const centerX = R / 2;
  const centerY = R / 2;

  // 삼각형 정점: Tip(중앙), TopLeft, TopRight
  const p1 = { x: centerX, y: centerY };          // Tip (피자 중심부)
  const p2 = { x: centerX - halfBase, y: 0 };    // Outer Left
  const p3 = { x: centerX + halfBase, y: 0 };    // Outer Right

  const trianglePath = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;

  return (
    <Animated.View
      style={[
        styles.sliceContainer,
        {
          transform: [{ translateX }, { translateY }],
        },
      ]}
      pointerEvents="box-none"
    >
      {/* 🎯 터치 영역용 Svg */}
      <Animated.View
        style={{
          width: touchSize,
          height: touchSize,
          transform: [
            { translateX: touchOffsetX * factor },
            { translateY: touchOffsetY * factor },
            { rotate: `${sliceRotation + touchRotationOffset}deg` },
            { scale },
          ],
          position: "absolute",
        }}
        pointerEvents="box-none"
      >
        <Svg
          width={touchSize}
          height={touchSize}
          viewBox={`0 0 ${touchSize} ${touchSize}`}
          pointerEvents="none"
        >
          <Path
            d={trianglePath}
            fill={DEBUG_TOUCH ? "rgba(0,255,0,0.35)" : "transparent"}
            stroke={DEBUG_TOUCH ? "green" : "transparent"}
            strokeWidth={1}
            onPress={handlePress}
          />
        </Svg>
      </Animated.View>

      {/* 🍕 실제 조각 이미지 */}
      <Animated.View
        style={{
          width: finalSize,
          height: finalSize,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          transform: [{ scale }, { rotate: `${sliceRotation}deg` }],
        }}
        pointerEvents="none"
      >
        <Image
          source={source}
          style={{
            width: finalSize,
            height: finalSize,
          }}
          resizeMode="contain"
        />
      </Animated.View>

      {/* 💬 라벨 */}
      {label && (
        <Animated.View
          style={[
            styles.labelWrapper,
            {
              opacity: labelOpacity,
              transform: [
                { translateX: translateXWithOffset },
                { translateY: translateYWithOffset },
                { scale: labelScale },
              ],
            },
          ]}
        >
          <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
              styles.labelBubble,
              {
                borderRadius: 4 * factor,
                paddingHorizontal: 6 * factor,
                paddingVertical: 2 * factor,
              },
              pressed && { opacity: 0.7 }
            ]}
          >
            <View style={styles.labelInner}>
              {labelIconSource && (
                <Image
                  source={labelIconSource}
                  style={{
                    width: 10 * factor,
                    height: 10 * factor,
                    marginRight: 4 * factor,
                  }}
                />
              )}
              <Text
                style={[styles.labelText, { fontSize: 13 * factor }]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      )}
    </Animated.View>
  );

}

const styles = StyleSheet.create({
  sliceContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  labelWrapper: { position: "absolute" },

  labelBubble: {
    backgroundColor: "rgba(255,255,255,0.85)", // 🌫️ 배경 딤과 어울리도록 다시 약간 투명하게 변경
    shadowColor: "#4f4f4fff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    overflow: "hidden",
  },

  labelInner: {
    flexDirection: "row",
    alignItems: "center",
  },

  labelText: {
    color: "#000000ff",
    fontWeight: "500",
  },
});
