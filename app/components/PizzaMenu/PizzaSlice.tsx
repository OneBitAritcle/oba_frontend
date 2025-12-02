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
  factor?: number;
}

export default function PizzaSlice({
  source,
  translateX,
  translateY,
  scale,
  onPressRoute,
  isOpen,
  onToggle,
  factor = 1,
}: Props) {
  // slice size scales with screen factor
  const size = 60 * factor;

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
            opacity: 1,
            transform: [
              { translateX },
              { translateY },
              { scale: scale ?? 1 },
            ],
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
