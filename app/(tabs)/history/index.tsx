import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Svg, { Defs, G, Path, RadialGradient, Stop, Circle } from "react-native-svg";
import { CalendarHistoryMap, getCalendarHistory } from "../../../src/utils/prototypeCalendarHistory";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

const toIsoDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getMondayBasedIndex = (day: number): number => (day === 0 ? 6 : day - 1);

const getMonthMeta = (focusMonth: Date) => {
  const year = focusMonth.getFullYear();
  const month = focusMonth.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const leadingBlanks = getMondayBasedIndex(first.getDay());
  return {
    year,
    month,
    daysInMonth: last.getDate(),
    leadingBlanks,
  };
};

function MiniPizza({ count, size = 18 }: { count: number; size?: number }) {
  const safe = Math.max(0, Math.min(5, count));
  const crustPath = "M 100 10 A 90 90 0 0 1 185.595 72.188 L 173.273 77.676 A 76 76 0 0 0 100 24 Z";
  const cheesePath = "M 100 100 L 100 24 A 76 76 0 0 1 173.273 77.676 Z";

  return (
    <Svg width={size} height={size} viewBox="10 10 180 180">
      <Defs>
        <RadialGradient id="historyMiniCheese" cx="50%" cy="45%" r="70%">
          <Stop offset="0%" stopColor="#FFE9A6" />
          <Stop offset="100%" stopColor="#FFC94D" />
        </RadialGradient>
        <RadialGradient id="historyMiniPep" cx="40%" cy="40%" r="70%">
          <Stop offset="0%" stopColor="#FF7A59" />
          <Stop offset="100%" stopColor="#C62828" />
        </RadialGradient>
      </Defs>
      {Array.from({ length: safe }).map((_, i) => (
        <G key={i} originX={100} originY={100} rotation={72 * i}>
          <Path d={crustPath} fill="#E8A04B" stroke="#C97A22" strokeWidth={4} />
          <Path d={cheesePath} fill="url(#historyMiniCheese)" stroke="#E0A800" strokeWidth={4} />
          <Circle cx={126.5} cy={63.6} r={9} fill="url(#historyMiniPep)" stroke="#8E1B1B" strokeWidth={3} />
          <Circle cx={122} cy={58} r={2.4} fill="#FFF4CC" opacity={0.6} />
        </G>
      ))}
    </Svg>
  );
}

export default function HistoryCalendarPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [history, setHistory] = useState<CalendarHistoryMap>({});
  const [focusMonth, setFocusMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    getCalendarHistory().then(setHistory).catch(() => setHistory({}));
  }, []);

  const monthMeta = useMemo(() => getMonthMeta(focusMonth), [focusMonth]);
  const cells = useMemo(() => {
    const arr: ({ key: string; day: number; slices: number } | null)[] = [];
    for (let i = 0; i < monthMeta.leadingBlanks; i += 1) arr.push(null);
    for (let day = 1; day <= monthMeta.daysInMonth; day += 1) {
      const key = toIsoDate(new Date(monthMeta.year, monthMeta.month, day));
      arr.push({ key, day, slices: history[key] ?? 0 });
    }
    return arr;
  }, [history, monthMeta]);

  const monthLabel = `${monthMeta.year}.${String(monthMeta.month + 1).padStart(2, "0")}`;
  const todayKey = toIsoDate(new Date());

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#191F28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>피자 캘린더</Text>
        <View style={styles.headerIconBtn} />
      </View>

      <View style={styles.monthBar}>
        <TouchableOpacity
          style={styles.monthBtn}
          onPress={() => setFocusMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
        >
          <Ionicons name="chevron-back" size={18} color="#4E5968" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthLabel}</Text>
        <TouchableOpacity
          style={styles.monthBtn}
          onPress={() => setFocusMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
        >
          <Ionicons name="chevron-forward" size={18} color="#4E5968" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAYS.map((w) => (
          <Text key={w} style={styles.weekText}>
            {w}
          </Text>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {cells.map((cell, idx) => {
          if (!cell) return <View key={`blank-${idx}`} style={styles.dayCell} />;
          const isToday = cell.key === todayKey;
          return (
            <View key={cell.key} style={[styles.dayCell, isToday && styles.todayCell]}>
              <Text style={[styles.dayNumber, isToday && styles.todayNumber]}>{cell.day}</Text>
              <MiniPizza count={cell.slices} size={18} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5FAFF",
    paddingHorizontal: 16,
  },
  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIconBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#191F28",
  },
  monthBar: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  monthBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191F28",
    minWidth: 86,
    textAlign: "center",
  },
  weekRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  weekText: {
    width: "14.2%",
    textAlign: "center",
    fontSize: 12,
    color: "#8B95A1",
    fontWeight: "600",
  },
  grid: {
    marginTop: 8,
    paddingBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.2%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  todayCell: {
    borderWidth: 1.5,
    borderColor: "#191F28",
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4E5968",
  },
  todayNumber: {
    color: "#191F28",
  },
});
