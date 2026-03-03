import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HomeHeaderProps {
    user: {
        nickname: string;
        profileImage: string;
    };
    streak: number;
    date: string;
}

export default function HomeHeader({ user, streak, date }: HomeHeaderProps) {
    const router = useRouter();
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.topRow}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={
                                    user.profileImage && (user.profileImage.startsWith("http") || user.profileImage.startsWith("https"))
                                        ? { uri: user.profileImage }
                                        : require("../../assets/knight/basic_profile.png")
                                }
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <TouchableOpacity
                                style={styles.nicknameRow}
                                onPress={() => router.push("/my")}
                                activeOpacity={0.6}
                            >
                                <Text style={styles.nickname}>{user.nickname}</Text>
                                <Ionicons name="chevron-forward" size={18} color="#999" />
                            </TouchableOpacity>
                            <Text style={styles.dateText}>{date}</Text>
                            <View style={styles.streakRow}>
                                <Text style={styles.streakIcon}>🔥</Text>
                                <Text style={styles.streakText}>연속 학습 {streak}일</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.daysRow}>
                    {days.map((day, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dayCircle,
                                index === todayIndex && styles.todayCircle
                            ]}
                        >
                            <Text style={[styles.dayText, index === todayIndex && styles.todayDayText]}>
                                {day}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    card: {
        backgroundColor: "#FFF9E6", // 연한 베이지색
        borderRadius: 32,
        padding: 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: { elevation: 3 },
        }),
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#fff",
        padding: 2,
        marginRight: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#F2F4F6",
    },
    avatar: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    textContainer: {
        justifyContent: "center",
    },
    nicknameRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    nickname: {
        fontSize: 20,
        fontWeight: "800",
        color: "#191F28",
        marginRight: 4,
    },
    dateText: {
        fontSize: 14,
        color: "#8B95A1",
        marginVertical: 2,
    },
    streakRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    streakIcon: {
        fontSize: 16,
        marginRight: 4,
    },
    streakText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#4E5968",
    },
    daysRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F2F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
    todayCircle: {
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#E5E8EB",
    },
    dayText: {
        fontSize: 13,
        color: "#8B95A1",
        fontWeight: "500",
    },
    todayDayText: {
        color: "#191F28",
        fontWeight: "700",
    },
});
