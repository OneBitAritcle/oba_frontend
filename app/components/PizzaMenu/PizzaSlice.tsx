import { Pressable, Animated, StyleSheet, ImageSourcePropType } from "react-native";
import { router } from "expo-router";

interface Props {
  source: ImageSourcePropType;
  translateX: any;
  translateY: any;
  scale: any;
  onPressRoute: string;
  isOpen: boolean;
  onToggle: () => void;
  factor: number;
}

export default function PizzaSlice({
  source,
  translateX,
  translateY,
  scale,
  onPressRoute,
  isOpen,
  onToggle,
  factor,
}: Props) {
  const size = 61.5 * factor; // 화면비 일관 적용

  const handlePress = () => {
    if (isOpen) {
      router.push(onPressRoute as any);
    } else {
      onToggle();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.Image
        source={source}
        style={[
          styles.slice,
          {
            width: size,
            height: size,
            transform: [{ translateX }, { translateY }, { scale }],
          },
        ]}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slice: {
    position: "absolute",
  },
});
