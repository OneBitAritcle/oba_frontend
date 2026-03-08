import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Path, G, Circle } from "react-native-svg";

type PizzaProgressProps = {
  solvedSlices: number; // 0..5
  size?: number;
};

const SLICE_CRUST_PATH =
  "M 100 10 A 90 90 0 0 1 185.595 72.188 L 173.273 77.676 A 76 76 0 0 0 100 24 Z";
const SLICE_CHEESE_PATH = "M 100 100 L 100 24 A 76 76 0 0 1 173.273 77.676 Z";

export default function PizzaProgress({ solvedSlices, size = 64 }: PizzaProgressProps) {
  const count = Math.max(0, Math.min(5, solvedSlices));

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <RadialGradient id="cheese" cx="50%" cy="45%" r="70%">
            <Stop offset="0%" stopColor="#FFE9A6" />
            <Stop offset="100%" stopColor="#FFC94D" />
          </RadialGradient>
          <RadialGradient id="pep" cx="40%" cy="40%" r="70%">
            <Stop offset="0%" stopColor="#FF7A59" />
            <Stop offset="100%" stopColor="#C62828" />
          </RadialGradient>
        </Defs>

        {Array.from({ length: count }).map((_, i) => (
          <G key={i} originX={100} originY={100} rotation={72 * i}>
            <Path d={SLICE_CRUST_PATH} fill="#E8A04B" stroke="#C97A22" strokeWidth={2} />
            <Path d={SLICE_CHEESE_PATH} fill="url(#cheese)" stroke="#E0A800" strokeWidth={2} />
            <Circle cx={126.5} cy={63.6} r={14} fill="url(#pep)" stroke="#8E1B1B" strokeWidth={3} />
            <Circle cx={122} cy={58} r={4} fill="#FFF4CC" opacity={0.6} />
          </G>
        ))}
      </Svg>
      <Text style={styles.label}>{count}/5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "700",
    color: "#4E5968",
  },
});

