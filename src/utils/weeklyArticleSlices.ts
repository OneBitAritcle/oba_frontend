import AsyncStorage from "@react-native-async-storage/async-storage";

const WEEKLY_ARTICLE_SLICES_KEY = "weekly_article_slices_v1";

export type WeeklyArticleSlices = {
  weekStart: string; // Monday YYYY-MM-DD
  daySlices: number[]; // Mon..Sun, each 0..5
  completedArticleIds: string[]; // dedupe for the week
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

const createInitial = (weekStart: string): WeeklyArticleSlices => ({
  weekStart,
  daySlices: [0, 0, 0, 0, 0, 0, 0],
  completedArticleIds: [],
});

const save = async (value: WeeklyArticleSlices): Promise<void> => {
  await AsyncStorage.setItem(WEEKLY_ARTICLE_SLICES_KEY, JSON.stringify(value));
};

export const getWeeklyArticleSlices = async (): Promise<WeeklyArticleSlices> => {
  const currentWeekStart = getWeekStartMonday();
  const raw = await AsyncStorage.getItem(WEEKLY_ARTICLE_SLICES_KEY);

  if (!raw) {
    const initial = createInitial(currentWeekStart);
    await save(initial);
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as WeeklyArticleSlices;
    const validDaySlices = Array.isArray(parsed.daySlices) && parsed.daySlices.length === 7;
    const validCompleted = Array.isArray(parsed.completedArticleIds);
    if (!parsed.weekStart || !validDaySlices || !validCompleted) {
      const initial = createInitial(currentWeekStart);
      await save(initial);
      return initial;
    }

    if (parsed.weekStart !== currentWeekStart) {
      const initial = createInitial(currentWeekStart);
      await save(initial);
      return initial;
    }

    parsed.daySlices = parsed.daySlices.map((v) => clamp(Number(v) || 0, 0, 5));
    return parsed;
  } catch {
    const initial = createInitial(currentWeekStart);
    await save(initial);
    return initial;
  }
};

export const completeArticleForToday = async (articleId: string): Promise<WeeklyArticleSlices> => {
  const current = await getWeeklyArticleSlices();
  if (current.completedArticleIds.includes(articleId)) return current;

  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1; // Mon..Sun => 0..6
  const next: WeeklyArticleSlices = {
    ...current,
    daySlices: [...current.daySlices],
    completedArticleIds: [...current.completedArticleIds, articleId],
  };

  next.daySlices[dayIndex] = clamp(next.daySlices[dayIndex] + 1, 0, 5);
  await save(next);
  return next;
};

