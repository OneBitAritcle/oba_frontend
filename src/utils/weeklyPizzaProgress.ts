import AsyncStorage from "@react-native-async-storage/async-storage";

const WEEKLY_PIZZA_KEY = "weekly_pizza_progress_v1";

export type WeeklyPizzaProgress = {
  weekStart: string; // Monday (YYYY-MM-DD)
  solvedSlices: number; // 0..5
};

const toIsoDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getWeekStartMonday = (base: Date = new Date()): string => {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // Sun=0, Mon=1...Sat=6
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  return toIsoDate(d);
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const createInitial = (weekStart: string): WeeklyPizzaProgress => ({
  weekStart,
  solvedSlices: 0,
});

const saveWeeklyPizzaProgress = async (value: WeeklyPizzaProgress): Promise<void> => {
  await AsyncStorage.setItem(WEEKLY_PIZZA_KEY, JSON.stringify(value));
};

export const getWeeklyPizzaProgress = async (): Promise<WeeklyPizzaProgress> => {
  const currentWeekStart = getWeekStartMonday();
  const raw = await AsyncStorage.getItem(WEEKLY_PIZZA_KEY);

  if (!raw) {
    const initial = createInitial(currentWeekStart);
    await saveWeeklyPizzaProgress(initial);
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as WeeklyPizzaProgress;
    if (!parsed.weekStart || typeof parsed.solvedSlices !== "number") {
      const initial = createInitial(currentWeekStart);
      await saveWeeklyPizzaProgress(initial);
      return initial;
    }

    if (parsed.weekStart !== currentWeekStart) {
      const initial = createInitial(currentWeekStart);
      await saveWeeklyPizzaProgress(initial);
      return initial;
    }

    parsed.solvedSlices = clamp(parsed.solvedSlices, 0, 5);
    return parsed;
  } catch {
    const initial = createInitial(currentWeekStart);
    await saveWeeklyPizzaProgress(initial);
    return initial;
  }
};

export const addPizzaSliceProgress = async (amount: number = 1): Promise<WeeklyPizzaProgress> => {
  const current = await getWeeklyPizzaProgress();
  const next: WeeklyPizzaProgress = {
    ...current,
    solvedSlices: clamp(current.solvedSlices + amount, 0, 5),
  };
  await saveWeeklyPizzaProgress(next);
  return next;
};

