import React from "react";
import { Animated, Pressable, StyleSheet, View, ImageSourcePropType, Text, Image } from "react-native";
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
  sliceSize?: number;
  sliceRotation?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
  sliceTouchScale?: number;
  touchRotationOffset?: number;
  touchOffsetX?: number;
  touchOffsetY?: number;
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
  imageOffsetX = 0,
  imageOffsetY = 0,
  sliceTouchScale = 1.0,
  touchRotationOffset = 0,
  touchOffsetX = 0,
  touchOffsetY = 0,
}: Props) {
  const DEBUG_TOUCH = false;
  const showSliceTouch = DEBUG_TOUCH && isOpen;
  const router = useRouter();

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
  const effectiveTouchScale = isOpen ? sliceTouchScale : 1.02;
  const touchSize = finalSize * effectiveTouchScale;
  const finalOffsetX = (labelOffsetX ?? 0) * factor;
  const finalOffsetY = (labelOffsetY ?? 0) * factor;

  const translateXWithOffset = anim
    ? Animated.add(baseSlideX, new Animated.Value(finalOffsetX))
    : new Animated.Value(finalOffsetX);

  const translateYWithOffset = new Animated.Value(finalOffsetY);
  const labelX = Animated.add(translateX, translateXWithOffset);
  const labelY = Animated.add(translateY, translateYWithOffset);

  const handlePress = () => {
    if (!isOpen) return;
    try {
      router.push(onPressRoute as any);
    } catch (e) {
      console.warn("Navigation error:", e);
    }
    onToggle();
  };

  const touchSpreadDeg = isOpen ? 28 : 22;
  const halfBase = (touchSize / 2) * Math.tan((touchSpreadDeg * Math.PI) / 180);
  const centerX = touchSize / 2;
  const centerY = touchSize / 2;
  const trianglePath = `M ${centerX} ${centerY} L ${centerX - halfBase} 0 L ${centerX + halfBase} 0 Z`;

  return (
    <Animated.View style={[styles.sliceContainer, {}]} pointerEvents="box-none">
      <Animated.View
        style={{
          width: touchSize,
          height: touchSize,
          left: -touchSize / 2,
          top: -touchSize / 2,
          transform: [
            { translateX },
            { translateY },
            { translateX: touchOffsetX * factor },
            { translateY: touchOffsetY * factor },
            { rotate: `${sliceRotation + touchRotationOffset}deg` },
            { scale },
          ],
          position: "absolute",
          zIndex: 20,
        }}
        pointerEvents={isOpen ? "box-none" : "none"}
      >
        <Svg width={touchSize} height={touchSize} viewBox={`0 0 ${touchSize} ${touchSize}`} pointerEvents="none">
          <Path
            d={trianglePath}
            fill={showSliceTouch ? "rgba(0,255,0,0.35)" : "transparent"}
            stroke={showSliceTouch ? "green" : "transparent"}
            strokeWidth={1}
            onPress={handlePress}
          />
        </Svg>
      </Animated.View>

      <Animated.View
        style={{
          width: finalSize,
          height: finalSize,
          left: -finalSize / 2,
          top: -finalSize / 2,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          transform: [
            { translateX },
            { translateY },
            { translateX: imageOffsetX * factor },
            { translateY: imageOffsetY * factor },
            { scale },
            { rotate: `${sliceRotation}deg` },
          ],
        }}
        pointerEvents="none"
      >
        <Image source={source} style={{ width: finalSize, height: finalSize }} resizeMode="contain" />
      </Animated.View>

      {label && (
        <Animated.View
          pointerEvents={isOpen ? "auto" : "none"}
          style={[
            styles.labelWrapper,
            {
              opacity: labelOpacity,
              transform: [{ translateX: labelX }, { translateY: labelY }, { scale: labelScale }],
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
              pressed && { opacity: 0.7 },
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
              <Text style={[styles.labelText, { fontSize: 13 * factor }]} numberOfLines={1}>
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
    zIndex: 5,
  },
  labelWrapper: {
    position: "absolute",
  },
  labelBubble: {
    backgroundColor: "rgba(255,255,255,0.85)",
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
