import AsyncStorage from "@react-native-async-storage/async-storage";

const CALENDAR_HISTORY_KEY = "prototype_calendar_history_v1";

export type CalendarHistoryMap = Record<string, number>; // YYYY-MM-DD -> 0..5

const toIsoDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const mulberry32 = (seed: number) => {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const createMockHistory = (): CalendarHistoryMap => {
  const map: CalendarHistoryMap = {};
  const random = mulberry32(20260308);
  const today = new Date();

  for (let i = 1; i <= 90; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = toIsoDate(d);
    const roll = random();
    let value = 0;
    if (roll > 0.82) value = 5;
    else if (roll > 0.67) value = 4;
    else if (roll > 0.5) value = 3;
    else if (roll > 0.33) value = 2;
    else if (roll > 0.18) value = 1;
    map[key] = value;
  }

  return map;
};

const saveHistory = async (history: CalendarHistoryMap): Promise<void> => {
  await AsyncStorage.setItem(CALENDAR_HISTORY_KEY, JSON.stringify(history));
};

export const getCalendarHistory = async (): Promise<CalendarHistoryMap> => {
  const raw = await AsyncStorage.getItem(CALENDAR_HISTORY_KEY);
  if (!raw) {
    const initial = createMockHistory();
    await saveHistory(initial);
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as CalendarHistoryMap;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      const initial = createMockHistory();
      await saveHistory(initial);
      return initial;
    }
    return parsed;
  } catch {
    const initial = createMockHistory();
    await saveHistory(initial);
    return initial;
  }
};

export const incrementTodayHistory = async (step: number = 1): Promise<CalendarHistoryMap> => {
  const history = await getCalendarHistory();
  const key = toIsoDate(new Date());
  const current = Number(history[key] ?? 0);
  history[key] = clamp(current + step, 0, 5);
  await saveHistory(history);
  return history;
};

