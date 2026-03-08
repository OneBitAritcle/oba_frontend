import AsyncStorage from "@react-native-async-storage/async-storage";

const WEEKLY_ATTENDANCE_KEY = "weekly_attendance_v1";

export type WeeklyAttendance = {
  weekStart: string; // Monday (YYYY-MM-DD)
  days: boolean[]; // Mon..Sun (length 7)
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
  const day = d.getDay(); // Sun=0, Mon=1 ... Sat=6
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  return toIsoDate(d);
};

const createEmptyWeeklyAttendance = (weekStart: string): WeeklyAttendance => ({
  weekStart,
  days: [false, false, false, false, false, false, false],
});

const saveWeeklyAttendance = async (value: WeeklyAttendance): Promise<void> => {
  await AsyncStorage.setItem(WEEKLY_ATTENDANCE_KEY, JSON.stringify(value));
};

export const getWeeklyAttendance = async (): Promise<WeeklyAttendance> => {
  const currentWeekStart = getWeekStartMonday();
  const raw = await AsyncStorage.getItem(WEEKLY_ATTENDANCE_KEY);

  if (!raw) {
    const fresh = createEmptyWeeklyAttendance(currentWeekStart);
    await saveWeeklyAttendance(fresh);
    return fresh;
  }

  try {
    const parsed = JSON.parse(raw) as WeeklyAttendance;
    const validDays = Array.isArray(parsed.days) && parsed.days.length === 7;
    if (!parsed.weekStart || !validDays) {
      const fresh = createEmptyWeeklyAttendance(currentWeekStart);
      await saveWeeklyAttendance(fresh);
      return fresh;
    }

    if (parsed.weekStart !== currentWeekStart) {
      const fresh = createEmptyWeeklyAttendance(currentWeekStart);
      await saveWeeklyAttendance(fresh);
      return fresh;
    }

    return parsed;
  } catch {
    const fresh = createEmptyWeeklyAttendance(currentWeekStart);
    await saveWeeklyAttendance(fresh);
    return fresh;
  }
};

export const markTodayAttendance = async (): Promise<WeeklyAttendance> => {
  const weekly = await getWeeklyAttendance();
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1; // Mon..Sun => 0..6

  if (!weekly.days[dayIndex]) {
    weekly.days[dayIndex] = true;
    await saveWeeklyAttendance(weekly);
  }

  return weekly;
};

