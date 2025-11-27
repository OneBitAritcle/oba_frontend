import { Pressable, Animated, StyleSheet, ImageSourcePropType } from "react-native";
import { router } from "expo-router";

interface Props {
  source: ImageSourcePropType;
  translateX: any;
  translateY: any;
  scale: any;
  onPressRoute: string;
}

export default function PizzaSlice({
  source,
  translateX,
  translateY,
  scale,
  onPressRoute,
}: Props) {
  return (
    <Pressable onPress={() => router.push(onPressRoute)}>
      <Animated.Image
        source={source}
        style={[
          styles.slice,
          {
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
    width: 95,
    height: 95,
  },
});
