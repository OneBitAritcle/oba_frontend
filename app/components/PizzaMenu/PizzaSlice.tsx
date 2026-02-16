// app/components/PizzaMenu/PizzaSlice.tsx
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
import { Svg, Path } from "react-native-svg";

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
  sliceTouchScale = 0.72,  // ← 터치 영역 기본 축소 (겹침 방지 핵심 👈)
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
      {/* 🎯 터치 가능한 실제 영역 */}
      <View
        style={[
          {
            width: touchSize,
            height: touchSize,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        pointerEvents="box-none"
      >
        <View
          style={{
            position: "absolute",
            width: touchSize,
            height: touchSize,
          }}
          pointerEvents="box-none"
        >
          <Svg
            width={touchSize}
            height={touchSize}
            viewBox={`0 0 ${touchSize} ${touchSize}`}
            pointerEvents="box-none"
            style={{
              transform: [{ rotate: `${sliceRotation}deg` }],
            }}
          >
            {/* 피자 조각 모양의 Path (부채꼴: 중심에서 위로, 그리고 왼쪽으로 60도) */}
            <Path
              d={`M ${touchSize / 2} ${touchSize / 2}
                 L ${touchSize / 2} 0
                 A ${touchSize / 2} ${touchSize / 2} 0 0 0 ${touchSize / 2 - (touchSize / 2) * Math.sin(Math.PI / 3)} ${touchSize / 2 - (touchSize / 2) * Math.cos(Math.PI / 3)}
                 Z`}
              fill={DEBUG_TOUCH ? "rgba(0,255,0,0.35)" : "transparent"}
              stroke={DEBUG_TOUCH ? "green" : "transparent"}
              strokeWidth={1}
              onPress={handlePress}
            />
          </Svg>
        </View>

        {/* 🍕 실제 조각 이미지 */}
        <Animated.View
          style={{
            width: finalSize,
            height: finalSize,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
          pointerEvents="none"
        >
          <Animated.Image
            source={source}
            style={{
              width: finalSize,
              height: finalSize,
              transform: [{ scale }, { rotate: `${sliceRotation}deg` }],
            }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* 💬 라벨 */}
        {label && (
          <Animated.View
            // pointerEvents="none"
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
            <View
              style={[
                styles.labelBubble,
                {
                  borderRadius: 4 * factor,
                  paddingHorizontal: 6 * factor,
                  paddingVertical: 2 * factor,
                },
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
            </View>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );

}

const styles = StyleSheet.create({
  sliceContainer: { position: "absolute" },

  labelWrapper: { position: "absolute" },

  labelBubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
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
