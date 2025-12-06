// app/components/PizzaMenu/PizzaSlice.tsx
import React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  ImageSourcePropType,
  Text,
} from "react-native";
import { useRouter } from "expo-router";

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
  labelOffsetY?: number;
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
  labelOffsetY,
}: Props) {
  const router = useRouter();

  const labelOpacity = anim
    ? anim.interpolate({
        inputRange: [0, 0.6, 1],
        outputRange: [0, 0, 1],
      })
    : 0;

  // 살짝 안쪽으로 들어오게 (왼쪽에 있을 거라 +값을 너무 크게 안 줌)
  const labelTranslateX = anim
    ? anim.interpolate({
        inputRange: [0, 1],
        outputRange: [10 * factor, 5 * factor],
      })
    : 0;

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
      <Pressable onPress={handlePress} hitSlop={10}>
        {/* row-reverse: 그림이 오른쪽, 라벨이 왼쪽 */}
        <View style={styles.row}>
          {/* 🔴 조각 이미지 */}
          <Animated.Image
            source={source}
            style={[
              {
                width: 60 * factor,
                height: 60 * factor,
                transform: [{ scale }],
              },
            ]}
            resizeMode="contain"
          />

          {/* 🔵 왼쪽 라벨 뱃지 */}
          {label && (
            <Animated.View
              style={[
                styles.labelBubble,
                {
                  opacity: labelOpacity,
                  transform: [
                    { translateX: labelTranslateX },
                    { translateY: (labelOffsetY ?? 0) * factor }, // ← 필요시 조절
                  ],
                  paddingHorizontal: 6 * factor,
                  paddingVertical: 2 * factor,
                  borderRadius: 999,
                },
              ]}
            >
              <Text
                style={[
                  styles.labelText,
                  {
                    fontSize: 9 * factor, // 아이폰 미니 기준 작은 사이즈
                  },
                ]}
                numberOfLines={1}
                allowFontScaling={false}
              >
                {label}
              </Text>
            </Animated.View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sliceContainer: {
    position: "absolute",
  },
  row: {
    flexDirection: "row-reverse", // 라벨이 왼쪽, 이미지 오른쪽
    alignItems: "center",
  },
  labelBubble: {
    backgroundColor: "rgba(0,0,0,0.45)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    color: "#FFFFFF",
    fontWeight: "600",
    // 살짝 글로우 느낌
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
